import React, { useCallback } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { UserInfo } from "../../etc/typeDefs";
import { clearToken, SERVER_URL } from "../../etc/utils";
import Loading from "../Loading";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

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
  const dispatch = useDispatch();
  const nav = useNavigate();

  const getUserInfo = useCallback(
    async function () {
      const { userInfo } = await fetch(`${SERVER_URL}/users`, {
        headers: { authorization: `Bearer ${token}` },
      }).then((res) => res.ok && res.json());
      if (userInfo) {
        setUserInfo(userInfo);
        setValue("nickname", userInfo.nickname);
      } else {
        clearToken(dispatch, nav);
      }
    },
    [dispatch, nav, setValue, token]
  );

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
    if (userInfo) alert("????????????!");
    else alert("????????? ??????!");
  }

  function onSubmit() {
    patchUserInfo();
  }

  useEffect(() => {
    getUserInfo();
  }, [getUserInfo]);

  return userInfo ? (
    <Form
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit(onSubmit);
      }}
    >
      <Email>{userInfo.email}</Email>
      <Column>
        <label>?????????</label>
        <Input
          placeholder="2 ~ 8??????"
          defaultValue={nickname}
          {...register("nickname", {
            required: "???????????? ??? ??????????????????",
            validate: {
              check: (value) => {
                const regex = new RegExp(/[^A-Za-z0-9???-???]/);
                const isValid = regex.test(value);

                if (isValid) {
                  return "??????, ??????, ????????? ??????????????????";
                }
              },
            },
            minLength: { value: 2, message: "?????? 2??? ?????? ??????????????????" },
            maxLength: { value: 8, message: "?????? 8??? ????????? ??????????????????" },
          })}
        />
        <ErrorMsg>{errors.nickname ? errors.nickname.message : ""}</ErrorMsg>
      </Column>
      <Button onClick={onSubmit} disabled={!isValid}>
        ??????
      </Button>
    </Form>
  ) : (
    <Loading />
  );
}
