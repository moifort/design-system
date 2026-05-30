# UniFi OS local mirror (run-as-is, no migration, no login)

Runs the **real, unmodified UniFi OS web app** (React/Angular bundles, exactly as
shipped by the device) from `http://localhost` — no rewrite, no Nuxt, and **no
login screen**.

## How it works
`serve.ts` is a caching reverse proxy in front of the device (`https://192.168.1.1`):

- **Server-side auto-login** — on startup the proxy logs into the device (creds
  from `.env`), holds the `TOKEN`, and injects it into every request it forwards
  (HTTP + WebSocket). The browser needs no auth cookie, so the app opens straight
  on the dashboard. On a `401` the proxy re-logs-in and retries.
- **Static asset** (hashed `*.js/*.css/*.woff2/*.png/*.svg/*.json`) → served from
  `cache/` if present, else fetched from the device, returned **and cached**. The
  mirror grows toward 100% of the code as you browse.
- **App routes / HTML** (`/`, `/network/…`) → always live (fresh bootstrap).
- **API** (`/api`, `/proxy`, …) → proxied live, never cached.
- **WebSocket** → bridged to the device (with the injected token) for live telemetry.

Because auth is handled server-side, the device's `Secure; SameSite=None;
Partitioned` cookie never has to reach the browser — so this serves over **plain
HTTP**, no HTTPS / self-signed cert needed.

The app is client-side rendered and talks to the device's REST + WS API, so the
device must be reachable on the LAN while running.

## Run
```bash
cp .env.example .env     # fill in UNIFI_PASS
bun run serve            # → http://localhost:8443  (no login)
```
Env: `UNIFI_HOST` (default `https://192.168.1.1`), `UNIFI_USER` (default `local`),
`UNIFI_PASS`, `PORT` (default `8443`).

## Notes
- `cache/` and `.env` are gitignored — proprietary Ubiquiti bundles and credentials
  are never committed.
- Lazy React chunks load on demand (opening a modal, a settings sub-tab…); the proxy
  caches each the first time it is hit. The device fallback means the app always
  works even for not-yet-cached code.
- Mutations (changing settings) flow through with the device's CSRF token, but this
  is intended primarily as a read/run mirror of the live console.
```
