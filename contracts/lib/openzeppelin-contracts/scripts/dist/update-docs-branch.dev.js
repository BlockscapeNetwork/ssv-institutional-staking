"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _toArray(arr) { return _arrayWithHoles(arr) || _iterableToArray(arr) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _wrapRegExp(re, groups) { _wrapRegExp = function _wrapRegExp(re, groups) { return new BabelRegExp(re, undefined, groups); }; var _RegExp = _wrapNativeSuper(RegExp); var _super = RegExp.prototype; var _groups = new WeakMap(); function BabelRegExp(re, flags, groups) { var _this = _RegExp.call(this, re, flags); _groups.set(_this, groups || _groups.get(re)); return _this; } _inherits(BabelRegExp, _RegExp); BabelRegExp.prototype.exec = function (str) { var result = _super.exec.call(this, str); if (result) result.groups = buildGroups(result, this); return result; }; BabelRegExp.prototype[Symbol.replace] = function (str, substitution) { if (typeof substitution === "string") { var groups = _groups.get(this); return _super[Symbol.replace].call(this, str, substitution.replace(/\$<([^>]+)>/g, function (_, name) { return "$" + groups[name]; })); } else if (typeof substitution === "function") { var _this = this; return _super[Symbol.replace].call(this, str, function () { var args = []; args.push.apply(args, arguments); if (_typeof(args[args.length - 1]) !== "object") { args.push(buildGroups(args, _this)); } return substitution.apply(this, args); }); } else { return _super[Symbol.replace].call(this, str, substitution); } }; function buildGroups(result, re) { var g = _groups.get(re); return Object.keys(g).reduce(function (groups, name) { groups[name] = result[g[name]]; return groups; }, Object.create(null)); } return _wrapRegExp.apply(this, arguments); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _wrapNativeSuper(Class) { var _cache = typeof Map === "function" ? new Map() : undefined; _wrapNativeSuper = function _wrapNativeSuper(Class) { if (Class === null || !_isNativeFunction(Class)) return Class; if (typeof Class !== "function") { throw new TypeError("Super expression must either be null or a function"); } if (typeof _cache !== "undefined") { if (_cache.has(Class)) return _cache.get(Class); _cache.set(Class, Wrapper); } function Wrapper() { return _construct(Class, arguments, _getPrototypeOf(this).constructor); } Wrapper.prototype = Object.create(Class.prototype, { constructor: { value: Wrapper, enumerable: false, writable: true, configurable: true } }); return _setPrototypeOf(Wrapper, Class); }; return _wrapNativeSuper(Class); }

function isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _construct(Parent, args, Class) { if (isNativeReflectConstruct()) { _construct = Reflect.construct; } else { _construct = function _construct(Parent, args, Class) { var a = [null]; a.push.apply(a, args); var Constructor = Function.bind.apply(Parent, a); var instance = new Constructor(); if (Class) _setPrototypeOf(instance, Class.prototype); return instance; }; } return _construct.apply(null, arguments); }

function _isNativeFunction(fn) { return Function.toString.call(fn).indexOf("[native code]") !== -1; }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var proc = require('child_process');

var read = function read(cmd) {
  return proc.execSync(cmd, {
    encoding: 'utf8'
  }).trim();
};

var run = function run(cmd) {
  proc.execSync(cmd, {
    stdio: 'inherit'
  });
};

var tryRead = function tryRead(cmd) {
  try {
    return read(cmd);
  } catch (e) {
    return undefined;
  }
};

var releaseBranchRegex = _wrapRegExp(/^release\x2Dv(([0-9]+)\.([0-9]+)(?:\.([0-9]+))?)$/, {
  version: 1,
  major: 2,
  minor: 3,
  patch: 4
});

var currentBranch = read('git rev-parse --abbrev-ref HEAD');
var match = currentBranch.match(releaseBranchRegex);

if (!match) {
  console.error('Not currently on a release branch');
  process.exit(1);
}

if (/-.*$/.test(require('../package.json').version)) {
  console.error('Refusing to update docs: prerelease detected');
  process.exit(0);
}

var current = match.groups;
var docsBranch = "docs-v".concat(current.major, ".x"); // Fetch remotes and find the docs branch if it exists

run('git fetch --all --no-tags');
var matchingDocsBranches = tryRead("git rev-parse --glob='*/".concat(docsBranch, "'"));

if (!matchingDocsBranches) {
  // Create the branch
  run("git checkout --orphan ".concat(docsBranch));
} else {
  var _ref = new Set(matchingDocsBranches.split('\n')),
      _ref2 = _toArray(_ref),
      publishedRef = _ref2[0],
      others = _ref2.slice(1);

  if (others.length > 0) {
    console.error("Found conflicting ".concat(docsBranch, " branches.\n") + 'Either local branch is outdated or there are multiple matching remote branches.');
    process.exit(1);
  }

  var publishedVersion = JSON.parse(read("git show ".concat(publishedRef, ":package.json"))).version;
  var publishedMinor = publishedVersion.match(_wrapRegExp(/[0-9]+\.([0-9]+)\.[0-9]+/, {
    minor: 1
  })).groups.minor;

  if (current.minor < publishedMinor) {
    console.error('Refusing to update docs: newer version is published');
    process.exit(0);
  }

  run('git checkout --quiet --detach');
  run("git reset --soft ".concat(publishedRef));
  run("git checkout ".concat(docsBranch));
}

run('npm run prepare-docs');
run('git add -f docs'); // --force needed because generated docs files are gitignored

run('git commit -m "Update docs"');
run("git checkout ".concat(currentBranch));