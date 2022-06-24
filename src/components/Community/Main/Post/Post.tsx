import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { setArticle, setChange } from "../../../../etc/redux/action";
import { ArticleInfo, UserInfo } from "../../../../etc/typeDefs";
import { SERVER_URL } from "../../../../etc/utils";
import Footer from "./Footer";
import Header from "./Header";
import Text from "./Text";

const Backdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.4);
  z-index: 100;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Form = styled.form`
  max-width: 600px;
  width: 100%;
  margin: 0 auto;
  height: 60vh;
  background-color: white;
  padding: 15px;
  @media screen and (max-width: 600px) {
    height: 100vh;
  }
`;

export default function Post({
  setVisible,
  setLoading,
}: {
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [category, setCategory] = useState("");
  const [content, setContent] = useState("");
  const token = useSelector((state: { token: string }) => state.token);
  const dispatch = useDispatch();
  const article = useSelector((state: { article: ArticleInfo }) => state.article);

  function validPost() {
    let check = true;
    if (!token || !category || !content) {
      if (!token) window.alert("로그인 후 이용하세요");
      else if (!category) window.alert("카테고리를 선택해주세요");
      else if (!content) window.alert("내용을 입력해주세요");

      check = false;
    }

    return check;
  }

  async function postArticle() {
    if (validPost()) {
      setVisible(false);
      setLoading(true);
      await fetch(`${SERVER_URL}/articles`, {
        method: "POST",
        headers: { authorization: `Bearer ${token}`, "Content-Type": "application/json" },
        body: JSON.stringify({ content, category }),
      });
      dispatch(setChange());
    }
  }

  async function patchArticle(id: number) {
    if (validPost()) {
      setVisible(false);
      setLoading(true);
      await fetch(`${SERVER_URL}/articles`, {
        method: "PATCH",
        headers: { authorization: `Bearer ${token}`, "Content-Type": "application/json" },
        body: JSON.stringify({ id, content, category }),
      });
      dispatch(setChange());
    }
  }

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const length = Object.keys(article).length;
    if (length > 0) patchArticle(article.id);
    else postArticle();
  }

  useEffect(() => {
    if (article) {
      setCategory(article.category);
      setContent(article.content);
    }
    return () => {
      dispatch(setArticle({}));
    };
  }, []);

  return (
    <Backdrop>
      <Form onSubmit={onSubmit}>
        <Header setCategory={setCategory} category={category} setVisible={setVisible} />
        <Text setContent={setContent} content={content} />
        <Footer setVisible={setVisible} />
      </Form>
    </Backdrop>
  );
}
