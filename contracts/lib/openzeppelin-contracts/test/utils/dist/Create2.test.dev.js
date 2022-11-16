"use strict";

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var _require = require('@openzeppelin/test-helpers'),
    balance = _require.balance,
    BN = _require.BN,
    ether = _require.ether,
    expectRevert = _require.expectRevert,
    send = _require.send;

var _require2 = require('../helpers/create2'),
    computeCreate2Address = _require2.computeCreate2Address;

var _require3 = require('chai'),
    expect = _require3.expect;

var Create2Impl = artifacts.require('Create2Impl');

var ERC20Mock = artifacts.require('ERC20Mock');

var ERC1820Implementer = artifacts.require('ERC1820Implementer');

contract('Create2', function (accounts) {
  var _accounts = _slicedToArray(accounts, 1),
      deployerAccount = _accounts[0];

  var salt = 'salt message';
  var saltHex = web3.utils.soliditySha3(salt);
  var encodedParams = web3.eth.abi.encodeParameters(['string', 'string', 'address', 'uint256'], ['MyToken', 'MTKN', deployerAccount, 100]).slice(2);
  var constructorByteCode = "".concat(ERC20Mock.bytecode).concat(encodedParams);
  beforeEach(function _callee() {
    return regeneratorRuntime.async(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return regeneratorRuntime.awrap(Create2Impl["new"]());

          case 2:
            this.factory = _context.sent;

          case 3:
          case "end":
            return _context.stop();
        }
      }
    }, null, this);
  });
  describe('computeAddress', function () {
    it('computes the correct contract address', function _callee2() {
      var onChainComputed, offChainComputed;
      return regeneratorRuntime.async(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.next = 2;
              return regeneratorRuntime.awrap(this.factory.computeAddress(saltHex, web3.utils.keccak256(constructorByteCode)));

            case 2:
              onChainComputed = _context2.sent;
              offChainComputed = computeCreate2Address(saltHex, constructorByteCode, this.factory.address);
              expect(onChainComputed).to.equal(offChainComputed);

            case 5:
            case "end":
              return _context2.stop();
          }
        }
      }, null, this);
    });
    it('computes the correct contract address with deployer', function _callee3() {
      var onChainComputed, offChainComputed;
      return regeneratorRuntime.async(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _context3.next = 2;
              return regeneratorRuntime.awrap(this.factory.computeAddressWithDeployer(saltHex, web3.utils.keccak256(constructorByteCode), deployerAccount));

            case 2:
              onChainComputed = _context3.sent;
              offChainComputed = computeCreate2Address(saltHex, constructorByteCode, deployerAccount);
              expect(onChainComputed).to.equal(offChainComputed);

            case 5:
            case "end":
              return _context3.stop();
          }
        }
      }, null, this);
    });
  });
  describe('deploy', function () {
    it('deploys a ERC1820Implementer from inline assembly code', function _callee4() {
      var offChainComputed;
      return regeneratorRuntime.async(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              offChainComputed = computeCreate2Address(saltHex, ERC1820Implementer.bytecode, this.factory.address);
              _context4.next = 3;
              return regeneratorRuntime.awrap(this.factory.deployERC1820Implementer(0, saltHex));

            case 3:
              _context4.t0 = expect(ERC1820Implementer.bytecode).to;
              _context4.next = 6;
              return regeneratorRuntime.awrap(web3.eth.getCode(offChainComputed));

            case 6:
              _context4.t1 = _context4.sent.slice(2);

              _context4.t0.include.call(_context4.t0, _context4.t1);

            case 8:
            case "end":
              return _context4.stop();
          }
        }
      }, null, this);
    });
    it('deploys a ERC20Mock with correct balances', function _callee5() {
      var offChainComputed, erc20;
      return regeneratorRuntime.async(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              offChainComputed = computeCreate2Address(saltHex, constructorByteCode, this.factory.address);
              _context5.next = 3;
              return regeneratorRuntime.awrap(this.factory.deploy(0, saltHex, constructorByteCode));

            case 3:
              _context5.next = 5;
              return regeneratorRuntime.awrap(ERC20Mock.at(offChainComputed));

            case 5:
              erc20 = _context5.sent;
              _context5.t0 = expect;
              _context5.next = 9;
              return regeneratorRuntime.awrap(erc20.balanceOf(deployerAccount));

            case 9:
              _context5.t1 = _context5.sent;
              _context5.t2 = new BN(100);
              (0, _context5.t0)(_context5.t1).to.be.bignumber.equal(_context5.t2);

            case 12:
            case "end":
              return _context5.stop();
          }
        }
      }, null, this);
    });
    it('deploys a contract with funds deposited in the factory', function _callee6() {
      var deposit, onChainComputed;
      return regeneratorRuntime.async(function _callee6$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              deposit = ether('2');
              _context6.next = 3;
              return regeneratorRuntime.awrap(send.ether(deployerAccount, this.factory.address, deposit));

            case 3:
              _context6.t0 = expect;
              _context6.next = 6;
              return regeneratorRuntime.awrap(balance.current(this.factory.address));

            case 6:
              _context6.t1 = _context6.sent;
              _context6.t2 = deposit;
              (0, _context6.t0)(_context6.t1).to.be.bignumber.equal(_context6.t2);
              _context6.next = 11;
              return regeneratorRuntime.awrap(this.factory.computeAddressWithDeployer(saltHex, web3.utils.keccak256(constructorByteCode), this.factory.address));

            case 11:
              onChainComputed = _context6.sent;
              _context6.next = 14;
              return regeneratorRuntime.awrap(this.factory.deploy(deposit, saltHex, constructorByteCode));

            case 14:
              _context6.t3 = expect;
              _context6.next = 17;
              return regeneratorRuntime.awrap(balance.current(onChainComputed));

            case 17:
              _context6.t4 = _context6.sent;
              _context6.t5 = deposit;
              (0, _context6.t3)(_context6.t4).to.be.bignumber.equal(_context6.t5);

            case 20:
            case "end":
              return _context6.stop();
          }
        }
      }, null, this);
    });
    it('fails deploying a contract in an existent address', function _callee7() {
      return regeneratorRuntime.async(function _callee7$(_context7) {
        while (1) {
          switch (_context7.prev = _context7.next) {
            case 0:
              _context7.next = 2;
              return regeneratorRuntime.awrap(this.factory.deploy(0, saltHex, constructorByteCode, {
                from: deployerAccount
              }));

            case 2:
              _context7.next = 4;
              return regeneratorRuntime.awrap(expectRevert(this.factory.deploy(0, saltHex, constructorByteCode, {
                from: deployerAccount
              }), 'Create2: Failed on deploy'));

            case 4:
            case "end":
              return _context7.stop();
          }
        }
      }, null, this);
    });
    it('fails deploying a contract if the bytecode length is zero', function _callee8() {
      return regeneratorRuntime.async(function _callee8$(_context8) {
        while (1) {
          switch (_context8.prev = _context8.next) {
            case 0:
              _context8.next = 2;
              return regeneratorRuntime.awrap(expectRevert(this.factory.deploy(0, saltHex, '0x', {
                from: deployerAccount
              }), 'Create2: bytecode length is zero'));

            case 2:
            case "end":
              return _context8.stop();
          }
        }
      }, null, this);
    });
    it('fails deploying a contract if factory contract does not have sufficient balance', function _callee9() {
      return regeneratorRuntime.async(function _callee9$(_context9) {
        while (1) {
          switch (_context9.prev = _context9.next) {
            case 0:
              _context9.next = 2;
              return regeneratorRuntime.awrap(expectRevert(this.factory.deploy(1, saltHex, constructorByteCode, {
                from: deployerAccount
              }), 'Create2: insufficient balance'));

            case 2:
            case "end":
              return _context9.stop();
          }
        }
      }, null, this);
    });
  });
});