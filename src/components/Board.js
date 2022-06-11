import styled from "styled-components";

const Container = styled.div`
  text-align: center;
  padding: 10px 0;
  max-width: 720px;
  margin: 0 auto;
`;
const Title = styled.h1`
  font-size: 26px;
  margin-bottom: 20px;
`;
const Content = styled.p`
  text-align: start;
  white-space: pre-wrap;
  font-size: 20px;
  line-height: 22px;
  overflow: scroll;
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
  &::-webkit-scrollbar {
    display: none; /* Chrome, Safari, Opera*/
  }
`;

const Board = ({ title, content }) => (
  <Container>
    <Title>{title}</Title>
    <Content>{content}</Content>
  </Container>
);

export default Board;
