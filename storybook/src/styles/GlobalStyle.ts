import { createGlobalStyle } from "styled-components";
import InterVariable from "../assets/fonts/InterVariable.woff2";

/** Inter Variable (bundled from the device) + the base typography UniFi applies. */
export const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: "Inter";
    font-style: normal;
    font-weight: 100 900;
    font-display: swap;
    src: url(${InterVariable}) format("woff2");
  }

  *, *::before, *::after { box-sizing: border-box; }

  body {
    margin: 0;
    font-family: ${({ theme }) => theme.font.family};
    font-size: ${({ theme }) => theme.font.size};
    line-height: ${({ theme }) => theme.font.lineHeight};
    font-weight: ${({ theme }) => theme.font.weightRegular};
    color: ${({ theme }) => theme.color.textPrimary};
    background: ${({ theme }) => theme.color.pageBg};
    font-feature-settings: ${({ theme }) => theme.font.featureSettings};
    font-variant-numeric: ${({ theme }) => theme.font.variantNumeric};
    -webkit-font-smoothing: ${({ theme }) => theme.font.smoothing};
    text-rendering: optimizeLegibility;
  }
`;
