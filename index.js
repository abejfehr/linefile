const fs = require('fs');

module.exports = function(file, nested, callback) {
  if (typeof nested == 'function') {
    callback = nested;
    nested = false;
  }
  if (!callback) {
    return parse(fs.readFileSync(file, 'utf8'), nested);
  }
  fs.readFile(file, 'utf8', (err, data) => {
    if (err) return callback(err);
    callback(null, parse(data, nested));
  });
};

exports.save = function(file, array, callback) {
  var data = stringify(array);
  if (!callback) {
    return fs.writeFileSync(file, data);
  }
  fs.writeFile(file, data, callback);
};

// TODO: Implement nesting, just rewrite the functions below
function parse(data, nested) {
  return data
    .trim()
    .split(/[\r\n]+/)
    .map(line => line.trim())
    .filter(line => line != '' && line.substr(0, 1) != '#');
}

function stringify(array, nested) {
  return array.join('\n');
}