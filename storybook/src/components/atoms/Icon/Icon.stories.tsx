import type { Meta, StoryObj } from "@storybook/react";
import styled from "styled-components";
import { Icon, type GlyphName } from "./Icon";
import { ThemeShowcase } from "../../../styles/ThemeShowcase";
import { Stack, Row, Specimen } from "../../../styles/Showcase";

const meta = {
  title: "Components/Atoms/Icon",
  component: Icon,
  parameters: { layout: "fullscreen", themeShowcase: true },
} satisfies Meta<typeof Icon>;

export default meta;
type Story = StoryObj<typeof meta>;

const GLYPHS: GlyphName[] = [
  "panel",
  "gatewayCount",
  "wiredCount",
  "wirelessCount",
  "clientCount",
  "clock",
  "arrowDown",
  "arrowUp",
  "speedTest",
  "wifiDoctor",
];

const SIZES = [16, 20, 24, 32];

type ToneColor = "link" | "success" | "download" | "upload" | "danger";
const TONES: ToneColor[] = ["link", "success", "download", "upload", "danger"];

const Tile = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  width: 64px;
  font: 500 9px/1.3 ui-monospace, SFMono-Regular, Menlo, monospace;
  color: ${({ theme }) => theme.color.textValue};
  text-align: center;
`;

const Baseline = styled.div`
  display: flex;
  align-items: flex-end;
  gap: 14px;
`;

/** Icons inherit `currentColor`; this colours one per semantic tone for the colour demo. */
const Tinted = styled.span<{ $tone: ToneColor }>`
  display: inline-flex;
  color: ${({ theme, $tone }) => theme.color[$tone]};
`;

/**
 * The full inline-SVG glyph set, extracted verbatim from the live UniFi app. Icons have no
 * colour of their own — they take `currentColor`, so they adapt to the theme automatically
 * (pure black on e-ink). Shown left → right on **light**, **dark**, **e-ink**.
 */
export const Themes: Story = {
  args: { name: "panel" },
  render: () => (
    <ThemeShowcase>
      <Stack>
        <Specimen label="all glyphs · 24px">
          <Row>
            {GLYPHS.map((name) => (
              <Tile key={name}>
                <Icon name={name} size={24} />
                {name}
              </Tile>
            ))}
          </Row>
        </Specimen>
        <Specimen label="sizes · 16 / 20 / 24 / 32">
          <Baseline>
            {SIZES.map((s) => (
              <Icon key={s} name="speedTest" size={s} />
            ))}
          </Baseline>
        </Specimen>
        <Specimen label="currentColor · link / success / download / upload / danger">
          <Baseline>
            {TONES.map((tone) => (
              <Tinted key={tone} $tone={tone}>
                <Icon name="gatewayCount" size={24} />
              </Tinted>
            ))}
          </Baseline>
        </Specimen>
      </Stack>
    </ThemeShowcase>
  ),
};
