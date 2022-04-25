import { useState } from "react";
import styled from "styled-components";

const Backdrop = styled.div`
  width: 100%;
  height: 100vh;
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
  left: 0;
  top: 0;
  z-index: 1;
`;
const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 30px 15px 10px 15px;
  background-color: white;
  width: 80%;
  height: 80%;
  font-size: 20px;
  overflow-y: scroll;
  border-radius: 5px;
  @media screen and (max-width: 450px) {
    width: 100%;
    height: 100%;
  }
`;
const Title = styled.h1`
  font-size: 22px;
  margin-bottom: 10px;
  @media screen and (max-width: 450px) {
    font-size: 18px;
  }
`;
const Para = styled.p`
  line-height: 24px;
  margin-bottom: 10px;
  @media screen and (max-width: 450px) {
    font-size: 16px;
  }
`;

const Icon = styled.i`
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
`;

const Survey = styled.section`
  margin-top: 10px;
  width: 100%;
  height: 90%;
`;

const CheckBox = styled.input``;

const Modal = () => {
  const [visible, setVisible] = useState(true);
  const [check, setCheck] = useState(Boolean(localStorage.getItem("check")));
  return (
    visible &&
    !check && (
      <Backdrop>
        <Container>
          <Icon
            className="fas fa-times"
            onClick={() => {
              setVisible(false);
            }}
          ></Icon>
          <Title>앞으로의 방향에 대해 설문 참여 부탁드립니다.</Title>
          <Para>
            안녕하세요 바연젠 개발자입니다.
            <br />
            다름이 아니라 이번에 궁사 업데이트 후 사용자가 많아졌습니다.
            <br />
            그래서 커뮤니티를 만들면 어떨까? 하는 생각에 설문조사를 하려고
            합니다.
            <br />
            커뮤니티는 투표를 통해 개발할 예정이고,
            <br />
            그 외 기능적으로 아쉬운 부분이나 건의 사항 같은 것이 있으시다면
            <br />
            한번 적어주시면 감사하겠습니다.
            <br />
            저의 능력이 되는 한에서 최대한 반영하겠습니다.
          </Para>
          <label>
            <CheckBox
              type="checkbox"
              onClick={() => {
                setCheck((prev) => {
                  if (!prev) {
                    localStorage.setItem("check", true);
                    return !prev;
                  } else localStorage.removeItem("check");
                });
              }}
            />
            다시는 팝업을 띄우지 않기
          </label>
          <Survey>
            <iframe
              src="https://docs.google.com/forms/d/e/1FAIpQLSfILwra60p-PpW2bo7IFXOfbrG92gj1-6qzJFx2RqTsj7g8xw/viewform?embedded=true"
              frameBorder="0"
              marginHeight="0"
              marginWidth="0"
              width="100%"
              height="90%"
              title="survey"
            >
              로드 중…
            </iframe>
          </Survey>
        </Container>
      </Backdrop>
    )
  );
};

export default Modal;
