import styled from "styled-components";
import { useEffect, useState } from "react";
import api from "db/api";

const SelectBox = styled.div``;
const Select = styled.select``;
const Option = styled.option``;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  grid-auto-rows: 250px;
`;

const Gentime = () => {
  const [data, setData] = useState(api.getData());
  const types = [];
  const items = [];

  data.map((db) => {
    const typeIndex = types.findIndex((t) => t === db.type);
    const itemIndex = items.findIndex((i) => i === db.item);
    if (typeIndex === -1) {
      types.push(db.type);
    }
    if (itemIndex === -1) {
      items.push(db.item);
    }
  });

  const handleChange = (e) => {
    console.log(e.target.value);
    // setData를 이용하여 data 변경후 ..?
  };

  return (
    <>
      <SelectBox>
        <Select onChange={handleChange}>
          {types.map((type) => (
            <Option value={type}>{type}</Option>
          ))}
        </Select>
        <Select onChange={handleChange}>
          {items.map((item) => (
            <Option value={item}>{item}</Option>
          ))}
        </Select>
      </SelectBox>
    </>
  );
};

export default Gentime;
