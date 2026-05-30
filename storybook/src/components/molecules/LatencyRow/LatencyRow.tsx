import styled from "styled-components";
import { Text } from "../../atoms/Text/Text";

const Row = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

/** Each destination sits in a faint, rounded inset pill of equal width.
 *  On e-ink the grey fill would vanish at threshold, so it becomes a 1px box. */
const Pill = styled.div`
  flex: 1 1 0;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  padding: 4px 0;
  border-radius: ${({ theme }) => theme.radius.base};
  background: ${({ theme }) => theme.color.fill};
  border: ${({ theme }) => (theme.mode === "eink" ? `1px solid ${theme.color.pillBorder}` : "none")};
`;

const Logo = styled.img`
  width: 22px;
  height: 22px;
  object-fit: contain;
  flex: none;
  /* e-ink: brand logos become solid black silhouettes */
  filter: ${({ theme }) => (theme.mode === "eink" ? "grayscale(1) brightness(0)" : "none")};
`;

export type LatencyItem = { logo: string; alt: string; value: string };

/** Per-destination latency pills (Microsoft / Google / Cloudflare). */
export function LatencyRow({ items }: { items: LatencyItem[] }) {
  return (
    <Row>
      {items.map((it) => (
        <Pill key={it.alt}>
          <Logo src={it.logo} alt={it.alt} />
          <Text $tone="value" $strong>
            {it.value}
          </Text>
        </Pill>
      ))}
    </Row>
  );
}
