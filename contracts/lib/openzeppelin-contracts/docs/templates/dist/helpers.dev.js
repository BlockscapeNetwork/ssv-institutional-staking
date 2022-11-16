"use strict";

var _require = require('../../package.json'),
    version = _require.version;

module.exports['oz-version'] = function () {
  return version;
};

module.exports['readme-path'] = function (opts) {
  return 'contracts/' + opts.data.root.id.replace(/\.adoc$/, '') + '/README.adoc';
};

module.exports.names = function (params) {
  return params.map(function (p) {
    return p.name;
  }).join(', ');
};

module.exports['typed-params'] = function (params) {
  return params.map(function (p) {
    return "".concat(p.type).concat(p.name ? ' ' + p.name : '');
  }).join(', ');
};

var slug = module.exports.slug = function (str) {
  if (str === undefined) {
    throw new Error('Missing argument');
  }

  return str.replace(/\W/g, '-');
};

var linksCache = new WeakMap();

function getAllLinks(items) {
  if (linksCache.has(items)) {
    return linksCache.get(items);
  }

  var res = {};
  linksCache.set(items, res);
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = items[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var item = _step.value;
      res["xref-".concat(item.anchor)] = "xref:".concat(item.__item_context.page, "#").concat(item.anchor);
      res[slug(item.fullName)] = "pass:normal[xref:".concat(item.__item_context.page, "#").concat(item.anchor, "[`").concat(item.fullName, "`]]");
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

  return res;
}

module.exports['with-prelude'] = function (opts) {
  var links = getAllLinks(opts.data.site.items);
  var contents = opts.fn();
  var neededLinks = contents.match(/\{[-._a-z0-9]+\}/ig).map(function (m) {
    return m.replace(/^\{(.+)\}$/, '$1');
  }).filter(function (k) {
    return k in links;
  });
  var prelude = neededLinks.map(function (k) {
    return ":".concat(k, ": ").concat(links[k]);
  }).join('\n');
  return prelude + '\n' + contents;
};