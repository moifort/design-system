/**
 * Colour palette — typed source of truth for the Design System docs.
 *
 * The raw values live in `styles/tokens.css`, extracted verbatim from the live UniFi
 * console. This module mirrors the **primitive scales** (the raw hues) and the
 * **semantic aliases** (the roles `theme.ts` maps onto them) as typed data, so the
 * `Design System / Colors` page can render swatches with real values and future
 * foundations (typography, spacing…) have a structured reference to grow from.
 *
 * Values are duplicated from `tokens.css` on purpose: `base/` is a frozen reference
 * cache, so drift is unlikely — keep this file in sync if the console is re-extracted.
 */

/** One position on a colour scale, with its light- and dark-mode value. */
export type PaletteStep = {
  /** scale position, e.g. `"06"` */
  step: string;
  /** light-mode value (matches `--desktop-color-<token>-<step>`) */
  light: string;
  /** dark-mode value (matches `--desktop-color-<token>-<step>-dark`) */
  dark: string;
};

/** A primitive colour family: a named hue with a full tonal scale. */
export type PaletteFamily = {
  /** display name, e.g. `"Blue"` */
  name: string;
  /** token prefix in `tokens.css`, e.g. `"ublue"` */
  token: string;
  /** one-line description of the family's role */
  description: string;
  /** the canonical brand / base step, highlighted in the docs (e.g. `"06"`) */
  brandStep?: string;
  steps: PaletteStep[];
};

/** A semantic token: a role-named alias `theme.ts` resolves onto a primitive. */
export type SemanticToken = {
  /** key in `AppTheme.color`, e.g. `"link"` */
  name: string;
  /** when to use it */
  role: string;
  /** the primitive it aliases (e.g. `"ublue-06"`) or `"derived"` for alpha blends */
  source: string;
  light: string;
  dark: string;
};

const s = (step: string, light: string, dark: string): PaletteStep => ({ step, light, dark });

/**
 * The primary family — UniFi's signature blue. `06` is the brand colour
 * (`hsla(214, 100%, 50%)` ≈ `#006EFF`), used for links and primary actions.
 */
export const PRIMARY: PaletteFamily = {
  name: "Blue",
  token: "ublue",
  description: "Primary brand colour — links, primary actions, focus.",
  brandStep: "06",
  steps: [
    s("01", "hsla(214, 100%, 95%, 1)", "hsla(213, 88%, 16%, 1)"),
    s("02", "hsla(214, 100%, 90%, 1)", "hsla(215, 88%, 26%, 1)"),
    s("03", "hsla(214, 100%, 80%, 1)", "hsla(215, 88%, 36%, 1)"),
    s("04", "hsla(214, 100%, 70%, 1)", "hsla(214, 88%, 45%, 1)"),
    s("05", "hsla(214, 100%, 60%, 1)", "hsla(214, 88%, 55%, 1)"),
    s("06", "hsla(214, 100%, 50%, 1)", "hsla(214, 100%, 64%, 1)"),
    s("07", "hsla(214, 100%, 40%, 1)", "hsla(214, 100%, 75%, 1)"),
    s("08", "hsla(214, 100%, 33%, 1)", "hsla(214, 100%, 85%, 1)"),
    s("09", "hsla(214, 100%, 25%, 1)", "hsla(214, 100%, 90%, 1)"),
    s("10", "hsla(214, 100%, 17%, 1)", "hsla(214, 100%, 95%, 1)"),
  ],
};

/**
 * The supporting primitive hues. Each `06` step is the family's base, aliased by a
 * semantic token (see {@link SEMANTIC}). `neutral` carries the surfaces and text greys
 * and runs `00 → 12`.
 */
export const PRIMITIVES: PaletteFamily[] = [
  {
    name: "Green",
    token: "green",
    description: "Positive status — success, upward / healthy values.",
    brandStep: "06",
    steps: [
      s("01", "hsla(138, 60%, 95%, 1)", "hsla(138, 55%, 16%, 1)"),
      s("02", "hsla(138, 60%, 90%, 1)", "hsla(138, 55%, 22%, 1)"),
      s("03", "hsla(138, 60%, 81%, 1)", "hsla(138, 55%, 29%, 1)"),
      s("04", "hsla(138, 59%, 71%, 1)", "hsla(138, 55%, 35%, 1)"),
      s("05", "hsla(138, 59%, 61%, 1)", "hsla(138, 55%, 41%, 1)"),
      s("06", "hsla(138, 59%, 51%, 1)", "hsla(138, 55%, 48%, 1)"),
      s("07", "hsla(138, 56%, 41%, 1)", "hsla(138, 55%, 64%, 1)"),
      s("08", "hsla(138, 56%, 33%, 1)", "hsla(138, 55%, 72%, 1)"),
      s("09", "hsla(138, 57%, 25%, 1)", "hsla(138, 55%, 81%, 1)"),
      s("10", "hsla(138, 56%, 18%, 1)", "hsla(138, 55%, 92%, 1)"),
    ],
  },
  {
    name: "Aqua",
    token: "aqua",
    description: "Cool data accent — download throughput.",
    brandStep: "06",
    steps: [
      s("01", "hsla(198, 100%, 96%, 1)", "hsla(198, 55%, 19%, 1)"),
      s("02", "hsla(198, 100%, 93%, 1)", "hsla(198, 55%, 27%, 1)"),
      s("03", "hsla(198, 97%, 85%, 1)", "hsla(198, 55%, 35%, 1)"),
      s("04", "hsla(198, 98%, 78%, 1)", "hsla(198, 55%, 43%, 1)"),
      s("05", "hsla(198, 97%, 71%, 1)", "hsla(198, 65%, 54%, 1)"),
      s("06", "hsla(198, 98%, 63%, 1)", "hsla(198, 70%, 64%, 1)"),
      s("07", "hsla(198, 58%, 51%, 1)", "hsla(198, 66%, 70%, 1)"),
      s("08", "hsla(198, 56%, 41%, 1)", "hsla(198, 59%, 77%, 1)"),
      s("09", "hsla(198, 57%, 32%, 1)", "hsla(198, 50%, 84%, 1)"),
      s("10", "hsla(198, 56%, 22%, 1)", "hsla(198, 51%, 92%, 1)"),
    ],
  },
  {
    name: "Purple",
    token: "purple",
    description: "Warm data accent — upload throughput.",
    brandStep: "06",
    steps: [
      s("01", "hsla(273, 70%, 96%, 1)", "hsla(272, 54%, 24%, 1)"),
      s("02", "hsla(273, 71%, 92%, 1)", "hsla(273, 55%, 32%, 1)"),
      s("03", "hsla(273, 72%, 84%, 1)", "hsla(273, 55%, 40%, 1)"),
      s("04", "hsla(273, 72%, 76%, 1)", "hsla(273, 55%, 47%, 1)"),
      s("05", "hsla(273, 73%, 69%, 1)", "hsla(273, 55%, 58%, 1)"),
      s("06", "hsla(273, 72%, 61%, 1)", "hsla(274, 60%, 68%, 1)"),
      s("07", "hsla(273, 47%, 49%, 1)", "hsla(273, 50%, 75%, 1)"),
      s("08", "hsla(273, 47%, 39%, 1)", "hsla(273, 50%, 82%, 1)"),
      s("09", "hsla(273, 47%, 30%, 1)", "hsla(273, 50%, 89%, 1)"),
      s("10", "hsla(273, 46%, 21%, 1)", "hsla(273, 52%, 95%, 1)"),
    ],
  },
  {
    name: "Red",
    token: "red",
    description: "Negative status — errors, downward / critical values.",
    brandStep: "06",
    steps: [
      s("01", "hsla(357, 82%, 96%, 1)", "hsla(357, 51%, 16%, 1)"),
      s("02", "hsla(359, 86%, 92%, 1)", "hsla(358, 50%, 24%, 1)"),
      s("03", "hsla(358, 86%, 83%, 1)", "hsla(358, 50%, 38%, 1)"),
      s("04", "hsla(359, 86%, 75%, 1)", "hsla(358, 50%, 48%, 1)"),
      s("05", "hsla(358, 86%, 67%, 1)", "hsla(358, 65%, 59%, 1)"),
      s("06", "hsla(359, 86%, 58%, 1)", "hsla(358, 80%, 66%, 1)"),
      s("07", "hsla(358, 61%, 47%, 1)", "hsla(358, 80%, 78%, 1)"),
      s("08", "hsla(359, 61%, 38%, 1)", "hsla(358, 91%, 87%, 1)"),
      s("09", "hsla(359, 61%, 29%, 1)", "hsla(357, 90%, 92%, 1)"),
      s("10", "hsla(358, 62%, 20%, 1)", "hsla(0, 90%, 96%, 1)"),
    ],
  },
  {
    name: "Neutral",
    token: "neutral",
    description: "Greys — surfaces (00 → 02) and text (08 → 12).",
    steps: [
      s("00", "hsla(0, 0%, 100%, 1)", "hsla(214, 8%, 8%, 1)"),
      s("01", "hsla(214, 8%, 98%, 1)", "hsla(214, 8%, 12%, 1)"),
      s("02", "hsla(214, 8%, 96%, 1)", "hsla(214, 8%, 17%, 1)"),
      s("03", "hsla(214, 8%, 94%, 1)", "hsla(214, 8%, 22%, 1)"),
      s("04", "hsla(214, 8%, 88%, 1)", "hsla(214, 8%, 28%, 1)"),
      s("05", "hsla(214, 8%, 82%, 1)", "hsla(214, 8%, 34%, 1)"),
      s("06", "hsla(214, 8%, 78%, 1)", "hsla(214, 8%, 49%, 1)"),
      s("07", "hsla(214, 8%, 65%, 1)", "hsla(214, 8%, 63%, 1)"),
      s("08", "hsla(214, 8%, 54%, 1)", "hsla(214, 8%, 74%, 1)"),
      s("09", "hsla(214, 8%, 44%, 1)", "hsla(214, 8%, 81%, 1)"),
      s("10", "hsla(214, 8%, 34%, 1)", "hsla(214, 8%, 88%, 1)"),
      s("11", "hsla(214, 8%, 25%, 1)", "hsla(214, 8%, 93%, 1)"),
      s("12", "hsla(214, 8%, 14%, 1)", "hsla(214, 8%, 98%, 1)"),
    ],
  },
];

/**
 * The semantic layer — the role-named tokens components actually read from
 * `props.theme.color`. Each resolves onto a primitive step (or an alpha blend for the
 * structural greys), mirroring `createTheme()` in `theme.ts`.
 */
export const SEMANTIC: SemanticToken[] = [
  { name: "textPrimary", role: "Primary text, headings & values", source: "text-1", light: "hsla(214, 8%, 14%, 1)", dark: "hsla(214, 8%, 98%, 1)" },
  { name: "textLabel", role: "Secondary labels", source: "text-2", light: "hsla(214, 8%, 34%, 1)", dark: "hsla(214, 8%, 88%, 1)" },
  { name: "textValue", role: "Muted / tertiary text", source: "text-3", light: "hsla(214, 8%, 54%, 1)", dark: "hsla(214, 8%, 74%, 1)" },
  { name: "link", role: "Links & primary actions", source: "ublue-06", light: "hsla(214, 100%, 50%, 1)", dark: "hsla(214, 100%, 64%, 1)" },
  { name: "success", role: "Positive / up status", source: "green-06", light: "hsla(138, 59%, 51%, 1)", dark: "hsla(138, 55%, 48%, 1)" },
  { name: "download", role: "Download throughput", source: "aqua-06", light: "hsla(198, 98%, 63%, 1)", dark: "hsla(198, 70%, 64%, 1)" },
  { name: "upload", role: "Upload throughput", source: "purple-06", light: "hsla(273, 72%, 61%, 1)", dark: "hsla(274, 60%, 68%, 1)" },
  { name: "danger", role: "Errors & negative values", source: "red-06", light: "hsla(359, 86%, 58%, 1)", dark: "hsla(358, 80%, 66%, 1)" },
  { name: "surface", role: "Card / surface background", source: "neutral-00", light: "hsla(0, 0%, 100%, 1)", dark: "hsla(214, 8%, 8%, 1)" },
  { name: "pageBg", role: "Page background", source: "neutral-02", light: "hsla(214, 8%, 96%, 1)", dark: "hsla(214, 8%, 17%, 1)" },
  { name: "border", role: "Hairline dividers", source: "derived", light: "hsla(214, 8%, 14%, 0.07)", dark: "hsla(214, 8%, 98%, 0.07)" },
  { name: "fill", role: "Inset pill fills", source: "derived", light: "hsla(214, 8%, 98%, 0.6)", dark: "hsla(214, 8%, 98%, 0.05)" },
];
