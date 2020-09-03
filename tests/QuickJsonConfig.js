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

let newFile2 = path.join(getProjRoot(), "tests", "test2.json");
configObj._saveFile(newFile2, false);
console.log(configObj._configFile);

let newFile3 = path.join(getProjRoot(), "tests", "test3.json");
configObj._saveFile(newFile3, true);
console.log(configObj._configFile);

configObj._deleteElement('Residence');