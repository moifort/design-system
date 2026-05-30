import type { Meta, StoryObj } from "@storybook/react";
import { Sparkline } from "./Sparkline";
import { gatewayCardMock } from "../../../mocks/gatewayCard";
import { ThemeShowcase } from "../../../styles/ThemeShowcase";
import { Stack, Frame, Specimen } from "../../../styles/Showcase";

const meta = {
  title: "Design System/Sparkline",
  component: Sparkline,
  parameters: { layout: "fullscreen", themeShowcase: true },
} satisfies Meta<typeof Sparkline>;

export default meta;
type Story = StoryObj<typeof meta>;

const ramp = Array.from({ length: 24 }, (_, i) => i + 1);
const flat = Array.from({ length: 24 }, () => 10);
const spiky = Array.from({ length: 24 }, (_, i) => (i % 2 ? 4 : 90));

/**
 * The dual-series throughput sparkline — download (aqua, filled area) over upload (purple).
 * On **e-ink** both series turn black and upload becomes dashed, since the gradient fill and
 * a second solid line would be indistinguishable after thresholding. Shown on all three media.
 */
export const Themes: Story = {
  args: { download: [], upload: [] },
  render: () => (
    <ThemeShowcase>
      <Stack>
        <Specimen label="realistic (card data)">
          <Frame $w={120}>
            <Sparkline
              download={gatewayCardMock.isp.history.download}
              upload={gatewayCardMock.isp.history.upload}
            />
          </Frame>
        </Specimen>
        <Specimen label="ramp">
          <Frame $w={120}>
            <Sparkline download={ramp} upload={ramp.map((v) => v * 0.6)} />
          </Frame>
        </Specimen>
        <Specimen label="spiky">
          <Frame $w={120}>
            <Sparkline download={spiky} upload={spiky.map((v) => v * 0.5)} />
          </Frame>
        </Specimen>
        <Specimen label="flat">
          <Frame $w={120}>
            <Sparkline download={flat} upload={flat.map((v) => v * 0.7)} />
          </Frame>
        </Specimen>
      </Stack>
    </ThemeShowcase>
  ),
};
