import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { setChange } from "../../../etc/redux/action";
import { CommentInfo } from "../../../etc/typeDefs";
import Comment from "./Comment";
import CommentInput from "./CommentInput";

const Container = styled.div`
  position: absolute;
  max-width: 450px;
  height: 80vh;
  width: 100%;
  background-color: white;
`;

const Header = styled.div`
  color: white;
  background-color: #183052;
  display: flex;
  justify-content: space-between;
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  align-items: center;
  padding: 8px;
`;

const Span = styled.span`
  margin-left: 12px;
`;

const HColumn = styled.div``;

const Icon = styled.i`
  cursor: pointer;
  font-size: 16px;
`;

const Ul = styled.ul`
  overflow-y: scroll;
  height: 90%;
  padding: 40px 10px 0 10px;
`;

export default function CommentList({
  id,
  setCheckComment,
}: {
  id: number;
  setCheckComment: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [active, setActive] = useState(false);
  const comments = useSelector((state: { comments: CommentInfo[] }) => state.comments);
  const dispatch = useDispatch();

  function refreshComment() {
    dispatch(setChange());
  }

  return (
    <Container>
      <Header>
        <HColumn>
          <Icon className="fas fa-arrow-left" onClick={() => setCheckComment(false)}></Icon>
          <Span>댓글 {comments.length}</Span>
        </HColumn>
        <Icon className="fas fa-redo" onClick={refreshComment}></Icon>
      </Header>
      <Ul onClick={() => setActive(false)}>
        {comments.map((comment) => (
          <Comment key={comment.id} comment={comment} />
        ))}
      </Ul>
      <CommentInput active={active} setActive={setActive} id={id} />
    </Container>
  );
}
