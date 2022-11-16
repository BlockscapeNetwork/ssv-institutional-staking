"use strict";

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var _require = require('@openzeppelin/test-helpers'),
    expectRevert = _require.expectRevert,
    expectEvent = _require.expectEvent;

var _require2 = require('chai'),
    expect = _require2.expect;

var UpgradeableBeacon = artifacts.require('UpgradeableBeacon');

var Implementation1 = artifacts.require('Implementation1');

var Implementation2 = artifacts.require('Implementation2');

contract('UpgradeableBeacon', function (accounts) {
  var _accounts = _slicedToArray(accounts, 2),
      owner = _accounts[0],
      other = _accounts[1];

  it('cannot be created with non-contract implementation', function _callee() {
    return regeneratorRuntime.async(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return regeneratorRuntime.awrap(expectRevert(UpgradeableBeacon["new"](accounts[0]), 'UpgradeableBeacon: implementation is not a contract'));

          case 2:
          case "end":
            return _context.stop();
        }
      }
    });
  });
  context('once deployed', function _callee7() {
    return regeneratorRuntime.async(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            beforeEach('deploying beacon', function _callee2() {
              return regeneratorRuntime.async(function _callee2$(_context2) {
                while (1) {
                  switch (_context2.prev = _context2.next) {
                    case 0:
                      _context2.next = 2;
                      return regeneratorRuntime.awrap(Implementation1["new"]());

                    case 2:
                      this.v1 = _context2.sent;
                      _context2.next = 5;
                      return regeneratorRuntime.awrap(UpgradeableBeacon["new"](this.v1.address, {
                        from: owner
                      }));

                    case 5:
                      this.beacon = _context2.sent;

                    case 6:
                    case "end":
                      return _context2.stop();
                  }
                }
              }, null, this);
            });
            it('returns implementation', function _callee3() {
              return regeneratorRuntime.async(function _callee3$(_context3) {
                while (1) {
                  switch (_context3.prev = _context3.next) {
                    case 0:
                      _context3.t0 = expect;
                      _context3.next = 3;
                      return regeneratorRuntime.awrap(this.beacon.implementation());

                    case 3:
                      _context3.t1 = _context3.sent;
                      _context3.t2 = this.v1.address;
                      (0, _context3.t0)(_context3.t1).to.equal(_context3.t2);

                    case 6:
                    case "end":
                      return _context3.stop();
                  }
                }
              }, null, this);
            });
            it('can be upgraded by the owner', function _callee4() {
              var v2, receipt;
              return regeneratorRuntime.async(function _callee4$(_context4) {
                while (1) {
                  switch (_context4.prev = _context4.next) {
                    case 0:
                      _context4.next = 2;
                      return regeneratorRuntime.awrap(Implementation2["new"]());

                    case 2:
                      v2 = _context4.sent;
                      _context4.next = 5;
                      return regeneratorRuntime.awrap(this.beacon.upgradeTo(v2.address, {
                        from: owner
                      }));

                    case 5:
                      receipt = _context4.sent;
                      expectEvent(receipt, 'Upgraded', {
                        implementation: v2.address
                      });
                      _context4.t0 = expect;
                      _context4.next = 10;
                      return regeneratorRuntime.awrap(this.beacon.implementation());

                    case 10:
                      _context4.t1 = _context4.sent;
                      _context4.t2 = v2.address;
                      (0, _context4.t0)(_context4.t1).to.equal(_context4.t2);

                    case 13:
                    case "end":
                      return _context4.stop();
                  }
                }
              }, null, this);
            });
            it('cannot be upgraded to a non-contract', function _callee5() {
              return regeneratorRuntime.async(function _callee5$(_context5) {
                while (1) {
                  switch (_context5.prev = _context5.next) {
                    case 0:
                      _context5.next = 2;
                      return regeneratorRuntime.awrap(expectRevert(this.beacon.upgradeTo(other, {
                        from: owner
                      }), 'UpgradeableBeacon: implementation is not a contract'));

                    case 2:
                    case "end":
                      return _context5.stop();
                  }
                }
              }, null, this);
            });
            it('cannot be upgraded by other account', function _callee6() {
              var v2;
              return regeneratorRuntime.async(function _callee6$(_context6) {
                while (1) {
                  switch (_context6.prev = _context6.next) {
                    case 0:
                      _context6.next = 2;
                      return regeneratorRuntime.awrap(Implementation2["new"]());

                    case 2:
                      v2 = _context6.sent;
                      _context6.next = 5;
                      return regeneratorRuntime.awrap(expectRevert(this.beacon.upgradeTo(v2.address, {
                        from: other
                      }), 'Ownable: caller is not the owner'));

                    case 5:
                    case "end":
                      return _context6.stop();
                  }
                }
              }, null, this);
            });

          case 5:
          case "end":
            return _context7.stop();
        }
      }
    });
  });
});