import styled from "styled-components";
import Select from "Components/Select";

const Header = styled("header")`
  max-width: 320px;
  width: 100%;
  display: flex;
  justify-content: space-evenly;
  margin: 0 auto;
`;

const RecordHeader = ({ maps, items, handleChange }) => (
  <Header>
    <Select data={maps.sort()} title="맵선택" handleChange={handleChange} />
    <Select
      data={items.sort()}
      title="아이템선택"
      handleChange={handleChange}
    />
  </Header>
);

export default RecordHeader;
