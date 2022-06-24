import React from "react";
import styled from "styled-components";

const Input = styled.textarea`
  font-family: "mabinogi";
  width: 100%;
  height: 80%;
  padding: 8px;
  margin-bottom: 12px;
`;

export default function Text({
  setContent,
  content,
}: {
  setContent: React.Dispatch<React.SetStateAction<string>>;
  content: string;
}) {
  return <Input onChange={(e) => setContent(e.target.value)} value={content} />;
}
