import React from "react";
import styled from "styled-components";
import FilterHeader from "./FilterHeader";
import SearchBar from "./SearchBar";

const Nav = styled.nav`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 15px;
  padding: 0 15px;
`;

export default function CommuHeader({
  sub,
  setSub,
  value,
  setValue,
  getArticles,
}: {
  sub: string;
  setSub: React.Dispatch<React.SetStateAction<string>>;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  value: string;
  getArticles: Function;
}) {
  return (
    <Nav>
      <FilterHeader sub={sub} setSub={setSub} />
      <SearchBar value={value} setValue={setValue} getArticles={getArticles} />
    </Nav>
  );
}
