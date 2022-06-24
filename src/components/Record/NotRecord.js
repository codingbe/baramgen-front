import React from "react";
import styled from "styled-components";

const Container = styled.div`
  height: 50vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Main = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  height: 100%;
`;

const Icon = styled.i`
  font-size: 100px;
`;

const Paragraph = styled.p`
  text-align: center;
  font-size: 18px;
  white-space: pre;
  line-height: 26px;
`;

const NotRecord = ({ content }) => (
  <Container>
    <Main>
      <Icon className="fas fa-question" />
      <Paragraph>{content}</Paragraph>
    </Main>
  </Container>
);

export default NotRecord;
