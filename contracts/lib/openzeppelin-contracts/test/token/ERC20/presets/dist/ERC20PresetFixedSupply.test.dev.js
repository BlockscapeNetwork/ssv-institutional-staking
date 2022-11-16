"use strict";

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var _require = require('@openzeppelin/test-helpers'),
    BN = _require.BN,
    constants = _require.constants,
    expectEvent = _require.expectEvent;

var ZERO_ADDRESS = constants.ZERO_ADDRESS;

var _require2 = require('chai'),
    expect = _require2.expect;

var ERC20PresetFixedSupply = artifacts.require('ERC20PresetFixedSupply');

contract('ERC20PresetFixedSupply', function (accounts) {
  var _accounts = _slicedToArray(accounts, 2),
      deployer = _accounts[0],
      owner = _accounts[1];

  var name = 'PresetFixedSupply';
  var symbol = 'PFS';
  var initialSupply = new BN('50000');
  var amount = new BN('10000');
  before(function _callee() {
    return regeneratorRuntime.async(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return regeneratorRuntime.awrap(ERC20PresetFixedSupply["new"](name, symbol, initialSupply, owner, {
              from: deployer
            }));

          case 2:
            this.token = _context.sent;

          case 3:
          case "end":
            return _context.stop();
        }
      }
    }, null, this);
  });
  it('deployer has the balance equal to initial supply', function _callee2() {
    return regeneratorRuntime.async(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.t0 = expect;
            _context2.next = 3;
            return regeneratorRuntime.awrap(this.token.balanceOf(owner));

          case 3:
            _context2.t1 = _context2.sent;
            _context2.t2 = initialSupply;
            (0, _context2.t0)(_context2.t1).to.be.bignumber.equal(_context2.t2);

          case 6:
          case "end":
            return _context2.stop();
        }
      }
    }, null, this);
  });
  it('total supply is equal to initial supply', function _callee3() {
    return regeneratorRuntime.async(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.t0 = expect;
            _context3.next = 3;
            return regeneratorRuntime.awrap(this.token.totalSupply());

          case 3:
            _context3.t1 = _context3.sent;
            _context3.t2 = initialSupply;
            (0, _context3.t0)(_context3.t1).to.be.bignumber.equal(_context3.t2);

          case 6:
          case "end":
            return _context3.stop();
        }
      }
    }, null, this);
  });
  describe('burning', function () {
    it('holders can burn their tokens', function _callee4() {
      var remainingBalance, receipt;
      return regeneratorRuntime.async(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              remainingBalance = initialSupply.sub(amount);
              _context4.next = 3;
              return regeneratorRuntime.awrap(this.token.burn(amount, {
                from: owner
              }));

            case 3:
              receipt = _context4.sent;
              expectEvent(receipt, 'Transfer', {
                from: owner,
                to: ZERO_ADDRESS,
                value: amount
              });
              _context4.t0 = expect;
              _context4.next = 8;
              return regeneratorRuntime.awrap(this.token.balanceOf(owner));

            case 8:
              _context4.t1 = _context4.sent;
              _context4.t2 = remainingBalance;
              (0, _context4.t0)(_context4.t1).to.be.bignumber.equal(_context4.t2);

            case 11:
            case "end":
              return _context4.stop();
          }
        }
      }, null, this);
    });
    it('decrements totalSupply', function _callee5() {
      var expectedSupply;
      return regeneratorRuntime.async(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              expectedSupply = initialSupply.sub(amount);
              _context5.t0 = expect;
              _context5.next = 4;
              return regeneratorRuntime.awrap(this.token.totalSupply());

            case 4:
              _context5.t1 = _context5.sent;
              _context5.t2 = expectedSupply;
              (0, _context5.t0)(_context5.t1).to.be.bignumber.equal(_context5.t2);

            case 7:
            case "end":
              return _context5.stop();
          }
        }
      }, null, this);
    });
  });
});