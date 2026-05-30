/**
 * UniFi theme — semantic aliases that reference the *real* CSS custom properties
 * extracted from the live console (see styles/tokens.css). Every token ships in a
 * `-light` and `-dark` variant, so the theme is built per mode and components read
 * from `props.theme`, resolving to the exact value the device uses.
 *
 * A third mode, `eink`, re-skins the same components for the Waveshare 10.85" 4-color
 * e-paper panel: pure black-on-white, Arial, no anti-aliasing, tabular figures, 1px
 * borders, square corners. Red is reserved for negative values only.
 */
export type ThemeMode = "light" | "dark" | "eink";

export type AppTheme = {
  mode: ThemeMode;
  font: {
    family: string;
    size: string;
    lineHeight: string;
    weightRegular: number;
    weightMedium: number;
    weightValue: number;
    featureSettings: string;
    variantNumeric: string;
    smoothing: string;
  };
  color: {
    textPrimary: string;
    textLabel: string;
    textValue: string;
    link: string;
    success: string;
    download: string;
    upload: string;
    danger: string;
    surface: string;
    pageBg: string;
    border: string;
    fill: string;
    pillBorder: string;
  };
  radius: { base: string };
};

const color = (base: string, mode: "light" | "dark", fallback: string) =>
  `var(--desktop-color-${base}-${mode}, ${fallback})`;

function einkTheme(): AppTheme {
  const ink = "#000";
  return {
    mode: "eink",
    font: {
      family: 'Arial, Helvetica, sans-serif',
      size: "13px",
      lineHeight: "20px",
      weightRegular: 400,
      weightMedium: 700,
      /** weight for emphasised values / numbers (the panel bolds these) */
      weightValue: 700,
      featureSettings: '"tnum" 1',
      variantNumeric: "tabular-nums",
      smoothing: "none",
    },
    color: {
      textPrimary: ink,
      textLabel: ink,
      textValue: ink,
      link: ink,
      success: ink,
      download: ink,
      upload: ink,
      danger: "#ff0000",
      surface: "#fff",
      pageBg: "#fff",
      border: ink,
      fill: "transparent",
      /** inset pills become 1px bordered boxes (grey fill would vanish at threshold) */
      pillBorder: ink,
    },
    radius: { base: "0" },
  };
}

export function createTheme(mode: ThemeMode): AppTheme {
  if (mode === "eink") return einkTheme();
  const m = mode;
  const isDark = m === "dark";
  return {
    mode: m,
    font: {
      family: '"Inter", "Lato", Arial, sans-serif',
      size: "13px",
      lineHeight: "20px",
      weightRegular: 400,
      weightMedium: 500,
      weightValue: 400,
      /** kerning + slashed zero, NOT tabular (the console uses proportional figures) */
      featureSettings: '"kern" 1, "zero" 1',
      variantNumeric: "slashed-zero",
      smoothing: "antialiased",
    },
    color: {
      textPrimary: color("text-1", m, isDark ? "hsla(214, 8%, 98%, 1)" : "hsla(214, 8%, 14%, 1)"),
      textLabel: color("text-2", m, isDark ? "hsla(214, 8%, 84%, 1)" : "hsla(214, 8%, 34%, 1)"),
      textValue: color("text-3", m, isDark ? "hsla(214, 8%, 74%, 1)" : "hsla(214, 8%, 54%, 1)"),
      link: color("ublue-06", m, "hsla(214, 100%, 50%, 1)"),
      success: color("green-06", m, "hsla(138, 59%, 51%, 1)"),
      download: color("aqua-06", m, "hsla(198, 98%, 63%, 1)"),
      upload: color("purple-06", m, "hsla(273, 72%, 61%, 1)"),
      danger: color("red-06", m, "hsla(359, 86%, 58%, 1)"),
      surface: color("neutral-00", m, isDark ? "hsla(214, 8%, 8%, 1)" : "hsla(0, 0%, 100%, 1)"),
      pageBg: color("neutral-02", m, isDark ? "hsla(214, 8%, 17%, 1)" : "hsla(214, 8%, 96%, 1)"),
      border: isDark ? "hsla(214, 8%, 98%, 0.07)" : "hsla(214, 8%, 14%, 0.07)",
      fill: isDark ? "hsla(214, 8%, 98%, 0.05)" : "hsla(214, 8%, 98%, 0.6)",
      pillBorder: "transparent",
    },
    radius: {
      base: "var(--desktop-radius-base, 4px)",
    },
  };
}

export const lightTheme = createTheme("light");
export const darkTheme = createTheme("dark");
export const einkThemeValue = createTheme("eink");
