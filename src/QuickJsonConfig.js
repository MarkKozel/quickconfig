const fs = require("fs");

class QuickJsonConfig {

  constructor(configFile) {
    this.configFile = null;
    if (this.checkpath(configFile)) {
      this.configFile = configFile
    };
  }

  checkpath(configFile) {
    if (configFile) {
      if (fs.existsSync(configFile)) {
        return true;
      } else {
        return false;
      }
    }
  }


}

if (typeof module !== "undefined" && typeof module.exports !== "undefined") {
  module.exports = QuickJsonConfig;
}