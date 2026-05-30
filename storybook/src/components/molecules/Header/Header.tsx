import styled from "styled-components";
import { Text } from "../../atoms/Text/Text";
import { Icon } from "../../atoms/Icon/Icon";
import thumbnail from "../../../assets/brands/ucg-ultra.png";

const Row = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  height: 24px;
`;

const Thumb = styled.img`
  width: 80px;
  height: 21.25px;
  object-fit: contain;
  flex: none;
  /* e-ink: collapse the colour product render to a solid black silhouette */
  filter: ${({ theme }) => (theme.mode === "eink" ? "grayscale(1) brightness(0)" : "none")};
`;

const Name = styled(Text)`
  flex: 1 1 auto;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const TrailingButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  border: 1px solid ${({ theme }) => theme.color.border};
  border-radius: 50%;
  background: transparent;
  padding: 0;
  cursor: pointer;
  color: ${({ theme }) => theme.color.textValue};
  flex: none;
`;

/** Panel header: leading thumbnail/logo + title (ellipsised) + trailing circular icon button. */
export function Header({ name }: { name: string }) {
  return (
    <Row>
      <Thumb src={thumbnail} alt="UCG Ultra" />
      <Name $tone="primary" $strong>
        {name}
      </Name>
      <TrailingButton type="button" aria-label="Details">
        <Icon name="panel" size={15} />
      </TrailingButton>
    </Row>
  );
}
