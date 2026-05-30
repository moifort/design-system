import styled from "styled-components";

/** Hairline divider (matches UniFi's --desktop-border-divider, 8px vertical margin). */
export const Divider = styled.hr`
  border: none;
  border-top: 1px solid ${({ theme }) => theme.color.border};
  margin: 8px 0;
  width: 100%;
`;
