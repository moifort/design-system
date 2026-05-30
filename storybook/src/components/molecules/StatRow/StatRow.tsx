import type { ReactNode } from "react";
import styled from "styled-components";
import { Text, type TextTone } from "../../atoms/Text/Text";

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

type StatRowProps = {
  label: ReactNode;
  /** label tone (defaults to secondary label color) */
  labelTone?: TextTone;
  value: ReactNode;
  valueTone?: TextTone;
  /** trailing icon shown after the value (e.g. the "up to date" clock) */
  trailing?: ReactNode;
};

/** One label/value line in a widget (space-between, 20px tall). */
export function StatRow({ label, labelTone = "label", value, valueTone = "value", trailing }: StatRowProps) {
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
