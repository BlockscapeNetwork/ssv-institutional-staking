"use strict";

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var _require = require('@openzeppelin/test-helpers'),
    expectRevert = _require.expectRevert;

var _require2 = require('chai'),
    expect = _require2.expect;

var ImplV1 = artifacts.require('DummyImplementation');

var ImplV2 = artifacts.require('DummyImplementationV2');

var ProxyAdmin = artifacts.require('ProxyAdmin');

var TransparentUpgradeableProxy = artifacts.require('TransparentUpgradeableProxy');

contract('ProxyAdmin', function (accounts) {
  var _accounts = _slicedToArray(accounts, 3),
      proxyAdminOwner = _accounts[0],
      newAdmin = _accounts[1],
      anotherAccount = _accounts[2];

  before('set implementations', function _callee() {
    return regeneratorRuntime.async(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return regeneratorRuntime.awrap(ImplV1["new"]());

          case 2:
            this.implementationV1 = _context.sent;
            _context.next = 5;
            return regeneratorRuntime.awrap(ImplV2["new"]());

          case 5:
            this.implementationV2 = _context.sent;

          case 6:
          case "end":
            return _context.stop();
        }
      }
    }, null, this);
  });
  beforeEach(function _callee2() {
    var initializeData;
    return regeneratorRuntime.async(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            initializeData = Buffer.from('');
            _context2.next = 3;
            return regeneratorRuntime.awrap(ProxyAdmin["new"]({
              from: proxyAdminOwner
            }));

          case 3:
            this.proxyAdmin = _context2.sent;
            _context2.next = 6;
            return regeneratorRuntime.awrap(TransparentUpgradeableProxy["new"](this.implementationV1.address, this.proxyAdmin.address, initializeData, {
              from: proxyAdminOwner
            }));

          case 6:
            this.proxy = _context2.sent;

          case 7:
          case "end":
            return _context2.stop();
        }
      }
    }, null, this);
  });
  it('has an owner', function _callee3() {
    return regeneratorRuntime.async(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.t0 = expect;
            _context3.next = 3;
            return regeneratorRuntime.awrap(this.proxyAdmin.owner());

          case 3:
            _context3.t1 = _context3.sent;
            _context3.t2 = proxyAdminOwner;
            (0, _context3.t0)(_context3.t1).to.equal(_context3.t2);

          case 6:
          case "end":
            return _context3.stop();
        }
      }
    }, null, this);
  });
  describe('#getProxyAdmin', function () {
    it('returns proxyAdmin as admin of the proxy', function _callee4() {
      var admin;
      return regeneratorRuntime.async(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              _context4.next = 2;
              return regeneratorRuntime.awrap(this.proxyAdmin.getProxyAdmin(this.proxy.address));

            case 2:
              admin = _context4.sent;
              expect(admin).to.be.equal(this.proxyAdmin.address);

            case 4:
            case "end":
              return _context4.stop();
          }
        }
      }, null, this);
    });
    it('call to invalid proxy', function _callee5() {
      return regeneratorRuntime.async(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              _context5.next = 2;
              return regeneratorRuntime.awrap(expectRevert.unspecified(this.proxyAdmin.getProxyAdmin(this.implementationV1.address)));

            case 2:
            case "end":
              return _context5.stop();
          }
        }
      }, null, this);
    });
  });
  describe('#changeProxyAdmin', function () {
    it('fails to change proxy admin if its not the proxy owner', function _callee6() {
      return regeneratorRuntime.async(function _callee6$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              _context6.next = 2;
              return regeneratorRuntime.awrap(expectRevert(this.proxyAdmin.changeProxyAdmin(this.proxy.address, newAdmin, {
                from: anotherAccount
              }), 'caller is not the owner'));

            case 2:
            case "end":
              return _context6.stop();
          }
        }
      }, null, this);
    });
    it('changes proxy admin', function _callee7() {
      return regeneratorRuntime.async(function _callee7$(_context7) {
        while (1) {
          switch (_context7.prev = _context7.next) {
            case 0:
              _context7.next = 2;
              return regeneratorRuntime.awrap(this.proxyAdmin.changeProxyAdmin(this.proxy.address, newAdmin, {
                from: proxyAdminOwner
              }));

            case 2:
              _context7.t0 = expect;
              _context7.next = 5;
              return regeneratorRuntime.awrap(this.proxy.admin.call({
                from: newAdmin
              }));

            case 5:
              _context7.t1 = _context7.sent;
              _context7.t2 = newAdmin;
              (0, _context7.t0)(_context7.t1).to.eq(_context7.t2);

            case 8:
            case "end":
              return _context7.stop();
          }
        }
      }, null, this);
    });
  });
  describe('#getProxyImplementation', function () {
    it('returns proxy implementation address', function _callee8() {
      var implementationAddress;
      return regeneratorRuntime.async(function _callee8$(_context8) {
        while (1) {
          switch (_context8.prev = _context8.next) {
            case 0:
              _context8.next = 2;
              return regeneratorRuntime.awrap(this.proxyAdmin.getProxyImplementation(this.proxy.address));

            case 2:
              implementationAddress = _context8.sent;
              expect(implementationAddress).to.be.equal(this.implementationV1.address);

            case 4:
            case "end":
              return _context8.stop();
          }
        }
      }, null, this);
    });
    it('call to invalid proxy', function _callee9() {
      return regeneratorRuntime.async(function _callee9$(_context9) {
        while (1) {
          switch (_context9.prev = _context9.next) {
            case 0:
              _context9.next = 2;
              return regeneratorRuntime.awrap(expectRevert.unspecified(this.proxyAdmin.getProxyImplementation(this.implementationV1.address)));

            case 2:
            case "end":
              return _context9.stop();
          }
        }
      }, null, this);
    });
  });
  describe('#upgrade', function () {
    context('with unauthorized account', function () {
      it('fails to upgrade', function _callee10() {
        return regeneratorRuntime.async(function _callee10$(_context10) {
          while (1) {
            switch (_context10.prev = _context10.next) {
              case 0:
                _context10.next = 2;
                return regeneratorRuntime.awrap(expectRevert(this.proxyAdmin.upgrade(this.proxy.address, this.implementationV2.address, {
                  from: anotherAccount
                }), 'caller is not the owner'));

              case 2:
              case "end":
                return _context10.stop();
            }
          }
        }, null, this);
      });
    });
    context('with authorized account', function () {
      it('upgrades implementation', function _callee11() {
        var implementationAddress;
        return regeneratorRuntime.async(function _callee11$(_context11) {
          while (1) {
            switch (_context11.prev = _context11.next) {
              case 0:
                _context11.next = 2;
                return regeneratorRuntime.awrap(this.proxyAdmin.upgrade(this.proxy.address, this.implementationV2.address, {
                  from: proxyAdminOwner
                }));

              case 2:
                _context11.next = 4;
                return regeneratorRuntime.awrap(this.proxyAdmin.getProxyImplementation(this.proxy.address));

              case 4:
                implementationAddress = _context11.sent;
                expect(implementationAddress).to.be.equal(this.implementationV2.address);

              case 6:
              case "end":
                return _context11.stop();
            }
          }
        }, null, this);
      });
    });
  });
  describe('#upgradeAndCall', function () {
    context('with unauthorized account', function () {
      it('fails to upgrade', function _callee12() {
        var callData;
        return regeneratorRuntime.async(function _callee12$(_context12) {
          while (1) {
            switch (_context12.prev = _context12.next) {
              case 0:
                callData = new ImplV1('').contract.methods.initializeNonPayableWithValue(1337).encodeABI();
                _context12.next = 3;
                return regeneratorRuntime.awrap(expectRevert(this.proxyAdmin.upgradeAndCall(this.proxy.address, this.implementationV2.address, callData, {
                  from: anotherAccount
                }), 'caller is not the owner'));

              case 3:
              case "end":
                return _context12.stop();
            }
          }
        }, null, this);
      });
    });
    context('with authorized account', function () {
      context('with invalid callData', function () {
        it('fails to upgrade', function _callee13() {
          var callData;
          return regeneratorRuntime.async(function _callee13$(_context13) {
            while (1) {
              switch (_context13.prev = _context13.next) {
                case 0:
                  callData = '0x12345678';
                  _context13.next = 3;
                  return regeneratorRuntime.awrap(expectRevert.unspecified(this.proxyAdmin.upgradeAndCall(this.proxy.address, this.implementationV2.address, callData, {
                    from: proxyAdminOwner
                  })));

                case 3:
                case "end":
                  return _context13.stop();
              }
            }
          }, null, this);
        });
      });
      context('with valid callData', function () {
        it('upgrades implementation', function _callee14() {
          var callData, implementationAddress;
          return regeneratorRuntime.async(function _callee14$(_context14) {
            while (1) {
              switch (_context14.prev = _context14.next) {
                case 0:
                  callData = new ImplV1('').contract.methods.initializeNonPayableWithValue(1337).encodeABI();
                  _context14.next = 3;
                  return regeneratorRuntime.awrap(this.proxyAdmin.upgradeAndCall(this.proxy.address, this.implementationV2.address, callData, {
                    from: proxyAdminOwner
                  }));

                case 3:
                  _context14.next = 5;
                  return regeneratorRuntime.awrap(this.proxyAdmin.getProxyImplementation(this.proxy.address));

                case 5:
                  implementationAddress = _context14.sent;
                  expect(implementationAddress).to.be.equal(this.implementationV2.address);

                case 7:
                case "end":
                  return _context14.stop();
              }
            }
          }, null, this);
        });
      });
    });
  });
});