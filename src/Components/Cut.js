import styled from "styled-components";
import CutCard from "./CutCard";

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  grid-auto-rows: 250px;
  text-align: center;
  gap: 10px;
  padding: 10px 0;
`;

const Cut = ({ dbs, deleteDB, checkTime, setDbs }) => {
  const DELAY = 1200000;
  const createTimeStamp = (time) => {
    const date = new Date(time);
    const hours = date.getHours();
    const minutes = date.getMinutes();
    if (time > 0) {
      return `${hours < 10 ? `0${hours}` : hours}:${minutes < 10 ? `0${minutes}` : minutes}`;
    }
  };

  const calEstimateByCheck = (gentime) => {
    const count = Math.floor((Date.now() - checkTime) / gentime);
    const time = checkTime + gentime * count;
    const nextTime = checkTime + gentime * (count + 1);
    const current = Date.now();
    if (time + DELAY > current) {
      return createTimeStamp(time);
    } else {
      return createTimeStamp(nextTime);
    }
  };

  const calEstimateByCut = (cutTime, gentime) => {
    const count = Math.floor((Date.now() - cutTime) / gentime);
    const time = cutTime + gentime * count;
    const nextTime = cutTime + gentime * (count + 1);
    const current = Date.now();
    if (time + DELAY > current) {
      return createTimeStamp(time);
    } else {
      return createTimeStamp(nextTime);
    }
  };

  const calGentime = (gentime) => {
    const hours = Math.floor(gentime / 1000 / 60 / 60);
    const minutes = gentime / 1000 / 60 - 60 * hours;
    return `${hours < 10 ? `0${hours}` : hours}:${minutes < 10 ? `0${minutes}` : minutes}`;
  };

  const handleSubmit = (e, func, name, gentime, item) => {
    e.preventDefault();
    const value = e.target.querySelector("input").value;
    const time = new Date(value);
    if (time > 0) {
      func(time, name, gentime, item);
    }
  };
  return (
    <Grid>
      {dbs &&
        dbs.map((db) => (
          <CutCard
            db={db}
            calEstimateByCheck={calEstimateByCheck}
            calEstimateByCut={calEstimateByCut}
            calGentime={calGentime}
            createTimeStamp={createTimeStamp}
            handleSubmit={handleSubmit}
            key={Math.random() * 12}
            deleteDB={deleteDB}
            setDbs={setDbs}
          />
        ))}
    </Grid>
  );
};

export default Cut;
