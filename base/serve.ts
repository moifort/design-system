/**
 * UniFi OS local mirror — caching reverse proxy with server-side auto-login.
 *
 * Runs the REAL, unmodified UniFi OS web app (React/Angular bundles, exactly as
 * shipped by the device) from http://localhost — no migration, no login screen.
 *
 * Auth is handled SERVER-SIDE: the proxy logs into the device once (creds from
 * .env), holds the TOKEN, and injects it into every request it forwards (HTTP +
 * WebSocket). The browser therefore needs no auth cookie, so we can serve plain
 * HTTP (no HTTPS, no self-signed cert). On a 401 the proxy re-logs-in and retries.
 *
 * Routing per request:
 *   - hashed static asset  → cache/ if present, else fetched from device + cached
 *   - app routes / HTML    → live (fresh bootstrap)
 *   - /api, /proxy, …      → live, never cached
 *   - WebSocket            → bridged to the device (with injected token)
 *
 * The app is client-side rendered and talks to the device's REST + WS API, so the
 * device must be reachable on the LAN.
 *
 * Run: bun run serve   (then open http://localhost:8443)
 */
import { existsSync } from 'node:fs'
import { mkdir, readFile, writeFile } from 'node:fs/promises'
import { dirname, join, extname, resolve } from 'node:path'

const DEVICE = process.env.UNIFI_HOST || 'https://192.168.1.1'
const DEVICE_ORIGIN = new URL(DEVICE).origin
const PORT = Number(process.env.PORT || 8443)
const CACHE = resolve(import.meta.dir, 'cache')
const CREDS = { user: process.env.UNIFI_USER || 'local', pass: process.env.UNIFI_PASS || '' }
const TLS = { rejectUnauthorized: false }

const MIME: Record<string, string> = {
  '.html': 'text/html; charset=utf-8', '.js': 'text/javascript; charset=utf-8',
  '.mjs': 'text/javascript; charset=utf-8', '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8', '.svg': 'image/svg+xml',
  '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg',
  '.gif': 'image/gif', '.webp': 'image/webp', '.ico': 'image/x-icon',
  '.woff': 'font/woff', '.woff2': 'font/woff2', '.ttf': 'font/ttf',
  '.map': 'application/json', '.wasm': 'application/wasm', '.txt': 'text/plain'
}

const isDynamic = (p: string) =>
  p.startsWith('/api') || p.startsWith('/proxy') || p.startsWith('/v2/') ||
  p.includes('/api/') || p.startsWith('/wss') || p.startsWith('/logout')

const STATIC_EXT = new Set(Object.keys(MIME).filter((e) => e !== '.html'))
const isStaticAsset = (p: string) => STATIC_EXT.has(extname(p.split('?')[0]))

const cacheFile = (pathname: string) => {
  let p = decodeURIComponent(pathname.split('?')[0])
  if (p.endsWith('/') || p === '') p += 'index.html'
  return join(CACHE, p)
}

// --- server-side session ---------------------------------------------------
let session = '' // value of the device TOKEN cookie

async function login(): Promise<void> {
  if (!CREDS.pass) { console.log('  ! no UNIFI_PASS in .env — auto-login disabled'); return }
  try {
    const r = await fetch(DEVICE + '/api/auth/login', {
      method: 'POST', tls: TLS,
      headers: { 'content-type': 'application/json', origin: DEVICE_ORIGIN },
      body: JSON.stringify({ username: CREDS.user, password: CREDS.pass, rememberMe: true })
    } as any)
    const tok = (r.headers.getSetCookie?.() ?? [])
      .map((c) => c.match(/^TOKEN=([^;]+)/)).find(Boolean) as RegExpMatchArray | undefined
    if (r.ok && tok) { session = tok[1]; console.log('  ✓ auto-logged in') }
    else console.log(`  ! auto-login failed (HTTP ${r.status})`)
  } catch (e) { console.log('  ! auto-login error:', (e as Error).message) }
}

// Ensure the forwarded Cookie header carries our session TOKEN.
function withToken(cookie: string | null): string {
  const parts = (cookie || '').split(/;\s*/).filter((c) => c && !/^TOKEN=/.test(c))
  if (session) parts.push('TOKEN=' + session)
  return parts.join('; ')
}

function relayHeaders(src: Headers): Headers {
  const h = new Headers()
  for (const [k, v] of src) {
    const key = k.toLowerCase()
    // Auth is server-side; drop cookies + transport/security headers.
    if (['content-encoding', 'content-length', 'transfer-encoding', 'connection',
         'strict-transport-security', 'content-security-policy', 'set-cookie'].includes(key)) continue
    h.set(k, v)
  }
  return h
}

// Forward to the device with the injected token; re-login + retry once on 401.
async function forward(req: Request, pathname: string): Promise<Response> {
  const search = new URL(req.url).search || ''
  const target = DEVICE + pathname + search
  const body = req.method !== 'GET' && req.method !== 'HEAD' ? await req.arrayBuffer() : undefined

  const doFetch = async () => {
    const headers = new Headers(req.headers)
    headers.set('host', new URL(DEVICE).host)
    headers.set('cookie', withToken(req.headers.get('cookie')))
    if (headers.has('origin')) headers.set('origin', DEVICE_ORIGIN)
    if (headers.has('referer')) headers.set('referer', DEVICE_ORIGIN + pathname)
    headers.delete('accept-encoding')
    return fetch(target, { method: req.method, headers, body, tls: TLS, redirect: 'manual' } as any)
  }

  let resp = await doFetch()
  if (resp.status === 401 && CREDS.pass) { await login(); resp = await doFetch() }
  const buf = await resp.arrayBuffer()
  return new Response(buf, { status: resp.status, headers: relayHeaders(resp.headers) })
}

const server = Bun.serve({
  port: PORT,
  idleTimeout: 120,
  async fetch(req, srv) {
    if (req.headers.get('upgrade')?.toLowerCase() === 'websocket') {
      const u = new URL(req.url)
      const target = DEVICE_ORIGIN.replace('https', 'wss') + u.pathname + u.search
      const ok = srv.upgrade(req, { data: { target, cookie: withToken(req.headers.get('cookie')) } })
      if (ok) return
      return new Response('upgrade failed', { status: 500 })
    }

    const { pathname } = new URL(req.url)

    if (req.method !== 'GET' || isDynamic(pathname) || !isStaticAsset(pathname)) {
      try { return await forward(req, pathname) }
      catch (e) { return new Response('proxy error: ' + (e as Error).message, { status: 502 }) }
    }

    const file = cacheFile(pathname)
    const ext = extname(file)
    if (existsSync(file)) {
      return new Response(await readFile(file), { headers: { 'content-type': MIME[ext] || 'application/octet-stream' } })
    }
    try {
      const resp = await forward(req, pathname)
      if (resp.status === 200) {
        const buf = Buffer.from(await resp.clone().arrayBuffer())
        await mkdir(dirname(file), { recursive: true }).catch(() => {})
        await writeFile(file, buf).catch(() => {})
        console.log(`  ↓ cached ${pathname} (${(buf.length / 1024).toFixed(0)} KB)`)
      }
      return resp
    } catch (e) {
      return new Response('proxy error: ' + (e as Error).message, { status: 502 })
    }
  },
  websocket: {
    open(ws) {
      const { target, cookie } = ws.data as { target: string; cookie: string }
      const queue: any[] = []
      const dev = new WebSocket(target, { headers: { cookie, origin: DEVICE_ORIGIN }, tls: TLS } as any)
      dev.binaryType = 'arraybuffer'
      ;(ws.data as any).dev = dev
      ;(ws.data as any).queue = queue
      dev.onopen = () => { for (const m of queue) dev.send(m); queue.length = 0 }
      dev.onmessage = (e: any) => { try { ws.send(e.data instanceof ArrayBuffer ? new Uint8Array(e.data) : e.data) } catch {} }
      dev.onclose = () => { try { ws.close() } catch {} }
      dev.onerror = () => { try { ws.close() } catch {} }
    },
    message(ws, msg) {
      const dev = (ws.data as any).dev as WebSocket
      if (dev?.readyState === 1) dev.send(msg as any)
      else (ws.data as any).queue.push(msg)
    },
    close(ws) { try { ((ws.data as any).dev as WebSocket)?.close() } catch {} }
  }
})

console.log(`› UniFi OS mirror proxy → ${DEVICE}`)
await login()
console.log(`› open http://localhost:${server.port}  (no login needed)`)
