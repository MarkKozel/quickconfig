const QuickJsonConfig = require('../src/QuickJsonConfig');
const getProjRoot = require("../src/utils/fileUtils").getProjRoot;

const path = require('path');

let configObj = new QuickJsonConfig(path.join(getProjRoot(), "tests", "test1.json"));

if (configObj.rereadFile()) {
  console.info("Successfully reread file");
} else {
  console.info("Failed reread file");
}

let jsonObj = {
  el1: 1,
  el2: "two"
}

let jsonConfigObj = new QuickJsonConfig(jsonObj);

if (!jsonConfigObj.rereadFile()) {
  console.info("Successfully did not reread object");
} else {
  console.info("Failed by rereading object");
}
