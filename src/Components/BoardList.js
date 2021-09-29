import styled from "styled-components";
import { Link } from "react-router-dom";

const Container = styled.div`
  padding: 10px 0;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  max-width: 720px;
  margin: 0 auto;
`;
const Column = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  padding: 10px 0;
  border-bottom: 1px solid #b7bdb9;
`;
const Date = styled.span``;
const Slink = styled(Link)`
  font-size: 18px;
  &:hover {
    color: red;
  }
`;

const BoardList = ({ dbs }) => (
  <Container>
    {dbs &&
      dbs.map((db) => (
        <Column key={db.id}>
          <Slink to={`/notice/${db.id}`}>{db.title}</Slink>
          <Date>{db.date}</Date>
        </Column>
      ))}
  </Container>
);

export default BoardList;
