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

//Second Readonly (default) write attempt
let configObj2 = new QuickJsonConfig(path.join(getProjRoot(), "tests", "test1.json"));

let result = configObj2._saveFile(newFile3, false);
console.log(`Tried to write to Default readOnly. Result: ${result}`)

let configObj3 = new QuickJsonConfig(path.join(getProjRoot(), "tests", "test1.json"), true);

result = configObj3._saveFile(newFile3, false);
console.log(`Tried to write to purposeful readOnly. Result: ${result}`)

//Use object rather than file
let obj1 = {FirstName:"Maria", profession:"software engineer"};
let configObj4 = new QuickJsonConfig(obj1, true);
console.log(configObj4.getFirstName())
result = configObj4._saveFile(newFile3, false);
console.log(`Tried to write to purposeful readOnly. Result: ${result}`)