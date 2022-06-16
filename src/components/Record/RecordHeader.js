import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Select from "./Select";

const Header = styled("div")`
  max-width: 320px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin: 0 auto;
  padding: 0 15px;
`;

const RecordHeader = ({ maps, items, handleChange }) => {
  const nav = useNavigate();
  function clearData() {
    const check = window.confirm("기록 데이터를 초기화 하시겠습니까?");
    if (check) localStorage.setItem("dbs", JSON.stringify([]));
    nav("/");
  }

  return (
    <Header>
      <Select data={maps.sort()} title="맵선택" handleChange={handleChange} />
      <Select data={items.sort()} title="아이템선택" handleChange={handleChange} />
      <span onClick={clearData}>초기화</span>
    </Header>
  );
};

export default RecordHeader;
