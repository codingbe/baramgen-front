import styled from "styled-components";
import { Link } from "react-router-dom";

const Header = styled.header``;
const Logo = styled(Link)`
  font-size: 40px;
`;
const Ul = styled.ul``;
const Li = styled.li``;
const NavLink = styled(Link)``;

// eslint-disable-next-line
export default () => (
  <Header>
    <Logo to="/">바연젠</Logo>
    <Ul>
      <Li>
        <NavLink to="/">홈</NavLink>
      </Li>
      <Li>
        <NavLink to="/gen">젠타임기록</NavLink>
      </Li>
      <Li>
        <NavLink to="/notice">공지사항</NavLink>
      </Li>
      <Li>
        <NavLink to="/update">업데이트</NavLink>
      </Li>
    </Ul>
  </Header>
);
