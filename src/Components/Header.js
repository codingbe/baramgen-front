import styled from "styled-components";
import { Link, withRouter } from "react-router-dom";

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  @media (max-width: 500px) {
    display: flex;
    flex-direction: column;
  }
`;
const Logo = styled(Link)`
  font-size: 40px;
`;
const Ul = styled.ul`
  display: flex;
  justify-content: flex-end;
  @media (max-width: 500px) {
    padding: 10px 0;
  }
`;
const Li = styled.li`
  font-size: 20px;
  margin-left: 10px;
  cursor: pointer;
`;
const NavLink = styled(Link)`
  color: ${({ current }) => current};
`;

// eslint-disable-next-line
export default withRouter(({ location: { pathname }, history }) => (
  <Header>
    <Logo to="/">바연젠</Logo>
    <Ul>
      <Li>
        <NavLink to="/" current={pathname === "/" ? "red" : "inherit"}>
          홈
        </NavLink>
      </Li>
      <Li>
        <NavLink
          to="/record"
          current={pathname === "/record" ? "red" : "inherit"}
        >
          기록
        </NavLink>
      </Li>
      <Li>
        <NavLink
          to="/notice"
          current={pathname === "/notice" ? "red" : "inherit"}
        >
          공지사항
        </NavLink>
      </Li>
      <Li
        onClick={() => {
          const check = window.confirm(
            "초기화를 하시겠습니까?\n모든정보가 사라집니다."
          );
          if (check) {
            localStorage.clear();
            window.location.replace("/");
          }
        }}
      >
        초기화
      </Li>
    </Ul>
  </Header>
));
