/**
 * Reverse-engineering extractor.
 *
 * Drives the LIVE UniFi app served by the mirror (http://localhost:8443) with a real
 * browser and dumps faithful references for rebuilding the Gateway card:
 *   1. every CSS custom property the app resolves   -> src/styles/tokens.css
 *   2. the gateway card outerHTML                    -> scripts/reference/gateway-card.html
 *   3. computed styles of the card's key nodes       -> scripts/reference/gateway-card.computed.json
 *   4. a tight screenshot of just the card           -> scripts/reference/gateway-card.png
 *   5. a full-page screenshot (context)              -> scripts/reference/dashboard.png
 *
 * The --desktop-* tokens are injected at runtime (styled-components theme, via
 * adoptedStyleSheets / a wrapper element) and inherit down the tree — they are NOT on
 * :root, so we read getComputedStyle from a deep node inside the card.
 * Run with the mirror up: `bun run extract`.
 */
import { chromium, type Page } from "playwright";
import { mkdirSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const MIRROR = process.env.MIRROR ?? "http://localhost:8443";
const ROUTE = "/network/default/dashboard";
const here = dirname(fileURLToPath(import.meta.url));
const refDir = join(here, "reference");
const tokensOut = join(here, "..", "src", "styles", "tokens.css");
mkdirSync(refDir, { recursive: true });

const browser = await chromium.launch();
const page: Page = await browser.newPage({ viewport: { width: 1600, height: 1000 } });

console.log(`→ opening ${MIRROR}${ROUTE}`);
await page.goto(`${MIRROR}${ROUTE}`, { waitUntil: "networkidle", timeout: 120_000 });
// Wait until the gateway card content is actually on screen.
await page.getByText("Gateway IP", { exact: false }).first().waitFor({ timeout: 60_000 });
await page.waitForTimeout(2500);

// ── 1. Resolve every CSS custom property the app declares (names from all sheets,
//        values read from a deep node so inherited theme vars resolve). ─────────────
const tokens: Record<string, string> = await page.evaluate(() => {
  const names = new Set<string>();
  const collect = (sheets: Iterable<CSSStyleSheet>) => {
    for (const sheet of Array.from(sheets)) {
      let rules: CSSRuleList;
      try {
        rules = sheet.cssRules;
      } catch {
        continue;
      }
      for (const rule of Array.from(rules)) {
        const text = (rule as CSSStyleRule).cssText ?? "";
        for (const m of text.matchAll(/(--[a-zA-Z0-9-]+)\s*:/g)) names.add(m[1]);
        for (const m of text.matchAll(/var\((--[a-zA-Z0-9-]+)/g)) names.add(m[1]);
      }
    }
  };
  collect(document.styleSheets as unknown as Iterable<CSSStyleSheet>);
  // @ts-expect-error adoptedStyleSheets is supported in chromium
  if (document.adoptedStyleSheets) collect(document.adoptedStyleSheets);

  // Deep probe node: anything inside the card. Fall back to body / root.
  const probe =
    (document.evaluate(
      "//*[contains(text(),'Gateway IP')]",
      document,
      null,
      XPathResult.FIRST_ORDERED_NODE_TYPE,
      null,
    ).singleNodeValue as Element) ?? document.body;
  const candidates = [probe, document.body, document.documentElement];
  const out: Record<string, string> = {};
  for (const name of names) {
    for (const el of candidates) {
      const v = getComputedStyle(el).getPropertyValue(name).trim();
      if (v) {
        out[name] = v;
        break;
      }
    }
  }
  return out;
});

const sorted = Object.keys(tokens).sort();
writeFileSync(tokensOut, `:root {\n${sorted.map((k) => `  ${k}: ${tokens[k]};`).join("\n")}\n}\n`);
console.log(`✓ wrote ${sorted.length} tokens → src/styles/tokens.css`);

// ── 2-4. Locate the gateway card: the smallest ancestor of "Gateway IP" that also
//          contains the "ISP Speed Test" action. ───────────────────────────────────
const cardHandle = await page.evaluateHandle(() => {
  // Stable anchor: the left dashboard column (constant class, not a hashed one).
  const panel = document.querySelector('[class*="DASHBOARD_PAGE_PANEL_CONTAINER"]');
  if (!panel) return null;
  // The gateway card is the bordered, rounded card in that column holding "Gateway IP".
  const isCard = (el: Element) => {
    const cs = getComputedStyle(el);
    return parseFloat(cs.borderTopWidth) > 0 && parseFloat(cs.borderTopLeftRadius) > 0;
  };
  for (const el of Array.from(panel.querySelectorAll("*"))) {
    if (el.textContent?.includes("Gateway IP") && isCard(el)) return el;
  }
  return null;
});

const cardEl = cardHandle.asElement();
if (cardEl) {
  const outer = await cardEl.evaluate((n) => (n as Element).outerHTML);
  writeFileSync(join(refDir, "gateway-card.html"), outer);
  console.log(`✓ wrote gateway-card.html (${outer.length} bytes)`);

  // Computed styles for the card + every descendant that carries direct text.
  const computed = await cardEl.evaluate((root) => {
    const PROPS = [
      "display", "flexDirection", "alignItems", "justifyContent", "gap",
      "width", "height", "padding", "paddingTop", "paddingRight", "paddingBottom", "paddingLeft",
      "margin", "marginTop", "marginBottom",
      "backgroundColor", "color", "border", "borderTop", "borderBottom", "borderRadius",
      "boxShadow", "fontFamily", "fontSize", "fontWeight", "lineHeight", "letterSpacing",
      "textTransform", "fontFeatureSettings", "opacity",
    ];
    const snap = (el: Element) => {
      const cs = getComputedStyle(el);
      const o: Record<string, string> = {};
      for (const p of PROPS) o[p] = cs[p as keyof CSSStyleDeclaration] as string;
      return o;
    };
    const result: Array<{ tag: string; cls: string; text: string; style: Record<string, string> }> = [];
    const walk = (el: Element) => {
      const directText = Array.from(el.childNodes)
        .filter((n) => n.nodeType === Node.TEXT_NODE)
        .map((n) => n.textContent?.trim())
        .filter(Boolean)
        .join(" ");
      result.push({
        tag: el.tagName.toLowerCase(),
        cls: (el.getAttribute("class") ?? "").slice(0, 60),
        text: directText.slice(0, 40),
        style: snap(el),
      });
      for (const c of Array.from(el.children)) walk(c);
    };
    walk(root as Element);
    return result;
  });
  writeFileSync(join(refDir, "gateway-card.computed.json"), JSON.stringify(computed, null, 2));
  console.log(`✓ wrote gateway-card.computed.json (${computed.length} nodes)`);

  await cardEl.screenshot({ path: join(refDir, "gateway-card.png") });
  console.log("✓ wrote gateway-card.png");
} else {
  console.warn("⚠ could not locate the gateway card element");
}

await page.screenshot({ path: join(refDir, "dashboard.png"), fullPage: true });
console.log("✓ wrote dashboard.png");

await browser.close();
