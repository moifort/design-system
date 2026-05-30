import type { Meta, StoryObj } from "@storybook/react";
import { Header } from "./Header";
import { ThemeShowcase } from "../../../styles/ThemeShowcase";
import { Stack, Frame, Specimen } from "../../../styles/Showcase";

const meta = {
  title: "Components/Molecules/Header",
  component: Header,
  parameters: { layout: "fullscreen", themeShowcase: true },
} satisfies Meta<typeof Header>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Panel header — leading thumbnail/logo, title, and a trailing detail button. The title
 * ellipsises when it overflows. On **e-ink** the thumbnail collapses to a solid black
 * silhouette. Shown on **light**, **dark**, **e-ink**.
 */
export const Themes: Story = {
  args: { name: "UCG Ultra" },
  render: () => (
    <ThemeShowcase>
      <Stack>
        <Specimen label="short">
          <Frame $w={240}>
            <Header name="UDM" />
          </Frame>
        </Specimen>
        <Specimen label="medium">
          <Frame $w={240}>
            <Header name="UniFi Dream Machine" />
          </Frame>
        </Specimen>
        <Specimen label="long · ellipsis">
          <Frame $w={240}>
            <Header name="UniFi Dream Machine Special Edition" />
          </Frame>
        </Specimen>
      </Stack>
    </ThemeShowcase>
  ),
};
