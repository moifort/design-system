import type { Meta, StoryObj } from "@storybook/react";
import { GatewayCard } from "./GatewayCard";
import { gatewayCardMock } from "../../../mocks/gatewayCard";
import { ThemeShowcase } from "../../../styles/ThemeShowcase";

const meta = {
  title: "Organisms/GatewayCard",
  component: GatewayCard,
  parameters: { layout: "fullscreen", themeShowcase: true },
} satisfies Meta<typeof GatewayCard>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * The gateway summary card across all three target screens, left → right:
 * **light**, **dark**, **e-ink**. One story, every medium at once — edit the component
 * and watch it stay faithful on each.
 */
export const Themes: Story = {
  args: { data: gatewayCardMock },
  render: (args) => (
    <ThemeShowcase>
      <GatewayCard {...args} />
    </ThemeShowcase>
  ),
};
