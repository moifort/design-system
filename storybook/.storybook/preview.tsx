import type { Preview, Decorator } from "@storybook/react";
import { ThemeProvider } from "styled-components";
import { GlobalStyle } from "../src/styles/GlobalStyle";
import { createTheme, type ThemeMode } from "../src/styles/theme";
import "../src/styles/tokens.css";

export const globalTypes = {
  theme: {
    description: "UniFi light / dark mode",
    defaultValue: "light",
    toolbar: {
      title: "Theme",
      icon: "mirror",
      items: [
        { value: "light", title: "Light" },
        { value: "dark", title: "Dark" },
        { value: "eink", title: "E-ink" },
      ],
      dynamicTitle: true,
    },
  },
};

const withTheme: Decorator = (Story, context) => {
  // Showcase stories render every theme themselves (see ThemeShowcase) — don't wrap them
  // in the single toolbar theme.
  if (context.parameters.themeShowcase) return <Story />;
  const mode = (context.globals.theme as ThemeMode) ?? "light";
  const theme = createTheme(mode);
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <div style={{ background: theme.color.pageBg, padding: 24, display: "inline-block" }}>
        <Story />
      </div>
    </ThemeProvider>
  );
};

const preview: Preview = {
  // Every component gets an auto-generated Docs tab (prose + props table + showcase).
  tags: ["autodocs"],
  decorators: [withTheme],
  parameters: {
    layout: "centered",
    controls: { expanded: true },
    options: {
      storySort: { order: ["Design System", "Components", ["Organisms", "Molecules", "Atoms"]] },
    },
  },
};

export default preview;
