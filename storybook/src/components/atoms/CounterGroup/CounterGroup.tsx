import { Fragment } from "react";
import styled from "styled-components";
import { Icon, type GlyphName } from "../../foundations/Icon/Icon";
import { Text } from "../../foundations/Text/Text";

const Row = styled.div`
  display: flex;
  align-items: center;
  gap: 2px;
  height: 24px;
`;

const Item = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  /* icons are accent blue; the count text stays on the label tone */
  color: ${({ theme }) => theme.color.link};
  flex: none;
`;

/** Accent line filling the space between two counters — solid for the first gap,
 *  dotted for the rest (matches the reference). */
const Connector = styled.div<{ $solid?: boolean }>`
  flex: 1 1 auto;
  border-top: 1px ${({ $solid }) => ($solid ? "solid" : "dotted")} ${({ theme }) => theme.color.link};
  align-self: center;
  min-width: 8px;
`;

export type CounterItem = { icon: GlyphName; count: number };

/** A row of icon + count metrics joined by accent connectors — the first gap solid,
 *  the rest dotted, as in the reference. */
export function CounterGroup({ items }: { items: CounterItem[] }) {
  return (
    <Row>
      {items.map((it, i) => (
        <Fragment key={it.icon}>
          {i > 0 && <Connector $solid={i === 1} />}
          <Item>
            <Icon name={it.icon} size={20} />
            <Text $tone="label" $strong>
              {it.count}
            </Text>
          </Item>
        </Fragment>
      ))}
    </Row>
  );
}
