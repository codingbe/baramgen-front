import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { setArticle, setChange, setComments } from "../../../etc/redux/action";
import { ArticleInfo, UserInfo } from "../../../etc/typeDefs";
import { checkCreatedAt, SERVER_URL, timeForToday } from "../../../etc/utils";
import Comments from "../Comment/Comments";

const Container = styled.div`
  box-shadow: rgba(0, 0, 0, 0.15) 0px 5px 15px 0px;
  margin-bottom: 25px;
`;
const Column = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #f2f2f2;
  padding: 8px;
`;
const Content = styled.p`
  padding: 10px;
  line-height: 16px;
  font-size: 13px;
  white-space: pre;
`;
const Span = styled.span`
  margin-left: 10px;
  font-size: 14px;
`;
const Footer = styled.div`
  display: flex;
  margin: 0 auto;
  padding: 10px;
  max-width: 200px;
  width: 100%;
  justify-content: space-between;
`;
const ToolBox = styled.div``;
const Button = styled.button`
  all: unset;
  cursor: pointer;
`;
const Count = styled.span`
  margin-left: 5px;
`;
const Icon = styled.i``;

export default function Card({
  article,
  setVisible,
  setArticles,
  index,
}: {
  article: ArticleInfo;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
  setArticles: React.Dispatch<React.SetStateAction<ArticleInfo[]>>;
  index: number;
}) {
  const userInfo = useSelector((state: { userInfo: UserInfo }) => state.userInfo);
  const token = useSelector((state: { token: string }) => state.token);
  const dispatch = useDispatch();
  const [check, setCheck] = useState(false);
  const [checkComment, setCheckComment] = useState(false);

  function setStateForEdit() {
    dispatch(setArticle(article));
    setVisible(true);
  }

  async function deleteArticle(id: number) {
    await fetch(`${SERVER_URL}/articles`, {
      method: "DELETE",
      headers: { authorization: `Bearer ${token}`, "content-type": "application/json" },
      body: JSON.stringify({ id }),
    }).then((res) => res.ok && dispatch(setChange()));
  }

  const likeArticle = useCallback(
    async function (id: number) {
      const length = Object.keys(userInfo).length;
      if (length > 0) {
        const data = await fetch(`${SERVER_URL}/articles/like`, {
          method: "PATCH",
          headers: { authorization: `Bearer ${token}`, "content-type": "application/json" },
          body: JSON.stringify({ articleId: id }),
        }).then((res) => res.ok && res.json());
        setCheck(data.like);
        setArticles((prev) => {
          const clone = prev.slice();
          if (data.like) clone[index].likes.push(data.likeInfo);
          else {
            clone[index].likes = clone[index].likes.filter((like) => userInfo.id !== like.userId);
          }
          return clone;
        });
      } else window.alert("로그인 후 이용해주세요!");
    },
    [index, setArticles, token, userInfo]
  );

  const checkLikeArticle = useCallback(
    function () {
      const index = article.likes.findIndex(
        (like: { id: number; userId: number; articleId: number }) => like.userId === userInfo.id
      );

      if (index !== -1) {
        setCheck(true);
      } else setCheck(false);
    },
    [article.likes, userInfo.id]
  );

  function beforeComment() {
    dispatch(setComments(article.comments));
    setCheckComment(true);
  }

  useEffect(() => {
    if (checkComment) {
      dispatch(setComments(article.comments));
    }
  }, [article.comments, checkComment, dispatch]);

  useEffect(() => {
    const length = Object.keys(userInfo).length;

    if (length > 0) checkLikeArticle();
  }, [checkLikeArticle, userInfo]);

  return (
    <>
      <Container>
        <Column>
          <Span style={{ margin: 0 }}>
            {article.category} 🟠 {article.user.nickname}
          </Span>
          <ToolBox>
            {userInfo.id === article.userId ? (
              <>
                <Span>
                  <i className="fas fa-edit" style={{ cursor: "pointer" }} onClick={setStateForEdit}></i>
                </Span>
                <Span
                  onClick={() => {
                    const check = window.confirm("삭제 하시겠습니까?");
                    check && deleteArticle(article.id);
                  }}
                >
                  <i className="fas fa-trash" style={{ cursor: "pointer" }}></i>
                </Span>
              </>
            ) : (
              userInfo.authority && (
                <Span onClick={() => deleteArticle(article.id)}>
                  <i className="fas fa-trash" style={{ cursor: "pointer" }}></i>
                </Span>
              )
            )}
            <Span>
              {timeForToday(article.createdAt)} {checkCreatedAt(article.createdAt, article.updatedAt)}
            </Span>
          </ToolBox>
        </Column>
        <Content>{article.content}</Content>
        <Footer>
          <Button onClick={() => likeArticle(article.id)}>
            <Icon className="fas fa-heart" style={{ color: check ? "red" : "" }}></Icon>
            <Count>{article.likes.length}</Count>
          </Button>
          <Button onClick={() => beforeComment()}>
            <Icon className="fas fa-comment-dots"></Icon>
            <Count>{article.comments.length}</Count>
          </Button>
        </Footer>
      </Container>
      {checkComment && <Comments id={article.id} setCheckComment={setCheckComment} />}
    </>
  );
}
