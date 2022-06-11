import React from "react";
import BoardList from "../components/BoardList";
import { data } from "../db/notice";

const Notice = () => {
  const notices = data;
  notices.sort((a, b) => a.id - b.id);
  return <BoardList dbs={notices} />;
};

export default Notice;
