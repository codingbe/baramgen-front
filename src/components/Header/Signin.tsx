import React, { useCallback } from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { setToken } from "../../etc/redux/action";
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

  const requestLogin = useCallback(
    async function (code: string) {
      if (SERVER_URL) {
        try {
          const { token, expire }: { token: string; expire: number } =
            await fetch(`${SERVER_URL}/users`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                // 'Content-Type': 'application/x-www-form-urlencoded',
              },
              body: JSON.stringify({ code }),
            }).then((res) => res.ok && res.json());
          dispatch(setToken(token));
          localStorage.setItem("token", token);
          localStorage.setItem("expire", String(Date.now() + expire));
          route("/");
        } catch {
          route("/");
        }
      }
    },
    [dispatch, route]
  );

  useEffect(() => {
    const url = new URL(window.location.href);
    const code = url.searchParams.get("code");
    if (code) requestLogin(code);
    else route("/");
  }, [requestLogin, route]);
  return <Container>로그인중...</Container>;
}
