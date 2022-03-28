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

const Img = styled.img`
  width: 150px;
`;

const Paragraph = styled.p`
  text-align: center;
  font-size: 24px;
`;

const NotRecord = () => (
  <Container>
    <Main>
      <Img src="https://svgsilh.com/svg/153391.svg" />
      <Paragraph>
        기록이 없습니다.
        <br />
        기록탭으로 가서 기록을 진행하세요!
      </Paragraph>
    </Main>
  </Container>
);

export default NotRecord;
