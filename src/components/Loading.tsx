import styled from "styled-components";
import React from "react";

const Container = styled.div`
  width: 100%;
  height: 70vh;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 40px;
  font-weight: bold;
`;

export default function Loading() {
  return <Container>로딩중...</Container>;
}
