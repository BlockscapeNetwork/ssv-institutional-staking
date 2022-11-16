"use strict";

var _require = require('@openzeppelin/test-helpers'),
    expectEvent = _require.expectEvent,
    expectRevert = _require.expectRevert;

var _require2 = require('chai'),
    expect = _require2.expect;

var _require3 = require('../utils/introspection/SupportsInterface.behavior'),
    shouldSupportInterfaces = _require3.shouldSupportInterfaces;

var DEFAULT_ADMIN_ROLE = '0x0000000000000000000000000000000000000000000000000000000000000000';
var ROLE = web3.utils.soliditySha3('ROLE');
var OTHER_ROLE = web3.utils.soliditySha3('OTHER_ROLE');

function shouldBehaveLikeAccessControl(errorPrefix, admin, authorized, other, otherAdmin, otherAuthorized) {
  shouldSupportInterfaces(['AccessControl']);
  describe('default admin', function () {
    it('deployer has default admin role', function _callee() {
      return regeneratorRuntime.async(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.t0 = expect;
              _context.next = 3;
              return regeneratorRuntime.awrap(this.accessControl.hasRole(DEFAULT_ADMIN_ROLE, admin));

            case 3:
              _context.t1 = _context.sent;
              (0, _context.t0)(_context.t1).to.equal(true);

            case 5:
            case "end":
              return _context.stop();
          }
        }
      }, null, this);
    });
    it('other roles\'s admin is the default admin role', function _callee2() {
      return regeneratorRuntime.async(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.t0 = expect;
              _context2.next = 3;
              return regeneratorRuntime.awrap(this.accessControl.getRoleAdmin(ROLE));

            case 3:
              _context2.t1 = _context2.sent;
              _context2.t2 = DEFAULT_ADMIN_ROLE;
              (0, _context2.t0)(_context2.t1).to.equal(_context2.t2);

            case 6:
            case "end":
              return _context2.stop();
          }
        }
      }, null, this);
    });
    it('default admin role\'s admin is itself', function _callee3() {
      return regeneratorRuntime.async(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _context3.t0 = expect;
              _context3.next = 3;
              return regeneratorRuntime.awrap(this.accessControl.getRoleAdmin(DEFAULT_ADMIN_ROLE));

            case 3:
              _context3.t1 = _context3.sent;
              _context3.t2 = DEFAULT_ADMIN_ROLE;
              (0, _context3.t0)(_context3.t1).to.equal(_context3.t2);

            case 6:
            case "end":
              return _context3.stop();
          }
        }
      }, null, this);
    });
  });
  describe('granting', function () {
    beforeEach(function _callee4() {
      return regeneratorRuntime.async(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              _context4.next = 2;
              return regeneratorRuntime.awrap(this.accessControl.grantRole(ROLE, authorized, {
                from: admin
              }));

            case 2:
            case "end":
              return _context4.stop();
          }
        }
      }, null, this);
    });
    it('non-admin cannot grant role to other accounts', function _callee5() {
      return regeneratorRuntime.async(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              _context5.next = 2;
              return regeneratorRuntime.awrap(expectRevert(this.accessControl.grantRole(ROLE, authorized, {
                from: other
              }), "".concat(errorPrefix, ": account ").concat(other.toLowerCase(), " is missing role ").concat(DEFAULT_ADMIN_ROLE)));

            case 2:
            case "end":
              return _context5.stop();
          }
        }
      }, null, this);
    });
    it('accounts can be granted a role multiple times', function _callee6() {
      var receipt;
      return regeneratorRuntime.async(function _callee6$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              _context6.next = 2;
              return regeneratorRuntime.awrap(this.accessControl.grantRole(ROLE, authorized, {
                from: admin
              }));

            case 2:
              _context6.next = 4;
              return regeneratorRuntime.awrap(this.accessControl.grantRole(ROLE, authorized, {
                from: admin
              }));

            case 4:
              receipt = _context6.sent;
              expectEvent.notEmitted(receipt, 'RoleGranted');

            case 6:
            case "end":
              return _context6.stop();
          }
        }
      }, null, this);
    });
  });
  describe('revoking', function () {
    it('roles that are not had can be revoked', function _callee7() {
      var receipt;
      return regeneratorRuntime.async(function _callee7$(_context7) {
        while (1) {
          switch (_context7.prev = _context7.next) {
            case 0:
              _context7.t0 = expect;
              _context7.next = 3;
              return regeneratorRuntime.awrap(this.accessControl.hasRole(ROLE, authorized));

            case 3:
              _context7.t1 = _context7.sent;
              (0, _context7.t0)(_context7.t1).to.equal(false);
              _context7.next = 7;
              return regeneratorRuntime.awrap(this.accessControl.revokeRole(ROLE, authorized, {
                from: admin
              }));

            case 7:
              receipt = _context7.sent;
              expectEvent.notEmitted(receipt, 'RoleRevoked');

            case 9:
            case "end":
              return _context7.stop();
          }
        }
      }, null, this);
    });
    context('with granted role', function () {
      beforeEach(function _callee8() {
        return regeneratorRuntime.async(function _callee8$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                _context8.next = 2;
                return regeneratorRuntime.awrap(this.accessControl.grantRole(ROLE, authorized, {
                  from: admin
                }));

              case 2:
              case "end":
                return _context8.stop();
            }
          }
        }, null, this);
      });
      it('admin can revoke role', function _callee9() {
        var receipt;
        return regeneratorRuntime.async(function _callee9$(_context9) {
          while (1) {
            switch (_context9.prev = _context9.next) {
              case 0:
                _context9.next = 2;
                return regeneratorRuntime.awrap(this.accessControl.revokeRole(ROLE, authorized, {
                  from: admin
                }));

              case 2:
                receipt = _context9.sent;
                expectEvent(receipt, 'RoleRevoked', {
                  account: authorized,
                  role: ROLE,
                  sender: admin
                });
                _context9.t0 = expect;
                _context9.next = 7;
                return regeneratorRuntime.awrap(this.accessControl.hasRole(ROLE, authorized));

              case 7:
                _context9.t1 = _context9.sent;
                (0, _context9.t0)(_context9.t1).to.equal(false);

              case 9:
              case "end":
                return _context9.stop();
            }
          }
        }, null, this);
      });
      it('non-admin cannot revoke role', function _callee10() {
        return regeneratorRuntime.async(function _callee10$(_context10) {
          while (1) {
            switch (_context10.prev = _context10.next) {
              case 0:
                _context10.next = 2;
                return regeneratorRuntime.awrap(expectRevert(this.accessControl.revokeRole(ROLE, authorized, {
                  from: other
                }), "".concat(errorPrefix, ": account ").concat(other.toLowerCase(), " is missing role ").concat(DEFAULT_ADMIN_ROLE)));

              case 2:
              case "end":
                return _context10.stop();
            }
          }
        }, null, this);
      });
      it('a role can be revoked multiple times', function _callee11() {
        var receipt;
        return regeneratorRuntime.async(function _callee11$(_context11) {
          while (1) {
            switch (_context11.prev = _context11.next) {
              case 0:
                _context11.next = 2;
                return regeneratorRuntime.awrap(this.accessControl.revokeRole(ROLE, authorized, {
                  from: admin
                }));

              case 2:
                _context11.next = 4;
                return regeneratorRuntime.awrap(this.accessControl.revokeRole(ROLE, authorized, {
                  from: admin
                }));

              case 4:
                receipt = _context11.sent;
                expectEvent.notEmitted(receipt, 'RoleRevoked');

              case 6:
              case "end":
                return _context11.stop();
            }
          }
        }, null, this);
      });
    });
  });
  describe('renouncing', function () {
    it('roles that are not had can be renounced', function _callee12() {
      var receipt;
      return regeneratorRuntime.async(function _callee12$(_context12) {
        while (1) {
          switch (_context12.prev = _context12.next) {
            case 0:
              _context12.next = 2;
              return regeneratorRuntime.awrap(this.accessControl.renounceRole(ROLE, authorized, {
                from: authorized
              }));

            case 2:
              receipt = _context12.sent;
              expectEvent.notEmitted(receipt, 'RoleRevoked');

            case 4:
            case "end":
              return _context12.stop();
          }
        }
      }, null, this);
    });
    context('with granted role', function () {
      beforeEach(function _callee13() {
        return regeneratorRuntime.async(function _callee13$(_context13) {
          while (1) {
            switch (_context13.prev = _context13.next) {
              case 0:
                _context13.next = 2;
                return regeneratorRuntime.awrap(this.accessControl.grantRole(ROLE, authorized, {
                  from: admin
                }));

              case 2:
              case "end":
                return _context13.stop();
            }
          }
        }, null, this);
      });
      it('bearer can renounce role', function _callee14() {
        var receipt;
        return regeneratorRuntime.async(function _callee14$(_context14) {
          while (1) {
            switch (_context14.prev = _context14.next) {
              case 0:
                _context14.next = 2;
                return regeneratorRuntime.awrap(this.accessControl.renounceRole(ROLE, authorized, {
                  from: authorized
                }));

              case 2:
                receipt = _context14.sent;
                expectEvent(receipt, 'RoleRevoked', {
                  account: authorized,
                  role: ROLE,
                  sender: authorized
                });
                _context14.t0 = expect;
                _context14.next = 7;
                return regeneratorRuntime.awrap(this.accessControl.hasRole(ROLE, authorized));

              case 7:
                _context14.t1 = _context14.sent;
                (0, _context14.t0)(_context14.t1).to.equal(false);

              case 9:
              case "end":
                return _context14.stop();
            }
          }
        }, null, this);
      });
      it('only the sender can renounce their roles', function _callee15() {
        return regeneratorRuntime.async(function _callee15$(_context15) {
          while (1) {
            switch (_context15.prev = _context15.next) {
              case 0:
                _context15.next = 2;
                return regeneratorRuntime.awrap(expectRevert(this.accessControl.renounceRole(ROLE, authorized, {
                  from: admin
                }), "".concat(errorPrefix, ": can only renounce roles for self")));

              case 2:
              case "end":
                return _context15.stop();
            }
          }
        }, null, this);
      });
      it('a role can be renounced multiple times', function _callee16() {
        var receipt;
        return regeneratorRuntime.async(function _callee16$(_context16) {
          while (1) {
            switch (_context16.prev = _context16.next) {
              case 0:
                _context16.next = 2;
                return regeneratorRuntime.awrap(this.accessControl.renounceRole(ROLE, authorized, {
                  from: authorized
                }));

              case 2:
                _context16.next = 4;
                return regeneratorRuntime.awrap(this.accessControl.renounceRole(ROLE, authorized, {
                  from: authorized
                }));

              case 4:
                receipt = _context16.sent;
                expectEvent.notEmitted(receipt, 'RoleRevoked');

              case 6:
              case "end":
                return _context16.stop();
            }
          }
        }, null, this);
      });
    });
  });
  describe('setting role admin', function () {
    beforeEach(function _callee17() {
      var receipt;
      return regeneratorRuntime.async(function _callee17$(_context17) {
        while (1) {
          switch (_context17.prev = _context17.next) {
            case 0:
              _context17.next = 2;
              return regeneratorRuntime.awrap(this.accessControl.setRoleAdmin(ROLE, OTHER_ROLE));

            case 2:
              receipt = _context17.sent;
              expectEvent(receipt, 'RoleAdminChanged', {
                role: ROLE,
                previousAdminRole: DEFAULT_ADMIN_ROLE,
                newAdminRole: OTHER_ROLE
              });
              _context17.next = 6;
              return regeneratorRuntime.awrap(this.accessControl.grantRole(OTHER_ROLE, otherAdmin, {
                from: admin
              }));

            case 6:
            case "end":
              return _context17.stop();
          }
        }
      }, null, this);
    });
    it('a role\'s admin role can be changed', function _callee18() {
      return regeneratorRuntime.async(function _callee18$(_context18) {
        while (1) {
          switch (_context18.prev = _context18.next) {
            case 0:
              _context18.t0 = expect;
              _context18.next = 3;
              return regeneratorRuntime.awrap(this.accessControl.getRoleAdmin(ROLE));

            case 3:
              _context18.t1 = _context18.sent;
              _context18.t2 = OTHER_ROLE;
              (0, _context18.t0)(_context18.t1).to.equal(_context18.t2);

            case 6:
            case "end":
              return _context18.stop();
          }
        }
      }, null, this);
    });
    it('the new admin can grant roles', function _callee19() {
      var receipt;
      return regeneratorRuntime.async(function _callee19$(_context19) {
        while (1) {
          switch (_context19.prev = _context19.next) {
            case 0:
              _context19.next = 2;
              return regeneratorRuntime.awrap(this.accessControl.grantRole(ROLE, authorized, {
                from: otherAdmin
              }));

            case 2:
              receipt = _context19.sent;
              expectEvent(receipt, 'RoleGranted', {
                account: authorized,
                role: ROLE,
                sender: otherAdmin
              });

            case 4:
            case "end":
              return _context19.stop();
          }
        }
      }, null, this);
    });
    it('the new admin can revoke roles', function _callee20() {
      var receipt;
      return regeneratorRuntime.async(function _callee20$(_context20) {
        while (1) {
          switch (_context20.prev = _context20.next) {
            case 0:
              _context20.next = 2;
              return regeneratorRuntime.awrap(this.accessControl.grantRole(ROLE, authorized, {
                from: otherAdmin
              }));

            case 2:
              _context20.next = 4;
              return regeneratorRuntime.awrap(this.accessControl.revokeRole(ROLE, authorized, {
                from: otherAdmin
              }));

            case 4:
              receipt = _context20.sent;
              expectEvent(receipt, 'RoleRevoked', {
                account: authorized,
                role: ROLE,
                sender: otherAdmin
              });

            case 6:
            case "end":
              return _context20.stop();
          }
        }
      }, null, this);
    });
    it('a role\'s previous admins no longer grant roles', function _callee21() {
      return regeneratorRuntime.async(function _callee21$(_context21) {
        while (1) {
          switch (_context21.prev = _context21.next) {
            case 0:
              _context21.next = 2;
              return regeneratorRuntime.awrap(expectRevert(this.accessControl.grantRole(ROLE, authorized, {
                from: admin
              }), "".concat(errorPrefix, ": account ").concat(admin.toLowerCase(), " is missing role ").concat(OTHER_ROLE)));

            case 2:
            case "end":
              return _context21.stop();
          }
        }
      }, null, this);
    });
    it('a role\'s previous admins no longer revoke roles', function _callee22() {
      return regeneratorRuntime.async(function _callee22$(_context22) {
        while (1) {
          switch (_context22.prev = _context22.next) {
            case 0:
              _context22.next = 2;
              return regeneratorRuntime.awrap(expectRevert(this.accessControl.revokeRole(ROLE, authorized, {
                from: admin
              }), "".concat(errorPrefix, ": account ").concat(admin.toLowerCase(), " is missing role ").concat(OTHER_ROLE)));

            case 2:
            case "end":
              return _context22.stop();
          }
        }
      }, null, this);
    });
  });
  describe('onlyRole modifier', function () {
    beforeEach(function _callee23() {
      return regeneratorRuntime.async(function _callee23$(_context23) {
        while (1) {
          switch (_context23.prev = _context23.next) {
            case 0:
              _context23.next = 2;
              return regeneratorRuntime.awrap(this.accessControl.grantRole(ROLE, authorized, {
                from: admin
              }));

            case 2:
            case "end":
              return _context23.stop();
          }
        }
      }, null, this);
    });
    it('do not revert if sender has role', function _callee24() {
      return regeneratorRuntime.async(function _callee24$(_context24) {
        while (1) {
          switch (_context24.prev = _context24.next) {
            case 0:
              _context24.next = 2;
              return regeneratorRuntime.awrap(this.accessControl.senderProtected(ROLE, {
                from: authorized
              }));

            case 2:
            case "end":
              return _context24.stop();
          }
        }
      }, null, this);
    });
    it('revert if sender doesn\'t have role #1', function _callee25() {
      return regeneratorRuntime.async(function _callee25$(_context25) {
        while (1) {
          switch (_context25.prev = _context25.next) {
            case 0:
              _context25.next = 2;
              return regeneratorRuntime.awrap(expectRevert(this.accessControl.senderProtected(ROLE, {
                from: other
              }), "".concat(errorPrefix, ": account ").concat(other.toLowerCase(), " is missing role ").concat(ROLE)));

            case 2:
            case "end":
              return _context25.stop();
          }
        }
      }, null, this);
    });
    it('revert if sender doesn\'t have role #2', function _callee26() {
      return regeneratorRuntime.async(function _callee26$(_context26) {
        while (1) {
          switch (_context26.prev = _context26.next) {
            case 0:
              _context26.next = 2;
              return regeneratorRuntime.awrap(expectRevert(this.accessControl.senderProtected(OTHER_ROLE, {
                from: authorized
              }), "".concat(errorPrefix, ": account ").concat(authorized.toLowerCase(), " is missing role ").concat(OTHER_ROLE)));

            case 2:
            case "end":
              return _context26.stop();
          }
        }
      }, null, this);
    });
  });
}

function shouldBehaveLikeAccessControlEnumerable(errorPrefix, admin, authorized, other, otherAdmin, otherAuthorized) {
  shouldSupportInterfaces(['AccessControlEnumerable']);
  describe('enumerating', function () {
    it('role bearers can be enumerated', function _callee27() {
      var memberCount, bearers, i;
      return regeneratorRuntime.async(function _callee27$(_context27) {
        while (1) {
          switch (_context27.prev = _context27.next) {
            case 0:
              _context27.next = 2;
              return regeneratorRuntime.awrap(this.accessControl.grantRole(ROLE, authorized, {
                from: admin
              }));

            case 2:
              _context27.next = 4;
              return regeneratorRuntime.awrap(this.accessControl.grantRole(ROLE, other, {
                from: admin
              }));

            case 4:
              _context27.next = 6;
              return regeneratorRuntime.awrap(this.accessControl.grantRole(ROLE, otherAuthorized, {
                from: admin
              }));

            case 6:
              _context27.next = 8;
              return regeneratorRuntime.awrap(this.accessControl.revokeRole(ROLE, other, {
                from: admin
              }));

            case 8:
              _context27.next = 10;
              return regeneratorRuntime.awrap(this.accessControl.getRoleMemberCount(ROLE));

            case 10:
              memberCount = _context27.sent;
              expect(memberCount).to.bignumber.equal('2');
              bearers = [];
              i = 0;

            case 14:
              if (!(i < memberCount)) {
                _context27.next = 23;
                break;
              }

              _context27.t0 = bearers;
              _context27.next = 18;
              return regeneratorRuntime.awrap(this.accessControl.getRoleMember(ROLE, i));

            case 18:
              _context27.t1 = _context27.sent;

              _context27.t0.push.call(_context27.t0, _context27.t1);

            case 20:
              ++i;
              _context27.next = 14;
              break;

            case 23:
              expect(bearers).to.have.members([authorized, otherAuthorized]);

            case 24:
            case "end":
              return _context27.stop();
          }
        }
      }, null, this);
    });
    it('role enumeration should be in sync after renounceRole call', function _callee28() {
      return regeneratorRuntime.async(function _callee28$(_context28) {
        while (1) {
          switch (_context28.prev = _context28.next) {
            case 0:
              _context28.t0 = expect;
              _context28.next = 3;
              return regeneratorRuntime.awrap(this.accessControl.getRoleMemberCount(ROLE));

            case 3:
              _context28.t1 = _context28.sent;
              (0, _context28.t0)(_context28.t1).to.bignumber.equal('0');
              _context28.next = 7;
              return regeneratorRuntime.awrap(this.accessControl.grantRole(ROLE, admin, {
                from: admin
              }));

            case 7:
              _context28.t2 = expect;
              _context28.next = 10;
              return regeneratorRuntime.awrap(this.accessControl.getRoleMemberCount(ROLE));

            case 10:
              _context28.t3 = _context28.sent;
              (0, _context28.t2)(_context28.t3).to.bignumber.equal('1');
              _context28.next = 14;
              return regeneratorRuntime.awrap(this.accessControl.renounceRole(ROLE, admin, {
                from: admin
              }));

            case 14:
              _context28.t4 = expect;
              _context28.next = 17;
              return regeneratorRuntime.awrap(this.accessControl.getRoleMemberCount(ROLE));

            case 17:
              _context28.t5 = _context28.sent;
              (0, _context28.t4)(_context28.t5).to.bignumber.equal('0');

            case 19:
            case "end":
              return _context28.stop();
          }
        }
      }, null, this);
    });
  });
}

module.exports = {
  shouldBehaveLikeAccessControl: shouldBehaveLikeAccessControl,
  shouldBehaveLikeAccessControlEnumerable: shouldBehaveLikeAccessControlEnumerable
};