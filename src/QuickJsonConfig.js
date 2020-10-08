const fs = require("fs");

class QuickJsonConfig {

  constructor(srcData, readOnly = true) {
    this._configFile = null;
    this._readOnly = readOnly;
    this._isFile = false;

    if (typeof srcData === 'string' || srcData instanceof String) {
      if(fs.existsSync(srcData)){
        this._configFile = srcData;
        this._readFile();
        this._isFile = true;
      }
      
    } else {
      if (typeof srcData === 'object' || srcData instanceof Object) {
        this._jsonData = srcData;
      } else {
        this._jsonData = {};
        return;
      }
    }
    this._embedJson();
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

  /**
   * Removed element from class, and deleted get/set functions
   * @param {string} el - element to remove
   */
  _deleteElement(el) {
    if (this._jsonData[el]) {
      delete this._jsonData[el];
      let getName = `get${el}`;
      delete this[getName];
      let setName = `set${el}`;
      delete this[setName];
    }
  }

  /**
   * Writes json out to disk. If fileName is supplied, write to that file. If switchToNew is true,
   * make fileName the active file from future actions
   * classes initially created from JSON rather that a file can be saved as long as a filename is supplied
   * @param {string} fileName - path/name of file to save. Null indicates overwrite configFile
   * @param {boolean} switchToNew - After saving to new file, use new file name for future saves
   * @returns {boolean} - true if successful, false if error writing -or- readOnly
   */
  _saveFile(fileName, switchToNew = false) {
    let result = false;

    // if (!this._readOnly && this._configFile !== null) {
      if (!this._readOnly && (this._isFile || (!this._isFile && fileName))) {
      let currFileName = ((typeof fileName === 'undefined') || (fileName === null)) ? this._configFile : fileName;
      try {
        fs.writeFileSync(currFileName, JSON.stringify(this._jsonData, null, 2), ['utf8', 'w']);
        result = true;
      } catch (error) {
        console.error(error);
      }
      if ((fileName !== null) && switchToNew) {
        this._configFile = fileName
      }
    }
    return result;
  }

}

if (typeof module !== "undefined" && typeof module.exports !== "undefined") {
  module.exports = QuickJsonConfig;
}