import styled from "styled-components";

const Footer = styled.footer`
  display: flex;
  justify-content: center;
`;
const Content = styled.p``;

// eslint-disable-next-line
export default () => {
  const years = new Date(Date.now()).getFullYear();
  return (
    <Footer>
      <Content>
        연락처: voluntad3000@gmail.com
        <br />
        Copyright {years}. 바연젠 all rights reserved.
      </Content>
    </Footer>
  );
};
