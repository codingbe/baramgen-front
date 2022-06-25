import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
  max-width: 600px;
  margin: 0 auto;
`;
const Ul = styled.ul`
  display: flex;
  color: gray;
  align-items: center;
`;
const Li = styled.li<{ check: boolean }>`
  margin-right: 15px;
  color: ${({ check }) => (check ? "black" : "")};
  cursor: pointer;
`;
const Button = styled.button`
  all: unset;
  cursor: pointer;
`;

export default function MainHeader({
  setVisible,
  cur,
  setCur,
  visible,
}: {
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
  cur: string;
  setCur: React.Dispatch<React.SetStateAction<string>>;
  visible: boolean;
}) {
  const token = useSelector((state: { token: string }) => state.token);
  return (
    <>
      <Container>
        <Ul>
          <Li check={cur === ""} onClick={() => setCur("")}>
            최신순
          </Li>
          <Li check={cur === "like"} onClick={() => setCur("like")}>
            인기순
          </Li>
        </Ul>
        <div>{token ? <Button onClick={() => setVisible(true)}>글쓰기</Button> : ""}</div>
      </Container>
    </>
  );
}
