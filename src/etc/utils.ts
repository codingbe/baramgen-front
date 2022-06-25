import { NavigateFunction } from "react-router-dom";
import { Dispatch } from "redux";
import { setToken } from "./redux/action";

export const SERVER_URL = process.env.REACT_APP_SERVER_URL;

export const currentTime = () => {
  const tempCurrent = new Date();
  const tempYear = tempCurrent.getFullYear();
  const tempMonth = tempCurrent.getMonth() + 1;
  const tempDate = tempCurrent.getDate();
  const tempHours = tempCurrent.getHours();
  const tempMinutes = tempCurrent.getMinutes();
  return `${tempYear}-${tempMonth < 10 ? `0${tempMonth}` : tempMonth}-${tempDate < 10 ? `0${tempDate}` : tempDate}T${
    tempHours < 10 ? `0${tempHours}` : tempHours
  }:${tempMinutes < 10 ? `0${tempMinutes}` : tempMinutes}`;
};

export const clearToken = (dispatch: Dispatch, nav: NavigateFunction) => {
  localStorage.removeItem("token");
  dispatch(setToken("", {}));
  nav("/");
};

export const timeForToday = (value: Date) => {
  const today = new Date();
  const timeValue = new Date(value);
  const year = timeValue.getFullYear();
  const month = timeValue.getMonth() + 1;
  const date = timeValue.getDate();

  const betweenTime = Math.floor((today.getTime() - timeValue.getTime()) / 1000 / 60);
  if (betweenTime < 1) return "방금전";
  if (betweenTime < 60) {
    return `${betweenTime}분전`;
  }

  const betweenTimeHour = Math.floor(betweenTime / 60);
  if (betweenTimeHour < 24) {
    return `${betweenTimeHour}시간전`;
  }

  const betweenTimeDay = Math.floor(betweenTime / 60 / 24);
  if (Math.floor(betweenTimeDay / 365) > 0)
    return `${year}.${month < 10 ? `0${month}` : month}.${date < 10 ? `0${date}` : date}`;
  return `${betweenTimeDay}일전`;
};

export const checkCreatedAt = (created: Date, updated: Date) => {
  const createTime = new Date(created).getTime();
  const updateTime = new Date(updated).getTime();
  const result = updateTime - createTime;
  if (result < 5) return "";
  return " (수정됨)";
};
