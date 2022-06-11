import React from "react";
import CheckTime from "../components/Record/CheckTime";
import Cut from "../components/Record/Cut";
import NotRecord from "../components/Record/NotRecord";
import { useState } from "react";
import { useEffect } from "react";

const Home = () => {
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
  }, []);

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
