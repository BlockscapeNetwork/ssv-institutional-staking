#!/usr/bin/env node
"use strict";

var path = require('path');

var glob = require('glob');

var startCase = require('lodash.startcase');

var baseDir = process.argv[2];
var files = glob.sync(baseDir + '/**/*.adoc').map(function (f) {
  return path.relative(baseDir, f);
});
console.log('.API');

function getPageTitle(directory) {
  switch (directory) {
    case 'metatx':
      return 'Meta Transactions';

    case 'common':
      return 'Common (Tokens)';

    default:
      return startCase(directory);
  }
}

var links = files.map(function (file) {
  var doc = file.replace(baseDir, '');
  var title = path.parse(file).name;
  return {
    xref: "* xref:".concat(doc, "[").concat(getPageTitle(title), "]"),
    title: title
  };
}); // Case-insensitive sort based on titles (so 'token/ERC20' gets sorted as 'erc20')

var sortedLinks = links.sort(function (a, b) {
  return a.title.toLowerCase().localeCompare(b.title.toLowerCase(), undefined, {
    numeric: true
  });
});
var _iteratorNormalCompletion = true;
var _didIteratorError = false;
var _iteratorError = undefined;

try {
  for (var _iterator = sortedLinks[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
    var link = _step.value;
    console.log(link.xref);
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