import React, { useState } from "react";
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

export default function SearchBar({ setValue }: { setValue: React.Dispatch<React.SetStateAction<string>> }) {
  const [inputValue, setInputValue] = useState("");
  const [count, setCount] = useState(0);
  return (
    <Form
      onSubmit={(e) => {
        e.preventDefault();
        setValue(inputValue);
      }}
    >
      <Input
        onChange={(e) => {
          const value = e.target.value;
          const reg = /[가-하]/g;
          if ((reg.test(value) && count % 3 === 0) || value === "") {
            setValue(value);
          }
          setInputValue(value);
          setCount((prev) => prev + 1);
        }}
        placeholder="검색어를 입력하고 엔터를 누르세요!"
      />
      <Button type="submit">검색</Button>
    </Form>
  );
}
