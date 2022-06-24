import React from "react";
import styled from "styled-components";

const Form = styled.form`
  max-width: 450px;
  width: 100%;
  display: flex;
  box-shadow: rgba(0, 0, 0, 0.09) 0px 3px 12px;
`;
const Input = styled.input`
  all: unset;
  width: 100%;
  padding: 5px;
`;
const Button = styled.button`
  all: unset;
  width: 20%;
  text-align: center;
  background-color: #f2f2f2;
  cursor: pointer;
`;

export default function SearchBar({
  setValue,
  getArticles,
}: {
  setValue: React.Dispatch<React.SetStateAction<string>>;
  value: string;
  getArticles: Function;
}) {
  return (
    <Form
      onSubmit={(e) => {
        e.preventDefault();
        getArticles();
      }}
    >
      <Input onChange={(e) => setValue(e.target.value)} placeholder="검색어를 입력후 엔터를 눌러주세요!" />
      <Button type="submit">검색</Button>
    </Form>
  );
}
