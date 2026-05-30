import type { Meta, StoryObj } from "@storybook/react";
import { GatewayCard } from "./GatewayCard";
import { gatewayCardMock } from "../../../mocks/gatewayCard";

const meta = {
  title: "Organisms/GatewayCard",
  component: GatewayCard,
  parameters: { layout: "centered" },
} satisfies Meta<typeof GatewayCard>;

export default meta;
type Story = StoryObj<typeof meta>;

/** The gateway summary card — top-left widget of the dashboard's first column. */
export const Default: Story = {
  args: { data: gatewayCardMock },
};

/** Same card in UniFi dark mode (toggle the Theme toolbar to compare). */
export const Dark: Story = {
  args: { data: gatewayCardMock },
  globals: { theme: "dark" },
};
