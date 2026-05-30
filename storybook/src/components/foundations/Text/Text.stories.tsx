import type { Meta, StoryObj } from "@storybook/react";
import { Text, type TextTone } from "./Text";
import { ThemeShowcase } from "../../../styles/ThemeShowcase";
import { Stack, Specimen } from "../../../styles/Showcase";

const meta = {
  title: "Design System/Text",
  component: Text,
  parameters: { layout: "fullscreen", themeShowcase: true },
} satisfies Meta<typeof Text>;

export default meta;
type Story = StoryObj<typeof meta>;

const TONES: TextTone[] = ["primary", "label", "value", "link", "success", "download", "upload"];

/**
 * The body-text primitive (13px/20px) across every **tone** and on all three screens —
 * **light**, **dark**, **e-ink**. Tones map to semantic theme colours; on e-ink they all
 * collapse to black (danger excepted). `$strong` only changes weight on e-ink, where it
 * bolds emphasised values.
 */
export const Themes: Story = {
  render: () => (
    <ThemeShowcase>
      <Stack>
        {TONES.map((t) => (
          <Specimen key={t} label={t}>
            <Text $tone={t}>The quick brown fox — 1,234.5</Text>
          </Specimen>
        ))}
        <Specimen label="value · regular vs $strong">
          <Text $tone="value">92.4 Kbps</Text>
          <Text $tone="value" $strong>
            92.4 Kbps
          </Text>
        </Specimen>
      </Stack>
    </ThemeShowcase>
  ),
};
