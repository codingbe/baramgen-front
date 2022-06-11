import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { setToken } from "../../etc/redux/action";
import { SERVER_URL } from "../../etc/utils";

const Container = styled.header`
  position: fixed;
  height: 60px;
  width: 100%;
  left: 0;
  top: 0;
  background-color: white;
  z-index: 30;
`;
const Nav = styled.nav`
  max-width: 1200px;
  width: 100%;
  height: 100%;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 12px;
`;
const Logo = styled(Link)`
  cursor: pointer;
  font-size: 30px;
`;
const Ul = styled.ul`
  display: flex;
`;
const Li = styled.li`
  margin-left: 12px;
`;
const Route = styled(Link)``;
const Alink = styled.a``;

export default function Header() {
  const REDIRECT_URL = "http://localhost:3000/signin";
  const GOOGLE_URL = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${process.env.REACT_APP_GOOGLE_CLIENT_ID}&redirect_uri=${REDIRECT_URL}&response_type=code&scope=https://www.googleapis.com/auth/userinfo.email`;
  const dispatch = useDispatch();
  const token = useSelector((state: { token: string }) => state.token);

  async function getToken() {
    const token = localStorage.getItem("token");
    if (token) {
      const { userInfo } = await fetch(`${SERVER_URL}/users`, { headers: { authorization: `Bearer ${token}` } }).then(
        (res) => res.ok && res.json()
      );
      if (!userInfo) localStorage.removeItem("token");
      else dispatch(setToken(token));
    }
  }

  function requestLogout() {
    localStorage.removeItem("token");
    dispatch(setToken(""));
  }

  useEffect(() => {
    getToken();
  }, [token]);

  return (
    <Container>
      <Nav>
        <Logo to="/">바연젠</Logo>
        <Ul>
          <Li>
            <Route to="/record">기록</Route>
          </Li>
          <Li>
            <Route to="/community">커뮤니티</Route>
          </Li>
          {token && (
            <Li>
              <Route to="/mypage">내정보</Route>
            </Li>
          )}
          <Li>
            {token ? (
              <Route onClick={requestLogout} to="/">
                로그아웃
              </Route>
            ) : (
              <Alink href={GOOGLE_URL}>로그인</Alink>
            )}
          </Li>
        </Ul>
      </Nav>
    </Container>
  );
}
