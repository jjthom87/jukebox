var fs = require('fs');

var arr = [];
fs.readdir('./audio/', function(err, filenames) {
  if (err) {
    throw err;
  }
  filenames.forEach(function(filename) {
    arr.push(filename)
  });
  return arr
});