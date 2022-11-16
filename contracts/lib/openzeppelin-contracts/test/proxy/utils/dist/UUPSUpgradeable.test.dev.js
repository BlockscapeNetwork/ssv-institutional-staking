"use strict";

var _require = require('@openzeppelin/test-helpers'),
    expectEvent = _require.expectEvent,
    expectRevert = _require.expectRevert;

var _require2 = require('@openzeppelin/test-helpers/src/setup'),
    web3 = _require2.web3;

var _require3 = require('../../helpers/erc1967'),
    getSlot = _require3.getSlot,
    ImplementationSlot = _require3.ImplementationSlot;

var ERC1967Proxy = artifacts.require('ERC1967Proxy');

var UUPSUpgradeableMock = artifacts.require('UUPSUpgradeableMock');

var UUPSUpgradeableUnsafeMock = artifacts.require('UUPSUpgradeableUnsafeMock');

var UUPSUpgradeableLegacyMock = artifacts.require('UUPSUpgradeableLegacyMock');

var CountersImpl = artifacts.require('CountersImpl');

contract('UUPSUpgradeable', function (accounts) {
  before(function _callee() {
    return regeneratorRuntime.async(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return regeneratorRuntime.awrap(UUPSUpgradeableMock["new"]());

          case 2:
            this.implInitial = _context.sent;
            _context.next = 5;
            return regeneratorRuntime.awrap(UUPSUpgradeableMock["new"]());

          case 5:
            this.implUpgradeOk = _context.sent;
            _context.next = 8;
            return regeneratorRuntime.awrap(UUPSUpgradeableUnsafeMock["new"]());

          case 8:
            this.implUpgradeUnsafe = _context.sent;
            _context.next = 11;
            return regeneratorRuntime.awrap(CountersImpl["new"]());

          case 11:
            this.implUpgradeNonUUPS = _context.sent;

          case 12:
          case "end":
            return _context.stop();
        }
      }
    }, null, this);
  });
  beforeEach(function _callee2() {
    var _ref, address;

    return regeneratorRuntime.async(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return regeneratorRuntime.awrap(ERC1967Proxy["new"](this.implInitial.address, '0x'));

          case 2:
            _ref = _context2.sent;
            address = _ref.address;
            _context2.next = 6;
            return regeneratorRuntime.awrap(UUPSUpgradeableMock.at(address));

          case 6:
            this.instance = _context2.sent;

          case 7:
          case "end":
            return _context2.stop();
        }
      }
    }, null, this);
  });
  it('upgrade to upgradeable implementation', function _callee3() {
    var _ref2, receipt;

    return regeneratorRuntime.async(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return regeneratorRuntime.awrap(this.instance.upgradeTo(this.implUpgradeOk.address));

          case 2:
            _ref2 = _context3.sent;
            receipt = _ref2.receipt;
            expect(receipt.logs.filter(function (_ref3) {
              var event = _ref3.event;
              return event === 'Upgraded';
            }).length).to.be.equal(1);
            expectEvent(receipt, 'Upgraded', {
              implementation: this.implUpgradeOk.address
            });

          case 6:
          case "end":
            return _context3.stop();
        }
      }
    }, null, this);
  });
  it('upgrade to upgradeable implementation with call', function _callee4() {
    var _ref4, receipt;

    return regeneratorRuntime.async(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.t0 = expect;
            _context4.next = 3;
            return regeneratorRuntime.awrap(this.instance.current());

          case 3:
            _context4.t1 = _context4.sent;
            (0, _context4.t0)(_context4.t1).to.be.bignumber.equal('0');
            _context4.next = 7;
            return regeneratorRuntime.awrap(this.instance.upgradeToAndCall(this.implUpgradeOk.address, this.implUpgradeOk.contract.methods.increment().encodeABI()));

          case 7:
            _ref4 = _context4.sent;
            receipt = _ref4.receipt;
            expect(receipt.logs.filter(function (_ref5) {
              var event = _ref5.event;
              return event === 'Upgraded';
            }).length).to.be.equal(1);
            expectEvent(receipt, 'Upgraded', {
              implementation: this.implUpgradeOk.address
            });
            _context4.t2 = expect;
            _context4.next = 14;
            return regeneratorRuntime.awrap(this.instance.current());

          case 14:
            _context4.t3 = _context4.sent;
            (0, _context4.t2)(_context4.t3).to.be.bignumber.equal('1');

          case 16:
          case "end":
            return _context4.stop();
        }
      }
    }, null, this);
  });
  it('upgrade to and unsafe upgradeable implementation', function _callee5() {
    var _ref6, receipt;

    return regeneratorRuntime.async(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _context5.next = 2;
            return regeneratorRuntime.awrap(this.instance.upgradeTo(this.implUpgradeUnsafe.address));

          case 2:
            _ref6 = _context5.sent;
            receipt = _ref6.receipt;
            expectEvent(receipt, 'Upgraded', {
              implementation: this.implUpgradeUnsafe.address
            });

          case 5:
          case "end":
            return _context5.stop();
        }
      }
    }, null, this);
  }); // delegate to a non existing upgradeTo function causes a low level revert

  it('reject upgrade to non uups implementation', function _callee6() {
    return regeneratorRuntime.async(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            _context6.next = 2;
            return regeneratorRuntime.awrap(expectRevert(this.instance.upgradeTo(this.implUpgradeNonUUPS.address), 'ERC1967Upgrade: new implementation is not UUPS'));

          case 2:
          case "end":
            return _context6.stop();
        }
      }
    }, null, this);
  });
  it('reject proxy address as implementation', function _callee7() {
    var _ref7, address, otherInstance;

    return regeneratorRuntime.async(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            _context7.next = 2;
            return regeneratorRuntime.awrap(ERC1967Proxy["new"](this.implInitial.address, '0x'));

          case 2:
            _ref7 = _context7.sent;
            address = _ref7.address;
            _context7.next = 6;
            return regeneratorRuntime.awrap(UUPSUpgradeableMock.at(address));

          case 6:
            otherInstance = _context7.sent;
            _context7.next = 9;
            return regeneratorRuntime.awrap(expectRevert(this.instance.upgradeTo(otherInstance.address), 'ERC1967Upgrade: new implementation is not UUPS'));

          case 9:
          case "end":
            return _context7.stop();
        }
      }
    }, null, this);
  });
  it('can upgrade from legacy implementations', function _callee8() {
    var legacyImpl, legacyInstance, receipt, UpgradedEvents, implementationSlot, implementationAddress;
    return regeneratorRuntime.async(function _callee8$(_context8) {
      while (1) {
        switch (_context8.prev = _context8.next) {
          case 0:
            _context8.next = 2;
            return regeneratorRuntime.awrap(UUPSUpgradeableLegacyMock["new"]());

          case 2:
            legacyImpl = _context8.sent;
            _context8.next = 5;
            return regeneratorRuntime.awrap(ERC1967Proxy["new"](legacyImpl.address, '0x').then(function (_ref8) {
              var address = _ref8.address;
              return UUPSUpgradeableLegacyMock.at(address);
            }));

          case 5:
            legacyInstance = _context8.sent;
            _context8.next = 8;
            return regeneratorRuntime.awrap(legacyInstance.upgradeTo(this.implInitial.address));

          case 8:
            receipt = _context8.sent;
            UpgradedEvents = receipt.logs.filter(function (_ref9) {
              var address = _ref9.address,
                  event = _ref9.event;
              return address === legacyInstance.address && event === 'Upgraded';
            });
            expect(UpgradedEvents.length).to.be.equal(1);
            expectEvent(receipt, 'Upgraded', {
              implementation: this.implInitial.address
            });
            _context8.next = 14;
            return regeneratorRuntime.awrap(getSlot(legacyInstance, ImplementationSlot));

          case 14:
            implementationSlot = _context8.sent;
            implementationAddress = web3.utils.toChecksumAddress(implementationSlot.substr(-40));
            expect(implementationAddress).to.be.equal(this.implInitial.address);

          case 17:
          case "end":
            return _context8.stop();
        }
      }
    }, null, this);
  });
});