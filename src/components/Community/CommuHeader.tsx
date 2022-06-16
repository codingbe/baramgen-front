import styled from "styled-components";

const Nav = styled.nav``;
const SearchColumn = styled.div``;
const Select = styled.select``;
const Option = styled.option``;
const Input = styled.input``;
const Search = styled.button``;

export default function CommuHeader() {
  return (
    <Nav>
      <SearchColumn>
        <Select>
          <Option>내용</Option>
          <Option>이름</Option>
        </Select>
        <Input />
        <Search />
      </SearchColumn>
    </Nav>
  );
}
