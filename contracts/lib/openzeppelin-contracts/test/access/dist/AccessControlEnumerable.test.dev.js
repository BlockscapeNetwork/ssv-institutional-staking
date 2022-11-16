"use strict";

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

var _require = require('./AccessControl.behavior.js'),
    shouldBehaveLikeAccessControl = _require.shouldBehaveLikeAccessControl,
    shouldBehaveLikeAccessControlEnumerable = _require.shouldBehaveLikeAccessControlEnumerable;

var AccessControlMock = artifacts.require('AccessControlEnumerableMock');

contract('AccessControl', function (accounts) {
  beforeEach(function _callee() {
    return regeneratorRuntime.async(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return regeneratorRuntime.awrap(AccessControlMock["new"]({
              from: accounts[0]
            }));

          case 2:
            this.accessControl = _context.sent;

          case 3:
          case "end":
            return _context.stop();
        }
      }
    }, null, this);
  });
  shouldBehaveLikeAccessControl.apply(void 0, ['AccessControl'].concat(_toConsumableArray(accounts)));
  shouldBehaveLikeAccessControlEnumerable.apply(void 0, ['AccessControl'].concat(_toConsumableArray(accounts)));
});