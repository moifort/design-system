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
  decorators: [withTheme],
  parameters: {
    layout: "centered",
    controls: { expanded: true },
  },
};

export default preview;
