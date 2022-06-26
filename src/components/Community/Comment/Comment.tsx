import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { setChange } from "../../../etc/redux/action";
import { CommentInfo, UserInfo } from "../../../etc/typeDefs";
import { createCommentTime, SERVER_URL } from "../../../etc/utils";

const Li = styled.li`
  padding: 10px 0;
  border-bottom: 1px solid #f2f2f2;
`;
const Header = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 4px;
`;
const HColumn = styled.div``;
const Icon = styled.i`
  cursor: pointer;
`;
const Content = styled.p`
  white-space: pre;
  font-size: 14px;
`;
const Time = styled.span`
  font-size: 14px;
  color: gray;
`;
const Name = styled.span`
  margin-right: 10px;
  font-size: 16px;
`;

export default function Comment({ comment }: { comment: CommentInfo }) {
  const {
    createdAt,
    content,
    user: { nickname, id },
  } = comment;
  const userInfo = useSelector((state: { userInfo: UserInfo }) => state.userInfo);
  const token = useSelector((state: { token: string }) => state.token);
  const dispatch = useDispatch();

  async function deleteComment(commentId: number) {
    await fetch(`${SERVER_URL}/comments`, {
      method: "DELETE",
      headers: { authorization: `Bearer ${token}`, "Content-Type": "application/json" },
      body: JSON.stringify({ commentId }),
    }).then((res) => res.ok && dispatch(setChange()));
  }

  return (
    <Li>
      <Header>
        <HColumn>
          <Name>{nickname}</Name>
          <Time>{createCommentTime(createdAt)}</Time>
        </HColumn>
        {userInfo.authority ? (
          <Icon onClick={() => deleteComment(comment.id)} className="fas fa-trash"></Icon>
        ) : (
          userInfo.id === id && (
            <Icon
              onClick={() => {
                const check = window.confirm("댓글을 삭제하시겠습니까?");
                check && deleteComment(comment.id);
              }}
              className="fas fa-trash"
            ></Icon>
          )
        )}
      </Header>
      <Content>{content}</Content>
    </Li>
  );
}
