# Changelog

All notable changes to this project are documented here.
Format based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/).
This project does not (yet) use semantic version tags.

## [Unreleased]

### Added
- **Component stories for every atom and molecule** of the GatewayCard, each a single
  tri-theme gallery (light · dark · e-ink) listing the component's declinations:
  - Atoms — `Surface`, `Text` (7 tones + `$strong`), `Icon` (all 10 glyphs, sizes,
    `currentColor` tints), `Divider`, `Sparkline` (realistic / ramp / spiky / flat).
  - Molecules — `Header`, `CounterGroup`, `DataRow`, `MetricPair`, `ChipGroup`, `Button`
    (generic, reusable names — not domain-specific).
  - New `src/styles/Showcase.tsx` helper (`Stack` / `Row` / `Frame` / `Specimen`) for
    laying out labelled specimens inside a `ThemeShowcase`.
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
- **Sidebar split into two sections**: `Design System` (foundations — colours) and
  `Components` (`Components/Organisms → Components/Molecules → Components/Atoms`). Molecule
  components renamed to generic, reusable names: `DeviceHeader → Header`,
  `ActionButton → Button`, `StatRow → DataRow`, `ConnectionCounts → CounterGroup`,
  `Throughput → MetricPair`, `LatencyRow → ChipGroup`.
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

### Added
- Initial **Design System** foundation — a reusable component library for shipping
  beautiful apps out of the box across web, mobile, and embedded screens.
- `storybook/` — React + styled-components component library (Atomic Design: atoms →
  molecules → organisms), validated in Storybook and published to GitHub Pages via
  `.github/workflows/storybook.yml`. Multi-theme: `light`, `dark`, `eink`.
- `base/` — caching reverse proxy mirroring the live reference console, used as the
  pixel-perfect ground truth components are rebuilt against.
- First component: `GatewayCard` (gateway status card) in `light`, `dark`, and `eink`.
