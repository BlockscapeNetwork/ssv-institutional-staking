"use strict";

var _require = require('@openzeppelin/test-helpers'),
    expectEvent = _require.expectEvent,
    expectRevert = _require.expectRevert;

var _require2 = require('../helpers/create2'),
    computeCreate2Address = _require2.computeCreate2Address;

var _require3 = require('chai'),
    expect = _require3.expect;

var shouldBehaveLikeClone = require('./Clones.behaviour');

var ClonesMock = artifacts.require('ClonesMock');

contract('Clones', function (accounts) {
  describe('clone', function () {
    shouldBehaveLikeClone(function _callee(implementation, initData) {
      var opts,
          factory,
          receipt,
          address,
          _args = arguments;
      return regeneratorRuntime.async(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              opts = _args.length > 2 && _args[2] !== undefined ? _args[2] : {};
              _context.next = 3;
              return regeneratorRuntime.awrap(ClonesMock["new"]());

            case 3:
              factory = _context.sent;
              _context.next = 6;
              return regeneratorRuntime.awrap(factory.clone(implementation, initData, {
                value: opts.value
              }));

            case 6:
              receipt = _context.sent;
              address = receipt.logs.find(function (_ref) {
                var event = _ref.event;
                return event === 'NewInstance';
              }).args.instance;
              return _context.abrupt("return", {
                address: address
              });

            case 9:
            case "end":
              return _context.stop();
          }
        }
      });
    });
  });
  describe('cloneDeterministic', function () {
    shouldBehaveLikeClone(function _callee2(implementation, initData) {
      var opts,
          salt,
          factory,
          receipt,
          address,
          _args2 = arguments;
      return regeneratorRuntime.async(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              opts = _args2.length > 2 && _args2[2] !== undefined ? _args2[2] : {};
              salt = web3.utils.randomHex(32);
              _context2.next = 4;
              return regeneratorRuntime.awrap(ClonesMock["new"]());

            case 4:
              factory = _context2.sent;
              _context2.next = 7;
              return regeneratorRuntime.awrap(factory.cloneDeterministic(implementation, salt, initData, {
                value: opts.value
              }));

            case 7:
              receipt = _context2.sent;
              address = receipt.logs.find(function (_ref2) {
                var event = _ref2.event;
                return event === 'NewInstance';
              }).args.instance;
              return _context2.abrupt("return", {
                address: address
              });

            case 10:
            case "end":
              return _context2.stop();
          }
        }
      });
    });
    it('address already used', function _callee3() {
      var implementation, salt, factory;
      return regeneratorRuntime.async(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              implementation = web3.utils.randomHex(20);
              salt = web3.utils.randomHex(32);
              _context3.next = 4;
              return regeneratorRuntime.awrap(ClonesMock["new"]());

            case 4:
              factory = _context3.sent;
              _context3.t0 = expectEvent;
              _context3.next = 8;
              return regeneratorRuntime.awrap(factory.cloneDeterministic(implementation, salt, '0x'));

            case 8:
              _context3.t1 = _context3.sent;
              (0, _context3.t0)(_context3.t1, 'NewInstance');
              _context3.next = 12;
              return regeneratorRuntime.awrap(expectRevert(factory.cloneDeterministic(implementation, salt, '0x'), 'ERC1167: create2 failed'));

            case 12:
            case "end":
              return _context3.stop();
          }
        }
      });
    });
    it('address prediction', function _callee4() {
      var implementation, salt, factory, predicted, creationCode;
      return regeneratorRuntime.async(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              implementation = web3.utils.randomHex(20);
              salt = web3.utils.randomHex(32);
              _context4.next = 4;
              return regeneratorRuntime.awrap(ClonesMock["new"]());

            case 4:
              factory = _context4.sent;
              _context4.next = 7;
              return regeneratorRuntime.awrap(factory.predictDeterministicAddress(implementation, salt));

            case 7:
              predicted = _context4.sent;
              creationCode = ['0x3d602d80600a3d3981f3363d3d373d3d3d363d73', implementation.replace(/0x/, '').toLowerCase(), '5af43d82803e903d91602b57fd5bf3'].join('');
              expect(computeCreate2Address(salt, creationCode, factory.address)).to.be.equal(predicted);
              _context4.t0 = expectEvent;
              _context4.next = 13;
              return regeneratorRuntime.awrap(factory.cloneDeterministic(implementation, salt, '0x'));

            case 13:
              _context4.t1 = _context4.sent;
              _context4.t2 = {
                instance: predicted
              };
              (0, _context4.t0)(_context4.t1, 'NewInstance', _context4.t2);

            case 16:
            case "end":
              return _context4.stop();
          }
        }
      });
    });
  });
});