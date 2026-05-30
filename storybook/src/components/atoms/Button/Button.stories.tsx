import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "./Button";
import { ThemeShowcase } from "../../../styles/ThemeShowcase";
import { Stack, Row, Specimen } from "../../../styles/Showcase";

const meta = {
  title: "Components/Atoms/Button",
  component: Button,
  parameters: { layout: "fullscreen", themeShowcase: true },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * The action button across its full variant system. **primary** (solid accent),
 * **secondary** (outlined — the card's "ISP Speed Test"), **tertiary** (quiet, hover
 * fill) and **link** (inline text); each also in the **danger** tone. Three **sizes**
 * (small · medium · large), an icon/no-icon pair, and the **disabled** state. Faithful
 * on light, dark and e-ink.
 */
export const Themes: Story = {
  args: { label: "ISP Speed Test", icon: "speedTest" },
  render: () => (
    <ThemeShowcase>
      <Stack>
        <Specimen label="variants">
          <Row>
            <Button variant="primary" label="Primary" />
            <Button variant="secondary" label="Secondary" />
            <Button variant="tertiary" label="Tertiary" />
            <Button variant="link" label="Link" />
          </Row>
        </Specimen>
        <Specimen label="danger tone">
          <Row>
            <Button variant="primary" tone="danger" label="Primary" />
            <Button variant="secondary" tone="danger" label="Secondary" />
            <Button variant="tertiary" tone="danger" label="Tertiary" />
            <Button variant="link" tone="danger" label="Link" />
          </Row>
        </Specimen>
        <Specimen label="sizes">
          <Row>
            <Button size="small" label="Small" />
            <Button size="medium" label="Medium" />
            <Button size="large" label="Large" />
          </Row>
        </Specimen>
        <Specimen label="with icon">
          <Row>
            <Button variant="primary" icon="speedTest" label="ISP Speed Test" />
            <Button variant="secondary" icon="wifiDoctor" label="WiFi Doctor" />
          </Row>
        </Specimen>
        <Specimen label="disabled">
          <Row>
            <Button variant="primary" label="Primary" disabled />
            <Button variant="secondary" label="Secondary" disabled />
          </Row>
        </Specimen>
        <Specimen label="full width">
          <Button variant="secondary" icon="speedTest" label="ISP Speed Test" fullWidth />
        </Specimen>
      </Stack>
    </ThemeShowcase>
  ),
};
