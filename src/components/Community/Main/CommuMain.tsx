import React from "react";
import styled from "styled-components";
import { ArticleInfo } from "../../../etc/typeDefs";
import Loading from "../../Loading";
import NotRecord from "../../Record/NotRecord";
import Card from "./Card";
import Post from "./Post/Post";

const Container = styled.div`
  max-width: 600px;
  margin: 0 auto;
`;

export default function CommuMain({
  articles,
  setLoading,
  setVisible,
  visible,
  setArticles,
  loading,
}: {
  articles: ArticleInfo[];
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
  visible: boolean;
  setArticles: React.Dispatch<React.SetStateAction<ArticleInfo[]>>;
}) {
  return (
    <>
      <Container>
        {articles.length > 0 ? (
          <>
            {articles.map((article, idx) => (
              <Card article={article} key={idx} setVisible={setVisible} setArticles={setArticles} index={idx} />
            ))}
          </>
        ) : loading ? (
          <Loading />
        ) : (
          <NotRecord content="글이 없어요!" />
        )}
      </Container>
      {visible && <Post setVisible={setVisible} setLoading={setLoading} />}
    </>
  );
}
