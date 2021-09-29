import { useEffect, useState } from "react";
import styled from "styled-components";

const Card = styled.div`
  border: 1px solid black;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  position: relative;
`;
const Column = styled.div`
  display: flex;
  justify-content: space-evenly;
`;
const SubColumn = styled.div`
  font-size: 17px;
  &:nth-child(3) {
    color: red;
  }
`;
const Title = styled.h1`
  font-size: 22px;
`;
const SubTitle = styled.h2``;
const Span = styled.span``;
const Button = styled.button`
  all: unset;
  cursor: pointer;
  width: 80px;
  height: 30px;
  margin: 0 auto;
  border: 1px solid black;
`;
const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 90px;
  width: 90%;
  margin: 0 auto;
  border: 1px solid black;
  padding: 5px;
`;
const Submit = styled.input`
  all: unset;
  border-bottom: 1px solid black;
  cursor: pointer;
`;
const Timer = styled.span`
  font-size: 22px;
  color: ${({ remainTime }) => remainTime < 300000 && "red"};
`;
const DeleteBtn = styled.span`
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
  font-size: 19px;
`;

let arr = [];
const tempCurrent = new Date();
const tempYear = tempCurrent.getFullYear();
const tempMonth = tempCurrent.getMonth() + 1;
const tempDate = tempCurrent.getDate();
const tempHours = tempCurrent.getHours();
const tempMinutes = tempCurrent.getMinutes();
const tempTime = `${tempYear}-${tempMonth < 10 ? `0${tempMonth}` : tempMonth}-${
  tempDate < 10 ? `0${tempDate}` : tempDate
}T${tempHours < 10 ? `0${tempHours}` : tempHours}:${
  tempMinutes < 10 ? `0${tempMinutes}` : tempMinutes
}`;

const CutCard = ({
  db,
  calEstimateByCheck,
  calEstimateByCut,
  calGentime,
  createTimeStamp,
  handleSubmit,
  deleteDB,
}) => {
  const [cutTime, setCutTime] = useState(null);
  const [remainTime, setRemainTime] = useState(db.nextGentime - Date.now());
  const [currentNextGentime, setCurrentNextGentime] = useState(null);
  const [formCheck, setFormCheck] = useState(true);

  const cutEvent = (input, name, gentime, item) => {
    let cutTime;
    if (input !== "_") {
      cutTime = input.getTime();
    } else {
      cutTime = Date.now();
    }
    const obj = {
      id: Date.now(),
      cutTime,
      name,
      gentime,
      item,
      nextGentime: cutTime + gentime,
    };
    if (arr.length > 0) {
      const index = arr.findIndex((ar) => ar.name === obj.name);
      if (index !== -1) {
        arr[index] = obj;
      } else {
        arr.push(obj);
      }
    } else {
      arr.push(obj);
    }
    arr.sort((a, b) => a.nextGentime - b.nextGentime);
    localStorage.setItem("dbs", JSON.stringify(arr));
    setCutTime(cutTime);
    setCurrentNextGentime(obj.nextGentime);
  };

  const timer = () => {
    const hours = Math.floor(remainTime / 1000 / 60 / 60);
    const minutes = Math.floor(remainTime / 1000 / 60 - 60 * hours);
    const seconds = new Date(remainTime).getSeconds();
    if (remainTime > 0) {
      return `${hours < 10 ? `0${hours}` : hours}:${
        minutes < 10 ? `0${minutes}` : minutes
      }:${seconds < 10 ? `0${seconds}` : seconds}`;
    } else {
      return `출현중...`;
    }
  };

  useEffect(() => {
    const temp = setInterval(() => {
      if (currentNextGentime) {
        setRemainTime(currentNextGentime - Date.now());
      } else {
        setRemainTime(db.nextGentime - Date.now());
      }
    }, 1000);
    return () => {
      clearInterval(temp);
      arr = JSON.parse(localStorage.getItem("dbs"));
    };
  }, [db.nextGentime, remainTime, currentNextGentime]);

  return (
    <Card key={Math.random() * 12}>
      <Title>{db.name}</Title>
      {db.cutTime && (
        <DeleteBtn onClick={deleteDB}>
          <i className="fas fa-trash" data-id={db.id}></i>
        </DeleteBtn>
      )}
      <Column>
        <SubColumn>
          <SubTitle>예상젠</SubTitle>
          <Span>
            {db.cutTime
              ? calEstimateByCut(db.cutTime, db.gentime)
              : calEstimateByCheck(db.gentime)}
          </Span>
        </SubColumn>
        <SubColumn>
          <SubTitle>컷타임</SubTitle>
          <Span>
            {cutTime ? createTimeStamp(cutTime) : createTimeStamp(db.cutTime)}
          </Span>
        </SubColumn>
        <SubColumn>
          <SubTitle>다음젠</SubTitle>
          <Span>
            {cutTime
              ? createTimeStamp(cutTime + db.gentime)
              : createTimeStamp(db.cutTime + db.gentime)}
          </Span>
        </SubColumn>
        <SubColumn>
          <SubTitle>젠타임</SubTitle>
          <Span>{calGentime(db.gentime)}</Span>
        </SubColumn>
      </Column>
      <Column>
        <SubTitle>획득템</SubTitle>
        <Span>{db.item}</Span>
      </Column>
      {!isNaN(remainTime) && (
        <Column>
          <Timer remainTime={remainTime}>{timer()}</Timer>
        </Column>
      )}
      {formCheck === true && !db.cutTime ? (
        <Form
          onSubmit={(e) => {
            handleSubmit(e, cutEvent, db.name, db.gentime, db.item);
            setFormCheck(false);
          }}
        >
          <Span>잡은시간</Span>
          <Submit type="datetime-local" defaultValue={tempTime} />
          <Button type="submit">입력</Button>
        </Form>
      ) : null}
      <Button
        onClick={() => {
          cutEvent("_", db.name, db.gentime, db.item);
          setFormCheck(false);
        }}
      >
        CUT
      </Button>
    </Card>
  );
};

export default CutCard;
