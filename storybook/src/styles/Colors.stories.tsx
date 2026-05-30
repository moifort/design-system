import type { Meta, StoryObj } from "@storybook/react";
import { ThemeProvider } from "styled-components";
import styled from "styled-components";
import { GlobalStyle } from "./GlobalStyle";
import { lightTheme } from "./theme";
import {
  PRIMARY,
  PRIMITIVES,
  SEMANTIC,
  type PaletteFamily,
  type SemanticToken,
} from "./palette";
import "./tokens.css";

/**
 * Picks readable ink for a swatch by reading the HSLA lightness — every palette value is
 * `hsla(h, s%, l%, a)`, so the 3rd channel decides dark-on-light vs light-on-dark text.
 */
function inkOn(value: string): string {
  const m = value.match(/hsla?\(\s*[\d.]+\s*,\s*[\d.]+%\s*,\s*([\d.]+)%/);
  const l = m ? Number.parseFloat(m[1]) : 50;
  return l > 55 ? "rgba(0, 0, 0, 0.74)" : "rgba(255, 255, 255, 0.94)";
}

const Page = styled.div`
  font-family: ${({ theme }) => theme.font.family};
  color: ${({ theme }) => theme.color.textPrimary};
  background: ${({ theme }) => theme.color.surface};
  padding: 40px 44px 64px;
  max-width: 1100px;
`;

const Title = styled.h1`
  font-size: 26px;
  font-weight: 600;
  margin: 0 0 8px;
`;

const Lead = styled.p`
  color: ${({ theme }) => theme.color.textLabel};
  font-size: 14px;
  line-height: 21px;
  max-width: 70ch;
  margin: 0 0 8px;
`;

const Note = styled.p`
  color: ${({ theme }) => theme.color.textValue};
  font-size: 12px;
  line-height: 18px;
  max-width: 70ch;
  margin: 0 0 32px;
`;

const SectionTitle = styled.h2`
  font-size: 17px;
  font-weight: 600;
  margin: 40px 0 4px;
`;

const SectionLead = styled.p`
  color: ${({ theme }) => theme.color.textLabel};
  font-size: 13px;
  margin: 0 0 18px;
`;

const FamilyBlock = styled.section`
  margin-bottom: 28px;
`;

const FamilyHead = styled.div`
  display: flex;
  align-items: baseline;
  gap: 10px;
  margin-bottom: 10px;
`;

const FamilyName = styled.span`
  font-size: 14px;
  font-weight: 600;
`;

const FamilyToken = styled.code`
  font-size: 12px;
  color: ${({ theme }) => theme.color.textValue};
  font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
`;

const FamilyDesc = styled.span`
  font-size: 12.5px;
  color: ${({ theme }) => theme.color.textLabel};
`;

const Strip = styled.div<{ $mode: "light" | "dark" }>`
  display: flex;
  gap: 6px;
  padding: 12px;
  border-radius: 10px;
  background: ${({ $mode }) => ($mode === "light" ? "#ffffff" : "hsla(214, 8%, 8%, 1)")};
  border: 1px solid rgba(127, 127, 127, 0.16);
  overflow-x: auto;

  & + & {
    margin-top: 6px;
  }
`;

const StripLabel = styled.span<{ $mode: "light" | "dark" }>`
  align-self: center;
  flex: 0 0 44px;
  font-size: 10px;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: ${({ $mode }) => ($mode === "light" ? "#8a9099" : "#9aa1ab")};
`;

const Cell = styled.div`
  flex: 0 0 auto;
  width: 66px;
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const Chip = styled.div<{ $bg: string; $ink: string; $brand?: boolean }>`
  height: 52px;
  border-radius: 7px;
  background: ${({ $bg }) => $bg};
  color: ${({ $ink }) => $ink};
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  padding: 6px 7px;
  font-size: 11px;
  font-weight: 600;
  box-shadow: ${({ $brand }) => ($brand ? "0 0 0 2px #006eff, 0 0 0 4px rgba(0,110,255,0.25)" : "inset 0 0 0 1px rgba(127,127,127,0.12)")};
`;

const ChipValue = styled.code<{ $mode: "light" | "dark" }>`
  font-size: 9.5px;
  line-height: 1.3;
  font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
  color: ${({ $mode }) => ($mode === "light" ? "#6b7178" : "#9aa1ab")};
  text-align: center;
  overflow-wrap: anywhere;
`;

/** Compact `hsla(214, 100%, 95%, 1)` → `hsla(214,100%,95%)` so it fits under a swatch. */
const fmt = (v: string) => v.replace(/,\s*1\)$/, ")").replace(/,\s+/g, ",");

/**
 * Display value for a swatch: opaque colours render as `#RRGGBB` (what designers copy);
 * values with alpha (the structural `border` / `fill` greys) stay HSLA, since hex can't
 * carry transparency cleanly. The palette is authored in HSL — convert per channel.
 */
function toHex(value: string): string {
  const m = value.match(/hsla?\(\s*([\d.]+),\s*([\d.]+)%,\s*([\d.]+)%(?:,\s*([\d.]+))?\)/);
  if (!m) return fmt(value);
  const alpha = m[4] === undefined ? 1 : Number.parseFloat(m[4]);
  if (alpha !== 1) return fmt(value);
  const h = Number.parseFloat(m[1]);
  const s = Number.parseFloat(m[2]) / 100;
  const l = Number.parseFloat(m[3]) / 100;
  const c = (1 - Math.abs(2 * l - 1)) * s;
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
  const base = l - c / 2;
  const [r, g, b] =
    h < 60 ? [c, x, 0]
    : h < 120 ? [x, c, 0]
    : h < 180 ? [0, c, x]
    : h < 240 ? [0, x, c]
    : h < 300 ? [x, 0, c]
    : [c, 0, x];
  const ch = (n: number) => Math.round((n + base) * 255).toString(16).padStart(2, "0");
  return `#${ch(r)}${ch(g)}${ch(b)}`.toUpperCase();
}

function ModeStrip({ family, mode }: { family: PaletteFamily; mode: "light" | "dark" }) {
  return (
    <Strip $mode={mode}>
      <StripLabel $mode={mode}>{mode}</StripLabel>
      {family.steps.map((step) => {
        const value = mode === "light" ? step.light : step.dark;
        const brand = step.step === family.brandStep;
        return (
          <Cell key={step.step}>
            <Chip $bg={value} $ink={inkOn(value)} $brand={brand} title={`${family.token}-${step.step}`}>
              <span>{step.step}</span>
              {brand ? <span>★</span> : null}
            </Chip>
            <ChipValue $mode={mode}>{toHex(value)}</ChipValue>
          </Cell>
        );
      })}
    </Strip>
  );
}

function Family({ family }: { family: PaletteFamily }) {
  return (
    <FamilyBlock>
      <FamilyHead>
        <FamilyName>{family.name}</FamilyName>
        <FamilyToken>--desktop-color-{family.token}-*</FamilyToken>
        <FamilyDesc>{family.description}</FamilyDesc>
      </FamilyHead>
      <ModeStrip family={family} mode="light" />
      <ModeStrip family={family} mode="dark" />
    </FamilyBlock>
  );
}

const SemGrid = styled.div`
  display: grid;
  grid-template-columns: max-content max-content 1fr max-content max-content;
  align-items: center;
  gap: 0 16px;
`;

const SemHead = styled.div`
  font-size: 10px;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.color.textValue};
  padding: 0 0 8px;
  border-bottom: 1px solid rgba(127, 127, 127, 0.16);
`;

const SemCell = styled.div`
  padding: 10px 0;
  border-bottom: 1px solid rgba(127, 127, 127, 0.08);
  font-size: 13px;
`;

const SemName = styled(SemCell)`
  font-weight: 600;
  font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
  font-size: 12.5px;
`;

const SemSource = styled(SemCell)`
  color: ${({ theme }) => theme.color.textValue};
  font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
  font-size: 12px;
`;

const SemRole = styled(SemCell)`
  color: ${({ theme }) => theme.color.textLabel};
`;

const SemSwatch = styled(SemCell)<{ $bg: string; $mode: "light" | "dark" }>`
  justify-self: end;
  width: 64px;
  height: 30px;
  margin: 6px 0;
  padding: 0;
  border: none;
  border-radius: 6px;
  background:
    linear-gradient(${({ $bg }) => $bg}, ${({ $bg }) => $bg}),
    ${({ $mode }) => ($mode === "light" ? "#ffffff" : "hsla(214, 8%, 8%, 1)")};
  box-shadow: inset 0 0 0 1px rgba(127, 127, 127, 0.18);
`;

function SemanticRow({ token }: { token: SemanticToken }) {
  return (
    <>
      <SemName>{token.name}</SemName>
      <SemSource>{token.source}</SemSource>
      <SemRole>{token.role}</SemRole>
      <SemSwatch $bg={token.light} $mode="light" title={toHex(token.light)} />
      <SemSwatch $bg={token.dark} $mode="dark" title={toHex(token.dark)} />
    </>
  );
}

const meta = {
  title: "Design System/Colors",
  parameters: { layout: "fullscreen", themeShowcase: true },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * The colour foundation, reverse-engineered from the live UniFi console. Two layers:
 *
 * - **Primitives** — the raw tonal scales (`--desktop-color-<hue>-<step>`), each shipping a
 *   `light` and `dark` value. The blue family is the brand primary; `06` (★) is the base step.
 * - **Semantic** — the role-named tokens components actually read from `props.theme.color`.
 *   Each aliases a primitive (or an alpha blend), so a theme swap re-points every component
 *   at once.
 *
 * E-ink is intentionally omitted here: that panel collapses the whole palette to pure
 * black-on-white (red reserved for negative values), so there is no scale to show.
 */
export const Palette: Story = {
  render: () => (
    <ThemeProvider theme={lightTheme}>
      <GlobalStyle />
      <Page>
        <Title>Colours</Title>
        <Lead>
          Every colour is extracted verbatim from the live UniFi console and exposed as a typed
          source of truth in <code>styles/palette.ts</code>. Components never hard-code a value —
          they read semantic tokens from <code>props.theme.color</code>.
        </Lead>
        <Note>
          Each swatch shows its <code>light</code> value (top strip / left swatch) and{" "}
          <code>dark</code> value (bottom strip / right swatch). ★ marks the brand / base step.
        </Note>

        <SectionTitle>Primary</SectionTitle>
        <SectionLead>UniFi's signature blue — links, primary actions and focus.</SectionLead>
        <Family family={PRIMARY} />

        <SectionTitle>Primitives</SectionTitle>
        <SectionLead>The supporting hues and the neutral greys that build surfaces and text.</SectionLead>
        {PRIMITIVES.map((family) => (
          <Family key={family.token} family={family} />
        ))}

        <SectionTitle>Semantic tokens</SectionTitle>
        <SectionLead>
          The role-named aliases in <code>theme.color</code>, each resolving onto a primitive.
        </SectionLead>
        <SemGrid>
          <SemHead>Token</SemHead>
          <SemHead>Source</SemHead>
          <SemHead>Role</SemHead>
          <SemHead style={{ textAlign: "right" }}>Light</SemHead>
          <SemHead style={{ textAlign: "right" }}>Dark</SemHead>
          {SEMANTIC.map((token) => (
            <SemanticRow key={token.name} token={token} />
          ))}
        </SemGrid>
      </Page>
    </ThemeProvider>
  ),
};
