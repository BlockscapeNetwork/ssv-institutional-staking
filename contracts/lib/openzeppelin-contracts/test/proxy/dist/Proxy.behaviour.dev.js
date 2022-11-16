"use strict";

var _require = require('@openzeppelin/test-helpers'),
    expectRevert = _require.expectRevert;

var _require2 = require('../helpers/erc1967'),
    getSlot = _require2.getSlot,
    ImplementationSlot = _require2.ImplementationSlot;

var _require3 = require('chai'),
    expect = _require3.expect;

var DummyImplementation = artifacts.require('DummyImplementation');

module.exports = function shouldBehaveLikeProxy(createProxy, proxyAdminAddress, proxyCreator) {
  it('cannot be initialized with a non-contract address', function _callee() {
    var nonContractAddress, initializeData;
    return regeneratorRuntime.async(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            nonContractAddress = proxyCreator;
            initializeData = Buffer.from('');
            _context.next = 4;
            return regeneratorRuntime.awrap(expectRevert.unspecified(createProxy(nonContractAddress, proxyAdminAddress, initializeData, {
              from: proxyCreator
            })));

          case 4:
          case "end":
            return _context.stop();
        }
      }
    });
  });
  before('deploy implementation', function _callee2() {
    return regeneratorRuntime.async(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.t0 = web3.utils;
            _context2.next = 3;
            return regeneratorRuntime.awrap(DummyImplementation["new"]());

          case 3:
            _context2.t1 = _context2.sent.address;
            this.implementation = _context2.t0.toChecksumAddress.call(_context2.t0, _context2.t1);

          case 5:
          case "end":
            return _context2.stop();
        }
      }
    }, null, this);
  });

  var assertProxyInitialization = function assertProxyInitialization(_ref) {
    var value = _ref.value,
        balance = _ref.balance;
    it('sets the implementation address', function _callee3() {
      var implementationSlot, implementationAddress;
      return regeneratorRuntime.async(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _context3.next = 2;
              return regeneratorRuntime.awrap(getSlot(this.proxy, ImplementationSlot));

            case 2:
              implementationSlot = _context3.sent;
              implementationAddress = web3.utils.toChecksumAddress(implementationSlot.substr(-40));
              expect(implementationAddress).to.be.equal(this.implementation);

            case 5:
            case "end":
              return _context3.stop();
          }
        }
      }, null, this);
    });
    it('initializes the proxy', function _callee4() {
      var dummy;
      return regeneratorRuntime.async(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              dummy = new DummyImplementation(this.proxy);
              _context4.t0 = expect;
              _context4.next = 4;
              return regeneratorRuntime.awrap(dummy.value());

            case 4:
              _context4.t1 = _context4.sent;
              _context4.t2 = value.toString();
              (0, _context4.t0)(_context4.t1).to.be.bignumber.equal(_context4.t2);

            case 7:
            case "end":
              return _context4.stop();
          }
        }
      }, null, this);
    });
    it('has expected balance', function _callee5() {
      return regeneratorRuntime.async(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              _context5.t0 = expect;
              _context5.next = 3;
              return regeneratorRuntime.awrap(web3.eth.getBalance(this.proxy));

            case 3:
              _context5.t1 = _context5.sent;
              _context5.t2 = balance.toString();
              (0, _context5.t0)(_context5.t1).to.be.bignumber.equal(_context5.t2);

            case 6:
            case "end":
              return _context5.stop();
          }
        }
      }, null, this);
    });
  };

  describe('without initialization', function () {
    var initializeData = Buffer.from('');
    describe('when not sending balance', function () {
      beforeEach('creating proxy', function _callee6() {
        return regeneratorRuntime.async(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                _context6.next = 2;
                return regeneratorRuntime.awrap(createProxy(this.implementation, proxyAdminAddress, initializeData, {
                  from: proxyCreator
                }));

              case 2:
                this.proxy = _context6.sent.address;

              case 3:
              case "end":
                return _context6.stop();
            }
          }
        }, null, this);
      });
      assertProxyInitialization({
        value: 0,
        balance: 0
      });
    });
    describe('when sending some balance', function () {
      var value = 10e5;
      beforeEach('creating proxy', function _callee7() {
        return regeneratorRuntime.async(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                _context7.next = 2;
                return regeneratorRuntime.awrap(createProxy(this.implementation, proxyAdminAddress, initializeData, {
                  from: proxyCreator,
                  value: value
                }));

              case 2:
                this.proxy = _context7.sent.address;

              case 3:
              case "end":
                return _context7.stop();
            }
          }
        }, null, this);
      });
      assertProxyInitialization({
        value: 0,
        balance: value
      });
    });
  });
  describe('initialization without parameters', function () {
    describe('non payable', function () {
      var expectedInitializedValue = 10;
      var initializeData = new DummyImplementation('').contract.methods['initializeNonPayable()']().encodeABI();
      describe('when not sending balance', function () {
        beforeEach('creating proxy', function _callee8() {
          return regeneratorRuntime.async(function _callee8$(_context8) {
            while (1) {
              switch (_context8.prev = _context8.next) {
                case 0:
                  _context8.next = 2;
                  return regeneratorRuntime.awrap(createProxy(this.implementation, proxyAdminAddress, initializeData, {
                    from: proxyCreator
                  }));

                case 2:
                  this.proxy = _context8.sent.address;

                case 3:
                case "end":
                  return _context8.stop();
              }
            }
          }, null, this);
        });
        assertProxyInitialization({
          value: expectedInitializedValue,
          balance: 0
        });
      });
      describe('when sending some balance', function () {
        var value = 10e5;
        it('reverts', function _callee9() {
          return regeneratorRuntime.async(function _callee9$(_context9) {
            while (1) {
              switch (_context9.prev = _context9.next) {
                case 0:
                  _context9.next = 2;
                  return regeneratorRuntime.awrap(expectRevert.unspecified(createProxy(this.implementation, proxyAdminAddress, initializeData, {
                    from: proxyCreator,
                    value: value
                  })));

                case 2:
                case "end":
                  return _context9.stop();
              }
            }
          }, null, this);
        });
      });
    });
    describe('payable', function () {
      var expectedInitializedValue = 100;
      var initializeData = new DummyImplementation('').contract.methods['initializePayable()']().encodeABI();
      describe('when not sending balance', function () {
        beforeEach('creating proxy', function _callee10() {
          return regeneratorRuntime.async(function _callee10$(_context10) {
            while (1) {
              switch (_context10.prev = _context10.next) {
                case 0:
                  _context10.next = 2;
                  return regeneratorRuntime.awrap(createProxy(this.implementation, proxyAdminAddress, initializeData, {
                    from: proxyCreator
                  }));

                case 2:
                  this.proxy = _context10.sent.address;

                case 3:
                case "end":
                  return _context10.stop();
              }
            }
          }, null, this);
        });
        assertProxyInitialization({
          value: expectedInitializedValue,
          balance: 0
        });
      });
      describe('when sending some balance', function () {
        var value = 10e5;
        beforeEach('creating proxy', function _callee11() {
          return regeneratorRuntime.async(function _callee11$(_context11) {
            while (1) {
              switch (_context11.prev = _context11.next) {
                case 0:
                  _context11.next = 2;
                  return regeneratorRuntime.awrap(createProxy(this.implementation, proxyAdminAddress, initializeData, {
                    from: proxyCreator,
                    value: value
                  }));

                case 2:
                  this.proxy = _context11.sent.address;

                case 3:
                case "end":
                  return _context11.stop();
              }
            }
          }, null, this);
        });
        assertProxyInitialization({
          value: expectedInitializedValue,
          balance: value
        });
      });
    });
  });
  describe('initialization with parameters', function () {
    describe('non payable', function () {
      var expectedInitializedValue = 10;
      var initializeData = new DummyImplementation('').contract.methods.initializeNonPayableWithValue(expectedInitializedValue).encodeABI();
      describe('when not sending balance', function () {
        beforeEach('creating proxy', function _callee12() {
          return regeneratorRuntime.async(function _callee12$(_context12) {
            while (1) {
              switch (_context12.prev = _context12.next) {
                case 0:
                  _context12.next = 2;
                  return regeneratorRuntime.awrap(createProxy(this.implementation, proxyAdminAddress, initializeData, {
                    from: proxyCreator
                  }));

                case 2:
                  this.proxy = _context12.sent.address;

                case 3:
                case "end":
                  return _context12.stop();
              }
            }
          }, null, this);
        });
        assertProxyInitialization({
          value: expectedInitializedValue,
          balance: 0
        });
      });
      describe('when sending some balance', function () {
        var value = 10e5;
        it('reverts', function _callee13() {
          return regeneratorRuntime.async(function _callee13$(_context13) {
            while (1) {
              switch (_context13.prev = _context13.next) {
                case 0:
                  _context13.next = 2;
                  return regeneratorRuntime.awrap(expectRevert.unspecified(createProxy(this.implementation, proxyAdminAddress, initializeData, {
                    from: proxyCreator,
                    value: value
                  })));

                case 2:
                case "end":
                  return _context13.stop();
              }
            }
          }, null, this);
        });
      });
    });
    describe('payable', function () {
      var expectedInitializedValue = 42;
      var initializeData = new DummyImplementation('').contract.methods.initializePayableWithValue(expectedInitializedValue).encodeABI();
      describe('when not sending balance', function () {
        beforeEach('creating proxy', function _callee14() {
          return regeneratorRuntime.async(function _callee14$(_context14) {
            while (1) {
              switch (_context14.prev = _context14.next) {
                case 0:
                  _context14.next = 2;
                  return regeneratorRuntime.awrap(createProxy(this.implementation, proxyAdminAddress, initializeData, {
                    from: proxyCreator
                  }));

                case 2:
                  this.proxy = _context14.sent.address;

                case 3:
                case "end":
                  return _context14.stop();
              }
            }
          }, null, this);
        });
        assertProxyInitialization({
          value: expectedInitializedValue,
          balance: 0
        });
      });
      describe('when sending some balance', function () {
        var value = 10e5;
        beforeEach('creating proxy', function _callee15() {
          return regeneratorRuntime.async(function _callee15$(_context15) {
            while (1) {
              switch (_context15.prev = _context15.next) {
                case 0:
                  _context15.next = 2;
                  return regeneratorRuntime.awrap(createProxy(this.implementation, proxyAdminAddress, initializeData, {
                    from: proxyCreator,
                    value: value
                  }));

                case 2:
                  this.proxy = _context15.sent.address;

                case 3:
                case "end":
                  return _context15.stop();
              }
            }
          }, null, this);
        });
        assertProxyInitialization({
          value: expectedInitializedValue,
          balance: value
        });
      });
    });
    describe('reverting initialization', function () {
      var initializeData = new DummyImplementation('').contract.methods.reverts().encodeABI();
      it('reverts', function _callee16() {
        return regeneratorRuntime.async(function _callee16$(_context16) {
          while (1) {
            switch (_context16.prev = _context16.next) {
              case 0:
                _context16.next = 2;
                return regeneratorRuntime.awrap(expectRevert(createProxy(this.implementation, proxyAdminAddress, initializeData, {
                  from: proxyCreator
                }), 'DummyImplementation reverted'));

              case 2:
              case "end":
                return _context16.stop();
            }
          }
        }, null, this);
      });
    });
  });
};