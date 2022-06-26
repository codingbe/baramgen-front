import styled from "styled-components";

const Container = styled.div`
  width: 100%;
  display: flex;
  height: 40vh;
  justify-content: center;
  align-items: center;
  font-size: 40px;
  font-weight: bold;
`;

export default function Loading() {
  return <Container>로딩중...</Container>;
}
