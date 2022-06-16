import React from "react";
import styled from "styled-components";

const Lists = styled("select")`
  all: unset;
  cursor: pointer;
`;
const List = styled("option")``;

const Select = ({ data, title, handleChange }) => (
  <Lists data-type={title} onChange={handleChange}>
    <List value="">{title}</List>
    {data.map((db) => (
      <List key={db} value={db}>
        {db}
      </List>
    ))}
  </Lists>
);

export default Select;
