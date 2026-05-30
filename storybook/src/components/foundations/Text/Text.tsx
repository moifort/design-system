import styled, { css } from "styled-components";

export type TextTone = "primary" | "label" | "value" | "link" | "success" | "download" | "upload";

const tone = (t: TextTone) => css`
  color: ${({ theme }) =>
    t === "primary"
      ? theme.color.textPrimary
      : t === "label"
        ? theme.color.textLabel
        : t === "value"
          ? theme.color.textValue
          : t === "link"
            ? theme.color.link
            : t === "success"
              ? theme.color.success
              : t === "download"
                ? theme.color.download
                : theme.color.upload};
`;

/** Typographic primitive — UniFi body text (13px/20px). Color picked by `tone`. */
/**
 * `$strong` marks emphasised values/numbers. It resolves to the theme's value
 * weight — unchanged (400) on the web, bold (700) on the e-ink panel.
 */
export const Text = styled.span<{ $tone?: TextTone; $strong?: boolean }>`
  font-size: ${({ theme }) => theme.font.size};
  line-height: ${({ theme }) => theme.font.lineHeight};
  font-weight: ${({ theme, $strong }) => ($strong ? theme.font.weightValue : theme.font.weightRegular)};
  white-space: nowrap;
  ${({ $tone = "primary" }) => tone($tone)}
`;
