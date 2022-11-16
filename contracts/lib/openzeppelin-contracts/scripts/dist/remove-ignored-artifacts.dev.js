#!/usr/bin/env node
// This script removes the build artifacts of ignored contracts.
"use strict";

var fs = require('fs');

var path = require('path');

var match = require('micromatch');

function readJSON(path) {
  return JSON.parse(fs.readFileSync(path));
}

var pkgFiles = readJSON('package.json').files; // Get only negated patterns.

var ignorePatterns = pkgFiles.filter(function (pat) {
  return pat.startsWith('!');
}) // Remove the negation part. Makes micromatch usage more intuitive.
.map(function (pat) {
  return pat.slice(1);
});
var ignorePatternsSubtrees = ignorePatterns // Add **/* to ignore all files contained in the directories.
.concat(ignorePatterns.map(function (pat) {
  return path.join(pat, '**/*');
})).map(function (p) {
  return p.replace(/^\//, '');
});
var artifactsDir = 'build/contracts';
var buildinfo = 'artifacts/build-info';
var filenames = fs.readdirSync(buildinfo);
var n = 0;
var _iteratorNormalCompletion = true;
var _didIteratorError = false;
var _iteratorError = undefined;

try {
  for (var _iterator = filenames[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
    var filename = _step.value;
    var solcOutput = readJSON(path.join(buildinfo, filename)).output;

    for (var sourcePath in solcOutput.contracts) {
      var ignore = match.any(sourcePath, ignorePatternsSubtrees);

      if (ignore) {
        for (var contract in solcOutput.contracts[sourcePath]) {
          fs.unlinkSync(path.join(artifactsDir, contract + '.json'));
          n += 1;
        }
      }
    }
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

console.error("Removed ".concat(n, " mock artifacts"));