#!/usr/bin/env node
"use strict";

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var fs = require('fs');

var proc = require('child_process');

var semver = require('semver');

var run = function run(cmd) {
  for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    args[_key - 1] = arguments[_key];
  }

  return proc.execFileSync(cmd, args, {
    encoding: 'utf8'
  }).trim();
};

var gitStatus = run('git', 'status', '--porcelain', '-uno', 'contracts/**/*.sol');

if (gitStatus.length > 0) {
  console.error('Contracts directory is not clean');
  process.exit(1);
}

var _require = require('../../package.json'),
    version = _require.version; // Get latest tag according to semver.


var _run$split$filter$fil = run('git', 'tag').split(/\r?\n/).filter(semver.coerce) // check version can be processed
.filter(function (v) {
  return semver.lt(semver.coerce(v), version);
}) // only consider older tags, ignore current prereleases
.sort(semver.rcompare),
    _run$split$filter$fil2 = _slicedToArray(_run$split$filter$fil, 1),
    tag = _run$split$filter$fil2[0]; // Ordering tag → HEAD is important here.


var files = run('git', 'diff', tag, 'HEAD', '--name-only', 'contracts/**/*.sol').split(/\r?\n/).filter(function (file) {
  return file && !file.match(/mock/i) && fs.existsSync(file);
});
var _iteratorNormalCompletion = true;
var _didIteratorError = false;
var _iteratorError = undefined;

try {
  for (var _iterator = files[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
    var file = _step.value;
    var current = fs.readFileSync(file, 'utf8');
    var updated = current.replace(/(\/\/ SPDX-License-Identifier:.*)$(\n\/\/ OpenZeppelin Contracts .*$)?/m, "$1\n// OpenZeppelin Contracts (last updated v".concat(version, ") (").concat(file.replace('contracts/', ''), ")"));
    fs.writeFileSync(file, updated);
  }
} catch (err) {
  _didIteratorError = true;
  _iteratorError = err;
} finally {
  try {
    if (!_iteratorNormalCompletion && _iterator["return"] != null) {
      _iterator["return"]();
    }
  } finally {
    if (_didIteratorError) {
      throw _iteratorError;
    }
  }
}

run('git', 'add', '--update', 'contracts');