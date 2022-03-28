import RecordHeader from "Components/RecordHeader";
import list from "db/list.json";
import { useCallback, useState, useEffect } from "react";
import datas from "db/data.json";
import Cut from "Components/Cut";
import CheckTime from "Components/CheckTime";

const Record = () => {
  const [keyword, setKeyword] = useState(null);
  const [type, setType] = useState(null);
  const [dbs, setDbs] = useState([]);
  const [checkTime, setCheckTime] = useState(null);

  const getData = useCallback(() => {
    const { data } = datas;
    let temp = null;
    if (type === "맵선택") {
      temp = data.filter((db) => db.map === keyword);
    } else if (type === "아이템선택") {
      temp = data.filter((db) => db.item === keyword);
    }
    setDbs(temp);
  }, [keyword, type]);

  const handleChange = (e) => {
    const {
      value,
      dataset: { type },
    } = e.target;
    setKeyword(value);
    setType(type);
    e.target.value = "";
  };

  const insertCheckTime = (e) => {
    e.preventDefault();
    const value = e.target.querySelector("input").value;
    const tempTime = new Date(value).getTime();
    setCheckTime(tempTime);
    localStorage.setItem("checkTime", tempTime);
  };

  useEffect(() => {
    getData();
    const temp = Number(localStorage.getItem("checkTime"));
    if (temp) {
      setCheckTime(temp);
    }
  }, [getData]);
  return checkTime ? (
    <>
      <RecordHeader maps={list.maps} items={list.items} handleChange={handleChange} />
      <Cut dbs={dbs} checkTime={checkTime} />
    </>
  ) : (
    <CheckTime insertCheckTime={insertCheckTime} />
  );
};

export default Record;
