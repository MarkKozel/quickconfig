class QuickJsonConfig{

  constructor(configFile){
    this.configFile = configFile,
  }
}

if (typeof module !== "undefined" && typeof module.exports !== "undefined") {
  module.exports = QuickJsonConfig;
}