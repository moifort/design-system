# Design System

A foundation design system for shipping **beautiful apps out of the box** — web,
mobile, and embedded screens — from one pixel-perfect, multi-theme component library.

Every future app stands on this base instead of starting from scratch: the components,
themes, and visual language are already polished, production-grade, and validated.

## Preview

The same component renders across mediums from a single source of truth. Example — the
Gateway status card on a Waveshare 4-colour e-ink panel:

![Gateway card rendered on a 4-colour e-ink panel](storybook/src/assets/eink/gateway-card.eink.png)

▶︎ **Live, interactive previews:** the full Storybook (all components, `light` / `dark`
/ `eink` themes) is published to GitHub Pages → **https://moifort.github.io/design-system/**

## What it does

- **Component library, Atomic Design** — shifted one rung so the tier names match how the
  system is built: foundations → atoms → molecules → organisms, composed into complete
  screens. Reverse-engineered pixel-for-pixel from a best-in-class network console UI.
- **Multi-theme from day one** — `light` and `dark` for screens, `eink` for 4-colour
  embedded panels. Components read every colour and font from the theme, so the *same*
  code renders natively across web, mobile, and embedded displays.
- **Pixel-perfect, always** — each component is validated in Storybook against the
  reference console, so what you see is exactly the real thing.
- **Portable** — hard-coded mock data, no backend; drop components into any React app.

The Storybook is split into two sections: **Design System** (foundations) and
**Components** (the building blocks, by Atomic Design level).

### Design System (foundations)

The minuscule primitives — the truly indivisible building blocks — plus the colour tokens.

- **Colours** — the full palette in the *Design System → Colors* story: the primary blue
  scale, the supporting primitive hues and neutral greys (each in `light` + `dark`), and the
  semantic tokens components read from the theme. Typed source of truth in
  `storybook/src/styles/palette.ts`.
- **Primitives** — `Surface`, `Text`, `Icon`, `Divider`, `Sparkline`.

### Components today

Generic, reusable names (not domain-specific), each with its own story — a single tri-theme
gallery showing all its declinations (variants, tones, sizes, states, data shapes) side by
side on `light` / `dark` / `eink`.

- **Organisms** — `GatewayCard` (gateway/router status card: device identity, throughput
  sparkline, counters, latency, uplink stats).
- **Molecules** — reserved for card-composition patterns (coming next).
- **Atoms** — `Header`, `CounterGroup`, `DataRow`, `MetricPair`, `ChipGroup`, and `Button`
  (full variant system: primary · secondary · tertiary · link, with tones, sizes and states).

## Structure

- `storybook/` — the React + styled-components component library and its Storybook.

> Build, run, theming, and contribution rules live in [`CLAUDE.md`](CLAUDE.md).
