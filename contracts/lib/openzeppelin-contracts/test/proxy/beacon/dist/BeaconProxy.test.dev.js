"use strict";

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var _require = require('@openzeppelin/test-helpers'),
    expectRevert = _require.expectRevert;

var _require2 = require('../../helpers/erc1967'),
    getSlot = _require2.getSlot,
    BeaconSlot = _require2.BeaconSlot;

var _require3 = require('chai'),
    expect = _require3.expect;

var UpgradeableBeacon = artifacts.require('UpgradeableBeacon');

var BeaconProxy = artifacts.require('BeaconProxy');

var DummyImplementation = artifacts.require('DummyImplementation');

var DummyImplementationV2 = artifacts.require('DummyImplementationV2');

var BadBeaconNoImpl = artifacts.require('BadBeaconNoImpl');

var BadBeaconNotContract = artifacts.require('BadBeaconNotContract');

contract('BeaconProxy', function (accounts) {
  var _accounts = _slicedToArray(accounts, 1),
      anotherAccount = _accounts[0];

  describe('bad beacon is not accepted', function _callee4() {
    return regeneratorRuntime.async(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            it('non-contract beacon', function _callee() {
              return regeneratorRuntime.async(function _callee$(_context) {
                while (1) {
                  switch (_context.prev = _context.next) {
                    case 0:
                      _context.next = 2;
                      return regeneratorRuntime.awrap(expectRevert(BeaconProxy["new"](anotherAccount, '0x'), 'ERC1967: new beacon is not a contract'));

                    case 2:
                    case "end":
                      return _context.stop();
                  }
                }
              });
            });
            it('non-compliant beacon', function _callee2() {
              var beacon;
              return regeneratorRuntime.async(function _callee2$(_context2) {
                while (1) {
                  switch (_context2.prev = _context2.next) {
                    case 0:
                      _context2.next = 2;
                      return regeneratorRuntime.awrap(BadBeaconNoImpl["new"]());

                    case 2:
                      beacon = _context2.sent;
                      _context2.next = 5;
                      return regeneratorRuntime.awrap(expectRevert.unspecified(BeaconProxy["new"](beacon.address, '0x')));

                    case 5:
                    case "end":
                      return _context2.stop();
                  }
                }
              });
            });
            it('non-contract implementation', function _callee3() {
              var beacon;
              return regeneratorRuntime.async(function _callee3$(_context3) {
                while (1) {
                  switch (_context3.prev = _context3.next) {
                    case 0:
                      _context3.next = 2;
                      return regeneratorRuntime.awrap(BadBeaconNotContract["new"]());

                    case 2:
                      beacon = _context3.sent;
                      _context3.next = 5;
                      return regeneratorRuntime.awrap(expectRevert(BeaconProxy["new"](beacon.address, '0x'), 'ERC1967: beacon implementation is not a contract'));

                    case 5:
                    case "end":
                      return _context3.stop();
                  }
                }
              });
            });

          case 3:
          case "end":
            return _context4.stop();
        }
      }
    });
  });
  before('deploy implementation', function _callee5() {
    return regeneratorRuntime.async(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _context5.next = 2;
            return regeneratorRuntime.awrap(DummyImplementation["new"]());

          case 2:
            this.implementationV0 = _context5.sent;
            _context5.next = 5;
            return regeneratorRuntime.awrap(DummyImplementationV2["new"]());

          case 5:
            this.implementationV1 = _context5.sent;

          case 6:
          case "end":
            return _context5.stop();
        }
      }
    }, null, this);
  });
  describe('initialization', function () {
    before(function () {
      var _this = this;

      this.assertInitialized = function _callee6(_ref) {
        var value, balance, beaconSlot, beaconAddress, dummy;
        return regeneratorRuntime.async(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                value = _ref.value, balance = _ref.balance;
                _context6.next = 3;
                return regeneratorRuntime.awrap(getSlot(_this.proxy, BeaconSlot));

              case 3:
                beaconSlot = _context6.sent;
                beaconAddress = web3.utils.toChecksumAddress(beaconSlot.substr(-40));
                expect(beaconAddress).to.equal(_this.beacon.address);
                dummy = new DummyImplementation(_this.proxy.address);
                _context6.t0 = expect;
                _context6.next = 10;
                return regeneratorRuntime.awrap(dummy.value());

              case 10:
                _context6.t1 = _context6.sent;
                _context6.t2 = value;
                (0, _context6.t0)(_context6.t1).to.bignumber.eq(_context6.t2);
                _context6.t3 = expect;
                _context6.next = 16;
                return regeneratorRuntime.awrap(web3.eth.getBalance(_this.proxy.address));

              case 16:
                _context6.t4 = _context6.sent;
                _context6.t5 = balance;
                (0, _context6.t3)(_context6.t4).to.bignumber.eq(_context6.t5);

              case 19:
              case "end":
                return _context6.stop();
            }
          }
        });
      };
    });
    beforeEach('deploy beacon', function _callee7() {
      return regeneratorRuntime.async(function _callee7$(_context7) {
        while (1) {
          switch (_context7.prev = _context7.next) {
            case 0:
              _context7.next = 2;
              return regeneratorRuntime.awrap(UpgradeableBeacon["new"](this.implementationV0.address));

            case 2:
              this.beacon = _context7.sent;

            case 3:
            case "end":
              return _context7.stop();
          }
        }
      }, null, this);
    });
    it('no initialization', function _callee8() {
      var data, balance;
      return regeneratorRuntime.async(function _callee8$(_context8) {
        while (1) {
          switch (_context8.prev = _context8.next) {
            case 0:
              data = Buffer.from('');
              balance = '10';
              _context8.next = 4;
              return regeneratorRuntime.awrap(BeaconProxy["new"](this.beacon.address, data, {
                value: balance
              }));

            case 4:
              this.proxy = _context8.sent;
              _context8.next = 7;
              return regeneratorRuntime.awrap(this.assertInitialized({
                value: '0',
                balance: balance
              }));

            case 7:
            case "end":
              return _context8.stop();
          }
        }
      }, null, this);
    });
    it('non-payable initialization', function _callee9() {
      var value, data;
      return regeneratorRuntime.async(function _callee9$(_context9) {
        while (1) {
          switch (_context9.prev = _context9.next) {
            case 0:
              value = '55';
              data = this.implementationV0.contract.methods.initializeNonPayableWithValue(value).encodeABI();
              _context9.next = 4;
              return regeneratorRuntime.awrap(BeaconProxy["new"](this.beacon.address, data));

            case 4:
              this.proxy = _context9.sent;
              _context9.next = 7;
              return regeneratorRuntime.awrap(this.assertInitialized({
                value: value,
                balance: '0'
              }));

            case 7:
            case "end":
              return _context9.stop();
          }
        }
      }, null, this);
    });
    it('payable initialization', function _callee10() {
      var value, data, balance;
      return regeneratorRuntime.async(function _callee10$(_context10) {
        while (1) {
          switch (_context10.prev = _context10.next) {
            case 0:
              value = '55';
              data = this.implementationV0.contract.methods.initializePayableWithValue(value).encodeABI();
              balance = '100';
              _context10.next = 5;
              return regeneratorRuntime.awrap(BeaconProxy["new"](this.beacon.address, data, {
                value: balance
              }));

            case 5:
              this.proxy = _context10.sent;
              _context10.next = 8;
              return regeneratorRuntime.awrap(this.assertInitialized({
                value: value,
                balance: balance
              }));

            case 8:
            case "end":
              return _context10.stop();
          }
        }
      }, null, this);
    });
    it('reverting initialization', function _callee11() {
      var data;
      return regeneratorRuntime.async(function _callee11$(_context11) {
        while (1) {
          switch (_context11.prev = _context11.next) {
            case 0:
              data = this.implementationV0.contract.methods.reverts().encodeABI();
              _context11.next = 3;
              return regeneratorRuntime.awrap(expectRevert(BeaconProxy["new"](this.beacon.address, data), 'DummyImplementation reverted'));

            case 3:
            case "end":
              return _context11.stop();
          }
        }
      }, null, this);
    });
  });
  it('upgrade a proxy by upgrading its beacon', function _callee12() {
    var beacon, value, data, proxy, dummy;
    return regeneratorRuntime.async(function _callee12$(_context12) {
      while (1) {
        switch (_context12.prev = _context12.next) {
          case 0:
            _context12.next = 2;
            return regeneratorRuntime.awrap(UpgradeableBeacon["new"](this.implementationV0.address));

          case 2:
            beacon = _context12.sent;
            value = '10';
            data = this.implementationV0.contract.methods.initializeNonPayableWithValue(value).encodeABI();
            _context12.next = 7;
            return regeneratorRuntime.awrap(BeaconProxy["new"](beacon.address, data));

          case 7:
            proxy = _context12.sent;
            dummy = new DummyImplementation(proxy.address); // test initial values

            _context12.t0 = expect;
            _context12.next = 12;
            return regeneratorRuntime.awrap(dummy.value());

          case 12:
            _context12.t1 = _context12.sent;
            _context12.t2 = value;
            (0, _context12.t0)(_context12.t1).to.bignumber.eq(_context12.t2);
            _context12.t3 = expect;
            _context12.next = 18;
            return regeneratorRuntime.awrap(dummy.version());

          case 18:
            _context12.t4 = _context12.sent;
            (0, _context12.t3)(_context12.t4).to.eq('V1');
            _context12.next = 22;
            return regeneratorRuntime.awrap(beacon.upgradeTo(this.implementationV1.address));

          case 22:
            _context12.t5 = expect;
            _context12.next = 25;
            return regeneratorRuntime.awrap(dummy.version());

          case 25:
            _context12.t6 = _context12.sent;
            (0, _context12.t5)(_context12.t6).to.eq('V2');

          case 27:
          case "end":
            return _context12.stop();
        }
      }
    }, null, this);
  });
  it('upgrade 2 proxies by upgrading shared beacon', function _callee13() {
    var value1, value2, beacon, proxy1InitializeData, proxy1, proxy2InitializeData, proxy2, dummy1, dummy2;
    return regeneratorRuntime.async(function _callee13$(_context13) {
      while (1) {
        switch (_context13.prev = _context13.next) {
          case 0:
            value1 = '10';
            value2 = '42';
            _context13.next = 4;
            return regeneratorRuntime.awrap(UpgradeableBeacon["new"](this.implementationV0.address));

          case 4:
            beacon = _context13.sent;
            proxy1InitializeData = this.implementationV0.contract.methods.initializeNonPayableWithValue(value1).encodeABI();
            _context13.next = 8;
            return regeneratorRuntime.awrap(BeaconProxy["new"](beacon.address, proxy1InitializeData));

          case 8:
            proxy1 = _context13.sent;
            proxy2InitializeData = this.implementationV0.contract.methods.initializeNonPayableWithValue(value2).encodeABI();
            _context13.next = 12;
            return regeneratorRuntime.awrap(BeaconProxy["new"](beacon.address, proxy2InitializeData));

          case 12:
            proxy2 = _context13.sent;
            dummy1 = new DummyImplementation(proxy1.address);
            dummy2 = new DummyImplementation(proxy2.address); // test initial values

            _context13.t0 = expect;
            _context13.next = 18;
            return regeneratorRuntime.awrap(dummy1.value());

          case 18:
            _context13.t1 = _context13.sent;
            _context13.t2 = value1;
            (0, _context13.t0)(_context13.t1).to.bignumber.eq(_context13.t2);
            _context13.t3 = expect;
            _context13.next = 24;
            return regeneratorRuntime.awrap(dummy2.value());

          case 24:
            _context13.t4 = _context13.sent;
            _context13.t5 = value2;
            (0, _context13.t3)(_context13.t4).to.bignumber.eq(_context13.t5);
            _context13.t6 = expect;
            _context13.next = 30;
            return regeneratorRuntime.awrap(dummy1.version());

          case 30:
            _context13.t7 = _context13.sent;
            (0, _context13.t6)(_context13.t7).to.eq('V1');
            _context13.t8 = expect;
            _context13.next = 35;
            return regeneratorRuntime.awrap(dummy2.version());

          case 35:
            _context13.t9 = _context13.sent;
            (0, _context13.t8)(_context13.t9).to.eq('V1');
            _context13.next = 39;
            return regeneratorRuntime.awrap(beacon.upgradeTo(this.implementationV1.address));

          case 39:
            _context13.t10 = expect;
            _context13.next = 42;
            return regeneratorRuntime.awrap(dummy1.version());

          case 42:
            _context13.t11 = _context13.sent;
            (0, _context13.t10)(_context13.t11).to.eq('V2');
            _context13.t12 = expect;
            _context13.next = 47;
            return regeneratorRuntime.awrap(dummy2.version());

          case 47:
            _context13.t13 = _context13.sent;
            (0, _context13.t12)(_context13.t13).to.eq('V2');

          case 49:
          case "end":
            return _context13.stop();
        }
      }
    }, null, this);
  });
});