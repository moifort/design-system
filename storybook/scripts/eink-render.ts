/**
 * Capture the e-ink *source* story (the GatewayCard in the eink theme) at the panel's
 * native resolution — NO deviceScaleFactor, with subpixel/LCD text disabled so the
 * screenshot already matches the e-paper's crisp, non-antialiased look. The PNG is then
 * handed to eink_convert.py (Pillow) for the real panel quantization.
 *
 * Run with Storybook up: `bun run scripts/eink-render.ts`
 */
import { chromium } from "playwright";
import { mkdirSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const SB = process.env.SB ?? "http://localhost:6006";
const STORY = "components-organisms-gatewaycard-e-ink--source";
const here = dirname(fileURLToPath(import.meta.url));
const out = join(here, "reference", "eink-source.png");
mkdirSync(join(here, "reference"), { recursive: true });

const browser = await chromium.launch({
  args: ["--disable-lcd-text", "--disable-font-subpixel-positioning", "--font-render-hinting=none"],
});
const page = await browser.newPage({ viewport: { width: 700, height: 900 }, deviceScaleFactor: 1 });

const url = `${SB}/iframe.html?id=${STORY}&viewMode=story&globals=theme:eink`;
await page.goto(url, { waitUntil: "networkidle", timeout: 60_000 });
await page.getByText("Gateway IP").first().waitFor({ timeout: 30_000 });
await page.waitForTimeout(1500);

const card = page.locator("#storybook-root > div > *").first();
await card.screenshot({ path: out });
console.log(`✓ wrote ${out}`);

await browser.close();
