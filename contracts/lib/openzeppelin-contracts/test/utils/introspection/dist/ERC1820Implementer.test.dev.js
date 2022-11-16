"use strict";

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var _require = require('@openzeppelin/test-helpers'),
    expectRevert = _require.expectRevert,
    singletons = _require.singletons;

var _require2 = require('ethereumjs-util'),
    bufferToHex = _require2.bufferToHex,
    keccakFromString = _require2.keccakFromString;

var _require3 = require('chai'),
    expect = _require3.expect;

var ERC1820ImplementerMock = artifacts.require('ERC1820ImplementerMock');

contract('ERC1820Implementer', function (accounts) {
  var _accounts = _slicedToArray(accounts, 3),
      registryFunder = _accounts[0],
      implementee = _accounts[1],
      other = _accounts[2];

  var ERC1820_ACCEPT_MAGIC = bufferToHex(keccakFromString('ERC1820_ACCEPT_MAGIC'));
  beforeEach(function _callee() {
    return regeneratorRuntime.async(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return regeneratorRuntime.awrap(ERC1820ImplementerMock["new"]());

          case 2:
            this.implementer = _context.sent;
            _context.next = 5;
            return regeneratorRuntime.awrap(singletons.ERC1820Registry(registryFunder));

          case 5:
            this.registry = _context.sent;
            this.interfaceA = bufferToHex(keccakFromString('interfaceA'));
            this.interfaceB = bufferToHex(keccakFromString('interfaceB'));

          case 8:
          case "end":
            return _context.stop();
        }
      }
    }, null, this);
  });
  context('with no registered interfaces', function () {
    it('returns false when interface implementation is queried', function _callee2() {
      return regeneratorRuntime.async(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.t0 = expect;
              _context2.next = 3;
              return regeneratorRuntime.awrap(this.implementer.canImplementInterfaceForAddress(this.interfaceA, implementee));

            case 3:
              _context2.t1 = _context2.sent;
              _context2.t2 = ERC1820_ACCEPT_MAGIC;
              (0, _context2.t0)(_context2.t1).to.not.equal(_context2.t2);

            case 6:
            case "end":
              return _context2.stop();
          }
        }
      }, null, this);
    });
    it('reverts when attempting to set as implementer in the registry', function _callee3() {
      return regeneratorRuntime.async(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _context3.next = 2;
              return regeneratorRuntime.awrap(expectRevert(this.registry.setInterfaceImplementer(implementee, this.interfaceA, this.implementer.address, {
                from: implementee
              }), 'Does not implement the interface'));

            case 2:
            case "end":
              return _context3.stop();
          }
        }
      }, null, this);
    });
  });
  context('with registered interfaces', function () {
    beforeEach(function _callee4() {
      return regeneratorRuntime.async(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              _context4.next = 2;
              return regeneratorRuntime.awrap(this.implementer.registerInterfaceForAddress(this.interfaceA, implementee));

            case 2:
            case "end":
              return _context4.stop();
          }
        }
      }, null, this);
    });
    it('returns true when interface implementation is queried', function _callee5() {
      return regeneratorRuntime.async(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              _context5.t0 = expect;
              _context5.next = 3;
              return regeneratorRuntime.awrap(this.implementer.canImplementInterfaceForAddress(this.interfaceA, implementee));

            case 3:
              _context5.t1 = _context5.sent;
              _context5.t2 = ERC1820_ACCEPT_MAGIC;
              (0, _context5.t0)(_context5.t1).to.equal(_context5.t2);

            case 6:
            case "end":
              return _context5.stop();
          }
        }
      }, null, this);
    });
    it('returns false when interface implementation for non-supported interfaces is queried', function _callee6() {
      return regeneratorRuntime.async(function _callee6$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              _context6.t0 = expect;
              _context6.next = 3;
              return regeneratorRuntime.awrap(this.implementer.canImplementInterfaceForAddress(this.interfaceB, implementee));

            case 3:
              _context6.t1 = _context6.sent;
              _context6.t2 = ERC1820_ACCEPT_MAGIC;
              (0, _context6.t0)(_context6.t1).to.not.equal(_context6.t2);

            case 6:
            case "end":
              return _context6.stop();
          }
        }
      }, null, this);
    });
    it('returns false when interface implementation for non-supported addresses is queried', function _callee7() {
      return regeneratorRuntime.async(function _callee7$(_context7) {
        while (1) {
          switch (_context7.prev = _context7.next) {
            case 0:
              _context7.t0 = expect;
              _context7.next = 3;
              return regeneratorRuntime.awrap(this.implementer.canImplementInterfaceForAddress(this.interfaceA, other));

            case 3:
              _context7.t1 = _context7.sent;
              _context7.t2 = ERC1820_ACCEPT_MAGIC;
              (0, _context7.t0)(_context7.t1).to.not.equal(_context7.t2);

            case 6:
            case "end":
              return _context7.stop();
          }
        }
      }, null, this);
    });
    it('can be set as an implementer for supported interfaces in the registry', function _callee8() {
      return regeneratorRuntime.async(function _callee8$(_context8) {
        while (1) {
          switch (_context8.prev = _context8.next) {
            case 0:
              _context8.next = 2;
              return regeneratorRuntime.awrap(this.registry.setInterfaceImplementer(implementee, this.interfaceA, this.implementer.address, {
                from: implementee
              }));

            case 2:
              _context8.t0 = expect;
              _context8.next = 5;
              return regeneratorRuntime.awrap(this.registry.getInterfaceImplementer(implementee, this.interfaceA));

            case 5:
              _context8.t1 = _context8.sent;
              _context8.t2 = this.implementer.address;
              (0, _context8.t0)(_context8.t1).to.equal(_context8.t2);

            case 8:
            case "end":
              return _context8.stop();
          }
        }
      }, null, this);
    });
  });
});