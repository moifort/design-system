# Design System — agent instructions

Process and "how" documentation for AI agents. The `README.md` is functional/visual
(what the project does + previews); **everything procedural lives here.**

**Design System** is a foundation component library: a reusable base every future app
(web, mobile, embedded) builds on so it ships polished out of the box. Components are
reverse-engineered pixel-for-pixel from a best-in-class network console UI and validated
in Storybook.

## Layout

- `storybook/` — Vite + React + TypeScript + styled-components component library, Atomic
  Design shifted one rung (foundations → atoms → molecules → organisms; primitives live in
  the `Design System` section), Storybook as the validation harness. Published to GitHub
  Pages via `.github/workflows/storybook.yml`. See `storybook/CLAUDE.md` for the taxonomy
  and component-level rules. **This is the guide** — the only tracked, shipped part.
- `base/` — **local-only, gitignored** caching reverse proxy that mirrors the live UniFi
  console (server-side auto-login, plain HTTP). It is the inspiration cache used as the
  pixel-perfect reference while rebuilding components — a developer tool, **not part of
  the guide** and never committed.

## Run / build

```bash
# Component library + Storybook
cd storybook && bun install
bun run storybook        # dev → http://localhost:6006
bun run build-storybook  # static build → storybook/storybook-static
bunx tsc --noEmit        # typecheck

# Live reference mirror
cd base && cp .env.example .env   # fill in credentials
bun run serve            # → http://localhost:8443
```

## Before committing each change (MANDATORY)

Do these, in order, before considering any change done:

1. **Typecheck** — `cd storybook && bunx tsc --noEmit` must pass.
2. **Visual check** — for any UI change, open Storybook in Safari so the result is
   visible (`open -a Safari http://localhost:6006`; start `bun run storybook` first if
   needed). Do this automatically, without being asked.
3. **Commit** the code change — conventional commits (`type(scope): description`), English.

Do **not** touch `CHANGELOG.md` / `README.md` per change, and do **not** regroup/rewrite
commits as you go. Those are deferred to push time (below).

## Before pushing — ONLY when the user asks to push (MANDATORY)

`CHANGELOG.md`, `README.md`, and commit-history cleanup are done **only** when the user
explicitly asks to push to the GitHub repo — never as a routine per-change step:

1. **Update `CHANGELOG.md`** — fold all unpushed work under `[Unreleased]`, Keep a Changelog
   format (`Added` / `Changed` / `Fixed` / `Removed`).
2. **Update `README.md`** — bring it in sync with the unpushed work (functional + previews
   only; no process).
3. **Regroup local commits by theme** — fold the unpushed commits into atomic,
   theme-coherent commits. A rollback merges back into the fix it reverts; WIP/fixup noise
   is squashed. Stay atomic, but not over-split — one logical change per commit. History
   rewrite is safe while the work is unpushed (`git rev-parse @{u}` to verify first).
4. Then push (the user decides when — never push without explicit confirmation).

## Theming

Components must read every colour and font from `props.theme`. Supported modes: `light`,
`dark` (web), `eink` (Waveshare 4-colour panel). Branch on `theme.mode` only where the
medium genuinely requires it. Regenerate the e-ink panel PNG with `bun run eink` after
changing the GatewayCard.
