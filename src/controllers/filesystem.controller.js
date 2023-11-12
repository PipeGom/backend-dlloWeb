const { readFileSync, writeFileSync, appendFileSync } = require("fs");

const saveData = (path, data) => {
  const currentData = getData(path);
  currentData.push(data);
  console.log(currentData);
  writeFileSync(path, JSON.stringify(currentData));
};

const getData = (path) => {
  const stringInfo = readFileSync(path);
  return JSON.parse(stringInfo);
};

module.exports = { saveData, getData };
