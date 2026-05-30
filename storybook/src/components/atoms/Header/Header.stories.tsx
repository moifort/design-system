import type { Meta, StoryObj } from "@storybook/react";
import { Header } from "./Header";
import { ThemeShowcase } from "../../../styles/ThemeShowcase";
import { Stack, Frame, Specimen } from "../../../styles/Showcase";
import ucgUltra from "../../../assets/brands/ucg-ultra.png";

const meta = {
  title: "Components/Atoms/Header",
  component: Header,
  parameters: { layout: "fullscreen", themeShowcase: true },
} satisfies Meta<typeof Header>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Panel header — an optional leading logo, a title (ellipsised on overflow), and an
 * optional trailing detail button. Declinations: full (logo + action), title-only (no
 * logo), and action-less. On **e-ink** the logo collapses to a solid black silhouette.
 */
export const Themes: Story = {
  args: { name: "UCG Ultra" },
  render: () => (
    <ThemeShowcase>
      <Stack>
        <Specimen label="full · logo + action">
          <Frame $w={240}>
            <Header name="UCG Ultra" thumbnail={ucgUltra} />
          </Frame>
        </Specimen>
        <Specimen label="title only">
          <Frame $w={240}>
            <Header name="UniFi Dream Machine" />
          </Frame>
        </Specimen>
        <Specimen label="no action">
          <Frame $w={240}>
            <Header name="UCG Ultra" thumbnail={ucgUltra} action={false} />
          </Frame>
        </Specimen>
        <Specimen label="long · ellipsis">
          <Frame $w={240}>
            <Header name="UniFi Dream Machine Special Edition" thumbnail={ucgUltra} />
          </Frame>
        </Specimen>
      </Stack>
    </ThemeShowcase>
  ),
};
