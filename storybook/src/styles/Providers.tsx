import type { ReactNode } from "react";
import { ThemeProvider } from "styled-components";
import { GlobalStyle } from "./GlobalStyle";
import { createTheme, type ThemeMode } from "./theme";
import "./tokens.css";

/** Wraps the tree with the UniFi token theme (light/dark) + global styles. */
export function Providers({ children, mode = "light" }: { children: ReactNode; mode?: ThemeMode }) {
  return (
    <ThemeProvider theme={createTheme(mode)}>
      <GlobalStyle />
      {children}
    </ThemeProvider>
  );
}
