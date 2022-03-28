import styled from "styled-components";
import { currentTime } from "../util";

const Container = styled.div`
  text-align: center;
  padding: 10px;
  border: 1px solid black;
  max-width: 720px;
  margin: 0 auto;
  margin-bottom: 20px;
`;
const Title = styled.h1`
  font-size: 20px;
  margin-bottom: 10px;
`;
const Form = styled.form`
  display: flex;
  flex-direction: column;
  margin-top: 20px;
`;
const Input = styled.input`
  all: unset;
  border-bottom: 1px solid black;
  width: 250px;
  margin: 0 auto;
`;
const Button = styled.button`
  all: unset;
  border: 1px solid black;
  width: 80px;
  height: 30px;
  margin: 0 auto;
  margin-top: 10px;
  cursor: pointer;
`;
const Link = styled.a`
  font-size: 17px;
  color: red;
`;

const CheckTime = ({ insertCheckTime }) => {
  return (
    <Container>
      <Title>최근 점검시간을 입력해주세요.</Title>
      <Link href="https://forum.nexon.com/baramy/board_list?board=259" target="_blank">
        참고링크
      </Link>
      <Form onSubmit={insertCheckTime}>
        <Input type="datetime-local" defaultValue={currentTime()} />
        <Button type="submit">입력</Button>
      </Form>
    </Container>
  );
};

export default CheckTime;
