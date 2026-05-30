import type { Meta, StoryObj } from "@storybook/react";
import { Surface } from "./Surface";
import { Text } from "../Text/Text";
import { ThemeShowcase } from "../../../styles/ThemeShowcase";
import { Stack, Frame, Specimen } from "../../../styles/Showcase";

const meta = {
  title: "Components/Atoms/Surface",
  component: Surface,
  parameters: { layout: "fullscreen", themeShowcase: true },
} satisfies Meta<typeof Surface>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * The card container every dashboard widget sits in — bordered, rounded, padded. Background,
 * border and corner radius all come from the theme: white-on-grey in **light**, near-black in
 * **dark**, and a pure-black hairline with square corners on **e-ink**.
 */
export const Themes: Story = {
  render: () => (
    <ThemeShowcase>
      <Stack>
        <Specimen label="surface">
          <Frame $w={220}>
            <Surface>
              <Text $tone="primary" $strong>
                Gateway
              </Text>
              <Text $tone="label">Bordered, rounded, padded container</Text>
            </Surface>
          </Frame>
        </Specimen>
      </Stack>
    </ThemeShowcase>
  ),
};
