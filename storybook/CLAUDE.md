# storybook — Design System component library

Vite + React + TypeScript + styled-components, reverse-engineered from the real reference
console (served by `../base`). Atomic Design (atoms → molecules → organisms),
Storybook as the pixel-perfect validation harness. Hard-coded mock data, no backend.

## Workflow rules

- **Storybook → Safari (automatic):** whenever a change touches the UI, open Storybook in
  Safari so the user can see the result — run `open -a Safari http://localhost:6006` (start
  Storybook first with `bun run storybook` if it isn't already up). Do this automatically
  after every visual change, without being asked.
- Typecheck with `bunx tsc --noEmit` before committing.
- Themes: `light` / `dark` (web) and `eink` (Waveshare 4-color panel). Components read all
  colours/fonts from `props.theme` — adapt via `theme.mode` only where the medium requires it.
- Regenerate the e-ink panel PNG with `bun run eink` after changing the GatewayCard.
