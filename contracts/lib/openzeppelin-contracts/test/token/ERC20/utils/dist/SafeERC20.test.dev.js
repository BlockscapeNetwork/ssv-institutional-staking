"use strict";

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var _require = require('@openzeppelin/test-helpers'),
    constants = _require.constants,
    expectRevert = _require.expectRevert;

var ERC20ReturnFalseMock = artifacts.require('ERC20ReturnFalseMock');

var ERC20ReturnTrueMock = artifacts.require('ERC20ReturnTrueMock');

var ERC20NoReturnMock = artifacts.require('ERC20NoReturnMock');

var ERC20PermitNoRevertMock = artifacts.require('ERC20PermitNoRevertMock');

var SafeERC20Wrapper = artifacts.require('SafeERC20Wrapper');

var _require2 = require('../../../helpers/eip712'),
    EIP712Domain = _require2.EIP712Domain,
    Permit = _require2.Permit;

var _require3 = require('ethereumjs-util'),
    fromRpcSig = _require3.fromRpcSig;

var ethSigUtil = require('eth-sig-util');

var Wallet = require('ethereumjs-wallet')["default"];

contract('SafeERC20', function (accounts) {
  var _accounts = _slicedToArray(accounts, 1),
      hasNoCode = _accounts[0];

  describe('with address that has no contract code', function () {
    beforeEach(function _callee() {
      return regeneratorRuntime.async(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return regeneratorRuntime.awrap(SafeERC20Wrapper["new"](hasNoCode));

            case 2:
              this.wrapper = _context.sent;

            case 3:
            case "end":
              return _context.stop();
          }
        }
      }, null, this);
    });
    shouldRevertOnAllCalls('Address: call to non-contract');
  });
  describe('with token that returns false on all calls', function () {
    beforeEach(function _callee2() {
      return regeneratorRuntime.async(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.t0 = regeneratorRuntime;
              _context2.t1 = SafeERC20Wrapper;
              _context2.next = 4;
              return regeneratorRuntime.awrap(ERC20ReturnFalseMock["new"]());

            case 4:
              _context2.t2 = _context2.sent.address;
              _context2.t3 = _context2.t1["new"].call(_context2.t1, _context2.t2);
              _context2.next = 8;
              return _context2.t0.awrap.call(_context2.t0, _context2.t3);

            case 8:
              this.wrapper = _context2.sent;

            case 9:
            case "end":
              return _context2.stop();
          }
        }
      }, null, this);
    });
    shouldRevertOnAllCalls('SafeERC20: ERC20 operation did not succeed');
  });
  describe('with token that returns true on all calls', function () {
    beforeEach(function _callee3() {
      return regeneratorRuntime.async(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _context3.t0 = regeneratorRuntime;
              _context3.t1 = SafeERC20Wrapper;
              _context3.next = 4;
              return regeneratorRuntime.awrap(ERC20ReturnTrueMock["new"]());

            case 4:
              _context3.t2 = _context3.sent.address;
              _context3.t3 = _context3.t1["new"].call(_context3.t1, _context3.t2);
              _context3.next = 8;
              return _context3.t0.awrap.call(_context3.t0, _context3.t3);

            case 8:
              this.wrapper = _context3.sent;

            case 9:
            case "end":
              return _context3.stop();
          }
        }
      }, null, this);
    });
    shouldOnlyRevertOnErrors();
  });
  describe('with token that returns no boolean values', function () {
    beforeEach(function _callee4() {
      return regeneratorRuntime.async(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              _context4.t0 = regeneratorRuntime;
              _context4.t1 = SafeERC20Wrapper;
              _context4.next = 4;
              return regeneratorRuntime.awrap(ERC20NoReturnMock["new"]());

            case 4:
              _context4.t2 = _context4.sent.address;
              _context4.t3 = _context4.t1["new"].call(_context4.t1, _context4.t2);
              _context4.next = 8;
              return _context4.t0.awrap.call(_context4.t0, _context4.t3);

            case 8:
              this.wrapper = _context4.sent;

            case 9:
            case "end":
              return _context4.stop();
          }
        }
      }, null, this);
    });
    shouldOnlyRevertOnErrors();
  });
  describe('with token that doesn\'t revert on invalid permit', function () {
    var wallet = Wallet.generate();
    var owner = wallet.getAddressString();
    var spender = hasNoCode;
    beforeEach(function _callee5() {
      var chainId;
      return regeneratorRuntime.async(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              _context5.next = 2;
              return regeneratorRuntime.awrap(ERC20PermitNoRevertMock["new"]());

            case 2:
              this.token = _context5.sent;
              _context5.next = 5;
              return regeneratorRuntime.awrap(SafeERC20Wrapper["new"](this.token.address));

            case 5:
              this.wrapper = _context5.sent;
              _context5.next = 8;
              return regeneratorRuntime.awrap(this.token.getChainId());

            case 8:
              chainId = _context5.sent;
              this.data = {
                primaryType: 'Permit',
                types: {
                  EIP712Domain: EIP712Domain,
                  Permit: Permit
                },
                domain: {
                  name: 'ERC20PermitNoRevertMock',
                  version: '1',
                  chainId: chainId,
                  verifyingContract: this.token.address
                },
                message: {
                  owner: owner,
                  spender: spender,
                  value: '42',
                  nonce: '0',
                  deadline: constants.MAX_UINT256
                }
              };
              this.signature = fromRpcSig(ethSigUtil.signTypedMessage(wallet.getPrivateKey(), {
                data: this.data
              }));

            case 11:
            case "end":
              return _context5.stop();
          }
        }
      }, null, this);
    });
    it('accepts owner signature', function _callee6() {
      return regeneratorRuntime.async(function _callee6$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              _context6.t0 = expect;
              _context6.next = 3;
              return regeneratorRuntime.awrap(this.token.nonces(owner));

            case 3:
              _context6.t1 = _context6.sent;
              (0, _context6.t0)(_context6.t1).to.be.bignumber.equal('0');
              _context6.t2 = expect;
              _context6.next = 8;
              return regeneratorRuntime.awrap(this.token.allowance(owner, spender));

            case 8:
              _context6.t3 = _context6.sent;
              (0, _context6.t2)(_context6.t3).to.be.bignumber.equal('0');
              _context6.next = 12;
              return regeneratorRuntime.awrap(this.wrapper.permit(this.data.message.owner, this.data.message.spender, this.data.message.value, this.data.message.deadline, this.signature.v, this.signature.r, this.signature.s));

            case 12:
              _context6.t4 = expect;
              _context6.next = 15;
              return regeneratorRuntime.awrap(this.token.nonces(owner));

            case 15:
              _context6.t5 = _context6.sent;
              (0, _context6.t4)(_context6.t5).to.be.bignumber.equal('1');
              _context6.t6 = expect;
              _context6.next = 20;
              return regeneratorRuntime.awrap(this.token.allowance(owner, spender));

            case 20:
              _context6.t7 = _context6.sent;
              _context6.t8 = this.data.message.value;
              (0, _context6.t6)(_context6.t7).to.be.bignumber.equal(_context6.t8);

            case 23:
            case "end":
              return _context6.stop();
          }
        }
      }, null, this);
    });
    it('revert on reused signature', function _callee7() {
      return regeneratorRuntime.async(function _callee7$(_context7) {
        while (1) {
          switch (_context7.prev = _context7.next) {
            case 0:
              _context7.t0 = expect;
              _context7.next = 3;
              return regeneratorRuntime.awrap(this.token.nonces(owner));

            case 3:
              _context7.t1 = _context7.sent;
              (0, _context7.t0)(_context7.t1).to.be.bignumber.equal('0');
              _context7.next = 7;
              return regeneratorRuntime.awrap(this.wrapper.permit(this.data.message.owner, this.data.message.spender, this.data.message.value, this.data.message.deadline, this.signature.v, this.signature.r, this.signature.s));

            case 7:
              _context7.t2 = expect;
              _context7.next = 10;
              return regeneratorRuntime.awrap(this.token.nonces(owner));

            case 10:
              _context7.t3 = _context7.sent;
              (0, _context7.t2)(_context7.t3).to.be.bignumber.equal('1');
              _context7.next = 14;
              return regeneratorRuntime.awrap(this.token.permit(this.data.message.owner, this.data.message.spender, this.data.message.value, this.data.message.deadline, this.signature.v, this.signature.r, this.signature.s));

            case 14:
              _context7.t4 = expect;
              _context7.next = 17;
              return regeneratorRuntime.awrap(this.token.nonces(owner));

            case 17:
              _context7.t5 = _context7.sent;
              (0, _context7.t4)(_context7.t5).to.be.bignumber.equal('1');
              _context7.next = 21;
              return regeneratorRuntime.awrap(expectRevert(this.wrapper.permit(this.data.message.owner, this.data.message.spender, this.data.message.value, this.data.message.deadline, this.signature.v, this.signature.r, this.signature.s), 'SafeERC20: permit did not succeed'));

            case 21:
              _context7.t6 = expect;
              _context7.next = 24;
              return regeneratorRuntime.awrap(this.token.nonces(owner));

            case 24:
              _context7.t7 = _context7.sent;
              (0, _context7.t6)(_context7.t7).to.be.bignumber.equal('1');

            case 26:
            case "end":
              return _context7.stop();
          }
        }
      }, null, this);
    });
    it('revert on invalid signature', function _callee8() {
      var invalidSignature;
      return regeneratorRuntime.async(function _callee8$(_context8) {
        while (1) {
          switch (_context8.prev = _context8.next) {
            case 0:
              // signature that is not valid for owner
              invalidSignature = {
                v: 27,
                r: '0x71753dc5ecb5b4bfc0e3bc530d79ce5988760ed3f3a234c86a5546491f540775',
                s: '0x0049cedee5aed990aabed5ad6a9f6e3c565b63379894b5fa8b512eb2b79e485d'
              }; // invalid call does not revert for this token implementation

              _context8.next = 3;
              return regeneratorRuntime.awrap(this.token.permit(this.data.message.owner, this.data.message.spender, this.data.message.value, this.data.message.deadline, invalidSignature.v, invalidSignature.r, invalidSignature.s));

            case 3:
              _context8.next = 5;
              return regeneratorRuntime.awrap(expectRevert(this.wrapper.permit(this.data.message.owner, this.data.message.spender, this.data.message.value, this.data.message.deadline, invalidSignature.v, invalidSignature.r, invalidSignature.s), 'SafeERC20: permit did not succeed'));

            case 5:
            case "end":
              return _context8.stop();
          }
        }
      }, null, this);
    });
  });
});

function shouldRevertOnAllCalls(reason) {
  it('reverts on transfer', function _callee9() {
    return regeneratorRuntime.async(function _callee9$(_context9) {
      while (1) {
        switch (_context9.prev = _context9.next) {
          case 0:
            _context9.next = 2;
            return regeneratorRuntime.awrap(expectRevert(this.wrapper.transfer(), reason));

          case 2:
          case "end":
            return _context9.stop();
        }
      }
    }, null, this);
  });
  it('reverts on transferFrom', function _callee10() {
    return regeneratorRuntime.async(function _callee10$(_context10) {
      while (1) {
        switch (_context10.prev = _context10.next) {
          case 0:
            _context10.next = 2;
            return regeneratorRuntime.awrap(expectRevert(this.wrapper.transferFrom(), reason));

          case 2:
          case "end":
            return _context10.stop();
        }
      }
    }, null, this);
  });
  it('reverts on approve', function _callee11() {
    return regeneratorRuntime.async(function _callee11$(_context11) {
      while (1) {
        switch (_context11.prev = _context11.next) {
          case 0:
            _context11.next = 2;
            return regeneratorRuntime.awrap(expectRevert(this.wrapper.approve(0), reason));

          case 2:
          case "end":
            return _context11.stop();
        }
      }
    }, null, this);
  });
  it('reverts on increaseAllowance', function _callee12() {
    return regeneratorRuntime.async(function _callee12$(_context12) {
      while (1) {
        switch (_context12.prev = _context12.next) {
          case 0:
            _context12.next = 2;
            return regeneratorRuntime.awrap(expectRevert.unspecified(this.wrapper.increaseAllowance(0)));

          case 2:
          case "end":
            return _context12.stop();
        }
      }
    }, null, this);
  });
  it('reverts on decreaseAllowance', function _callee13() {
    return regeneratorRuntime.async(function _callee13$(_context13) {
      while (1) {
        switch (_context13.prev = _context13.next) {
          case 0:
            _context13.next = 2;
            return regeneratorRuntime.awrap(expectRevert.unspecified(this.wrapper.decreaseAllowance(0)));

          case 2:
          case "end":
            return _context13.stop();
        }
      }
    }, null, this);
  });
}

function shouldOnlyRevertOnErrors() {
  it('doesn\'t revert on transfer', function _callee14() {
    return regeneratorRuntime.async(function _callee14$(_context14) {
      while (1) {
        switch (_context14.prev = _context14.next) {
          case 0:
            _context14.next = 2;
            return regeneratorRuntime.awrap(this.wrapper.transfer());

          case 2:
          case "end":
            return _context14.stop();
        }
      }
    }, null, this);
  });
  it('doesn\'t revert on transferFrom', function _callee15() {
    return regeneratorRuntime.async(function _callee15$(_context15) {
      while (1) {
        switch (_context15.prev = _context15.next) {
          case 0:
            _context15.next = 2;
            return regeneratorRuntime.awrap(this.wrapper.transferFrom());

          case 2:
          case "end":
            return _context15.stop();
        }
      }
    }, null, this);
  });
  describe('approvals', function () {
    context('with zero allowance', function () {
      beforeEach(function _callee16() {
        return regeneratorRuntime.async(function _callee16$(_context16) {
          while (1) {
            switch (_context16.prev = _context16.next) {
              case 0:
                _context16.next = 2;
                return regeneratorRuntime.awrap(this.wrapper.setAllowance(0));

              case 2:
              case "end":
                return _context16.stop();
            }
          }
        }, null, this);
      });
      it('doesn\'t revert when approving a non-zero allowance', function _callee17() {
        return regeneratorRuntime.async(function _callee17$(_context17) {
          while (1) {
            switch (_context17.prev = _context17.next) {
              case 0:
                _context17.next = 2;
                return regeneratorRuntime.awrap(this.wrapper.approve(100));

              case 2:
              case "end":
                return _context17.stop();
            }
          }
        }, null, this);
      });
      it('doesn\'t revert when approving a zero allowance', function _callee18() {
        return regeneratorRuntime.async(function _callee18$(_context18) {
          while (1) {
            switch (_context18.prev = _context18.next) {
              case 0:
                _context18.next = 2;
                return regeneratorRuntime.awrap(this.wrapper.approve(0));

              case 2:
              case "end":
                return _context18.stop();
            }
          }
        }, null, this);
      });
      it('doesn\'t revert when increasing the allowance', function _callee19() {
        return regeneratorRuntime.async(function _callee19$(_context19) {
          while (1) {
            switch (_context19.prev = _context19.next) {
              case 0:
                _context19.next = 2;
                return regeneratorRuntime.awrap(this.wrapper.increaseAllowance(10));

              case 2:
              case "end":
                return _context19.stop();
            }
          }
        }, null, this);
      });
      it('reverts when decreasing the allowance', function _callee20() {
        return regeneratorRuntime.async(function _callee20$(_context20) {
          while (1) {
            switch (_context20.prev = _context20.next) {
              case 0:
                _context20.next = 2;
                return regeneratorRuntime.awrap(expectRevert(this.wrapper.decreaseAllowance(10), 'SafeERC20: decreased allowance below zero'));

              case 2:
              case "end":
                return _context20.stop();
            }
          }
        }, null, this);
      });
    });
    context('with non-zero allowance', function () {
      beforeEach(function _callee21() {
        return regeneratorRuntime.async(function _callee21$(_context21) {
          while (1) {
            switch (_context21.prev = _context21.next) {
              case 0:
                _context21.next = 2;
                return regeneratorRuntime.awrap(this.wrapper.setAllowance(100));

              case 2:
              case "end":
                return _context21.stop();
            }
          }
        }, null, this);
      });
      it('reverts when approving a non-zero allowance', function _callee22() {
        return regeneratorRuntime.async(function _callee22$(_context22) {
          while (1) {
            switch (_context22.prev = _context22.next) {
              case 0:
                _context22.next = 2;
                return regeneratorRuntime.awrap(expectRevert(this.wrapper.approve(20), 'SafeERC20: approve from non-zero to non-zero allowance'));

              case 2:
              case "end":
                return _context22.stop();
            }
          }
        }, null, this);
      });
      it('doesn\'t revert when approving a zero allowance', function _callee23() {
        return regeneratorRuntime.async(function _callee23$(_context23) {
          while (1) {
            switch (_context23.prev = _context23.next) {
              case 0:
                _context23.next = 2;
                return regeneratorRuntime.awrap(this.wrapper.approve(0));

              case 2:
              case "end":
                return _context23.stop();
            }
          }
        }, null, this);
      });
      it('doesn\'t revert when increasing the allowance', function _callee24() {
        return regeneratorRuntime.async(function _callee24$(_context24) {
          while (1) {
            switch (_context24.prev = _context24.next) {
              case 0:
                _context24.next = 2;
                return regeneratorRuntime.awrap(this.wrapper.increaseAllowance(10));

              case 2:
              case "end":
                return _context24.stop();
            }
          }
        }, null, this);
      });
      it('doesn\'t revert when decreasing the allowance to a positive value', function _callee25() {
        return regeneratorRuntime.async(function _callee25$(_context25) {
          while (1) {
            switch (_context25.prev = _context25.next) {
              case 0:
                _context25.next = 2;
                return regeneratorRuntime.awrap(this.wrapper.decreaseAllowance(50));

              case 2:
              case "end":
                return _context25.stop();
            }
          }
        }, null, this);
      });
      it('reverts when decreasing the allowance to a negative value', function _callee26() {
        return regeneratorRuntime.async(function _callee26$(_context26) {
          while (1) {
            switch (_context26.prev = _context26.next) {
              case 0:
                _context26.next = 2;
                return regeneratorRuntime.awrap(expectRevert(this.wrapper.decreaseAllowance(200), 'SafeERC20: decreased allowance below zero'));

              case 2:
              case "end":
                return _context26.stop();
            }
          }
        }, null, this);
      });
    });
  });
}