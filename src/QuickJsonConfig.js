const fs = require("fs");

class QuickJsonConfig {

  constructor(configFile) {
    this._configFile = null;
    if (this._checkPath(configFile)) {
      this._configFile = configFile;
      this._readFile();
      this._embedJson();
    };
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
        this._rawData = fs.readFileSync(this._configFile, 'utf8');
        this._jsonData = JSON.parse(this._rawData);
      } catch (error) {
        console.error(error);
      }
    }
  }

  /**
   * Embeds each json element into this class as a public member, then creates a simple get/set method for each
   */
  _embedJson() {
    for (let el in this._jsonData) {
      this[el] = this._jsonData[el];

      let getName = `get${el}`;
      this[getName] = function () {
        return this[el];
      }

      let setName = `set${el}`;
      this[setName] = function (newVal) {
        if (typeof newVal === typeof this[el]) {
          this[el] = newVal;
          this._jsonData[el] = newVal;
        }
      }
    }
  }

}

if (typeof module !== "undefined" && typeof module.exports !== "undefined") {
  module.exports = QuickJsonConfig;
}