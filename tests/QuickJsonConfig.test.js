const QuickJsonConfig = require('../src/QuickJsonConfig');
const getProjRoot = require("../src/utils/fileUtils").getProjRoot;

const path = require('path');

describe("Constructor w/ Good Path", () => {
  test("simple new", () => {
    let qjc1 = new QuickJsonConfig(path.join(getProjRoot(), "index.js"));
    expect(qjc1).toBeInstanceOf(QuickJsonConfig);
    expect(qjc1.configFile).not.toBeNull();
  })
})

describe("Constructor w/ Bad Path", () => {
  test("simple new", () => {
    let qjc2 = new QuickJsonConfig(path.join(getProjRoot(), "badpath.123"));
    expect(qjc2).toBeInstanceOf(QuickJsonConfig);
    expect(qjc2.configFile).toBeNull();
  })

})