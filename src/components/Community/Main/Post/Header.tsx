import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { UserInfo } from "../../../../etc/typeDefs";

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 12px;
`;
const Column = styled.div``;
const Icon = styled.i`
  font-size: 18px;
  cursor: pointer;
`;
const Label = styled.label`
  margin-right: 10px;
`;
const Input = styled.input``;

export default function Header({
  setCategory,
  category,
  setVisible,
}: {
  setCategory: React.Dispatch<React.SetStateAction<string>>;
  category: string;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const userInfo = useSelector((state: { userInfo: UserInfo }) => state.userInfo);
  return (
    <Container>
      <Column>
        {userInfo.authority && (
          <Label>
            <Input
              type="checkbox"
              value="공지"
              checked={category === "공지"}
              onChange={(e) => setCategory(e.target.value)}
            />
            공지
          </Label>
        )}
        <Label>
          <Input
            type="checkbox"
            value="건의"
            checked={category === "건의"}
            onChange={(e) => setCategory(e.target.value)}
          />
          건의
        </Label>
        <Label>
          <Input
            type="checkbox"
            value="버그"
            checked={category === "버그"}
            onChange={(e) => setCategory(e.target.value)}
          />
          버그
        </Label>
        <Label>
          <Input
            type="checkbox"
            value="잡담"
            checked={category === "잡담"}
            onChange={(e) => setCategory(e.target.value)}
          />
          잡담
        </Label>
      </Column>
      <Icon className="fas fa-times" onClick={() => setVisible(false)}></Icon>
    </Container>
  );
}
