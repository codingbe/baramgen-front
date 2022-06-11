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
