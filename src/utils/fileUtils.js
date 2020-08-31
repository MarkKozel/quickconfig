// const fs = require('fs');
var path = require('path');

exports.getProjRoot = function(){
  return path.join(__dirname,'..', '..');
}