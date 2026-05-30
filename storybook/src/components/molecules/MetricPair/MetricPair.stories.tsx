import type { Meta, StoryObj } from "@storybook/react";
import { MetricPair } from "./MetricPair";
import { ThemeShowcase } from "../../../styles/ThemeShowcase";
import { Stack, Specimen } from "../../../styles/Showcase";

const meta = {
  title: "Components/Molecules/MetricPair",
  component: MetricPair,
  parameters: { layout: "fullscreen", themeShowcase: true },
} satisfies Meta<typeof MetricPair>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * A directional pair of values — ↓ down (aqua) and ↑ up (purple). On the web the arrows are
 * SVG icons; on **e-ink** they become filled triangles (thin strokes vanish after
 * thresholding) and the text turns black. Shown with a range of values.
 */
export const Themes: Story = {
  args: { down: "92.4 Kbps", up: "86.3 Kbps" },
  render: () => (
    <ThemeShowcase>
      <Stack>
        <Specimen label="low">
          <MetricPair down="0.5 Mbps" up="0.25 Mbps" />
        </Specimen>
        <Specimen label="medium">
          <MetricPair down="92.4 Kbps" up="86.3 Kbps" />
        </Specimen>
        <Specimen label="high">
          <MetricPair down="940 Mbps" up="110 Mbps" />
        </Specimen>
        <Specimen label="asymmetric">
          <MetricPair down="100 Mbps" up="8 Mbps" />
        </Specimen>
      </Stack>
    </ThemeShowcase>
  ),
};
