import React from "react";
import styled from "styled-components";

const Footer = styled.footer`
  display: flex;
  justify-content: center;
  flex-direction: column;
  color: #b7bdb9;
  width: 320px;
  margin: 0 auto;
`;
const Content = styled.p`
  padding: 10px;
`;

// eslint-disable-next-line
export default () => {
  const years = new Date(Date.now()).getFullYear();
  return (
    <Footer>
      <ins
        className="kakao_ad_area"
        style={{ display: "none" }}
        data-ad-unit="DAN-flJ5xNfNcBPtoctA"
        data-ad-width="320"
        data-ad-height="100"
      ></ins>
      <Content>
        연락처: voluntad3000@gmail.com
        <br />
        Copyright {years}. 바연젠 all rights reserved.
      </Content>
    </Footer>
  );
};
