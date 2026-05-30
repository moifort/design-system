import styled, { useTheme } from "styled-components";
import { Icon } from "../../atoms/Icon/Icon";
import { Text } from "../../atoms/Text/Text";

const Wrap = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  white-space: nowrap;
`;

const Segment = styled.div<{ $tone: "download" | "upload" }>`
  display: flex;
  align-items: center;
  gap: 2px;
  white-space: nowrap;
  color: ${({ theme, $tone }) => ($tone === "download" ? theme.color.download : theme.color.upload)};
`;

/** Filled triangle used on e-ink (thin SVG arrows disappear after thresholding). */
const Triangle = styled.span`
  font-size: 9px;
  line-height: 1;
`;

/** A directional pair of values — ↓ down (aqua) and ↑ up (purple). On e-ink the arrows
 *  become filled triangles. */
export function MetricPair({ down, up }: { down: string; up: string }) {
  const isEink = useTheme().mode === "eink";
  return (
    <Wrap>
      <Segment $tone="download">
        {isEink ? <Triangle>▼</Triangle> : <Icon name="arrowDown" size={16} />}
        <Text $tone="download" $strong>
          {down}
        </Text>
      </Segment>
      <Segment $tone="upload">
        {isEink ? <Triangle>▲</Triangle> : <Icon name="arrowUp" size={16} />}
        <Text $tone="upload" $strong>
          {up}
        </Text>
      </Segment>
    </Wrap>
  );
}
