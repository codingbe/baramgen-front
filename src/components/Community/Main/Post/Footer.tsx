import React from "react";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  justify-content: flex-end;
  padding: 0 10px;
`;
const Button = styled.button`
  all: unset;
  margin-left: 14px;
  cursor: pointer;
  color: gray;
  &:hover {
    color: black;
  }
`;

export default function Footer({ setVisible }: { setVisible: React.Dispatch<React.SetStateAction<boolean>> }) {
  return (
    <Container>
      <Button type="submit">작성</Button>
      <Button
        onClick={(e) => {
          e.preventDefault();
          setVisible(false);
        }}
      >
        취소
      </Button>
    </Container>
  );
}
