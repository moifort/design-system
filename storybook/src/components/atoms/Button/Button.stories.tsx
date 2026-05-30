import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "./Button";
import { ThemeShowcase } from "../../../styles/ThemeShowcase";
import { Stack, Frame, Specimen } from "../../../styles/Showcase";

const meta = {
  title: "Components/Atoms/Button",
  component: Button,
  parameters: { layout: "fullscreen", themeShowcase: true },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Outlined, full-width secondary action — icon + label. Blue outline and text on the web,
 * a pure-black box with square corners on **e-ink**. Shown with a couple of icons plus a
 * long label.
 */
export const Themes: Story = {
  args: { icon: "speedTest", label: "ISP Speed Test" },
  render: () => (
    <ThemeShowcase>
      <Stack>
        <Specimen label="speed test">
          <Frame $w={240}>
            <Button icon="speedTest" label="ISP Speed Test" />
          </Frame>
        </Specimen>
        <Specimen label="wifi doctor">
          <Frame $w={240}>
            <Button icon="wifiDoctor" label="WiFi Doctor" />
          </Frame>
        </Specimen>
        <Specimen label="long label">
          <Frame $w={240}>
            <Button icon="speedTest" label="Run a full ISP speed test now" />
          </Frame>
        </Specimen>
      </Stack>
    </ThemeShowcase>
  ),
};
