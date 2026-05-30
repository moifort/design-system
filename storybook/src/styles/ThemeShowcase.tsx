import type { ReactNode } from "react";
import { ThemeProvider } from "styled-components";
import { GlobalStyle } from "./GlobalStyle";
import { createTheme, lightTheme, type ThemeMode } from "./theme";
import "./tokens.css";

const SCREENS: { mode: ThemeMode; label: string }[] = [
  { mode: "light", label: "Light" },
  { mode: "dark", label: "Dark" },
  { mode: "eink", label: "E-ink" },
];

/**
 * Renders one component across all three target screens — light, dark, e-ink — side by
 * side, left to right. The canonical way to story a component in this design system:
 * one story, every medium visible at once.
 *
 * Each screen gets its own `ThemeProvider`, so the same component code resolves to the
 * exact colours/fonts of that medium. A single `GlobalStyle` is mounted (light) just for
 * the `@font-face` + box-sizing reset; per-screen background/colour/font are applied on
 * each panel so the global body theme never bleeds across columns.
 */
export function ThemeShowcase({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider theme={lightTheme}>
      <GlobalStyle />
      <div
        style={{
          display: "flex",
          gap: 32,
          alignItems: "flex-start",
          padding: 32,
          fontFamily: lightTheme.font.family,
        }}
      >
        {SCREENS.map(({ mode, label }) => {
          const theme = createTheme(mode);
          return (
            <div
              key={mode}
              style={{ display: "flex", flexDirection: "column", gap: 10, alignItems: "stretch" }}
            >
              <span
                style={{
                  font: "600 11px/1 ui-sans-serif, system-ui, sans-serif",
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  color: "#8a9099",
                }}
              >
                {label}
              </span>
              <ThemeProvider theme={theme}>
                <div
                  style={{
                    background: theme.color.pageBg,
                    color: theme.color.textPrimary,
                    fontFamily: theme.font.family,
                    padding: 24,
                    borderRadius: 12,
                    border: "1px solid rgba(127, 127, 127, 0.12)",
                  }}
                >
                  {children}
                </div>
              </ThemeProvider>
            </div>
          );
        })}
      </div>
    </ThemeProvider>
  );
}
