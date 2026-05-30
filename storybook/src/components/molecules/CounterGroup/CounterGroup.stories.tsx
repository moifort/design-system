import type { Meta, StoryObj } from "@storybook/react";
import { CounterGroup } from "./CounterGroup";
import { ThemeShowcase } from "../../../styles/ThemeShowcase";
import { Stack, Frame, Specimen } from "../../../styles/Showcase";

const meta = {
  title: "Components/Molecules/CounterGroup",
  component: CounterGroup,
  parameters: { layout: "fullscreen", themeShowcase: true },
} satisfies Meta<typeof CounterGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * A row of icon + count metrics joined by dotted connectors that fill the gaps. Counters
 * stay accent-blue across **light** / **dark** and turn black on **e-ink**. Shown with
 * varying item counts and magnitudes.
 */
export const Themes: Story = {
  args: { items: [] },
  render: () => (
    <ThemeShowcase>
      <Stack>
        <Specimen label="four">
          <Frame $w={240}>
            <CounterGroup
              items={[
                { icon: "gatewayCount", count: 1 },
                { icon: "wiredCount", count: 0 },
                { icon: "wirelessCount", count: 2 },
                { icon: "clientCount", count: 21 },
              ]}
            />
          </Frame>
        </Specimen>
        <Specimen label="two">
          <Frame $w={240}>
            <CounterGroup
              items={[
                { icon: "gatewayCount", count: 1 },
                { icon: "clientCount", count: 8 },
              ]}
            />
          </Frame>
        </Specimen>
        <Specimen label="single">
          <Frame $w={240}>
            <CounterGroup items={[{ icon: "wirelessCount", count: 5 }]} />
          </Frame>
        </Specimen>
        <Specimen label="large counts">
          <Frame $w={240}>
            <CounterGroup
              items={[
                { icon: "gatewayCount", count: 1 },
                { icon: "wiredCount", count: 42 },
                { icon: "wirelessCount", count: 128 },
                { icon: "clientCount", count: 500 },
              ]}
            />
          </Frame>
        </Specimen>
      </Stack>
    </ThemeShowcase>
  ),
};
