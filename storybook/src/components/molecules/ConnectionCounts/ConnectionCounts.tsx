import { Fragment } from "react";
import styled from "styled-components";
import { Icon, type GlyphName } from "../../atoms/Icon/Icon";
import { Text } from "../../atoms/Text/Text";

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

/** Dotted line filling the space between two counts. */
const Connector = styled.div`
  flex: 1 1 auto;
  border-top: 1px dotted ${({ theme }) => theme.color.border};
  align-self: center;
  min-width: 8px;
`;

export type ConnectionCount = { icon: GlyphName; count: number };

/** Top-of-card connectivity counters (gateway · wired · wireless · clients). */
export function ConnectionCounts({ items }: { items: ConnectionCount[] }) {
  return (
    <Row>
      {items.map((it, i) => (
        <Fragment key={it.icon}>
          {i > 0 && <Connector />}
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
