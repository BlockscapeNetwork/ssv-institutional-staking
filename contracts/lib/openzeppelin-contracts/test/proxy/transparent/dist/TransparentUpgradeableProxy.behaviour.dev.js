"use strict";

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var _require = require('@openzeppelin/test-helpers'),
    BN = _require.BN,
    expectRevert = _require.expectRevert,
    expectEvent = _require.expectEvent,
    constants = _require.constants;

var ZERO_ADDRESS = constants.ZERO_ADDRESS;

var _require2 = require('../../helpers/erc1967'),
    getSlot = _require2.getSlot,
    ImplementationSlot = _require2.ImplementationSlot,
    AdminSlot = _require2.AdminSlot;

var _require3 = require('chai'),
    expect = _require3.expect;

var Proxy = artifacts.require('Proxy');

var Implementation1 = artifacts.require('Implementation1');

var Implementation2 = artifacts.require('Implementation2');

var Implementation3 = artifacts.require('Implementation3');

var Implementation4 = artifacts.require('Implementation4');

var MigratableMockV1 = artifacts.require('MigratableMockV1');

var MigratableMockV2 = artifacts.require('MigratableMockV2');

var MigratableMockV3 = artifacts.require('MigratableMockV3');

var InitializableMock = artifacts.require('InitializableMock');

var DummyImplementation = artifacts.require('DummyImplementation');

var ClashingImplementation = artifacts.require('ClashingImplementation');

module.exports = function shouldBehaveLikeTransparentUpgradeableProxy(createProxy, accounts) {
  var _accounts = _slicedToArray(accounts, 3),
      proxyAdminAddress = _accounts[0],
      proxyAdminOwner = _accounts[1],
      anotherAccount = _accounts[2];

  before(function _callee() {
    return regeneratorRuntime.async(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return regeneratorRuntime.awrap(DummyImplementation["new"]());

          case 2:
            this.implementationV0 = _context.sent.address;
            _context.next = 5;
            return regeneratorRuntime.awrap(DummyImplementation["new"]());

          case 5:
            this.implementationV1 = _context.sent.address;

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
            return regeneratorRuntime.awrap(createProxy(this.implementationV0, proxyAdminAddress, initializeData, {
              from: proxyAdminOwner
            }));

          case 3:
            this.proxy = _context2.sent;
            this.proxyAddress = this.proxy.address;

          case 5:
          case "end":
            return _context2.stop();
        }
      }
    }, null, this);
  });
  describe('implementation', function () {
    it('returns the current implementation address', function _callee3() {
      var implementation;
      return regeneratorRuntime.async(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _context3.next = 2;
              return regeneratorRuntime.awrap(this.proxy.implementation.call({
                from: proxyAdminAddress
              }));

            case 2:
              implementation = _context3.sent;
              expect(implementation).to.be.equal(this.implementationV0);

            case 4:
            case "end":
              return _context3.stop();
          }
        }
      }, null, this);
    });
    it('delegates to the implementation', function _callee4() {
      var dummy, value;
      return regeneratorRuntime.async(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              dummy = new DummyImplementation(this.proxyAddress);
              _context4.next = 3;
              return regeneratorRuntime.awrap(dummy.get());

            case 3:
              value = _context4.sent;
              expect(value).to.equal(true);

            case 5:
            case "end":
              return _context4.stop();
          }
        }
      }, null, this);
    });
  });
  describe('upgradeTo', function () {
    describe('when the sender is the admin', function () {
      var from = proxyAdminAddress;
      describe('when the given implementation is different from the current one', function () {
        it('upgrades to the requested implementation', function _callee5() {
          var implementation;
          return regeneratorRuntime.async(function _callee5$(_context5) {
            while (1) {
              switch (_context5.prev = _context5.next) {
                case 0:
                  _context5.next = 2;
                  return regeneratorRuntime.awrap(this.proxy.upgradeTo(this.implementationV1, {
                    from: from
                  }));

                case 2:
                  _context5.next = 4;
                  return regeneratorRuntime.awrap(this.proxy.implementation.call({
                    from: proxyAdminAddress
                  }));

                case 4:
                  implementation = _context5.sent;
                  expect(implementation).to.be.equal(this.implementationV1);

                case 6:
                case "end":
                  return _context5.stop();
              }
            }
          }, null, this);
        });
        it('emits an event', function _callee6() {
          return regeneratorRuntime.async(function _callee6$(_context6) {
            while (1) {
              switch (_context6.prev = _context6.next) {
                case 0:
                  _context6.t0 = expectEvent;
                  _context6.next = 3;
                  return regeneratorRuntime.awrap(this.proxy.upgradeTo(this.implementationV1, {
                    from: from
                  }));

                case 3:
                  _context6.t1 = _context6.sent;
                  _context6.t2 = {
                    implementation: this.implementationV1
                  };
                  (0, _context6.t0)(_context6.t1, 'Upgraded', _context6.t2);

                case 6:
                case "end":
                  return _context6.stop();
              }
            }
          }, null, this);
        });
      });
      describe('when the given implementation is the zero address', function () {
        it('reverts', function _callee7() {
          return regeneratorRuntime.async(function _callee7$(_context7) {
            while (1) {
              switch (_context7.prev = _context7.next) {
                case 0:
                  _context7.next = 2;
                  return regeneratorRuntime.awrap(expectRevert(this.proxy.upgradeTo(ZERO_ADDRESS, {
                    from: from
                  }), 'ERC1967: new implementation is not a contract'));

                case 2:
                case "end":
                  return _context7.stop();
              }
            }
          }, null, this);
        });
      });
    });
    describe('when the sender is not the admin', function () {
      var from = anotherAccount;
      it('reverts', function _callee8() {
        return regeneratorRuntime.async(function _callee8$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                _context8.next = 2;
                return regeneratorRuntime.awrap(expectRevert.unspecified(this.proxy.upgradeTo(this.implementationV1, {
                  from: from
                })));

              case 2:
              case "end":
                return _context8.stop();
            }
          }
        }, null, this);
      });
    });
  });
  describe('upgradeToAndCall', function () {
    describe('without migrations', function () {
      beforeEach(function _callee9() {
        return regeneratorRuntime.async(function _callee9$(_context9) {
          while (1) {
            switch (_context9.prev = _context9.next) {
              case 0:
                _context9.next = 2;
                return regeneratorRuntime.awrap(InitializableMock["new"]());

              case 2:
                this.behavior = _context9.sent;

              case 3:
              case "end":
                return _context9.stop();
            }
          }
        }, null, this);
      });
      describe('when the call does not fail', function () {
        var initializeData = new InitializableMock('').contract.methods['initializeWithX(uint256)'](42).encodeABI();
        describe('when the sender is the admin', function () {
          var from = proxyAdminAddress;
          var value = 1e5;
          beforeEach(function _callee10() {
            return regeneratorRuntime.async(function _callee10$(_context10) {
              while (1) {
                switch (_context10.prev = _context10.next) {
                  case 0:
                    _context10.next = 2;
                    return regeneratorRuntime.awrap(this.proxy.upgradeToAndCall(this.behavior.address, initializeData, {
                      from: from,
                      value: value
                    }));

                  case 2:
                    this.receipt = _context10.sent;

                  case 3:
                  case "end":
                    return _context10.stop();
                }
              }
            }, null, this);
          });
          it('upgrades to the requested implementation', function _callee11() {
            var implementation;
            return regeneratorRuntime.async(function _callee11$(_context11) {
              while (1) {
                switch (_context11.prev = _context11.next) {
                  case 0:
                    _context11.next = 2;
                    return regeneratorRuntime.awrap(this.proxy.implementation.call({
                      from: proxyAdminAddress
                    }));

                  case 2:
                    implementation = _context11.sent;
                    expect(implementation).to.be.equal(this.behavior.address);

                  case 4:
                  case "end":
                    return _context11.stop();
                }
              }
            }, null, this);
          });
          it('emits an event', function () {
            expectEvent(this.receipt, 'Upgraded', {
              implementation: this.behavior.address
            });
          });
          it('calls the initializer function', function _callee12() {
            var migratable, x;
            return regeneratorRuntime.async(function _callee12$(_context12) {
              while (1) {
                switch (_context12.prev = _context12.next) {
                  case 0:
                    migratable = new InitializableMock(this.proxyAddress);
                    _context12.next = 3;
                    return regeneratorRuntime.awrap(migratable.x());

                  case 3:
                    x = _context12.sent;
                    expect(x).to.be.bignumber.equal('42');

                  case 5:
                  case "end":
                    return _context12.stop();
                }
              }
            }, null, this);
          });
          it('sends given value to the proxy', function _callee13() {
            var balance;
            return regeneratorRuntime.async(function _callee13$(_context13) {
              while (1) {
                switch (_context13.prev = _context13.next) {
                  case 0:
                    _context13.next = 2;
                    return regeneratorRuntime.awrap(web3.eth.getBalance(this.proxyAddress));

                  case 2:
                    balance = _context13.sent;
                    expect(balance.toString()).to.be.bignumber.equal(value.toString());

                  case 4:
                  case "end":
                    return _context13.stop();
                }
              }
            }, null, this);
          });
          it.skip('uses the storage of the proxy', function _callee14() {
            var storedValue;
            return regeneratorRuntime.async(function _callee14$(_context14) {
              while (1) {
                switch (_context14.prev = _context14.next) {
                  case 0:
                    _context14.next = 2;
                    return regeneratorRuntime.awrap(Proxy.at(this.proxyAddress).getStorageAt(52));

                  case 2:
                    storedValue = _context14.sent;
                    expect(parseInt(storedValue)).to.eq(42);

                  case 4:
                  case "end":
                    return _context14.stop();
                }
              }
            }, null, this);
          });
        });
        describe('when the sender is not the admin', function () {
          it('reverts', function _callee15() {
            return regeneratorRuntime.async(function _callee15$(_context15) {
              while (1) {
                switch (_context15.prev = _context15.next) {
                  case 0:
                    _context15.next = 2;
                    return regeneratorRuntime.awrap(expectRevert.unspecified(this.proxy.upgradeToAndCall(this.behavior.address, initializeData, {
                      from: anotherAccount
                    })));

                  case 2:
                  case "end":
                    return _context15.stop();
                }
              }
            }, null, this);
          });
        });
      });
      describe('when the call does fail', function () {
        var initializeData = new InitializableMock('').contract.methods.fail().encodeABI();
        it('reverts', function _callee16() {
          return regeneratorRuntime.async(function _callee16$(_context16) {
            while (1) {
              switch (_context16.prev = _context16.next) {
                case 0:
                  _context16.next = 2;
                  return regeneratorRuntime.awrap(expectRevert.unspecified(this.proxy.upgradeToAndCall(this.behavior.address, initializeData, {
                    from: proxyAdminAddress
                  })));

                case 2:
                case "end":
                  return _context16.stop();
              }
            }
          }, null, this);
        });
      });
    });
    describe('with migrations', function () {
      describe('when the sender is the admin', function () {
        var from = proxyAdminAddress;
        var value = 1e5;
        describe('when upgrading to V1', function () {
          var v1MigrationData = new MigratableMockV1('').contract.methods.initialize(42).encodeABI();
          beforeEach(function _callee17() {
            return regeneratorRuntime.async(function _callee17$(_context17) {
              while (1) {
                switch (_context17.prev = _context17.next) {
                  case 0:
                    _context17.next = 2;
                    return regeneratorRuntime.awrap(MigratableMockV1["new"]());

                  case 2:
                    this.behaviorV1 = _context17.sent;
                    _context17.t0 = BN;
                    _context17.next = 6;
                    return regeneratorRuntime.awrap(web3.eth.getBalance(this.proxyAddress));

                  case 6:
                    _context17.t1 = _context17.sent;
                    this.balancePreviousV1 = new _context17.t0(_context17.t1);
                    _context17.next = 10;
                    return regeneratorRuntime.awrap(this.proxy.upgradeToAndCall(this.behaviorV1.address, v1MigrationData, {
                      from: from,
                      value: value
                    }));

                  case 10:
                    this.receipt = _context17.sent;

                  case 11:
                  case "end":
                    return _context17.stop();
                }
              }
            }, null, this);
          });
          it('upgrades to the requested version and emits an event', function _callee18() {
            var implementation;
            return regeneratorRuntime.async(function _callee18$(_context18) {
              while (1) {
                switch (_context18.prev = _context18.next) {
                  case 0:
                    _context18.next = 2;
                    return regeneratorRuntime.awrap(this.proxy.implementation.call({
                      from: proxyAdminAddress
                    }));

                  case 2:
                    implementation = _context18.sent;
                    expect(implementation).to.be.equal(this.behaviorV1.address);
                    expectEvent(this.receipt, 'Upgraded', {
                      implementation: this.behaviorV1.address
                    });

                  case 5:
                  case "end":
                    return _context18.stop();
                }
              }
            }, null, this);
          });
          it('calls the \'initialize\' function and sends given value to the proxy', function _callee19() {
            var migratable, x, balance;
            return regeneratorRuntime.async(function _callee19$(_context19) {
              while (1) {
                switch (_context19.prev = _context19.next) {
                  case 0:
                    migratable = new MigratableMockV1(this.proxyAddress);
                    _context19.next = 3;
                    return regeneratorRuntime.awrap(migratable.x());

                  case 3:
                    x = _context19.sent;
                    expect(x).to.be.bignumber.equal('42');
                    _context19.next = 7;
                    return regeneratorRuntime.awrap(web3.eth.getBalance(this.proxyAddress));

                  case 7:
                    balance = _context19.sent;
                    expect(new BN(balance)).to.be.bignumber.equal(this.balancePreviousV1.addn(value));

                  case 9:
                  case "end":
                    return _context19.stop();
                }
              }
            }, null, this);
          });
          describe('when upgrading to V2', function () {
            var v2MigrationData = new MigratableMockV2('').contract.methods.migrate(10, 42).encodeABI();
            beforeEach(function _callee20() {
              return regeneratorRuntime.async(function _callee20$(_context20) {
                while (1) {
                  switch (_context20.prev = _context20.next) {
                    case 0:
                      _context20.next = 2;
                      return regeneratorRuntime.awrap(MigratableMockV2["new"]());

                    case 2:
                      this.behaviorV2 = _context20.sent;
                      _context20.t0 = BN;
                      _context20.next = 6;
                      return regeneratorRuntime.awrap(web3.eth.getBalance(this.proxyAddress));

                    case 6:
                      _context20.t1 = _context20.sent;
                      this.balancePreviousV2 = new _context20.t0(_context20.t1);
                      _context20.next = 10;
                      return regeneratorRuntime.awrap(this.proxy.upgradeToAndCall(this.behaviorV2.address, v2MigrationData, {
                        from: from,
                        value: value
                      }));

                    case 10:
                      this.receipt = _context20.sent;

                    case 11:
                    case "end":
                      return _context20.stop();
                  }
                }
              }, null, this);
            });
            it('upgrades to the requested version and emits an event', function _callee21() {
              var implementation;
              return regeneratorRuntime.async(function _callee21$(_context21) {
                while (1) {
                  switch (_context21.prev = _context21.next) {
                    case 0:
                      _context21.next = 2;
                      return regeneratorRuntime.awrap(this.proxy.implementation.call({
                        from: proxyAdminAddress
                      }));

                    case 2:
                      implementation = _context21.sent;
                      expect(implementation).to.be.equal(this.behaviorV2.address);
                      expectEvent(this.receipt, 'Upgraded', {
                        implementation: this.behaviorV2.address
                      });

                    case 5:
                    case "end":
                      return _context21.stop();
                  }
                }
              }, null, this);
            });
            it('calls the \'migrate\' function and sends given value to the proxy', function _callee22() {
              var migratable, x, y, balance;
              return regeneratorRuntime.async(function _callee22$(_context22) {
                while (1) {
                  switch (_context22.prev = _context22.next) {
                    case 0:
                      migratable = new MigratableMockV2(this.proxyAddress);
                      _context22.next = 3;
                      return regeneratorRuntime.awrap(migratable.x());

                    case 3:
                      x = _context22.sent;
                      expect(x).to.be.bignumber.equal('10');
                      _context22.next = 7;
                      return regeneratorRuntime.awrap(migratable.y());

                    case 7:
                      y = _context22.sent;
                      expect(y).to.be.bignumber.equal('42');
                      _context22.t0 = BN;
                      _context22.next = 12;
                      return regeneratorRuntime.awrap(web3.eth.getBalance(this.proxyAddress));

                    case 12:
                      _context22.t1 = _context22.sent;
                      balance = new _context22.t0(_context22.t1);
                      expect(balance).to.be.bignumber.equal(this.balancePreviousV2.addn(value));

                    case 15:
                    case "end":
                      return _context22.stop();
                  }
                }
              }, null, this);
            });
            describe('when upgrading to V3', function () {
              var v3MigrationData = new MigratableMockV3('').contract.methods['migrate()']().encodeABI();
              beforeEach(function _callee23() {
                return regeneratorRuntime.async(function _callee23$(_context23) {
                  while (1) {
                    switch (_context23.prev = _context23.next) {
                      case 0:
                        _context23.next = 2;
                        return regeneratorRuntime.awrap(MigratableMockV3["new"]());

                      case 2:
                        this.behaviorV3 = _context23.sent;
                        _context23.t0 = BN;
                        _context23.next = 6;
                        return regeneratorRuntime.awrap(web3.eth.getBalance(this.proxyAddress));

                      case 6:
                        _context23.t1 = _context23.sent;
                        this.balancePreviousV3 = new _context23.t0(_context23.t1);
                        _context23.next = 10;
                        return regeneratorRuntime.awrap(this.proxy.upgradeToAndCall(this.behaviorV3.address, v3MigrationData, {
                          from: from,
                          value: value
                        }));

                      case 10:
                        this.receipt = _context23.sent;

                      case 11:
                      case "end":
                        return _context23.stop();
                    }
                  }
                }, null, this);
              });
              it('upgrades to the requested version and emits an event', function _callee24() {
                var implementation;
                return regeneratorRuntime.async(function _callee24$(_context24) {
                  while (1) {
                    switch (_context24.prev = _context24.next) {
                      case 0:
                        _context24.next = 2;
                        return regeneratorRuntime.awrap(this.proxy.implementation.call({
                          from: proxyAdminAddress
                        }));

                      case 2:
                        implementation = _context24.sent;
                        expect(implementation).to.be.equal(this.behaviorV3.address);
                        expectEvent(this.receipt, 'Upgraded', {
                          implementation: this.behaviorV3.address
                        });

                      case 5:
                      case "end":
                        return _context24.stop();
                    }
                  }
                }, null, this);
              });
              it('calls the \'migrate\' function and sends given value to the proxy', function _callee25() {
                var migratable, x, y, balance;
                return regeneratorRuntime.async(function _callee25$(_context25) {
                  while (1) {
                    switch (_context25.prev = _context25.next) {
                      case 0:
                        migratable = new MigratableMockV3(this.proxyAddress);
                        _context25.next = 3;
                        return regeneratorRuntime.awrap(migratable.x());

                      case 3:
                        x = _context25.sent;
                        expect(x).to.be.bignumber.equal('42');
                        _context25.next = 7;
                        return regeneratorRuntime.awrap(migratable.y());

                      case 7:
                        y = _context25.sent;
                        expect(y).to.be.bignumber.equal('10');
                        _context25.t0 = BN;
                        _context25.next = 12;
                        return regeneratorRuntime.awrap(web3.eth.getBalance(this.proxyAddress));

                      case 12:
                        _context25.t1 = _context25.sent;
                        balance = new _context25.t0(_context25.t1);
                        expect(balance).to.be.bignumber.equal(this.balancePreviousV3.addn(value));

                      case 15:
                      case "end":
                        return _context25.stop();
                    }
                  }
                }, null, this);
              });
            });
          });
        });
      });
      describe('when the sender is not the admin', function () {
        var from = anotherAccount;
        it('reverts', function _callee26() {
          var behaviorV1, v1MigrationData;
          return regeneratorRuntime.async(function _callee26$(_context26) {
            while (1) {
              switch (_context26.prev = _context26.next) {
                case 0:
                  _context26.next = 2;
                  return regeneratorRuntime.awrap(MigratableMockV1["new"]());

                case 2:
                  behaviorV1 = _context26.sent;
                  v1MigrationData = new MigratableMockV1('').contract.methods.initialize(42).encodeABI();
                  _context26.next = 6;
                  return regeneratorRuntime.awrap(expectRevert.unspecified(this.proxy.upgradeToAndCall(behaviorV1.address, v1MigrationData, {
                    from: from
                  })));

                case 6:
                case "end":
                  return _context26.stop();
              }
            }
          }, null, this);
        });
      });
    });
  });
  describe('changeAdmin', function () {
    describe('when the new proposed admin is not the zero address', function () {
      var newAdmin = anotherAccount;
      describe('when the sender is the admin', function () {
        beforeEach('transferring', function _callee27() {
          return regeneratorRuntime.async(function _callee27$(_context27) {
            while (1) {
              switch (_context27.prev = _context27.next) {
                case 0:
                  _context27.next = 2;
                  return regeneratorRuntime.awrap(this.proxy.changeAdmin(newAdmin, {
                    from: proxyAdminAddress
                  }));

                case 2:
                  this.receipt = _context27.sent;

                case 3:
                case "end":
                  return _context27.stop();
              }
            }
          }, null, this);
        });
        it('assigns new proxy admin', function _callee28() {
          var newProxyAdmin;
          return regeneratorRuntime.async(function _callee28$(_context28) {
            while (1) {
              switch (_context28.prev = _context28.next) {
                case 0:
                  _context28.next = 2;
                  return regeneratorRuntime.awrap(this.proxy.admin.call({
                    from: newAdmin
                  }));

                case 2:
                  newProxyAdmin = _context28.sent;
                  expect(newProxyAdmin).to.be.equal(anotherAccount);

                case 4:
                case "end":
                  return _context28.stop();
              }
            }
          }, null, this);
        });
        it('emits an event', function () {
          expectEvent(this.receipt, 'AdminChanged', {
            previousAdmin: proxyAdminAddress,
            newAdmin: newAdmin
          });
        });
      });
      describe('when the sender is not the admin', function () {
        it('reverts', function _callee29() {
          return regeneratorRuntime.async(function _callee29$(_context29) {
            while (1) {
              switch (_context29.prev = _context29.next) {
                case 0:
                  _context29.next = 2;
                  return regeneratorRuntime.awrap(expectRevert.unspecified(this.proxy.changeAdmin(newAdmin, {
                    from: anotherAccount
                  })));

                case 2:
                case "end":
                  return _context29.stop();
              }
            }
          }, null, this);
        });
      });
    });
    describe('when the new proposed admin is the zero address', function () {
      it('reverts', function _callee30() {
        return regeneratorRuntime.async(function _callee30$(_context30) {
          while (1) {
            switch (_context30.prev = _context30.next) {
              case 0:
                _context30.next = 2;
                return regeneratorRuntime.awrap(expectRevert(this.proxy.changeAdmin(ZERO_ADDRESS, {
                  from: proxyAdminAddress
                }), 'ERC1967: new admin is the zero address'));

              case 2:
              case "end":
                return _context30.stop();
            }
          }
        }, null, this);
      });
    });
  });
  describe('storage', function () {
    it('should store the implementation address in specified location', function _callee31() {
      var implementationSlot, implementationAddress;
      return regeneratorRuntime.async(function _callee31$(_context31) {
        while (1) {
          switch (_context31.prev = _context31.next) {
            case 0:
              _context31.next = 2;
              return regeneratorRuntime.awrap(getSlot(this.proxy, ImplementationSlot));

            case 2:
              implementationSlot = _context31.sent;
              implementationAddress = web3.utils.toChecksumAddress(implementationSlot.substr(-40));
              expect(implementationAddress).to.be.equal(this.implementationV0);

            case 5:
            case "end":
              return _context31.stop();
          }
        }
      }, null, this);
    });
    it('should store the admin proxy in specified location', function _callee32() {
      var proxyAdminSlot, proxyAdminAddress;
      return regeneratorRuntime.async(function _callee32$(_context32) {
        while (1) {
          switch (_context32.prev = _context32.next) {
            case 0:
              _context32.next = 2;
              return regeneratorRuntime.awrap(getSlot(this.proxy, AdminSlot));

            case 2:
              proxyAdminSlot = _context32.sent;
              proxyAdminAddress = web3.utils.toChecksumAddress(proxyAdminSlot.substr(-40));
              expect(proxyAdminAddress).to.be.equal(proxyAdminAddress);

            case 5:
            case "end":
              return _context32.stop();
          }
        }
      }, null, this);
    });
  });
  describe('transparent proxy', function () {
    beforeEach('creating proxy', function _callee33() {
      var initializeData;
      return regeneratorRuntime.async(function _callee33$(_context33) {
        while (1) {
          switch (_context33.prev = _context33.next) {
            case 0:
              initializeData = Buffer.from('');
              _context33.next = 3;
              return regeneratorRuntime.awrap(ClashingImplementation["new"]());

            case 3:
              this.impl = _context33.sent;
              _context33.next = 6;
              return regeneratorRuntime.awrap(createProxy(this.impl.address, proxyAdminAddress, initializeData, {
                from: proxyAdminOwner
              }));

            case 6:
              this.proxy = _context33.sent;
              this.clashing = new ClashingImplementation(this.proxy.address);

            case 8:
            case "end":
              return _context33.stop();
          }
        }
      }, null, this);
    });
    it('proxy admin cannot call delegated functions', function _callee34() {
      return regeneratorRuntime.async(function _callee34$(_context34) {
        while (1) {
          switch (_context34.prev = _context34.next) {
            case 0:
              _context34.next = 2;
              return regeneratorRuntime.awrap(expectRevert(this.clashing.delegatedFunction({
                from: proxyAdminAddress
              }), 'TransparentUpgradeableProxy: admin cannot fallback to proxy target'));

            case 2:
            case "end":
              return _context34.stop();
          }
        }
      }, null, this);
    });
    context('when function names clash', function () {
      it('when sender is proxy admin should run the proxy function', function _callee35() {
        var value;
        return regeneratorRuntime.async(function _callee35$(_context35) {
          while (1) {
            switch (_context35.prev = _context35.next) {
              case 0:
                _context35.next = 2;
                return regeneratorRuntime.awrap(this.proxy.admin.call({
                  from: proxyAdminAddress
                }));

              case 2:
                value = _context35.sent;
                expect(value).to.be.equal(proxyAdminAddress);

              case 4:
              case "end":
                return _context35.stop();
            }
          }
        }, null, this);
      });
      it('when sender is other should delegate to implementation', function _callee36() {
        var value;
        return regeneratorRuntime.async(function _callee36$(_context36) {
          while (1) {
            switch (_context36.prev = _context36.next) {
              case 0:
                _context36.next = 2;
                return regeneratorRuntime.awrap(this.proxy.admin.call({
                  from: anotherAccount
                }));

              case 2:
                value = _context36.sent;
                expect(value).to.be.equal('0x0000000000000000000000000000000011111142');

              case 4:
              case "end":
                return _context36.stop();
            }
          }
        }, null, this);
      });
    });
  });
  describe('regression', function () {
    var initializeData = Buffer.from('');
    it('should add new function', function _callee37() {
      var instance1, proxy, proxyInstance1, instance2, proxyInstance2, res;
      return regeneratorRuntime.async(function _callee37$(_context37) {
        while (1) {
          switch (_context37.prev = _context37.next) {
            case 0:
              _context37.next = 2;
              return regeneratorRuntime.awrap(Implementation1["new"]());

            case 2:
              instance1 = _context37.sent;
              _context37.next = 5;
              return regeneratorRuntime.awrap(createProxy(instance1.address, proxyAdminAddress, initializeData, {
                from: proxyAdminOwner
              }));

            case 5:
              proxy = _context37.sent;
              proxyInstance1 = new Implementation1(proxy.address);
              _context37.next = 9;
              return regeneratorRuntime.awrap(proxyInstance1.setValue(42));

            case 9:
              _context37.next = 11;
              return regeneratorRuntime.awrap(Implementation2["new"]());

            case 11:
              instance2 = _context37.sent;
              _context37.next = 14;
              return regeneratorRuntime.awrap(proxy.upgradeTo(instance2.address, {
                from: proxyAdminAddress
              }));

            case 14:
              proxyInstance2 = new Implementation2(proxy.address);
              _context37.next = 17;
              return regeneratorRuntime.awrap(proxyInstance2.getValue());

            case 17:
              res = _context37.sent;
              expect(res.toString()).to.eq('42');

            case 19:
            case "end":
              return _context37.stop();
          }
        }
      });
    });
    it('should remove function', function _callee38() {
      var instance2, proxy, proxyInstance2, res, instance1, proxyInstance1;
      return regeneratorRuntime.async(function _callee38$(_context38) {
        while (1) {
          switch (_context38.prev = _context38.next) {
            case 0:
              _context38.next = 2;
              return regeneratorRuntime.awrap(Implementation2["new"]());

            case 2:
              instance2 = _context38.sent;
              _context38.next = 5;
              return regeneratorRuntime.awrap(createProxy(instance2.address, proxyAdminAddress, initializeData, {
                from: proxyAdminOwner
              }));

            case 5:
              proxy = _context38.sent;
              proxyInstance2 = new Implementation2(proxy.address);
              _context38.next = 9;
              return regeneratorRuntime.awrap(proxyInstance2.setValue(42));

            case 9:
              _context38.next = 11;
              return regeneratorRuntime.awrap(proxyInstance2.getValue());

            case 11:
              res = _context38.sent;
              expect(res.toString()).to.eq('42');
              _context38.next = 15;
              return regeneratorRuntime.awrap(Implementation1["new"]());

            case 15:
              instance1 = _context38.sent;
              _context38.next = 18;
              return regeneratorRuntime.awrap(proxy.upgradeTo(instance1.address, {
                from: proxyAdminAddress
              }));

            case 18:
              proxyInstance1 = new Implementation2(proxy.address);
              _context38.next = 21;
              return regeneratorRuntime.awrap(expectRevert.unspecified(proxyInstance1.getValue()));

            case 21:
            case "end":
              return _context38.stop();
          }
        }
      });
    });
    it('should change function signature', function _callee39() {
      var instance1, proxy, proxyInstance1, instance3, proxyInstance3, res;
      return regeneratorRuntime.async(function _callee39$(_context39) {
        while (1) {
          switch (_context39.prev = _context39.next) {
            case 0:
              _context39.next = 2;
              return regeneratorRuntime.awrap(Implementation1["new"]());

            case 2:
              instance1 = _context39.sent;
              _context39.next = 5;
              return regeneratorRuntime.awrap(createProxy(instance1.address, proxyAdminAddress, initializeData, {
                from: proxyAdminOwner
              }));

            case 5:
              proxy = _context39.sent;
              proxyInstance1 = new Implementation1(proxy.address);
              _context39.next = 9;
              return regeneratorRuntime.awrap(proxyInstance1.setValue(42));

            case 9:
              _context39.next = 11;
              return regeneratorRuntime.awrap(Implementation3["new"]());

            case 11:
              instance3 = _context39.sent;
              _context39.next = 14;
              return regeneratorRuntime.awrap(proxy.upgradeTo(instance3.address, {
                from: proxyAdminAddress
              }));

            case 14:
              proxyInstance3 = new Implementation3(proxy.address);
              _context39.next = 17;
              return regeneratorRuntime.awrap(proxyInstance3.getValue(8));

            case 17:
              res = _context39.sent;
              expect(res.toString()).to.eq('50');

            case 19:
            case "end":
              return _context39.stop();
          }
        }
      });
    });
    it('should add fallback function', function _callee40() {
      var initializeData, instance1, proxy, instance4, proxyInstance4, data, res;
      return regeneratorRuntime.async(function _callee40$(_context40) {
        while (1) {
          switch (_context40.prev = _context40.next) {
            case 0:
              initializeData = Buffer.from('');
              _context40.next = 3;
              return regeneratorRuntime.awrap(Implementation1["new"]());

            case 3:
              instance1 = _context40.sent;
              _context40.next = 6;
              return regeneratorRuntime.awrap(createProxy(instance1.address, proxyAdminAddress, initializeData, {
                from: proxyAdminOwner
              }));

            case 6:
              proxy = _context40.sent;
              _context40.next = 9;
              return regeneratorRuntime.awrap(Implementation4["new"]());

            case 9:
              instance4 = _context40.sent;
              _context40.next = 12;
              return regeneratorRuntime.awrap(proxy.upgradeTo(instance4.address, {
                from: proxyAdminAddress
              }));

            case 12:
              proxyInstance4 = new Implementation4(proxy.address);
              data = '0x';
              _context40.next = 16;
              return regeneratorRuntime.awrap(web3.eth.sendTransaction({
                to: proxy.address,
                from: anotherAccount,
                data: data
              }));

            case 16:
              _context40.next = 18;
              return regeneratorRuntime.awrap(proxyInstance4.getValue());

            case 18:
              res = _context40.sent;
              expect(res.toString()).to.eq('1');

            case 20:
            case "end":
              return _context40.stop();
          }
        }
      });
    });
    it('should remove fallback function', function _callee41() {
      var instance4, proxy, instance2, data, proxyInstance2, res;
      return regeneratorRuntime.async(function _callee41$(_context41) {
        while (1) {
          switch (_context41.prev = _context41.next) {
            case 0:
              _context41.next = 2;
              return regeneratorRuntime.awrap(Implementation4["new"]());

            case 2:
              instance4 = _context41.sent;
              _context41.next = 5;
              return regeneratorRuntime.awrap(createProxy(instance4.address, proxyAdminAddress, initializeData, {
                from: proxyAdminOwner
              }));

            case 5:
              proxy = _context41.sent;
              _context41.next = 8;
              return regeneratorRuntime.awrap(Implementation2["new"]());

            case 8:
              instance2 = _context41.sent;
              _context41.next = 11;
              return regeneratorRuntime.awrap(proxy.upgradeTo(instance2.address, {
                from: proxyAdminAddress
              }));

            case 11:
              data = '0x';
              _context41.next = 14;
              return regeneratorRuntime.awrap(expectRevert.unspecified(web3.eth.sendTransaction({
                to: proxy.address,
                from: anotherAccount,
                data: data
              })));

            case 14:
              proxyInstance2 = new Implementation2(proxy.address);
              _context41.next = 17;
              return regeneratorRuntime.awrap(proxyInstance2.getValue());

            case 17:
              res = _context41.sent;
              expect(res.toString()).to.eq('0');

            case 19:
            case "end":
              return _context41.stop();
          }
        }
      });
    });
  });
};