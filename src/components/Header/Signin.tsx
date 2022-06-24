import React from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { setToken } from "../../etc/redux/action";
import { UserInfo } from "../../etc/typeDefs";
import { SERVER_URL } from "../../etc/utils";

const Container = styled.div`
  position: fixed;
  background-color: rgba(0, 0, 0, 0.7);
  height: 100vh;
  width: 100%;
  top: 0;
  left: 0;
  z-index: 30;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 40px;
`;

export default function Signin() {
  const dispatch = useDispatch();
  const route = useNavigate();

  async function requestLogin(code: string) {
    if (SERVER_URL) {
      const { token, userInfo }: { token: string; userInfo: UserInfo } = await fetch(`${SERVER_URL}/users`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: JSON.stringify({ code }),
      }).then((res) => res.ok && res.json());
      dispatch(setToken(token, userInfo));
      localStorage.setItem("token", token);
      route("/");
    }
  }
  useEffect(() => {
    const url = new URL(window.location.href);
    const code = url.searchParams.get("code");
    if (code) requestLogin(code);
  }, []);
  return <Container>로그인중...</Container>;
}
