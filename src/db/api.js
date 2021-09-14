import bossData from "db/boss.json";

const { data } = bossData;

const api = {
  getData: () => data,
  getDataByItem: (item) => data.filter((db) => db.item === item),
  getDataByMonster: (type) => data.filter((db) => db.type === type),
  getDataByTitle: (name) => data.filter((db) => db.name === name),
};

export default api;
