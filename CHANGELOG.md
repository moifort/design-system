# Changelog

All notable changes to this project are documented here.
Format based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/).
This project does not (yet) use semantic version tags.

## [Unreleased]

### Added
- **A story for every component**, each a single tri-theme gallery (light · dark · e-ink)
  listing the component's declinations:
  - Foundations (`Design System` section) — `Surface`, `Text` (7 tones + `$strong`), `Icon`
    (all 10 glyphs, sizes, `currentColor` tints), `Divider`, `Sparkline`
    (realistic / ramp / spiky / flat).
  - Atoms — `Header`, `CounterGroup`, `DataRow`, `MetricPair`, `ChipGroup`, `Button`
    (generic, reusable names — not domain-specific).
  - New `src/styles/Showcase.tsx` helper (`Stack` / `Row` / `Frame` / `Specimen`) for
    laying out labelled specimens inside a `ThemeShowcase`.
- **Component declinations**, reverse-engineered from the reference:
  - `Button` — full variant system: `variant` (primary · secondary · tertiary · link),
    `tone` (default · danger), `size` (small · medium · large), plus `disabled` and
    `fullWidth`.
  - `Header` — optional `thumbnail` (title-only when omitted) and `action` toggle for the
    trailing detail button; the brand asset is no longer baked into the component.
  - `ChipGroup` — `logo` is optional, for value-only chips.
- **Design System / Colors** page (`Design System/Colors` story) documenting the colour
  foundation: the primary blue scale, the supporting primitive hues (green, aqua, purple,
  red) and the neutral greys — each shown `light` + `dark` — plus the semantic tokens
  (`link`, `success`, `danger`, `textPrimary`…) and the primitive they alias. Backed by a
  typed source of truth, `src/styles/palette.ts`, extracted from `tokens.css`. The new
  **Design System** section sorts first in the sidebar.
- Storybook **Docs**: `autodocs` enabled so every component gets an auto-generated Docs
  tab (prose + props table + showcase), plus MDX support wired up (`../src/**/*.mdx` glob)
  for hand-written doc pages.
- `ThemeShowcase` harness — renders a component across all three target screens (light,
  dark, e-ink) side by side. Convention: one story per component, every medium at once.

### Changed
- **Taxonomy shifted one rung** so the tier names match how the system is built: the
  minuscule primitives (`Surface`, `Text`, `Icon`, `Divider`, `Sparkline`) move to a
  `foundations/` folder under the **`Design System`** section (with `Colors`); the former
  molecules (`Header`, `CounterGroup`, `DataRow`, `MetricPair`, `ChipGroup`, `Button`)
  become the **`Atoms`** tier; `Molecules` is reserved for card-composition patterns;
  organisms unchanged. Components also renamed to generic, reusable names:
  `DeviceHeader → Header`, `ActionButton → Button`, `StatRow → DataRow`,
  `ConnectionCounts → CounterGroup`, `Throughput → MetricPair`, `LatencyRow → ChipGroup`.
- `CounterGroup` — the first connector between counters is now a solid accent line and the
  rest dotted (was all-dotted), matching the reference.
- `GatewayCard` — its two action buttons are pinned to `variant="secondary"` + `fullWidth`
  to preserve their look now that `Button` defaults to `primary`.
- `GatewayCard` stories collapsed into a single `Themes` story (light · dark · e-ink,
  left → right) via `ThemeShowcase`, replacing the per-theme `Default` / `Dark` stories
  and the separate e-ink stories file.
- Excluded `base/` from the guide: the UniFi console mirror is now a local-only,
  gitignored inspiration cache (a developer reference tool), no longer tracked or shipped.
  The guide is `storybook/` alone.
- Bumped the GitHub Pages workflow actions to their Node 24 majors
  (`checkout@v6`, `configure-pages@v6`, `upload-pages-artifact@v5`,
  `deploy-pages@v5`) to clear the Node 20 deprecation warning.

### Fixed
- `Icon` — removed the grey backing disc from the `clock` glyph; it now renders as
  a clean accent outline, matching the reference history icon.
- `CounterGroup` — connector dots now use the accent colour instead of the neutral
  hairline grey, matching the reference.
- **E-ink render harness** — restored the dedicated capture story and repointed
  `scripts/eink-render.ts` (it referenced a story removed in the stories collapse), so
  `bun run eink` works again and the panel PNG reflects the current GatewayCard.

### Added
- Initial **Design System** foundation — a reusable component library for shipping
  beautiful apps out of the box across web, mobile, and embedded screens.
- `storybook/` — React + styled-components component library (Atomic Design: atoms →
  molecules → organisms), validated in Storybook and published to GitHub Pages via
  `.github/workflows/storybook.yml`. Multi-theme: `light`, `dark`, `eink`.
- `base/` — caching reverse proxy mirroring the live reference console, used as the
  pixel-perfect ground truth components are rebuilt against.
- First component: `GatewayCard` (gateway status card) in `light`, `dark`, and `eink`.
