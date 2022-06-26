import React from "react";
import styled from "styled-components";
import { ArticleInfo } from "../../../etc/typeDefs";
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
  setArticles,
  setLoading,
}: {
  sub: string;
  setSub: React.Dispatch<React.SetStateAction<string>>;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  setArticles: React.Dispatch<React.SetStateAction<ArticleInfo[]>>;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  return (
    <Nav>
      <FilterHeader sub={sub} setSub={setSub} setArticles={setArticles} setLoading={setLoading} />
      <SearchBar setValue={setValue} />
    </Nav>
  );
}
