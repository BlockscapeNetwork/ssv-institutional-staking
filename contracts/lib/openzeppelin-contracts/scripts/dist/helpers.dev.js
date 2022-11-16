"use strict";

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function chunk(array) {
  var size = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
  return Array.range(Math.ceil(array.length / size)).map(function (i) {
    return array.slice(i * size, i * size + size);
  });
}

function range(start) {
  var stop = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined;
  var step = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;

  if (!stop) {
    stop = start;
    start = 0;
  }

  return start < stop ? Array(Math.ceil((stop - start) / step)).fill().map(function (_, i) {
    return start + i * step;
  }) : [];
}

function unique(array) {
  var op = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function (x) {
    return x;
  };
  return array.filter(function (obj, i) {
    return array.findIndex(function (entry) {
      return op(obj) === op(entry);
    }) === i;
  });
}

function zip() {
  for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  return Array(Math.max.apply(Math, _toConsumableArray(args.map(function (arg) {
    return arg.length;
  })))).fill(null).map(function (_, i) {
    return args.map(function (arg) {
      return arg[i];
    });
  });
}

module.exports = {
  chunk: chunk,
  range: range,
  unique: unique,
  zip: zip
};