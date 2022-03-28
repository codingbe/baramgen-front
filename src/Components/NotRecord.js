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
  padding: 10px;
`;

const Img = styled.img`
  width: 150px;
`;

const Paragraph = styled.p`
  text-align: center;
  font-size: 22px;
  white-space: pre;
`;

const NotRecord = ({ check }) => (
  <Container>
    <Main>
      <Img src="https://svgsilh.com/svg/153391.svg" />
      <Paragraph>
        {check ? "맵이나 아이템을 선택한 후 기록해보세요!" : `기록이 없습니다.\n기록탭으로 가서 기록을 진행하세요!`}
      </Paragraph>
    </Main>
  </Container>
);

export default NotRecord;
