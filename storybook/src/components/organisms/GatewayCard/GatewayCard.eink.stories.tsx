import type { Meta, StoryObj } from "@storybook/react";
import { GatewayCard } from "./GatewayCard";
import { gatewayCardMock } from "../../../mocks/gatewayCard";
import einkPanelPng from "../../../assets/eink/gateway-card.eink.png";

const meta = {
  title: "Organisms/GatewayCard/E-ink",
  component: GatewayCard,
  parameters: { layout: "centered" },
} satisfies Meta<typeof GatewayCard>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Vector source rendered with the e-ink theme (Arial, black-on-white, 1px borders,
 * tabular figures, monochrome logos). This is the render captured and run through the
 * Pillow converter to produce the panel-output PNG.
 */
export const Source: Story = {
  args: { data: gatewayCardMock },
  globals: { theme: "eink" },
};

/**
 * The actual panel output: the source render run through the Pillow converter
 * (`scripts/eink_convert.py`, the real `converter.py` threshold quantization). Shown 1:1
 * — this is exactly what the Waveshare 10.85" 4-color e-paper displays. Regenerate with
 * `bun run eink` after any visual change.
 */
export const PanelOutput: Story = {
  args: { data: gatewayCardMock },
  globals: { theme: "eink" },
  render: () => (
    <img
      src={einkPanelPng}
      alt="GatewayCard as rendered on the Waveshare e-ink panel"
      width={280}
      style={{ display: "block", imageRendering: "pixelated" }}
    />
  ),
};
