import CheckTime from "Components/CheckTime";
import Cut from "Components/Cut";
import NotRecord from "Components/NotRecord";
import { useState } from "react";
import { useEffect } from "react";

const Home = ({ match }) => {
  const [dbs, setDbs] = useState([]);
  const [checkTime, setCheckTime] = useState(Number(localStorage.getItem("checkTime")));

  const deleteDB = (e) => {
    const {
      dataset: { id },
    } = e.target;
    const local = JSON.parse(localStorage.getItem("dbs"));
    const temp = local.filter((db) => db.id !== Number(id));
    localStorage.setItem("dbs", JSON.stringify(temp));
    setDbs(temp);
  };

  const insertCheckTime = (e) => {
    e.preventDefault();
    const value = e.target.querySelector("input").value;
    const tempTime = new Date(value).getTime();
    setCheckTime(tempTime);
    localStorage.setItem("checkTime", tempTime);
  };

  useEffect(() => {
    const temp = JSON.parse(localStorage.getItem("dbs"));
    if (temp) {
      setDbs(temp);
    } else {
      localStorage.setItem("dbs", JSON.stringify([]));
    }
  }, [match]);

  return checkTime ? (
    dbs.length !== 0 ? (
      <Cut dbs={dbs} deleteDB={deleteDB} setDbs={setDbs} />
    ) : (
      <NotRecord />
    )
  ) : (
    <CheckTime insertCheckTime={insertCheckTime} />
  );
};

export default Home;
