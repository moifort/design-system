import styled from "styled-components";
import { glyphs, type GlyphName } from "./glyphs";

export type { GlyphName };

type IconProps = {
  name: GlyphName;
  /** rendered box size in px (icons scale to currentColor) */
  size?: number;
  className?: string;
};

const Svg = styled.svg<{ $size: number }>`
  width: ${({ $size }) => $size}px;
  height: ${({ $size }) => $size}px;
  display: block;
  flex: none;
  fill: currentColor;
`;

/** Inline SVG glyph extracted verbatim from the live UniFi app. Inherits color. */
export function Icon({ name, size = 16, className }: IconProps) {
  const glyph = glyphs[name];
  return (
    <Svg
      $size={size}
      viewBox={glyph.viewBox}
      className={className}
      aria-hidden="true"
      focusable="false"
      dangerouslySetInnerHTML={{ __html: glyph.inner }}
    />
  );
}
