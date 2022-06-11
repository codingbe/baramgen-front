import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { UserInfo } from "../../etc/typeDefs";
import { SERVER_URL } from "../../etc/utils";
import Loading from "../Loading";
import { useForm } from "react-hook-form";

const Form = styled.form`
  max-width: 500px;
  width: 100%;
  padding: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
`;
const Input = styled.input`
  all: unset;
  border-bottom: 1px solid black;
`;
const Column = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const Button = styled.button`
  all: unset;
  padding: 10px 20px;
  background-color: rgba(0, 0, 0, 0.5);
  margin-top: 15px;
  border-radius: 5px;
  cursor: ${(props) => (props.disabled ? "" : "pointer")};
  color: white;
  opacity: ${(props) => (props.disabled ? 0.6 : 1)};
  &:hover {
    background-color: ${(props) => (props.disabled ? "" : "rgba(0, 0, 0, 0.4)")};
  }
`;
const Email = styled.span`
  margin-bottom: 10px;
`;
const ErrorMsg = styled.span`
  color: red;
`;
export default function Mypage() {
  const [userInfo, setUserInfo] = useState<UserInfo>();
  const {
    register,
    handleSubmit,
    getValues,
    setValue,
    formState: { errors, isValid },
  } = useForm({ mode: "onChange" });
  const { nickname } = getValues();
  const token = useSelector((state: { token: string }) => state.token);

  async function getUserInfo() {
    const { userInfo } = await fetch(`${SERVER_URL}/users`, {
      headers: { authorization: `Bearer ${token}` },
    }).then((res) => res.ok && res.json());
    if (userInfo) {
      setUserInfo(userInfo);
      setValue("nickname", userInfo.nickname);
    }
  }

  async function patchUserInfo() {
    const { nickname } = getValues();
    const { userInfo } = await fetch(`${SERVER_URL}/users`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify({ nickname }),
    }).then((res) => res.ok && res.json());
    if (userInfo) alert("수정완료!");
    else alert("수정실패!");
  }

  function onSubmit() {
    patchUserInfo();
  }

  useEffect(() => {
    getUserInfo();
  }, [token]);

  return userInfo ? (
    <Form
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit(onSubmit);
      }}
    >
      <Email>{userInfo.email}</Email>
      <Column>
        <label>닉네임</label>
        <Input
          placeholder="2 ~ 8글자"
          defaultValue={nickname}
          {...register("nickname", {
            required: "닉네임을 꼭 입력해주세요",
            validate: {
              check: (value) => {
                const regex = new RegExp(/[^A-Za-z0-9가-힣]/);
                const isValid = regex.test(value);

                if (isValid) {
                  return "숫자, 영어, 한글만 입력해주세요";
                }
              },
            },
            minLength: { value: 2, message: "최소 2자 이상 입력해주세요" },
            maxLength: { value: 8, message: "최대 8자 이하로 입력해주세요" },
          })}
        />
        <ErrorMsg>{errors.nickname ? errors.nickname.message : ""}</ErrorMsg>
      </Column>
      <Button onClick={onSubmit} disabled={!isValid}>
        수정
      </Button>
    </Form>
  ) : (
    <Loading />
  );
}
