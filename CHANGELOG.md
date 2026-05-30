# Changelog

All notable changes to this project are documented here.
Format based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/).
This project does not (yet) use semantic version tags.

## [Unreleased]

### Added
- Initial **Design System** foundation — a reusable component library for shipping
  beautiful apps out of the box across web, mobile, and embedded screens.
- `storybook/` — React + styled-components component library (Atomic Design: atoms →
  molecules → organisms), validated in Storybook and published to GitHub Pages via
  `.github/workflows/storybook.yml`. Multi-theme: `light`, `dark`, `eink`.
- `base/` — caching reverse proxy mirroring the live reference console, used as the
  pixel-perfect ground truth components are rebuilt against.
- First component: `GatewayCard` (gateway status card) in `light`, `dark`, and `eink`.
