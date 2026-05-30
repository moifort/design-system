import styled, { css } from "styled-components";
import { Icon, type GlyphName } from "../../foundations/Icon/Icon";

export type ButtonVariant = "primary" | "secondary" | "tertiary" | "link";
export type ButtonTone = "default" | "danger";
export type ButtonSize = "small" | "medium" | "large";

/** White reads on every accent/danger fill — web blue, dark blue, eink black. */
const ON_ACCENT = "#fff";

const SIZES: Record<ButtonSize, { height: number; padding: number; font: number; gap: number; icon: number }> = {
  small: { height: 28, padding: 12, font: 12, gap: 4, icon: 16 },
  medium: { height: 32, padding: 16, font: 13, gap: 6, icon: 20 },
  large: { height: 40, padding: 20, font: 14, gap: 8, icon: 22 },
};

const sizing = (size: ButtonSize) => {
  const s = SIZES[size];
  return css`
    height: ${s.height}px;
    padding: 0 ${s.padding}px;
    gap: ${s.gap}px;
    font-size: ${s.font}px;
  `;
};

const skin = (variant: ButtonVariant, accent: string) => {
  switch (variant) {
    case "primary":
      return css`
        background: ${accent};
        color: ${ON_ACCENT};
        border: 1px solid ${accent};
      `;
    case "secondary":
      return css`
        background: transparent;
        color: ${accent};
        border: 1px solid ${accent};
      `;
    case "tertiary":
      return css`
        background: transparent;
        color: ${accent};
        border: 1px solid transparent;
        &:hover:not(:disabled) {
          background: ${({ theme }) => theme.color.fill};
        }
      `;
    case "link":
      return css`
        background: transparent;
        color: ${accent};
        border: none;
        height: auto;
        padding: 0;
        &:hover:not(:disabled) {
          text-decoration: underline;
        }
      `;
  }
};

const Root = styled.button<{
  $variant: ButtonVariant;
  $tone: ButtonTone;
  $size: ButtonSize;
  $fullWidth: boolean;
}>`
  display: ${({ $variant }) => ($variant === "link" ? "inline-flex" : "flex")};
  align-items: center;
  justify-content: center;
  width: ${({ $fullWidth }) => ($fullWidth ? "100%" : "auto")};
  border-radius: ${({ theme }) => theme.radius.base};
  font-family: inherit;
  font-weight: ${({ theme }) => theme.font.weightMedium};
  line-height: ${({ theme }) => theme.font.lineHeight};
  cursor: pointer;
  ${({ $size }) => sizing($size)}
  ${({ $variant, $tone, theme }) => skin($variant, $tone === "danger" ? theme.color.danger : theme.color.link)}

  &:disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }
`;

export type ButtonProps = {
  /** Optional leading glyph. */
  icon?: GlyphName;
  label: string;
  variant?: ButtonVariant;
  tone?: ButtonTone;
  size?: ButtonSize;
  fullWidth?: boolean;
  disabled?: boolean;
};

/**
 * Action button with the reference's full variant system: `primary` (solid accent),
 * `secondary` (outlined — the card's "ISP Speed Test"), `tertiary` (quiet, hover fill),
 * and `link` (inline text). `tone="danger"` swaps the accent for the danger red; `size`
 * is small/medium/large. All colours read from `props.theme`, so it stays faithful on
 * light, dark and e-ink.
 */
export function Button({
  icon,
  label,
  variant = "primary",
  tone = "default",
  size = "medium",
  fullWidth = false,
  disabled = false,
}: ButtonProps) {
  return (
    <Root
      type="button"
      $variant={variant}
      $tone={tone}
      $size={size}
      $fullWidth={fullWidth}
      disabled={disabled}
    >
      {icon && <Icon name={icon} size={SIZES[size].icon} />}
      {label}
    </Root>
  );
}
