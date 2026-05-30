import type { Meta, StoryObj } from "@storybook/react";
import { Divider } from "./Divider";
import { Text } from "../Text/Text";
import { ThemeShowcase } from "../../../styles/ThemeShowcase";
import { Stack, Frame, Specimen } from "../../../styles/Showcase";

const meta = {
  title: "Design System/Divider",
  component: Divider,
  parameters: { layout: "fullscreen", themeShowcase: true },
} satisfies Meta<typeof Divider>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * The hairline that separates groups inside a card (matches UniFi's `--desktop-border-divider`,
 * 8px vertical margin). A subtle 7% line on **light** / **dark**, a solid 1px black rule on
 * **e-ink**.
 */
export const Themes: Story = {
  render: () => (
    <ThemeShowcase>
      <Stack>
        <Specimen label="divider">
          <Frame $w={220}>
            <Text $tone="label">System Uptime</Text>
            <Divider />
            <Text $tone="label">ISP</Text>
          </Frame>
        </Specimen>
      </Stack>
    </ThemeShowcase>
  ),
};
