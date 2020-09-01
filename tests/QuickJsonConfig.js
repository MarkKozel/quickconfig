const QuickJsonConfig = require('../src/QuickJsonConfig');
const getProjRoot = require("../src/utils/fileUtils").getProjRoot;

const path = require('path');

let configObj = new QuickJsonConfig(path.join(getProjRoot(), "tests", "test1.json"));

// configObj.setFirstName("Steven");
console.log(configObj.getFirstName())
console.log(configObj.getLastName())
console.log(configObj.getPosition())
console.log(configObj.getShows())

configObj.setFirstName("Gern");
configObj.setLastName("Blanston");
configObj.setPosition("Plain old person");
configObj.setShows([
  {
    "location": "home",
    "when": "most nights"
  }
]);

console.log(configObj.getFirstName())
console.log(configObj.getLastName())
console.log(configObj.getPosition())
console.log(configObj.getShows())

let obj = configObj._getJson();
console.log(obj)

configObj._addElement({Residence: 'home'});

obj = configObj._getJson();
console.log(obj)