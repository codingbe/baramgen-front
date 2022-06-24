import React, { useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { setPage } from "../../../etc/redux/action";

const Ul = styled.ul`
  display: flex;
  margin-bottom: 15px;
`;
const Li = styled.li<{ check: boolean }>`
  cursor: pointer;
  padding: 5px 10px;
  color: ${({ check }) => (check ? "black" : "gray")};
  border-bottom: ${({ check }) => (check ? "1px solid black" : "")};
`;

export default function FilterHeader({
  sub,
  setSub,
}: {
  sub: string;
  setSub: React.Dispatch<React.SetStateAction<string>>;
}) {
  const dispatch = useDispatch();
  return (
    <Ul>
      <Li
        check={!sub}
        onClick={() => {
          setSub("");
          dispatch(setPage(true));
        }}
      >
        전체
      </Li>
      <Li
        check={sub === "공지"}
        onClick={() => {
          setSub("공지");
          dispatch(setPage(true));
        }}
      >
        공지
      </Li>
      <Li
        check={sub === "건의"}
        onClick={() => {
          setSub("건의");
          dispatch(setPage(true));
        }}
      >
        건의
      </Li>
      <Li
        check={sub === "버그"}
        onClick={() => {
          setSub("버그");
          dispatch(setPage(true));
        }}
      >
        버그
      </Li>
      <Li
        check={sub === "잡담"}
        onClick={() => {
          setSub("잡담");
          dispatch(setPage(true));
        }}
      >
        잡담
      </Li>
    </Ul>
  );
}
