# Atom declinations — design

**Date:** 2026-05-30
**Scope:** Add the genuine declinations of every component in the `Components/Atoms`
tier, reverse-engineered from the UniFi reference. Plan all atoms up front; implement
incrementally (one atom per commit).

## Guiding principle

The reference only has a real *primary/secondary/…* variant system for **Button**. The other
atoms have a thin variant surface — their real declinations are **states / tones / optional
parts / sizes**, not a forced primary/secondary axis. We expose the declinations that
actually exist; we do not invent a primary/secondary for components that have none. Every
colour/font/size still reads from `props.theme` (light · dark · eink).

Each atom's story is a single tri-theme `ThemeShowcase` (per `storybook/CLAUDE.md`), with a
labelled `Specimen` per declination.

## 1. Button — full reference variant system

New props (added to the existing `icon?` + `label`):

| prop | values | default |
|---|---|---|
| `variant` | `primary` \| `secondary` \| `tertiary` \| `link` | `primary` |
| `tone` | `default` \| `danger` | `default` |
| `size` | `small` \| `medium` \| `large` | `medium` |
| `disabled` | boolean | `false` |

Visual rules (all theme-driven; accent = `theme.color.link`, danger = `theme.color.danger`):

- **primary** — solid accent background, white label + icon.
- **secondary** — transparent background, 1px accent border, accent text *(today's button)*.
- **tertiary** — transparent, no border, accent text, faint `theme.color.fill` hover.
- **link** — inline text style, no box/height/padding, accent text.
- **tone=danger** — swaps accent → danger for the variant's fill/border/text.
- **sizes** — small ≈ 28px, medium = 32px (current), large ≈ 40px; horizontal padding and
  font scale with height. Exact px tuned against Storybook + reference.
- **disabled** — muted (reduced opacity) + `cursor: not-allowed`, no hover.

Migration: default is `primary`, so the two GatewayCard buttons are set explicitly to
`variant="secondary"` to preserve their current appearance.

Story: a grid of variant × tone, the three sizes, an icon/no-icon pair, and disabled.

## 2. Header — optional parts

No primary/secondary. Declinations are the optional slots:

- `thumbnail?` — product logo present, or title-only when absent.
- `trailing?` — circular action button present or absent.

Story: full (logo + title + action), title-only, no-action.

## 3. CounterGroup — faithful connector pattern

The reference draws the **first connector solid, the rest dotted**, both in the accent
colour (we currently render all dotted). Implement that pattern as the default.

Story: 2 / 3 / 4 counters, showing the solid-first / dotted-rest accent connectors.

## 4. ChipGroup — count + logo-optional

- Declinations: 2 / 3 / 4 chips.
- `logo?` becomes optional → a value-only chip when absent.

(No selected/active state found in the reference.)

Story: the chip counts and a logo / value-only pair.

## 5. DataRow — showcase existing real declinations

Props are already rich (`labelTone`, `valueTone`, `trailing`, node `label`/`value`). No new
props; the story shows the real declinations:

- plain label/value,
- with a trailing status icon,
- value tones success / danger / link,
- node label (logo + link) and node value (e.g. a `MetricPair`).

## 6. MetricPair — showcase only

Very thin surface. No new prop. Story shows a few magnitudes; the arrow→triangle eink
swap is already theme-driven. (Revisit a `size` prop only if a real use appears.)

## Build sequence (one commit each)

1. Button variant system + GatewayCard migration + story.
2. Header optional parts + story.
3. CounterGroup connector pattern + story.
4. ChipGroup logo-optional + story.
5. DataRow story (declination showcase).
6. MetricPair story (magnitude showcase).

Each step: `bunx tsc --noEmit` + visual check in Storybook (Safari) before commit. CHANGELOG
/ README deferred to push time per project rules.
