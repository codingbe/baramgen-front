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
  setValue,
}: {
  sub: string;
  setSub: React.Dispatch<React.SetStateAction<string>>;
  setValue: React.Dispatch<React.SetStateAction<string>>;

  getArticles: Function;
}) {
  return (
    <Nav>
      <FilterHeader sub={sub} setSub={setSub} />
      <SearchBar setValue={setValue} />
    </Nav>
  );
}
