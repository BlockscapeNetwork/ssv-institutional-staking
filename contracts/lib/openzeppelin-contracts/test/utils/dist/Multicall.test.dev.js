"use strict";

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var _require = require('@openzeppelin/test-helpers'),
    BN = _require.BN,
    expectRevert = _require.expectRevert;

var MulticallTokenMock = artifacts.require('MulticallTokenMock');

contract('MulticallToken', function (accounts) {
  var _accounts = _slicedToArray(accounts, 3),
      deployer = _accounts[0],
      alice = _accounts[1],
      bob = _accounts[2];

  var amount = 12000;
  beforeEach(function _callee() {
    return regeneratorRuntime.async(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return regeneratorRuntime.awrap(MulticallTokenMock["new"](new BN(amount), {
              from: deployer
            }));

          case 2:
            this.multicallToken = _context.sent;

          case 3:
          case "end":
            return _context.stop();
        }
      }
    }, null, this);
  });
  it('batches function calls', function _callee2() {
    return regeneratorRuntime.async(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.t0 = expect;
            _context2.next = 3;
            return regeneratorRuntime.awrap(this.multicallToken.balanceOf(alice));

          case 3:
            _context2.t1 = _context2.sent;
            _context2.t2 = new BN('0');
            (0, _context2.t0)(_context2.t1).to.be.bignumber.equal(_context2.t2);
            _context2.t3 = expect;
            _context2.next = 9;
            return regeneratorRuntime.awrap(this.multicallToken.balanceOf(bob));

          case 9:
            _context2.t4 = _context2.sent;
            _context2.t5 = new BN('0');
            (0, _context2.t3)(_context2.t4).to.be.bignumber.equal(_context2.t5);
            _context2.next = 14;
            return regeneratorRuntime.awrap(this.multicallToken.multicall([this.multicallToken.contract.methods.transfer(alice, amount / 2).encodeABI(), this.multicallToken.contract.methods.transfer(bob, amount / 3).encodeABI()], {
              from: deployer
            }));

          case 14:
            _context2.t6 = expect;
            _context2.next = 17;
            return regeneratorRuntime.awrap(this.multicallToken.balanceOf(alice));

          case 17:
            _context2.t7 = _context2.sent;
            _context2.t8 = new BN(amount / 2);
            (0, _context2.t6)(_context2.t7).to.be.bignumber.equal(_context2.t8);
            _context2.t9 = expect;
            _context2.next = 23;
            return regeneratorRuntime.awrap(this.multicallToken.balanceOf(bob));

          case 23:
            _context2.t10 = _context2.sent;
            _context2.t11 = new BN(amount / 3);
            (0, _context2.t9)(_context2.t10).to.be.bignumber.equal(_context2.t11);

          case 26:
          case "end":
            return _context2.stop();
        }
      }
    }, null, this);
  });
  it('returns an array with the result of each call', function _callee3() {
    var MulticallTest, multicallTest, recipients, amounts;
    return regeneratorRuntime.async(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            MulticallTest = artifacts.require('MulticallTest');
            _context3.next = 3;
            return regeneratorRuntime.awrap(MulticallTest["new"]({
              from: deployer
            }));

          case 3:
            multicallTest = _context3.sent;
            _context3.next = 6;
            return regeneratorRuntime.awrap(this.multicallToken.transfer(multicallTest.address, amount, {
              from: deployer
            }));

          case 6:
            _context3.t0 = expect;
            _context3.next = 9;
            return regeneratorRuntime.awrap(this.multicallToken.balanceOf(multicallTest.address));

          case 9:
            _context3.t1 = _context3.sent;
            _context3.t2 = new BN(amount);
            (0, _context3.t0)(_context3.t1).to.be.bignumber.equal(_context3.t2);
            recipients = [alice, bob];
            amounts = [amount / 2, amount / 3].map(function (n) {
              return new BN(n);
            });
            _context3.next = 16;
            return regeneratorRuntime.awrap(multicallTest.checkReturnValues(this.multicallToken.address, recipients, amounts));

          case 16:
          case "end":
            return _context3.stop();
        }
      }
    }, null, this);
  });
  it('reverts previous calls', function _callee4() {
    var call;
    return regeneratorRuntime.async(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.t0 = expect;
            _context4.next = 3;
            return regeneratorRuntime.awrap(this.multicallToken.balanceOf(alice));

          case 3:
            _context4.t1 = _context4.sent;
            _context4.t2 = new BN('0');
            (0, _context4.t0)(_context4.t1).to.be.bignumber.equal(_context4.t2);
            call = this.multicallToken.multicall([this.multicallToken.contract.methods.transfer(alice, amount).encodeABI(), this.multicallToken.contract.methods.transfer(bob, amount).encodeABI()], {
              from: deployer
            });
            _context4.next = 9;
            return regeneratorRuntime.awrap(expectRevert(call, 'ERC20: transfer amount exceeds balance'));

          case 9:
            _context4.t3 = expect;
            _context4.next = 12;
            return regeneratorRuntime.awrap(this.multicallToken.balanceOf(alice));

          case 12:
            _context4.t4 = _context4.sent;
            _context4.t5 = new BN('0');
            (0, _context4.t3)(_context4.t4).to.be.bignumber.equal(_context4.t5);

          case 15:
          case "end":
            return _context4.stop();
        }
      }
    }, null, this);
  });
  it('bubbles up revert reasons', function _callee5() {
    var call;
    return regeneratorRuntime.async(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            call = this.multicallToken.multicall([this.multicallToken.contract.methods.transfer(alice, amount).encodeABI(), this.multicallToken.contract.methods.transfer(bob, amount).encodeABI()], {
              from: deployer
            });
            _context5.next = 3;
            return regeneratorRuntime.awrap(expectRevert(call, 'ERC20: transfer amount exceeds balance'));

          case 3:
          case "end":
            return _context5.stop();
        }
      }
    }, null, this);
  });
});