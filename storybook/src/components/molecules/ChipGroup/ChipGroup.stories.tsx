import type { Meta, StoryObj } from "@storybook/react";
import { ChipGroup } from "./ChipGroup";
import { ThemeShowcase } from "../../../styles/ThemeShowcase";
import { Stack, Frame, Specimen } from "../../../styles/Showcase";
import microsoft from "../../../assets/brands/microsoft.png";
import google from "../../../assets/brands/google.png";
import cloudflare from "../../../assets/brands/cloudflare.svg";

const meta = {
  title: "Components/Molecules/ChipGroup",
  component: ChipGroup,
  parameters: { layout: "fullscreen", themeShowcase: true },
} satisfies Meta<typeof ChipGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

const ms = { logo: microsoft, alt: "Microsoft" };
const go = { logo: google, alt: "Google" };
const cf = { logo: cloudflare, alt: "Cloudflare" };

/**
 * A row of equal-width chips, each pairing a logo with a value. On the web each chip is a
 * faint grey inset; on **e-ink** the fill would vanish at threshold, so it becomes a 1px
 * black box and the logos render as black silhouettes. Shown with one to three chips.
 */
export const Themes: Story = {
  args: { items: [] },
  render: () => (
    <ThemeShowcase>
      <Stack>
        <Specimen label="three">
          <Frame $w={240}>
            <ChipGroup
              items={[
                { ...ms, value: "<1ms" },
                { ...go, value: "1ms" },
                { ...cf, value: "3ms" },
              ]}
            />
          </Frame>
        </Specimen>
        <Specimen label="two">
          <Frame $w={240}>
            <ChipGroup
              items={[
                { ...ms, value: "12ms" },
                { ...cf, value: "45ms" },
              ]}
            />
          </Frame>
        </Specimen>
        <Specimen label="single">
          <Frame $w={240}>
            <ChipGroup items={[{ ...go, value: "240ms" }]} />
          </Frame>
        </Specimen>
      </Stack>
    </ThemeShowcase>
  ),
};
