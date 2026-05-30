import styled from "styled-components";

/** The bordered, rounded white card container UniFi uses for dashboard widgets. */
export const Surface = styled.div`
  background: ${({ theme }) => theme.color.surface};
  border: 1px solid ${({ theme }) => theme.color.border};
  border-radius: ${({ theme }) => theme.radius.base};
  padding: 12px;
  display: flex;
  flex-direction: column;
`;
