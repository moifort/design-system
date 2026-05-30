import type { ReactNode } from "react";
import styled from "styled-components";

/**
 * Layout primitives for component **gallery stories** — the labelled specimens shown
 * inside a `ThemeShowcase` column. Captions read from `theme.color.textValue`, so they
 * stay legible in light, dark and e-ink alike.
 *
 * Usage: `<ThemeShowcase><Stack>{specimens}</Stack></ThemeShowcase>`.
 */

/** Vertical list of specimens. */
export const Stack = styled.div`
  display: flex;
  flex-direction: column;
  gap: 18px;
  align-items: flex-start;
`;

/** Horizontal, wrapping shelf — for icon grids and other tile layouts. */
export const Row = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 16px 20px;
  align-items: flex-start;
`;

/** Fixed-width frame so width-dependent molecules (rows, pills, buttons) lay out realistically. */
export const Frame = styled.div<{ $w?: number }>`
  width: ${({ $w = 240 }) => $w}px;
`;

const Caption = styled.div`
  font: 600 10px/1.4 ui-sans-serif, system-ui, sans-serif;
  letter-spacing: 0.07em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.color.textValue};
  margin-bottom: 6px;
`;

const Body = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  align-items: flex-start;
`;

/** A labelled sample: an uppercase caption above the rendered variant. */
export function Specimen({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div>
      <Caption>{label}</Caption>
      <Body>{children}</Body>
    </div>
  );
}
