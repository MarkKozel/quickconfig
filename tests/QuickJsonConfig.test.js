const QuickJsonConfig = require('../src/QuickJsonConfig');
const getProjRoot = require("../src/utils/fileUtils").getProjRoot;

const path = require('path');
// const { fstat } = require('fs');
const fs = require("fs");

let qjcFromFile = null;
let qjcFromJson = null;

let testJson = {
  "FirstName": "Steve",
  "LastName": "Martin",
  "Position": "Standup Philosopher",
  "Shows": [
    {
      "date": "01/21/2016",
      "showName": "Tonight Show",
      "host": "Jimmy Fallon"
    },
    {
      "date": "01/28/2016",
      "showName": "Late night",
      "host": "Steven Colbert"
    }
  ]
}


describe("Constructor", () => {
  test("simple new good file", () => {
    qjcFromFile = new QuickJsonConfig(path.join(getProjRoot(), "tests", "test1.json"));
    expect(qjcFromFile).toBeInstanceOf(QuickJsonConfig);
    expect(qjcFromFile._configFile).not.toBeNull();
    expect(qjcFromFile._jsonData).not.toBeNull();
  });

  test('json object', () => {
    qjcFromJson = new QuickJsonConfig(testJson);
    expect(qjcFromJson).toBeInstanceOf(QuickJsonConfig);
    expect(qjcFromJson._configFile).toBeNull();
    expect(qjcFromJson._jsonData).not.toBeNull();
  });

  test("simple new bad file", () => {
    let qjc2 = new QuickJsonConfig(path.join(getProjRoot(), "badpath.123"));
    expect(qjc2).toBeInstanceOf(QuickJsonConfig);
    expect(qjc2._configFile).toBeNull();
    expect(qjc2._jsonData).toBeUndefined();
  })
})

describe("Creation of functions", () => {
  test("getters", () => {
    expect(qjcFromFile.getFirstName).toBeDefined();
    expect(qjcFromFile.getLastName).toBeDefined();
    expect(qjcFromFile.getPosition).toBeDefined();
    expect(qjcFromFile.getShows).toBeDefined();

    expect(qjcFromJson.getFirstName).toBeDefined();
    expect(qjcFromJson.getLastName).toBeDefined();
    expect(qjcFromJson.getPosition).toBeDefined();
    expect(qjcFromJson.getShows).toBeDefined();
  });

  test("Setters", () => {
    expect(qjcFromFile.setFirstName).toBeDefined();
    expect(qjcFromFile.setLastName).toBeDefined();
    expect(qjcFromFile.setPosition).toBeDefined();
    expect(qjcFromFile.setShows).toBeDefined();

    expect(qjcFromJson.setFirstName).toBeDefined();
    expect(qjcFromJson.setLastName).toBeDefined();
    expect(qjcFromJson.setPosition).toBeDefined();
    expect(qjcFromJson.setShows).toBeDefined();
  })
})

describe("Execute functions", () => {
  test("getters", () => {
    expect(qjcFromFile.getFirstName()).toBe("Steve");
    expect(qjcFromFile.getLastName()).toBe("Martin");
    expect(qjcFromFile.getPosition()).toBe("Standup Philosopher");
    expect(qjcFromFile.getShows().length).toBe(2);

    expect(qjcFromJson.getFirstName()).toBe("Steve");
    expect(qjcFromJson.getLastName()).toBe("Martin");
    expect(qjcFromJson.getPosition()).toBe("Standup Philosopher");
    expect(qjcFromJson.getShows().length).toBe(2);
  })

  test("Setters", () => {
    qjcFromFile.setFirstName("Steven");
    expect(qjcFromFile.getFirstName()).toBe("Steven");
    qjcFromFile.setLastName("Wright");
    expect(qjcFromFile.getLastName()).toBe("Wright");
    qjcFromFile.setPosition("Unusual Delivery");
    expect(qjcFromFile.getPosition()).toBe("Unusual Delivery");

    let array = [{ test: 1 }, { test2: 2 }, { test3: 3 }]
    qjcFromFile.setShows(array)
    expect(qjcFromFile.getShows().length).toBe(3);

    qjcFromJson.setFirstName("Steven");
    expect(qjcFromJson.getFirstName()).toBe("Steven");
    qjcFromJson.setLastName("Wright");
    expect(qjcFromJson.getLastName()).toBe("Wright");
    qjcFromJson.setPosition("Unusual Delivery");
    expect(qjcFromJson.getPosition()).toBe("Unusual Delivery");

    qjcFromJson.setShows(array)
    expect(qjcFromJson.getShows().length).toBe(3);
  })
})

describe("Add elements", () => {
  test("Add Element", () => {
    qjcFromFile._addElement({ Residence: 'Florida' });
    expect(qjcFromFile.setResidence).toBeDefined();
    expect(qjcFromFile.getResidence).toBeDefined();
    expect(qjcFromFile.getResidence()).toBe("Florida");
    qjcFromFile.setResidence("California");
    expect(qjcFromFile.getResidence()).toBe("California");

    qjcFromJson._addElement({ Residence: 'Florida' });
    expect(qjcFromJson.setResidence).toBeDefined();
    expect(qjcFromJson.getResidence).toBeDefined();
    expect(qjcFromJson.getResidence()).toBe("Florida");
    qjcFromJson.setResidence("California");
    expect(qjcFromJson.getResidence()).toBe("California");
  })

  test("Add Array", () => {
    qjcFromFile._addElement({ Dates: ['1/2/34', '3/5/89'] });
    expect(qjcFromFile.setDates).toBeDefined();
    expect(qjcFromFile.getDates).toBeDefined();
    expect(qjcFromFile.getDates().length).toBe(2);
    qjcFromFile.setDates(['1/2/34', '3/5/89', '4/4/24']);
    expect(qjcFromFile.getDates().length).toBe(3);

    qjcFromJson._addElement({ Dates: ['1/2/34', '3/5/89'] });
    expect(qjcFromJson.setDates).toBeDefined();
    expect(qjcFromJson.getDates).toBeDefined();
    expect(qjcFromJson.getDates().length).toBe(2);
    qjcFromJson.setDates(['1/2/34', '3/5/89', '4/4/24']);
    expect(qjcFromJson.getDates().length).toBe(3);
  })

  test("Add Object", () => {
    qjcFromFile._addElement({ Likes: { most: "potatoes", least: "veal" } });
    expect(qjcFromFile.setLikes).toBeDefined();
    expect(qjcFromFile.getLikes).toBeDefined();
    expect(qjcFromFile.getLikes()).toBeDefined();

    qjcFromJson._addElement({ Likes: { most: "potatoes", least: "veal" } });
    expect(qjcFromJson.setLikes).toBeDefined();
    expect(qjcFromJson.getLikes).toBeDefined();
    expect(qjcFromJson.getLikes()).toBeDefined();
  })
});

describe("Save Updates", () => {
  test("readOnly flag", () => {
    expect(qjcFromFile._saveFile('wontSave')).toBeFalsy();
    expect(qjcFromJson._saveFile('wontSave')).toBeFalsy();
  });

  test("write enabled", () => {
    //Write these files outside of project so Jest Watch doesn't loop forever
    let newFile1 = path.join(getProjRoot(), "..", "jestFileSaveTest.json");
    let newFile2 = path.join(getProjRoot(), "..", "jestJsonSaveTest.json");

    qjcFromFile._readOnly = false;
    expect(qjcFromFile._saveFile(newFile1)).toBeTruthy();
    fs.unlinkSync(newFile1);

    qjcFromJson._readOnly = false;
    expect(qjcFromJson._saveFile(newFile2)).toBeTruthy();
    fs.unlinkSync(newFile2);
  })
});