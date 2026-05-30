import styled from "styled-components";
import { Icon, type GlyphName } from "../../atoms/Icon/Icon";

const Button = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  height: 32px;
  width: 100%;
  padding: 0 16px;
  border: 1px solid ${({ theme }) => theme.color.link};
  border-radius: ${({ theme }) => theme.radius.base};
  background: transparent;
  color: ${({ theme }) => theme.color.link};
  font-family: inherit;
  font-size: ${({ theme }) => theme.font.size};
  font-weight: ${({ theme }) => theme.font.weightMedium};
  line-height: ${({ theme }) => theme.font.lineHeight};
  cursor: pointer;
`;

/** Outlined, full-width secondary action (e.g. "ISP Speed Test"). */
export function ActionButton({ icon, label }: { icon: GlyphName; label: string }) {
  return (
    <Button type="button">
      <Icon name={icon} size={20} />
      {label}
    </Button>
  );
}
