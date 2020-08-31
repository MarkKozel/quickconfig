const QuickJsonConfig = require('../src/QuickJsonConfig');
const getProjRoot = require("../src/utils/fileUtils").getProjRoot;

const path = require('path');

let qjc1 = new QuickJsonConfig(path.join(getProjRoot(), "index.js"));
console.log(qjc1.configFile);

let qjc2 = new QuickJsonConfig(path.join(getProjRoot(), "badpath.123"));
console.log(qjc2.configFile);
