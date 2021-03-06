import { useState } from "react";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { setToken } from "../../etc/redux/action";
import { clearToken, SERVER_URL } from "../../etc/utils";

const Container = styled.header`
  position: fixed;
  height: 60px;
  width: 100%;
  left: 0;
  top: 0;
  background-color: white;
  z-index: 30;
  box-shadow: rgba(33, 35, 38, 0.1) 0px 10px 10px -10px;
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
  font-size: 15px;
`;
const Li = styled.li`
  margin-left: 12px;
`;
const Rlink = styled(Link)``;
const Alink = styled.a``;

export default function Header() {
  const REDIRECT_URL =
    process.env.REACT_APP_REDIRECT_URL || "http://localhost:3000/signin";
  const GOOGLE_URL = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${process.env.REACT_APP_GOOGLE_CLIENT_ID}&redirect_uri=${REDIRECT_URL}&response_type=code&scope=https://www.googleapis.com/auth/userinfo.email`;
  const dispatch = useDispatch();
  const token = useSelector((state: { token: string }) => state.token);
  const nav = useNavigate();
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout>();

  function requestLogout() {
    clearToken(dispatch, nav);
  }

  async function getToken() {
    const token = localStorage.getItem("token");
    if (token) {
      const { userInfo } = await fetch(`${SERVER_URL}/users`, {
        headers: { authorization: `Bearer ${token}` },
      }).then((res) => res.ok && res.json());
      if (!userInfo) {
        requestLogout();
      } else {
        const expire = localStorage.getItem("expire");
        dispatch(setToken(token, userInfo));
        if (expire) {
          const remain = parseInt(expire) - Date.now();
          if (remain > 0) {
            const id = setTimeout(() => {
              window.alert(
                "????????? ??????????????? ???????????????!\n?????? ????????? ????????????"
              );
              requestLogout();
            }, remain);
            setTimeoutId(id);
          }
        }
      }
    }
  }

  useEffect(() => {
    getToken();
    return () => {
      clearTimeout(timeoutId);
    };
  }, [token]);

  return (
    <Container>
      <Nav>
        <Logo to="/">?????????</Logo>
        <Ul>
          <Li>
            <Rlink to="/record">??????</Rlink>
          </Li>
          <Li>
            <Rlink to="/community">????????????</Rlink>
          </Li>
          {token && (
            <Li>
              <Rlink to="/mypage">?????????</Rlink>
            </Li>
          )}
          <Li>
            {token ? (
              <Rlink onClick={requestLogout} to="/">
                ????????????
              </Rlink>
            ) : (
              <Alink href={GOOGLE_URL}>?????????</Alink>
            )}
          </Li>
        </Ul>
      </Nav>
    </Container>
  );
}
