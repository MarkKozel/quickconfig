const fs = require("fs");

class QuickJsonConfig {

  constructor(configFile) {
    this._configFile = null;
    if (this._checkPath(configFile)) {
      this._configFile = configFile;
      this._readFile();
      this._embedJson();
    } else {
      this._jsonData = {};
    }
  }

  /**
   * Returns json object
   * @returns {object} object of json file
   */
  _getJson() {
    if (this._jsonData) {
      return this._jsonData;
    } else {
      return null;
    }
  }

  /**
   * Checks that configFile exists
   * @param {string} configFile 
   * @return {boolean} true if configFile exists, false otherwise 
   */
  _checkPath(configFile) {
    if (configFile) {
      if (fs.existsSync(configFile)) {
        return true;
      } else {
        return false;
      }
    }
  }

  /**
   * Reads and parses configFile
   */
  _readFile() {
    if (this._configFile) {
      try {
        // this._rawData = fs.readFileSync(this._configFile, 'utf8');
        this._jsonData = JSON.parse(fs.readFileSync(this._configFile, 'utf8'));
      } catch (error) {
        console.error(error);
      }
    }
  }

  /**
   * Embeds each json element into this class. Creates a simple get/set method for each
   * @param {object} el - json key-value pair for embedding
   */
  _embedElement(el) {
    let getName = `get${el}`;
    this[getName] = function () {
      return this._jsonData[el];
    }

    let setName = `set${el}`;
    this[setName] = function (newVal) {
      if (typeof newVal === typeof this._jsonData[el]) {
        this._jsonData[el] = newVal;
      }
    }
  }
  /**
   * Traverses json and embeds each element into class
   */
  _embedJson() {
    for (let el in this._jsonData) {
      this._embedElement(el);
    }
  }

  /**
   * Adds a new element if it does not already exist
   * @param {object} obj 
   */
  _addElement(obj) {

    if (typeof obj === 'object') {
      let key = Object.keys(obj)[0]
      let value = Object.values(obj)[0]
      if (!this._jsonData[key]) {
        this._jsonData[key] = value;
      }
      this._embedElement(key);
    }
  }

}

if (typeof module !== "undefined" && typeof module.exports !== "undefined") {
  module.exports = QuickJsonConfig;
}