# storybook — Design System component library

Vite + React + TypeScript + styled-components, reverse-engineered from the real reference
console (served by `../base`). Atomic Design (atoms → molecules → organisms),
Storybook as the pixel-perfect validation harness. Hard-coded mock data, no backend.

## Stories & docs conventions

- **One story per component, tri-theme.** Render the component inside `ThemeShowcase`
  (`src/styles/ThemeShowcase.tsx`) so it shows on all three screens at once — light, dark,
  e-ink, left → right. No per-theme story duplicates. Set `parameters.themeShowcase: true`
  on the meta so the global theme decorator steps aside.
- **Autodocs everywhere.** `tags: ["autodocs"]` is global — every component gets a Docs
  tab (prose + props table + showcase). MDX is wired up (`../src/**/*.mdx` glob) for
  hand-written doc pages when a component needs more than the auto page.
- **Sidebar order** is `Organisms → Molecules → Atoms` (`options.storySort` in
  `.storybook/preview.tsx`).

## Workflow rules

- **Storybook → Safari (automatic):** whenever a change touches the UI, open Storybook in
  Safari so the user can see the result — run `open -a Safari http://localhost:6006` (start
  Storybook first with `bun run storybook` if it isn't already up). Do this automatically
  after every visual change, without being asked.
- Typecheck with `bunx tsc --noEmit` before committing.
- Themes: `light` / `dark` (web) and `eink` (Waveshare 4-color panel). Components read all
  colours/fonts from `props.theme` — adapt via `theme.mode` only where the medium requires it.
- Regenerate the e-ink panel PNG with `bun run eink` after changing the GatewayCard.
