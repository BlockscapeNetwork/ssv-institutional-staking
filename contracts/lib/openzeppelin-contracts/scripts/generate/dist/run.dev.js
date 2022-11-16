#!/usr/bin/env node
"use strict";

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var cp = require('child_process');

var fs = require('fs');

var path = require('path');

var format = require('./format-lines');

function getVersion(path) {
  try {
    return fs.readFileSync(path, 'utf8').match(/\/\/ OpenZeppelin Contracts \(last updated v[^)]+\)/)[0];
  } catch (err) {
    return null;
  }
}

for (var _i = 0, _Object$entries = Object.entries({
  // SafeCast
  'utils/math/SafeCast.sol': './templates/SafeCast.js',
  'mocks/SafeCastMock.sol': './templates/SafeCastMock.js',
  // EnumerableSet
  'utils/structs/EnumerableSet.sol': './templates/EnumerableSet.js',
  'mocks/EnumerableSetMock.sol': './templates/EnumerableSetMock.js',
  // EnumerableMap
  'utils/structs/EnumerableMap.sol': './templates/EnumerableMap.js',
  'mocks/EnumerableMapMock.sol': './templates/EnumerableMapMock.js',
  // Checkpoints
  'utils/Checkpoints.sol': './templates/Checkpoints.js',
  'mocks/CheckpointsMock.sol': './templates/CheckpointsMock.js'
}); _i < _Object$entries.length; _i++) {
  var _Object$entries$_i = _slicedToArray(_Object$entries[_i], 2),
      file = _Object$entries$_i[0],
      template = _Object$entries$_i[1];

  var script = path.relative(path.join(__dirname, '../..'), __filename);
  var input = path.join(path.dirname(script), template);
  var output = "./contracts/".concat(file);
  var version = getVersion(output);
  var content = format.apply(void 0, ['// SPDX-License-Identifier: MIT'].concat(_toConsumableArray(version ? [version + " (".concat(file, ")")] : []), ["// This file was procedurally generated from ".concat(input, "."), '', require(template)]));
  fs.writeFileSync(output, content);
  cp.execFileSync('prettier', ['--write', output]);
}