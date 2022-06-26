import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { setComments } from "../../../etc/redux/action";
import { SERVER_URL } from "../../../etc/utils";

const Form = styled.form`
  width: 100%;
  border-top: 1px solid #f2f2f2;
  display: flex;
  height: 10%;
  padding: 5px;
`;
const Before = styled.div`
  width: 100%;
  display: flex;
  color: gray;
  justify-content: space-between;
  height: 100%;
  cursor: pointer;
  align-items: center;
`;
const InputContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
`;
const TextArea = styled.textarea`
  all: unset;
  font-size: 14px;
  padding: 1px;
`;
const InputBottom = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const Button = styled.button<{ check: boolean }>`
  all: unset;
  text-align: center;
  color: ${({ check }) => (check ? "#09a866" : "gray")};
  cursor: pointer;
`;
const TextLength = styled.span``;

export default function CommentInput({
  active,
  setActive,
  id,
}: {
  active: boolean;
  setActive: React.Dispatch<React.SetStateAction<boolean>>;
  id: number;
}) {
  const [text, setText] = useState("");
  const token = useSelector((state: { token: string }) => state.token);
  const dispatch = useDispatch();

  async function createComment(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = await fetch(`${SERVER_URL}/comments`, {
      method: "POST",
      headers: { authorization: `Bearer ${token}`, "Content-Type": "application/json" },
      body: JSON.stringify({ articleId: id, content: text }),
    }).then((res) => res.ok && res.json());
    dispatch(setComments(data.comments));
    setText("");
  }

  useEffect(() => {
    if (active) {
      const ele: any = document.querySelector(".input");
      ele.focus();
    }
  }, [active]);

  return (
    <Form onSubmit={createComment}>
      {active ? (
        <InputContainer>
          <TextArea
            onChange={(e) => {
              let value = e.target.value;
              if (value.length > 200) {
                value = text.slice(0, 200);
                setText(value);
              } else setText(value);
            }}
            value={text}
            className="input"
          />
          <InputBottom>
            <TextLength>{text.length} / 200</TextLength>
            <Button
              check={text && text.length < 200 ? true : false}
              disabled={text && text.length < 200 ? false : true}
            >
              등록
            </Button>
          </InputBottom>
        </InputContainer>
      ) : (
        <Before
          onClick={() => {
            if (token) setActive(true);
            else window.alert("로그인후 이용해주세요!");
          }}
        >
          <span>댓글을 입력해주세요</span>
          <span>등록</span>
        </Before>
      )}
    </Form>
  );
}
