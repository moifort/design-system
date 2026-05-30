import type { Meta, StoryObj } from "@storybook/react";
import styled from "styled-components";
import { DataRow } from "./DataRow";
import { Text } from "../../atoms/Text/Text";
import { Icon } from "../../atoms/Icon/Icon";
import { ThemeShowcase } from "../../../styles/ThemeShowcase";
import { Stack, Frame, Specimen } from "../../../styles/Showcase";
import freeSas from "../../../assets/brands/free-sas.png";

const meta = {
  title: "Components/Molecules/DataRow",
  component: DataRow,
  parameters: { layout: "fullscreen", themeShowcase: true },
} satisfies Meta<typeof DataRow>;

export default meta;
type Story = StoryObj<typeof meta>;

/** A blue status icon that can trail a value. */
const TrailingIcon = styled.span`
  display: flex;
  color: ${({ theme }) => theme.color.link};
`;

const Brand = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
`;

const Logo = styled.img`
  width: 20px;
  height: 20px;
  object-fit: contain;
  filter: ${({ theme }) => (theme.mode === "eink" ? "grayscale(1) brightness(0)" : "none")};
`;

/**
 * One label/value line (space-between, 20px tall). `label`, `value` and `trailing` accept
 * plain strings or arbitrary nodes; string tones are themable. Shown across **light**,
 * **dark**, **e-ink**.
 */
export const Themes: Story = {
  args: { label: "Gateway IP", value: "192.168.1.1" },
  render: () => (
    <ThemeShowcase>
      <Stack>
        <Specimen label="label + value">
          <Frame $w={240}>
            <DataRow label="Gateway IP" value="192.168.1.1" />
          </Frame>
        </Specimen>
        <Specimen label="trailing · status icon">
          <Frame $w={240}>
            <DataRow
              label="Network 10.4.57"
              value="Up to date"
              trailing={
                <TrailingIcon>
                  <Icon name="clock" size={20} />
                </TrailingIcon>
              }
            />
          </Frame>
        </Specimen>
        <Specimen label="valueTone · success">
          <Frame $w={240}>
            <DataRow label="Health" value="100 %" valueTone="success" />
          </Frame>
        </Specimen>
        <Specimen label="custom label · logo + link">
          <Frame $w={240}>
            <DataRow
              label={
                <Brand>
                  <Logo src={freeSas} alt="Free SAS" />
                  <Text $tone="link">Free SAS</Text>
                </Brand>
              }
              value={
                <Text $tone="success" $strong>
                  100 %
                </Text>
              }
            />
          </Frame>
        </Specimen>
      </Stack>
    </ThemeShowcase>
  ),
};
