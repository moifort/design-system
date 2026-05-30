import type { ReactNode } from "react";
import styled from "styled-components";
import { Text, type TextTone } from "../../foundations/Text/Text";

const Row = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  height: 20px;
`;

const Value = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  min-width: 0;
`;

type DataRowProps = {
  label: ReactNode;
  /** label tone (defaults to the secondary label color) */
  labelTone?: TextTone;
  value: ReactNode;
  valueTone?: TextTone;
  /** trailing node shown after the value (e.g. a status icon) */
  trailing?: ReactNode;
};

/** One label/value line (space-between, 20px tall). Strings render as themable Text;
 *  arbitrary nodes pass through untouched. */
export function DataRow({ label, labelTone = "label", value, valueTone = "value", trailing }: DataRowProps) {
  return (
    <Row>
      {typeof label === "string" ? <Text $tone={labelTone}>{label}</Text> : label}
      <Value>
        {typeof value === "string" ? (
          <Text $tone={valueTone} $strong>
            {value}
          </Text>
        ) : (
          value
        )}
        {trailing}
      </Value>
    </Row>
  );
}
