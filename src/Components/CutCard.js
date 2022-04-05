import { useEffect, useState } from "react";
import styled from "styled-components";
import { currentTime } from "../util";

const Card = styled.div`
   display: flex;
   flex-direction: column;
   justify-content: space-evenly;
   position: relative;
   box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
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
   box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
   transition: 0.6s;
   &:hover {
      background-color: #f2f2f2;
   }
`;
const Form = styled.form`
   display: flex;
   flex-direction: column;
   justify-content: space-between;
   height: 90px;
   width: 90%;
   margin: 0 auto;
   padding: 5px;
   box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
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

const CutCard = ({
   db,
   calEstimateByCheck,
   calEstimateByCut,
   calGentime,
   createTimeStamp,
   handleSubmit,
   deleteDB,
   setDbs,
}) => {
   const [cutTime, setCutTime] = useState(null);
   const [remainTime, setRemainTime] = useState(db.nextGentime - Date.now());
   const [currentNextGentime, setCurrentNextGentime] = useState(null);
   const [formCheck, setFormCheck] = useState(true);

   const saveDB = (obj) => {
      const db = JSON.parse(localStorage.getItem("dbs"));
      const index = db.findIndex((data) => data.name === obj.name);
      if (index !== -1) {
         db[index] = obj;
      } else {
         db.push(obj);
      }
      db.sort((a, b) => a.nextGentime - b.nextGentime);
      localStorage.setItem("dbs", JSON.stringify(db));
      setDbs && setDbs(db);
   };

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
      saveDB(obj);
      setCutTime(cutTime);
      setCurrentNextGentime(obj.nextGentime);
      setRemainTime(obj.nextGentime - Date.now() - 100);
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
                  {cutTime
                     ? createTimeStamp(cutTime)
                     : createTimeStamp(db.cutTime)}
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
               <Submit type="datetime-local" defaultValue={currentTime()} />
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
