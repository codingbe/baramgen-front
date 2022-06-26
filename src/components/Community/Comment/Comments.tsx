import { useEffect } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { setChange } from "../../../etc/redux/action";
import CommentList from "./CommentList";

const Container = styled.div`
  width: 100%;
  height: 100vh;
  position: fixed;
  background-color: rgba(0, 0, 0, 0.4);
  left: 0;
  top: 0;
  z-index: 50;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const BackDrop = styled.div`
  width: 100%;
  height: 100%;
`;

export default function Comments({
  id,
  setCheckComment,
}: {
  id: number;
  setCheckComment: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      dispatch(setChange());
    };
  }, [dispatch]);

  return (
    <Container>
      <BackDrop onClick={() => setCheckComment(false)}></BackDrop>
      <CommentList id={id} setCheckComment={setCheckComment} />
    </Container>
  );
}
