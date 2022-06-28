import React from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { setPage } from "../../../etc/redux/action";
import { ArticleInfo } from "../../../etc/typeDefs";

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
  setArticles,
  setLoading,
}: {
  sub: string;
  setSub: React.Dispatch<React.SetStateAction<string>>;
  setArticles: React.Dispatch<React.SetStateAction<ArticleInfo[]>>;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const dispatch = useDispatch();
  function filterArticle(sub: string) {
    setSub((prev) => {
      if (prev !== sub) {
        setLoading(true);
        setArticles([]);
        dispatch(setPage(true));
        return sub;
      }
      return prev;
    });
  }

  return (
    <Ul>
      <Li
        check={!sub}
        onClick={() => {
          filterArticle("");
        }}
      >
        전체
      </Li>
      <Li
        check={sub === "공지"}
        onClick={() => {
          filterArticle("공지");
        }}
      >
        공지
      </Li>
      <Li
        check={sub === "건의"}
        onClick={() => {
          filterArticle("건의");
        }}
      >
        건의
      </Li>
      <Li
        check={sub === "버그"}
        onClick={() => {
          filterArticle("버그");
        }}
      >
        버그
      </Li>
      <Li
        check={sub === "잡담"}
        onClick={() => {
          filterArticle("잡담");
        }}
      >
        잡담
      </Li>
    </Ul>
  );
}
