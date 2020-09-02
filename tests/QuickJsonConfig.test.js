const QuickJsonConfig = require('../src/QuickJsonConfig');
const getProjRoot = require("../src/utils/fileUtils").getProjRoot;

const path = require('path');

let qjc1 = new QuickJsonConfig(path.join(getProjRoot(), "tests", "test1.json"));
describe("Constructor", () => {
  //exercises _checkPath(), _readFile(), _embedElement(), and _embedJson() 
  test("simple new good file", () => {
    expect(qjc1).toBeInstanceOf(QuickJsonConfig);
    expect(qjc1._configFile).not.toBeNull();
    expect(qjc1._jsonData).not.toBeNull();
  });

  test("simple new bath file", () => {
    let qjc2 = new QuickJsonConfig(path.join(getProjRoot(), "badpath.123"));
    expect(qjc2).toBeInstanceOf(QuickJsonConfig);
    expect(qjc2._configFile).toBeNull();
    expect(qjc2._jsonData).toMatchObject({});
  })
})

describe("Creation of functions", () => {
  test("getters", () => {
    expect(qjc1.getFirstName).toBeDefined();
    expect(qjc1.getLastName).toBeDefined()
    expect(qjc1.getPosition).toBeDefined()
    expect(qjc1.getShows).toBeDefined()
  });

  test("Setters", () => {
    expect(qjc1.setFirstName).toBeDefined();
    expect(qjc1.setLastName).toBeDefined()
    expect(qjc1.setPosition).toBeDefined()
    expect(qjc1.setShows).toBeDefined()
  })
})

describe("Execute functions", () => {
  test("getters", () => {
    expect(qjc1.getFirstName()).toBe("Steve");
    expect(qjc1.getLastName()).toBe("Martin");
    expect(qjc1.getPosition()).toBe("Standup Philosopher");
    expect(qjc1.getShows().length).toBe(2);
  })

  test("Setters", () => {
    qjc1.setFirstName("Steven");
    expect(qjc1.getFirstName()).toBe("Steven");
    qjc1.setLastName("Wright");
    expect(qjc1.getLastName()).toBe("Wright");
    qjc1.setPosition("Unusual Delivery");
    expect(qjc1.getPosition()).toBe("Unusual Delivery");

    let array = [{ test: 1 }, { test2: 2 }, { test3: 3 }]
    qjc1.setShows(array)
    expect(qjc1.getShows().length).toBe(3);
  })
})

describe("Add elements", () => {
  test("Add Element", () => {
    qjc1._addElement({ Residence: 'Florida' });
    expect(qjc1.setResidence).toBeDefined();
    expect(qjc1.getResidence).toBeDefined();
    expect(qjc1.getResidence()).toBe("Florida");
    qjc1.setResidence("California");
    expect(qjc1.getResidence()).toBe("California");
  })

  test("Add Array", () => {
    qjc1._addElement({ Dates: ['1/2/34', '3/5/89'] });
    expect(qjc1.setDates).toBeDefined();
    expect(qjc1.getDates).toBeDefined();
    expect(qjc1.getDates().length).toBe(2);
    qjc1.setDates(['1/2/34', '3/5/89', '4/4/24']);
    expect(qjc1.getDates().length).toBe(3);
  })

  test("Add Object", () => {
    qjc1._addElement({ Likes: { most: "potatoes", least: "veal" } });
    expect(qjc1.setLikes).toBeDefined();
    expect(qjc1.getLikes).toBeDefined();
    expect(qjc1.getLikes()).toBeDefined();
  })
});