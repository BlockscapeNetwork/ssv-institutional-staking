"use strict";

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var _require = require('@openzeppelin/test-helpers'),
    BN = _require.BN,
    constants = _require.constants,
    expectEvent = _require.expectEvent,
    expectRevert = _require.expectRevert,
    time = _require.time;

var ZERO_ADDRESS = constants.ZERO_ADDRESS,
    ZERO_BYTES32 = constants.ZERO_BYTES32;

var _require2 = require('chai'),
    expect = _require2.expect;

var _require3 = require('../utils/introspection/SupportsInterface.behavior'),
    shouldSupportInterfaces = _require3.shouldSupportInterfaces;

var TimelockController = artifacts.require('TimelockController');

var CallReceiverMock = artifacts.require('CallReceiverMock');

var Implementation2 = artifacts.require('Implementation2');

var ERC721Mock = artifacts.require('ERC721Mock');

var ERC1155Mock = artifacts.require('ERC1155Mock');

var MINDELAY = time.duration.days(1);
var salt = '0x025e7b0be353a74631ad648c667493c0e1cd31caa4cc2d3520fdc171ea0cc726'; // a random value

function genOperation(target, value, data, predecessor, salt) {
  var id = web3.utils.keccak256(web3.eth.abi.encodeParameters(['address', 'uint256', 'bytes', 'uint256', 'bytes32'], [target, value, data, predecessor, salt]));
  return {
    id: id,
    target: target,
    value: value,
    data: data,
    predecessor: predecessor,
    salt: salt
  };
}

function genOperationBatch(targets, values, payloads, predecessor, salt) {
  var id = web3.utils.keccak256(web3.eth.abi.encodeParameters(['address[]', 'uint256[]', 'bytes[]', 'uint256', 'bytes32'], [targets, values, payloads, predecessor, salt]));
  return {
    id: id,
    targets: targets,
    values: values,
    payloads: payloads,
    predecessor: predecessor,
    salt: salt
  };
}

contract('TimelockController', function (accounts) {
  var _accounts = _slicedToArray(accounts, 6),
      admin = _accounts[1],
      proposer = _accounts[2],
      canceller = _accounts[3],
      executor = _accounts[4],
      other = _accounts[5];

  var TIMELOCK_ADMIN_ROLE = web3.utils.soliditySha3('TIMELOCK_ADMIN_ROLE');
  var PROPOSER_ROLE = web3.utils.soliditySha3('PROPOSER_ROLE');
  var EXECUTOR_ROLE = web3.utils.soliditySha3('EXECUTOR_ROLE');
  var CANCELLER_ROLE = web3.utils.soliditySha3('CANCELLER_ROLE');
  beforeEach(function _callee() {
    return regeneratorRuntime.async(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return regeneratorRuntime.awrap(TimelockController["new"](MINDELAY, [proposer], [executor], admin));

          case 2:
            this.mock = _context.sent;
            _context.t0 = expect;
            _context.next = 6;
            return regeneratorRuntime.awrap(this.mock.hasRole(CANCELLER_ROLE, proposer));

          case 6:
            _context.t1 = _context.sent;
            (0, _context.t0)(_context.t1).to.be.equal(true);
            _context.next = 10;
            return regeneratorRuntime.awrap(this.mock.revokeRole(CANCELLER_ROLE, proposer, {
              from: admin
            }));

          case 10:
            _context.next = 12;
            return regeneratorRuntime.awrap(this.mock.grantRole(CANCELLER_ROLE, canceller, {
              from: admin
            }));

          case 12:
            _context.next = 14;
            return regeneratorRuntime.awrap(CallReceiverMock["new"]({
              from: admin
            }));

          case 14:
            this.callreceivermock = _context.sent;
            _context.next = 17;
            return regeneratorRuntime.awrap(Implementation2["new"]({
              from: admin
            }));

          case 17:
            this.implementation2 = _context.sent;

          case 18:
          case "end":
            return _context.stop();
        }
      }
    }, null, this);
  });
  shouldSupportInterfaces(['ERC1155Receiver']);
  it('initial state', function _callee2() {
    var _this = this;

    return regeneratorRuntime.async(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.t0 = expect;
            _context2.next = 3;
            return regeneratorRuntime.awrap(this.mock.getMinDelay());

          case 3:
            _context2.t1 = _context2.sent;
            _context2.t2 = MINDELAY;
            (0, _context2.t0)(_context2.t1).to.be.bignumber.equal(_context2.t2);
            _context2.t3 = expect;
            _context2.next = 9;
            return regeneratorRuntime.awrap(this.mock.TIMELOCK_ADMIN_ROLE());

          case 9:
            _context2.t4 = _context2.sent;
            _context2.t5 = TIMELOCK_ADMIN_ROLE;
            (0, _context2.t3)(_context2.t4).to.be.equal(_context2.t5);
            _context2.t6 = expect;
            _context2.next = 15;
            return regeneratorRuntime.awrap(this.mock.PROPOSER_ROLE());

          case 15:
            _context2.t7 = _context2.sent;
            _context2.t8 = PROPOSER_ROLE;
            (0, _context2.t6)(_context2.t7).to.be.equal(_context2.t8);
            _context2.t9 = expect;
            _context2.next = 21;
            return regeneratorRuntime.awrap(this.mock.EXECUTOR_ROLE());

          case 21:
            _context2.t10 = _context2.sent;
            _context2.t11 = EXECUTOR_ROLE;
            (0, _context2.t9)(_context2.t10).to.be.equal(_context2.t11);
            _context2.t12 = expect;
            _context2.next = 27;
            return regeneratorRuntime.awrap(this.mock.CANCELLER_ROLE());

          case 27:
            _context2.t13 = _context2.sent;
            _context2.t14 = CANCELLER_ROLE;
            (0, _context2.t12)(_context2.t13).to.be.equal(_context2.t14);
            _context2.t15 = expect;
            _context2.next = 33;
            return regeneratorRuntime.awrap(Promise.all([PROPOSER_ROLE, CANCELLER_ROLE, EXECUTOR_ROLE].map(function (role) {
              return _this.mock.hasRole(role, proposer);
            })));

          case 33:
            _context2.t16 = _context2.sent;
            _context2.t17 = [true, false, false];
            (0, _context2.t15)(_context2.t16).to.be.deep.equal(_context2.t17);
            _context2.t18 = expect;
            _context2.next = 39;
            return regeneratorRuntime.awrap(Promise.all([PROPOSER_ROLE, CANCELLER_ROLE, EXECUTOR_ROLE].map(function (role) {
              return _this.mock.hasRole(role, canceller);
            })));

          case 39:
            _context2.t19 = _context2.sent;
            _context2.t20 = [false, true, false];
            (0, _context2.t18)(_context2.t19).to.be.deep.equal(_context2.t20);
            _context2.t21 = expect;
            _context2.next = 45;
            return regeneratorRuntime.awrap(Promise.all([PROPOSER_ROLE, CANCELLER_ROLE, EXECUTOR_ROLE].map(function (role) {
              return _this.mock.hasRole(role, executor);
            })));

          case 45:
            _context2.t22 = _context2.sent;
            _context2.t23 = [false, false, true];
            (0, _context2.t21)(_context2.t22).to.be.deep.equal(_context2.t23);

          case 48:
          case "end":
            return _context2.stop();
        }
      }
    }, null, this);
  });
  it('optional admin', function _callee3() {
    var mock;
    return regeneratorRuntime.async(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return regeneratorRuntime.awrap(TimelockController["new"](MINDELAY, [proposer], [executor], ZERO_ADDRESS, {
              from: other
            }));

          case 2:
            mock = _context3.sent;
            _context3.t0 = expect;
            _context3.next = 6;
            return regeneratorRuntime.awrap(mock.hasRole(TIMELOCK_ADMIN_ROLE, admin));

          case 6:
            _context3.t1 = _context3.sent;
            (0, _context3.t0)(_context3.t1).to.be.equal(false);
            _context3.t2 = expect;
            _context3.next = 11;
            return regeneratorRuntime.awrap(mock.hasRole(TIMELOCK_ADMIN_ROLE, other));

          case 11:
            _context3.t3 = _context3.sent;
            (0, _context3.t2)(_context3.t3).to.be.equal(false);

          case 13:
          case "end":
            return _context3.stop();
        }
      }
    });
  });
  describe('methods', function () {
    describe('operation hashing', function () {
      it('hashOperation', function _callee4() {
        return regeneratorRuntime.async(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                this.operation = genOperation('0x29cebefe301c6ce1bb36b58654fea275e1cacc83', '0xf94fdd6e21da21d2', '0xa3bc5104', '0xba41db3be0a9929145cfe480bd0f1f003689104d275ae912099f925df424ef94', '0x60d9109846ab510ed75c15f979ae366a8a2ace11d34ba9788c13ac296db50e6e');
                _context4.t0 = expect;
                _context4.next = 4;
                return regeneratorRuntime.awrap(this.mock.hashOperation(this.operation.target, this.operation.value, this.operation.data, this.operation.predecessor, this.operation.salt));

              case 4:
                _context4.t1 = _context4.sent;
                _context4.t2 = this.operation.id;
                (0, _context4.t0)(_context4.t1).to.be.equal(_context4.t2);

              case 7:
              case "end":
                return _context4.stop();
            }
          }
        }, null, this);
      });
      it('hashOperationBatch', function _callee5() {
        return regeneratorRuntime.async(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                this.operation = genOperationBatch(Array(8).fill('0x2d5f21620e56531c1d59c2df9b8e95d129571f71'), Array(8).fill('0x2b993cfce932ccee'), Array(8).fill('0xcf51966b'), '0xce8f45069cc71d25f71ba05062de1a3974f9849b004de64a70998bca9d29c2e7', '0x8952d74c110f72bfe5accdf828c74d53a7dfb71235dfa8a1e8c75d8576b372ff');
                _context5.t0 = expect;
                _context5.next = 4;
                return regeneratorRuntime.awrap(this.mock.hashOperationBatch(this.operation.targets, this.operation.values, this.operation.payloads, this.operation.predecessor, this.operation.salt));

              case 4:
                _context5.t1 = _context5.sent;
                _context5.t2 = this.operation.id;
                (0, _context5.t0)(_context5.t1).to.be.equal(_context5.t2);

              case 7:
              case "end":
                return _context5.stop();
            }
          }
        }, null, this);
      });
    });
    describe('simple', function () {
      describe('schedule', function () {
        beforeEach(function _callee6() {
          return regeneratorRuntime.async(function _callee6$(_context6) {
            while (1) {
              switch (_context6.prev = _context6.next) {
                case 0:
                  this.operation = genOperation('0x31754f590B97fD975Eb86938f18Cc304E264D2F2', 0, '0x3bf92ccc', ZERO_BYTES32, salt);

                case 1:
                case "end":
                  return _context6.stop();
              }
            }
          }, null, this);
        });
        it('proposer can schedule', function _callee7() {
          var receipt, block;
          return regeneratorRuntime.async(function _callee7$(_context7) {
            while (1) {
              switch (_context7.prev = _context7.next) {
                case 0:
                  _context7.next = 2;
                  return regeneratorRuntime.awrap(this.mock.schedule(this.operation.target, this.operation.value, this.operation.data, this.operation.predecessor, this.operation.salt, MINDELAY, {
                    from: proposer
                  }));

                case 2:
                  receipt = _context7.sent;
                  expectEvent(receipt, 'CallScheduled', {
                    id: this.operation.id,
                    index: web3.utils.toBN(0),
                    target: this.operation.target,
                    value: web3.utils.toBN(this.operation.value),
                    data: this.operation.data,
                    predecessor: this.operation.predecessor,
                    delay: MINDELAY
                  });
                  _context7.next = 6;
                  return regeneratorRuntime.awrap(web3.eth.getBlock(receipt.receipt.blockHash));

                case 6:
                  block = _context7.sent;
                  _context7.t0 = expect;
                  _context7.next = 10;
                  return regeneratorRuntime.awrap(this.mock.getTimestamp(this.operation.id));

                case 10:
                  _context7.t1 = _context7.sent;
                  _context7.t2 = web3.utils.toBN(block.timestamp).add(MINDELAY);
                  (0, _context7.t0)(_context7.t1).to.be.bignumber.equal(_context7.t2);

                case 13:
                case "end":
                  return _context7.stop();
              }
            }
          }, null, this);
        });
        it('prevent overwriting active operation', function _callee8() {
          return regeneratorRuntime.async(function _callee8$(_context8) {
            while (1) {
              switch (_context8.prev = _context8.next) {
                case 0:
                  _context8.next = 2;
                  return regeneratorRuntime.awrap(this.mock.schedule(this.operation.target, this.operation.value, this.operation.data, this.operation.predecessor, this.operation.salt, MINDELAY, {
                    from: proposer
                  }));

                case 2:
                  _context8.next = 4;
                  return regeneratorRuntime.awrap(expectRevert(this.mock.schedule(this.operation.target, this.operation.value, this.operation.data, this.operation.predecessor, this.operation.salt, MINDELAY, {
                    from: proposer
                  }), 'TimelockController: operation already scheduled'));

                case 4:
                case "end":
                  return _context8.stop();
              }
            }
          }, null, this);
        });
        it('prevent non-proposer from committing', function _callee9() {
          return regeneratorRuntime.async(function _callee9$(_context9) {
            while (1) {
              switch (_context9.prev = _context9.next) {
                case 0:
                  _context9.next = 2;
                  return regeneratorRuntime.awrap(expectRevert(this.mock.schedule(this.operation.target, this.operation.value, this.operation.data, this.operation.predecessor, this.operation.salt, MINDELAY, {
                    from: other
                  }), "AccessControl: account ".concat(other.toLowerCase(), " is missing role ").concat(PROPOSER_ROLE)));

                case 2:
                case "end":
                  return _context9.stop();
              }
            }
          }, null, this);
        });
        it('enforce minimum delay', function _callee10() {
          return regeneratorRuntime.async(function _callee10$(_context10) {
            while (1) {
              switch (_context10.prev = _context10.next) {
                case 0:
                  _context10.next = 2;
                  return regeneratorRuntime.awrap(expectRevert(this.mock.schedule(this.operation.target, this.operation.value, this.operation.data, this.operation.predecessor, this.operation.salt, MINDELAY - 1, {
                    from: proposer
                  }), 'TimelockController: insufficient delay'));

                case 2:
                case "end":
                  return _context10.stop();
              }
            }
          }, null, this);
        });
      });
      describe('execute', function () {
        beforeEach(function _callee11() {
          return regeneratorRuntime.async(function _callee11$(_context11) {
            while (1) {
              switch (_context11.prev = _context11.next) {
                case 0:
                  this.operation = genOperation('0xAe22104DCD970750610E6FE15E623468A98b15f7', 0, '0x13e414de', ZERO_BYTES32, '0xc1059ed2dc130227aa1d1d539ac94c641306905c020436c636e19e3fab56fc7f');

                case 1:
                case "end":
                  return _context11.stop();
              }
            }
          }, null, this);
        });
        it('revert if operation is not scheduled', function _callee12() {
          return regeneratorRuntime.async(function _callee12$(_context12) {
            while (1) {
              switch (_context12.prev = _context12.next) {
                case 0:
                  _context12.next = 2;
                  return regeneratorRuntime.awrap(expectRevert(this.mock.execute(this.operation.target, this.operation.value, this.operation.data, this.operation.predecessor, this.operation.salt, {
                    from: executor
                  }), 'TimelockController: operation is not ready'));

                case 2:
                case "end":
                  return _context12.stop();
              }
            }
          }, null, this);
        });
        describe('with scheduled operation', function () {
          beforeEach(function _callee13() {
            var _ref;

            return regeneratorRuntime.async(function _callee13$(_context13) {
              while (1) {
                switch (_context13.prev = _context13.next) {
                  case 0:
                    _context13.next = 2;
                    return regeneratorRuntime.awrap(this.mock.schedule(this.operation.target, this.operation.value, this.operation.data, this.operation.predecessor, this.operation.salt, MINDELAY, {
                      from: proposer
                    }));

                  case 2:
                    _ref = _context13.sent;
                    this.receipt = _ref.receipt;
                    this.logs = _ref.logs;

                  case 5:
                  case "end":
                    return _context13.stop();
                }
              }
            }, null, this);
          });
          it('revert if execution comes too early 1/2', function _callee14() {
            return regeneratorRuntime.async(function _callee14$(_context14) {
              while (1) {
                switch (_context14.prev = _context14.next) {
                  case 0:
                    _context14.next = 2;
                    return regeneratorRuntime.awrap(expectRevert(this.mock.execute(this.operation.target, this.operation.value, this.operation.data, this.operation.predecessor, this.operation.salt, {
                      from: executor
                    }), 'TimelockController: operation is not ready'));

                  case 2:
                  case "end":
                    return _context14.stop();
                }
              }
            }, null, this);
          });
          it('revert if execution comes too early 2/2', function _callee15() {
            var timestamp;
            return regeneratorRuntime.async(function _callee15$(_context15) {
              while (1) {
                switch (_context15.prev = _context15.next) {
                  case 0:
                    _context15.next = 2;
                    return regeneratorRuntime.awrap(this.mock.getTimestamp(this.operation.id));

                  case 2:
                    timestamp = _context15.sent;
                    _context15.next = 5;
                    return regeneratorRuntime.awrap(time.increaseTo(timestamp - 5));

                  case 5:
                    _context15.next = 7;
                    return regeneratorRuntime.awrap(expectRevert(this.mock.execute(this.operation.target, this.operation.value, this.operation.data, this.operation.predecessor, this.operation.salt, {
                      from: executor
                    }), 'TimelockController: operation is not ready'));

                  case 7:
                  case "end":
                    return _context15.stop();
                }
              }
            }, null, this);
          });
          describe('on time', function () {
            beforeEach(function _callee16() {
              var timestamp;
              return regeneratorRuntime.async(function _callee16$(_context16) {
                while (1) {
                  switch (_context16.prev = _context16.next) {
                    case 0:
                      _context16.next = 2;
                      return regeneratorRuntime.awrap(this.mock.getTimestamp(this.operation.id));

                    case 2:
                      timestamp = _context16.sent;
                      _context16.next = 5;
                      return regeneratorRuntime.awrap(time.increaseTo(timestamp));

                    case 5:
                    case "end":
                      return _context16.stop();
                  }
                }
              }, null, this);
            });
            it('executor can reveal', function _callee17() {
              var receipt;
              return regeneratorRuntime.async(function _callee17$(_context17) {
                while (1) {
                  switch (_context17.prev = _context17.next) {
                    case 0:
                      _context17.next = 2;
                      return regeneratorRuntime.awrap(this.mock.execute(this.operation.target, this.operation.value, this.operation.data, this.operation.predecessor, this.operation.salt, {
                        from: executor
                      }));

                    case 2:
                      receipt = _context17.sent;
                      expectEvent(receipt, 'CallExecuted', {
                        id: this.operation.id,
                        index: web3.utils.toBN(0),
                        target: this.operation.target,
                        value: web3.utils.toBN(this.operation.value),
                        data: this.operation.data
                      });

                    case 4:
                    case "end":
                      return _context17.stop();
                  }
                }
              }, null, this);
            });
            it('prevent non-executor from revealing', function _callee18() {
              return regeneratorRuntime.async(function _callee18$(_context18) {
                while (1) {
                  switch (_context18.prev = _context18.next) {
                    case 0:
                      _context18.next = 2;
                      return regeneratorRuntime.awrap(expectRevert(this.mock.execute(this.operation.target, this.operation.value, this.operation.data, this.operation.predecessor, this.operation.salt, {
                        from: other
                      }), "AccessControl: account ".concat(other.toLowerCase(), " is missing role ").concat(EXECUTOR_ROLE)));

                    case 2:
                    case "end":
                      return _context18.stop();
                  }
                }
              }, null, this);
            });
          });
        });
      });
    });
    describe('batch', function () {
      describe('schedule', function () {
        beforeEach(function _callee19() {
          return regeneratorRuntime.async(function _callee19$(_context19) {
            while (1) {
              switch (_context19.prev = _context19.next) {
                case 0:
                  this.operation = genOperationBatch(Array(8).fill('0xEd912250835c812D4516BBD80BdaEA1bB63a293C'), Array(8).fill(0), Array(8).fill('0x2fcb7a88'), ZERO_BYTES32, '0x6cf9d042ade5de78bed9ffd075eb4b2a4f6b1736932c2dc8af517d6e066f51f5');

                case 1:
                case "end":
                  return _context19.stop();
              }
            }
          }, null, this);
        });
        it('proposer can schedule', function _callee20() {
          var receipt, i, block;
          return regeneratorRuntime.async(function _callee20$(_context20) {
            while (1) {
              switch (_context20.prev = _context20.next) {
                case 0:
                  _context20.next = 2;
                  return regeneratorRuntime.awrap(this.mock.scheduleBatch(this.operation.targets, this.operation.values, this.operation.payloads, this.operation.predecessor, this.operation.salt, MINDELAY, {
                    from: proposer
                  }));

                case 2:
                  receipt = _context20.sent;

                  for (i in this.operation.targets) {
                    expectEvent(receipt, 'CallScheduled', {
                      id: this.operation.id,
                      index: web3.utils.toBN(i),
                      target: this.operation.targets[i],
                      value: web3.utils.toBN(this.operation.values[i]),
                      data: this.operation.payloads[i],
                      predecessor: this.operation.predecessor,
                      delay: MINDELAY
                    });
                  }

                  _context20.next = 6;
                  return regeneratorRuntime.awrap(web3.eth.getBlock(receipt.receipt.blockHash));

                case 6:
                  block = _context20.sent;
                  _context20.t0 = expect;
                  _context20.next = 10;
                  return regeneratorRuntime.awrap(this.mock.getTimestamp(this.operation.id));

                case 10:
                  _context20.t1 = _context20.sent;
                  _context20.t2 = web3.utils.toBN(block.timestamp).add(MINDELAY);
                  (0, _context20.t0)(_context20.t1).to.be.bignumber.equal(_context20.t2);

                case 13:
                case "end":
                  return _context20.stop();
              }
            }
          }, null, this);
        });
        it('prevent overwriting active operation', function _callee21() {
          return regeneratorRuntime.async(function _callee21$(_context21) {
            while (1) {
              switch (_context21.prev = _context21.next) {
                case 0:
                  _context21.next = 2;
                  return regeneratorRuntime.awrap(this.mock.scheduleBatch(this.operation.targets, this.operation.values, this.operation.payloads, this.operation.predecessor, this.operation.salt, MINDELAY, {
                    from: proposer
                  }));

                case 2:
                  _context21.next = 4;
                  return regeneratorRuntime.awrap(expectRevert(this.mock.scheduleBatch(this.operation.targets, this.operation.values, this.operation.payloads, this.operation.predecessor, this.operation.salt, MINDELAY, {
                    from: proposer
                  }), 'TimelockController: operation already scheduled'));

                case 4:
                case "end":
                  return _context21.stop();
              }
            }
          }, null, this);
        });
        it('length of batch parameter must match #1', function _callee22() {
          return regeneratorRuntime.async(function _callee22$(_context22) {
            while (1) {
              switch (_context22.prev = _context22.next) {
                case 0:
                  _context22.next = 2;
                  return regeneratorRuntime.awrap(expectRevert(this.mock.scheduleBatch(this.operation.targets, [], this.operation.payloads, this.operation.predecessor, this.operation.salt, MINDELAY, {
                    from: proposer
                  }), 'TimelockController: length mismatch'));

                case 2:
                case "end":
                  return _context22.stop();
              }
            }
          }, null, this);
        });
        it('length of batch parameter must match #1', function _callee23() {
          return regeneratorRuntime.async(function _callee23$(_context23) {
            while (1) {
              switch (_context23.prev = _context23.next) {
                case 0:
                  _context23.next = 2;
                  return regeneratorRuntime.awrap(expectRevert(this.mock.scheduleBatch(this.operation.targets, this.operation.values, [], this.operation.predecessor, this.operation.salt, MINDELAY, {
                    from: proposer
                  }), 'TimelockController: length mismatch'));

                case 2:
                case "end":
                  return _context23.stop();
              }
            }
          }, null, this);
        });
        it('prevent non-proposer from committing', function _callee24() {
          return regeneratorRuntime.async(function _callee24$(_context24) {
            while (1) {
              switch (_context24.prev = _context24.next) {
                case 0:
                  _context24.next = 2;
                  return regeneratorRuntime.awrap(expectRevert(this.mock.scheduleBatch(this.operation.targets, this.operation.values, this.operation.payloads, this.operation.predecessor, this.operation.salt, MINDELAY, {
                    from: other
                  }), "AccessControl: account ".concat(other.toLowerCase(), " is missing role ").concat(PROPOSER_ROLE)));

                case 2:
                case "end":
                  return _context24.stop();
              }
            }
          }, null, this);
        });
        it('enforce minimum delay', function _callee25() {
          return regeneratorRuntime.async(function _callee25$(_context25) {
            while (1) {
              switch (_context25.prev = _context25.next) {
                case 0:
                  _context25.next = 2;
                  return regeneratorRuntime.awrap(expectRevert(this.mock.scheduleBatch(this.operation.targets, this.operation.values, this.operation.payloads, this.operation.predecessor, this.operation.salt, MINDELAY - 1, {
                    from: proposer
                  }), 'TimelockController: insufficient delay'));

                case 2:
                case "end":
                  return _context25.stop();
              }
            }
          }, null, this);
        });
      });
      describe('execute', function () {
        beforeEach(function _callee26() {
          return regeneratorRuntime.async(function _callee26$(_context26) {
            while (1) {
              switch (_context26.prev = _context26.next) {
                case 0:
                  this.operation = genOperationBatch(Array(8).fill('0x76E53CcEb05131Ef5248553bEBDb8F70536830b1'), Array(8).fill(0), Array(8).fill('0x58a60f63'), ZERO_BYTES32, '0x9545eeabc7a7586689191f78a5532443698538e54211b5bd4d7dc0fc0102b5c7');

                case 1:
                case "end":
                  return _context26.stop();
              }
            }
          }, null, this);
        });
        it('revert if operation is not scheduled', function _callee27() {
          return regeneratorRuntime.async(function _callee27$(_context27) {
            while (1) {
              switch (_context27.prev = _context27.next) {
                case 0:
                  _context27.next = 2;
                  return regeneratorRuntime.awrap(expectRevert(this.mock.executeBatch(this.operation.targets, this.operation.values, this.operation.payloads, this.operation.predecessor, this.operation.salt, {
                    from: executor
                  }), 'TimelockController: operation is not ready'));

                case 2:
                case "end":
                  return _context27.stop();
              }
            }
          }, null, this);
        });
        describe('with scheduled operation', function () {
          beforeEach(function _callee28() {
            var _ref2;

            return regeneratorRuntime.async(function _callee28$(_context28) {
              while (1) {
                switch (_context28.prev = _context28.next) {
                  case 0:
                    _context28.next = 2;
                    return regeneratorRuntime.awrap(this.mock.scheduleBatch(this.operation.targets, this.operation.values, this.operation.payloads, this.operation.predecessor, this.operation.salt, MINDELAY, {
                      from: proposer
                    }));

                  case 2:
                    _ref2 = _context28.sent;
                    this.receipt = _ref2.receipt;
                    this.logs = _ref2.logs;

                  case 5:
                  case "end":
                    return _context28.stop();
                }
              }
            }, null, this);
          });
          it('revert if execution comes too early 1/2', function _callee29() {
            return regeneratorRuntime.async(function _callee29$(_context29) {
              while (1) {
                switch (_context29.prev = _context29.next) {
                  case 0:
                    _context29.next = 2;
                    return regeneratorRuntime.awrap(expectRevert(this.mock.executeBatch(this.operation.targets, this.operation.values, this.operation.payloads, this.operation.predecessor, this.operation.salt, {
                      from: executor
                    }), 'TimelockController: operation is not ready'));

                  case 2:
                  case "end":
                    return _context29.stop();
                }
              }
            }, null, this);
          });
          it('revert if execution comes too early 2/2', function _callee30() {
            var timestamp;
            return regeneratorRuntime.async(function _callee30$(_context30) {
              while (1) {
                switch (_context30.prev = _context30.next) {
                  case 0:
                    _context30.next = 2;
                    return regeneratorRuntime.awrap(this.mock.getTimestamp(this.operation.id));

                  case 2:
                    timestamp = _context30.sent;
                    _context30.next = 5;
                    return regeneratorRuntime.awrap(time.increaseTo(timestamp - 5));

                  case 5:
                    _context30.next = 7;
                    return regeneratorRuntime.awrap(expectRevert(this.mock.executeBatch(this.operation.targets, this.operation.values, this.operation.payloads, this.operation.predecessor, this.operation.salt, {
                      from: executor
                    }), 'TimelockController: operation is not ready'));

                  case 7:
                  case "end":
                    return _context30.stop();
                }
              }
            }, null, this);
          });
          describe('on time', function () {
            beforeEach(function _callee31() {
              var timestamp;
              return regeneratorRuntime.async(function _callee31$(_context31) {
                while (1) {
                  switch (_context31.prev = _context31.next) {
                    case 0:
                      _context31.next = 2;
                      return regeneratorRuntime.awrap(this.mock.getTimestamp(this.operation.id));

                    case 2:
                      timestamp = _context31.sent;
                      _context31.next = 5;
                      return regeneratorRuntime.awrap(time.increaseTo(timestamp));

                    case 5:
                    case "end":
                      return _context31.stop();
                  }
                }
              }, null, this);
            });
            it('executor can reveal', function _callee32() {
              var receipt, i;
              return regeneratorRuntime.async(function _callee32$(_context32) {
                while (1) {
                  switch (_context32.prev = _context32.next) {
                    case 0:
                      _context32.next = 2;
                      return regeneratorRuntime.awrap(this.mock.executeBatch(this.operation.targets, this.operation.values, this.operation.payloads, this.operation.predecessor, this.operation.salt, {
                        from: executor
                      }));

                    case 2:
                      receipt = _context32.sent;

                      for (i in this.operation.targets) {
                        expectEvent(receipt, 'CallExecuted', {
                          id: this.operation.id,
                          index: web3.utils.toBN(i),
                          target: this.operation.targets[i],
                          value: web3.utils.toBN(this.operation.values[i]),
                          data: this.operation.payloads[i]
                        });
                      }

                    case 4:
                    case "end":
                      return _context32.stop();
                  }
                }
              }, null, this);
            });
            it('prevent non-executor from revealing', function _callee33() {
              return regeneratorRuntime.async(function _callee33$(_context33) {
                while (1) {
                  switch (_context33.prev = _context33.next) {
                    case 0:
                      _context33.next = 2;
                      return regeneratorRuntime.awrap(expectRevert(this.mock.executeBatch(this.operation.targets, this.operation.values, this.operation.payloads, this.operation.predecessor, this.operation.salt, {
                        from: other
                      }), "AccessControl: account ".concat(other.toLowerCase(), " is missing role ").concat(EXECUTOR_ROLE)));

                    case 2:
                    case "end":
                      return _context33.stop();
                  }
                }
              }, null, this);
            });
            it('length mismatch #1', function _callee34() {
              return regeneratorRuntime.async(function _callee34$(_context34) {
                while (1) {
                  switch (_context34.prev = _context34.next) {
                    case 0:
                      _context34.next = 2;
                      return regeneratorRuntime.awrap(expectRevert(this.mock.executeBatch([], this.operation.values, this.operation.payloads, this.operation.predecessor, this.operation.salt, {
                        from: executor
                      }), 'TimelockController: length mismatch'));

                    case 2:
                    case "end":
                      return _context34.stop();
                  }
                }
              }, null, this);
            });
            it('length mismatch #2', function _callee35() {
              return regeneratorRuntime.async(function _callee35$(_context35) {
                while (1) {
                  switch (_context35.prev = _context35.next) {
                    case 0:
                      _context35.next = 2;
                      return regeneratorRuntime.awrap(expectRevert(this.mock.executeBatch(this.operation.targets, [], this.operation.payloads, this.operation.predecessor, this.operation.salt, {
                        from: executor
                      }), 'TimelockController: length mismatch'));

                    case 2:
                    case "end":
                      return _context35.stop();
                  }
                }
              }, null, this);
            });
            it('length mismatch #3', function _callee36() {
              return regeneratorRuntime.async(function _callee36$(_context36) {
                while (1) {
                  switch (_context36.prev = _context36.next) {
                    case 0:
                      _context36.next = 2;
                      return regeneratorRuntime.awrap(expectRevert(this.mock.executeBatch(this.operation.targets, this.operation.values, [], this.operation.predecessor, this.operation.salt, {
                        from: executor
                      }), 'TimelockController: length mismatch'));

                    case 2:
                    case "end":
                      return _context36.stop();
                  }
                }
              }, null, this);
            });
          });
        });
        it('partial execution', function _callee37() {
          var operation;
          return regeneratorRuntime.async(function _callee37$(_context37) {
            while (1) {
              switch (_context37.prev = _context37.next) {
                case 0:
                  operation = genOperationBatch([this.callreceivermock.address, this.callreceivermock.address, this.callreceivermock.address], [0, 0, 0], [this.callreceivermock.contract.methods.mockFunction().encodeABI(), this.callreceivermock.contract.methods.mockFunctionThrows().encodeABI(), this.callreceivermock.contract.methods.mockFunction().encodeABI()], ZERO_BYTES32, '0x8ac04aa0d6d66b8812fb41d39638d37af0a9ab11da507afd65c509f8ed079d3e');
                  _context37.next = 3;
                  return regeneratorRuntime.awrap(this.mock.scheduleBatch(operation.targets, operation.values, operation.payloads, operation.predecessor, operation.salt, MINDELAY, {
                    from: proposer
                  }));

                case 3:
                  _context37.next = 5;
                  return regeneratorRuntime.awrap(time.increase(MINDELAY));

                case 5:
                  _context37.next = 7;
                  return regeneratorRuntime.awrap(expectRevert(this.mock.executeBatch(operation.targets, operation.values, operation.payloads, operation.predecessor, operation.salt, {
                    from: executor
                  }), 'TimelockController: underlying transaction reverted'));

                case 7:
                case "end":
                  return _context37.stop();
              }
            }
          }, null, this);
        });
      });
    });
    describe('cancel', function () {
      beforeEach(function _callee38() {
        var _ref3;

        return regeneratorRuntime.async(function _callee38$(_context38) {
          while (1) {
            switch (_context38.prev = _context38.next) {
              case 0:
                this.operation = genOperation('0xC6837c44AA376dbe1d2709F13879E040CAb653ca', 0, '0x296e58dd', ZERO_BYTES32, '0xa2485763600634800df9fc9646fb2c112cf98649c55f63dd1d9c7d13a64399d9');
                _context38.next = 3;
                return regeneratorRuntime.awrap(this.mock.schedule(this.operation.target, this.operation.value, this.operation.data, this.operation.predecessor, this.operation.salt, MINDELAY, {
                  from: proposer
                }));

              case 3:
                _ref3 = _context38.sent;
                this.receipt = _ref3.receipt;
                this.logs = _ref3.logs;

              case 6:
              case "end":
                return _context38.stop();
            }
          }
        }, null, this);
      });
      it('canceller can cancel', function _callee39() {
        var receipt;
        return regeneratorRuntime.async(function _callee39$(_context39) {
          while (1) {
            switch (_context39.prev = _context39.next) {
              case 0:
                _context39.next = 2;
                return regeneratorRuntime.awrap(this.mock.cancel(this.operation.id, {
                  from: canceller
                }));

              case 2:
                receipt = _context39.sent;
                expectEvent(receipt, 'Cancelled', {
                  id: this.operation.id
                });

              case 4:
              case "end":
                return _context39.stop();
            }
          }
        }, null, this);
      });
      it('cannot cancel invalid operation', function _callee40() {
        return regeneratorRuntime.async(function _callee40$(_context40) {
          while (1) {
            switch (_context40.prev = _context40.next) {
              case 0:
                _context40.next = 2;
                return regeneratorRuntime.awrap(expectRevert(this.mock.cancel(constants.ZERO_BYTES32, {
                  from: canceller
                }), 'TimelockController: operation cannot be cancelled'));

              case 2:
              case "end":
                return _context40.stop();
            }
          }
        }, null, this);
      });
      it('prevent non-canceller from canceling', function _callee41() {
        return regeneratorRuntime.async(function _callee41$(_context41) {
          while (1) {
            switch (_context41.prev = _context41.next) {
              case 0:
                _context41.next = 2;
                return regeneratorRuntime.awrap(expectRevert(this.mock.cancel(this.operation.id, {
                  from: other
                }), "AccessControl: account ".concat(other.toLowerCase(), " is missing role ").concat(CANCELLER_ROLE)));

              case 2:
              case "end":
                return _context41.stop();
            }
          }
        }, null, this);
      });
    });
  });
  describe('maintenance', function () {
    it('prevent unauthorized maintenance', function _callee42() {
      return regeneratorRuntime.async(function _callee42$(_context42) {
        while (1) {
          switch (_context42.prev = _context42.next) {
            case 0:
              _context42.next = 2;
              return regeneratorRuntime.awrap(expectRevert(this.mock.updateDelay(0, {
                from: other
              }), 'TimelockController: caller must be timelock'));

            case 2:
            case "end":
              return _context42.stop();
          }
        }
      }, null, this);
    });
    it('timelock scheduled maintenance', function _callee43() {
      var newDelay, operation, receipt;
      return regeneratorRuntime.async(function _callee43$(_context43) {
        while (1) {
          switch (_context43.prev = _context43.next) {
            case 0:
              newDelay = time.duration.hours(6);
              operation = genOperation(this.mock.address, 0, this.mock.contract.methods.updateDelay(newDelay.toString()).encodeABI(), ZERO_BYTES32, '0xf8e775b2c5f4d66fb5c7fa800f35ef518c262b6014b3c0aee6ea21bff157f108');
              _context43.next = 4;
              return regeneratorRuntime.awrap(this.mock.schedule(operation.target, operation.value, operation.data, operation.predecessor, operation.salt, MINDELAY, {
                from: proposer
              }));

            case 4:
              _context43.next = 6;
              return regeneratorRuntime.awrap(time.increase(MINDELAY));

            case 6:
              _context43.next = 8;
              return regeneratorRuntime.awrap(this.mock.execute(operation.target, operation.value, operation.data, operation.predecessor, operation.salt, {
                from: executor
              }));

            case 8:
              receipt = _context43.sent;
              expectEvent(receipt, 'MinDelayChange', {
                newDuration: newDelay.toString(),
                oldDuration: MINDELAY
              });
              _context43.t0 = expect;
              _context43.next = 13;
              return regeneratorRuntime.awrap(this.mock.getMinDelay());

            case 13:
              _context43.t1 = _context43.sent;
              _context43.t2 = newDelay;
              (0, _context43.t0)(_context43.t1).to.be.bignumber.equal(_context43.t2);

            case 16:
            case "end":
              return _context43.stop();
          }
        }
      }, null, this);
    });
  });
  describe('dependency', function () {
    beforeEach(function _callee44() {
      return regeneratorRuntime.async(function _callee44$(_context44) {
        while (1) {
          switch (_context44.prev = _context44.next) {
            case 0:
              this.operation1 = genOperation('0xdE66bD4c97304200A95aE0AadA32d6d01A867E39', 0, '0x01dc731a', ZERO_BYTES32, '0x64e932133c7677402ead2926f86205e2ca4686aebecf5a8077627092b9bb2feb');
              this.operation2 = genOperation('0x3c7944a3F1ee7fc8c5A5134ba7c79D11c3A1FCa3', 0, '0x8f531849', this.operation1.id, '0x036e1311cac523f9548e6461e29fb1f8f9196b91910a41711ea22f5de48df07d');
              _context44.next = 4;
              return regeneratorRuntime.awrap(this.mock.schedule(this.operation1.target, this.operation1.value, this.operation1.data, this.operation1.predecessor, this.operation1.salt, MINDELAY, {
                from: proposer
              }));

            case 4:
              _context44.next = 6;
              return regeneratorRuntime.awrap(this.mock.schedule(this.operation2.target, this.operation2.value, this.operation2.data, this.operation2.predecessor, this.operation2.salt, MINDELAY, {
                from: proposer
              }));

            case 6:
              _context44.next = 8;
              return regeneratorRuntime.awrap(time.increase(MINDELAY));

            case 8:
            case "end":
              return _context44.stop();
          }
        }
      }, null, this);
    });
    it('cannot execute before dependency', function _callee45() {
      return regeneratorRuntime.async(function _callee45$(_context45) {
        while (1) {
          switch (_context45.prev = _context45.next) {
            case 0:
              _context45.next = 2;
              return regeneratorRuntime.awrap(expectRevert(this.mock.execute(this.operation2.target, this.operation2.value, this.operation2.data, this.operation2.predecessor, this.operation2.salt, {
                from: executor
              }), 'TimelockController: missing dependency'));

            case 2:
            case "end":
              return _context45.stop();
          }
        }
      }, null, this);
    });
    it('can execute after dependency', function _callee46() {
      return regeneratorRuntime.async(function _callee46$(_context46) {
        while (1) {
          switch (_context46.prev = _context46.next) {
            case 0:
              _context46.next = 2;
              return regeneratorRuntime.awrap(this.mock.execute(this.operation1.target, this.operation1.value, this.operation1.data, this.operation1.predecessor, this.operation1.salt, {
                from: executor
              }));

            case 2:
              _context46.next = 4;
              return regeneratorRuntime.awrap(this.mock.execute(this.operation2.target, this.operation2.value, this.operation2.data, this.operation2.predecessor, this.operation2.salt, {
                from: executor
              }));

            case 4:
            case "end":
              return _context46.stop();
          }
        }
      }, null, this);
    });
  });
  describe('usage scenario', function () {
    this.timeout(10000);
    it('call', function _callee47() {
      var operation;
      return regeneratorRuntime.async(function _callee47$(_context47) {
        while (1) {
          switch (_context47.prev = _context47.next) {
            case 0:
              operation = genOperation(this.implementation2.address, 0, this.implementation2.contract.methods.setValue(42).encodeABI(), ZERO_BYTES32, '0x8043596363daefc89977b25f9d9b4d06c3910959ef0c4d213557a903e1b555e2');
              _context47.next = 3;
              return regeneratorRuntime.awrap(this.mock.schedule(operation.target, operation.value, operation.data, operation.predecessor, operation.salt, MINDELAY, {
                from: proposer
              }));

            case 3:
              _context47.next = 5;
              return regeneratorRuntime.awrap(time.increase(MINDELAY));

            case 5:
              _context47.next = 7;
              return regeneratorRuntime.awrap(this.mock.execute(operation.target, operation.value, operation.data, operation.predecessor, operation.salt, {
                from: executor
              }));

            case 7:
              _context47.t0 = expect;
              _context47.next = 10;
              return regeneratorRuntime.awrap(this.implementation2.getValue());

            case 10:
              _context47.t1 = _context47.sent;
              _context47.t2 = web3.utils.toBN(42);
              (0, _context47.t0)(_context47.t1).to.be.bignumber.equal(_context47.t2);

            case 13:
            case "end":
              return _context47.stop();
          }
        }
      }, null, this);
    });
    it('call reverting', function _callee48() {
      var operation;
      return regeneratorRuntime.async(function _callee48$(_context48) {
        while (1) {
          switch (_context48.prev = _context48.next) {
            case 0:
              operation = genOperation(this.callreceivermock.address, 0, this.callreceivermock.contract.methods.mockFunctionRevertsNoReason().encodeABI(), ZERO_BYTES32, '0xb1b1b276fdf1a28d1e00537ea73b04d56639128b08063c1a2f70a52e38cba693');
              _context48.next = 3;
              return regeneratorRuntime.awrap(this.mock.schedule(operation.target, operation.value, operation.data, operation.predecessor, operation.salt, MINDELAY, {
                from: proposer
              }));

            case 3:
              _context48.next = 5;
              return regeneratorRuntime.awrap(time.increase(MINDELAY));

            case 5:
              _context48.next = 7;
              return regeneratorRuntime.awrap(expectRevert(this.mock.execute(operation.target, operation.value, operation.data, operation.predecessor, operation.salt, {
                from: executor
              }), 'TimelockController: underlying transaction reverted'));

            case 7:
            case "end":
              return _context48.stop();
          }
        }
      }, null, this);
    });
    it('call throw', function _callee49() {
      var operation;
      return regeneratorRuntime.async(function _callee49$(_context49) {
        while (1) {
          switch (_context49.prev = _context49.next) {
            case 0:
              operation = genOperation(this.callreceivermock.address, 0, this.callreceivermock.contract.methods.mockFunctionThrows().encodeABI(), ZERO_BYTES32, '0xe5ca79f295fc8327ee8a765fe19afb58f4a0cbc5053642bfdd7e73bc68e0fc67');
              _context49.next = 3;
              return regeneratorRuntime.awrap(this.mock.schedule(operation.target, operation.value, operation.data, operation.predecessor, operation.salt, MINDELAY, {
                from: proposer
              }));

            case 3:
              _context49.next = 5;
              return regeneratorRuntime.awrap(time.increase(MINDELAY));

            case 5:
              _context49.next = 7;
              return regeneratorRuntime.awrap(expectRevert(this.mock.execute(operation.target, operation.value, operation.data, operation.predecessor, operation.salt, {
                from: executor
              }), 'TimelockController: underlying transaction reverted'));

            case 7:
            case "end":
              return _context49.stop();
          }
        }
      }, null, this);
    });
    it('call out of gas', function _callee50() {
      var operation;
      return regeneratorRuntime.async(function _callee50$(_context50) {
        while (1) {
          switch (_context50.prev = _context50.next) {
            case 0:
              operation = genOperation(this.callreceivermock.address, 0, this.callreceivermock.contract.methods.mockFunctionOutOfGas().encodeABI(), ZERO_BYTES32, '0xf3274ce7c394c5b629d5215723563a744b817e1730cca5587c567099a14578fd');
              _context50.next = 3;
              return regeneratorRuntime.awrap(this.mock.schedule(operation.target, operation.value, operation.data, operation.predecessor, operation.salt, MINDELAY, {
                from: proposer
              }));

            case 3:
              _context50.next = 5;
              return regeneratorRuntime.awrap(time.increase(MINDELAY));

            case 5:
              _context50.next = 7;
              return regeneratorRuntime.awrap(expectRevert(this.mock.execute(operation.target, operation.value, operation.data, operation.predecessor, operation.salt, {
                from: executor,
                gas: '70000'
              }), 'TimelockController: underlying transaction reverted'));

            case 7:
            case "end":
              return _context50.stop();
          }
        }
      }, null, this);
    });
    it('call payable with eth', function _callee51() {
      var operation;
      return regeneratorRuntime.async(function _callee51$(_context51) {
        while (1) {
          switch (_context51.prev = _context51.next) {
            case 0:
              operation = genOperation(this.callreceivermock.address, 1, this.callreceivermock.contract.methods.mockFunction().encodeABI(), ZERO_BYTES32, '0x5ab73cd33477dcd36c1e05e28362719d0ed59a7b9ff14939de63a43073dc1f44');
              _context51.next = 3;
              return regeneratorRuntime.awrap(this.mock.schedule(operation.target, operation.value, operation.data, operation.predecessor, operation.salt, MINDELAY, {
                from: proposer
              }));

            case 3:
              _context51.next = 5;
              return regeneratorRuntime.awrap(time.increase(MINDELAY));

            case 5:
              _context51.t0 = expect;
              _context51.next = 8;
              return regeneratorRuntime.awrap(web3.eth.getBalance(this.mock.address));

            case 8:
              _context51.t1 = _context51.sent;
              _context51.t2 = web3.utils.toBN(0);
              (0, _context51.t0)(_context51.t1).to.be.bignumber.equal(_context51.t2);
              _context51.t3 = expect;
              _context51.next = 14;
              return regeneratorRuntime.awrap(web3.eth.getBalance(this.callreceivermock.address));

            case 14:
              _context51.t4 = _context51.sent;
              _context51.t5 = web3.utils.toBN(0);
              (0, _context51.t3)(_context51.t4).to.be.bignumber.equal(_context51.t5);
              _context51.next = 19;
              return regeneratorRuntime.awrap(this.mock.execute(operation.target, operation.value, operation.data, operation.predecessor, operation.salt, {
                from: executor,
                value: 1
              }));

            case 19:
              _context51.t6 = expect;
              _context51.next = 22;
              return regeneratorRuntime.awrap(web3.eth.getBalance(this.mock.address));

            case 22:
              _context51.t7 = _context51.sent;
              _context51.t8 = web3.utils.toBN(0);
              (0, _context51.t6)(_context51.t7).to.be.bignumber.equal(_context51.t8);
              _context51.t9 = expect;
              _context51.next = 28;
              return regeneratorRuntime.awrap(web3.eth.getBalance(this.callreceivermock.address));

            case 28:
              _context51.t10 = _context51.sent;
              _context51.t11 = web3.utils.toBN(1);
              (0, _context51.t9)(_context51.t10).to.be.bignumber.equal(_context51.t11);

            case 31:
            case "end":
              return _context51.stop();
          }
        }
      }, null, this);
    });
    it('call nonpayable with eth', function _callee52() {
      var operation;
      return regeneratorRuntime.async(function _callee52$(_context52) {
        while (1) {
          switch (_context52.prev = _context52.next) {
            case 0:
              operation = genOperation(this.callreceivermock.address, 1, this.callreceivermock.contract.methods.mockFunctionNonPayable().encodeABI(), ZERO_BYTES32, '0xb78edbd920c7867f187e5aa6294ae5a656cfbf0dea1ccdca3751b740d0f2bdf8');
              _context52.next = 3;
              return regeneratorRuntime.awrap(this.mock.schedule(operation.target, operation.value, operation.data, operation.predecessor, operation.salt, MINDELAY, {
                from: proposer
              }));

            case 3:
              _context52.next = 5;
              return regeneratorRuntime.awrap(time.increase(MINDELAY));

            case 5:
              _context52.t0 = expect;
              _context52.next = 8;
              return regeneratorRuntime.awrap(web3.eth.getBalance(this.mock.address));

            case 8:
              _context52.t1 = _context52.sent;
              _context52.t2 = web3.utils.toBN(0);
              (0, _context52.t0)(_context52.t1).to.be.bignumber.equal(_context52.t2);
              _context52.t3 = expect;
              _context52.next = 14;
              return regeneratorRuntime.awrap(web3.eth.getBalance(this.callreceivermock.address));

            case 14:
              _context52.t4 = _context52.sent;
              _context52.t5 = web3.utils.toBN(0);
              (0, _context52.t3)(_context52.t4).to.be.bignumber.equal(_context52.t5);
              _context52.next = 19;
              return regeneratorRuntime.awrap(expectRevert(this.mock.execute(operation.target, operation.value, operation.data, operation.predecessor, operation.salt, {
                from: executor
              }), 'TimelockController: underlying transaction reverted'));

            case 19:
              _context52.t6 = expect;
              _context52.next = 22;
              return regeneratorRuntime.awrap(web3.eth.getBalance(this.mock.address));

            case 22:
              _context52.t7 = _context52.sent;
              _context52.t8 = web3.utils.toBN(0);
              (0, _context52.t6)(_context52.t7).to.be.bignumber.equal(_context52.t8);
              _context52.t9 = expect;
              _context52.next = 28;
              return regeneratorRuntime.awrap(web3.eth.getBalance(this.callreceivermock.address));

            case 28:
              _context52.t10 = _context52.sent;
              _context52.t11 = web3.utils.toBN(0);
              (0, _context52.t9)(_context52.t10).to.be.bignumber.equal(_context52.t11);

            case 31:
            case "end":
              return _context52.stop();
          }
        }
      }, null, this);
    });
    it('call reverting with eth', function _callee53() {
      var operation;
      return regeneratorRuntime.async(function _callee53$(_context53) {
        while (1) {
          switch (_context53.prev = _context53.next) {
            case 0:
              operation = genOperation(this.callreceivermock.address, 1, this.callreceivermock.contract.methods.mockFunctionRevertsNoReason().encodeABI(), ZERO_BYTES32, '0xdedb4563ef0095db01d81d3f2decf57cf83e4a72aa792af14c43a792b56f4de6');
              _context53.next = 3;
              return regeneratorRuntime.awrap(this.mock.schedule(operation.target, operation.value, operation.data, operation.predecessor, operation.salt, MINDELAY, {
                from: proposer
              }));

            case 3:
              _context53.next = 5;
              return regeneratorRuntime.awrap(time.increase(MINDELAY));

            case 5:
              _context53.t0 = expect;
              _context53.next = 8;
              return regeneratorRuntime.awrap(web3.eth.getBalance(this.mock.address));

            case 8:
              _context53.t1 = _context53.sent;
              _context53.t2 = web3.utils.toBN(0);
              (0, _context53.t0)(_context53.t1).to.be.bignumber.equal(_context53.t2);
              _context53.t3 = expect;
              _context53.next = 14;
              return regeneratorRuntime.awrap(web3.eth.getBalance(this.callreceivermock.address));

            case 14:
              _context53.t4 = _context53.sent;
              _context53.t5 = web3.utils.toBN(0);
              (0, _context53.t3)(_context53.t4).to.be.bignumber.equal(_context53.t5);
              _context53.next = 19;
              return regeneratorRuntime.awrap(expectRevert(this.mock.execute(operation.target, operation.value, operation.data, operation.predecessor, operation.salt, {
                from: executor
              }), 'TimelockController: underlying transaction reverted'));

            case 19:
              _context53.t6 = expect;
              _context53.next = 22;
              return regeneratorRuntime.awrap(web3.eth.getBalance(this.mock.address));

            case 22:
              _context53.t7 = _context53.sent;
              _context53.t8 = web3.utils.toBN(0);
              (0, _context53.t6)(_context53.t7).to.be.bignumber.equal(_context53.t8);
              _context53.t9 = expect;
              _context53.next = 28;
              return regeneratorRuntime.awrap(web3.eth.getBalance(this.callreceivermock.address));

            case 28:
              _context53.t10 = _context53.sent;
              _context53.t11 = web3.utils.toBN(0);
              (0, _context53.t9)(_context53.t10).to.be.bignumber.equal(_context53.t11);

            case 31:
            case "end":
              return _context53.stop();
          }
        }
      }, null, this);
    });
  });
  describe('safe receive', function () {
    describe('ERC721', function () {
      var name = 'Non Fungible Token';
      var symbol = 'NFT';
      var tokenId = new BN(1);
      beforeEach(function _callee54() {
        return regeneratorRuntime.async(function _callee54$(_context54) {
          while (1) {
            switch (_context54.prev = _context54.next) {
              case 0:
                _context54.next = 2;
                return regeneratorRuntime.awrap(ERC721Mock["new"](name, symbol));

              case 2:
                this.token = _context54.sent;
                _context54.next = 5;
                return regeneratorRuntime.awrap(this.token.mint(other, tokenId));

              case 5:
              case "end":
                return _context54.stop();
            }
          }
        }, null, this);
      });
      it('can receive an ERC721 safeTransfer', function _callee55() {
        return regeneratorRuntime.async(function _callee55$(_context55) {
          while (1) {
            switch (_context55.prev = _context55.next) {
              case 0:
                _context55.next = 2;
                return regeneratorRuntime.awrap(this.token.safeTransferFrom(other, this.mock.address, tokenId, {
                  from: other
                }));

              case 2:
              case "end":
                return _context55.stop();
            }
          }
        }, null, this);
      });
    });
    describe('ERC1155', function () {
      var uri = 'https://token-cdn-domain/{id}.json';
      var tokenIds = {
        1: new BN(1000),
        2: new BN(2000),
        3: new BN(3000)
      };
      beforeEach(function _callee56() {
        return regeneratorRuntime.async(function _callee56$(_context56) {
          while (1) {
            switch (_context56.prev = _context56.next) {
              case 0:
                _context56.next = 2;
                return regeneratorRuntime.awrap(ERC1155Mock["new"](uri));

              case 2:
                this.token = _context56.sent;
                _context56.next = 5;
                return regeneratorRuntime.awrap(this.token.mintBatch(other, Object.keys(tokenIds), Object.values(tokenIds), '0x'));

              case 5:
              case "end":
                return _context56.stop();
            }
          }
        }, null, this);
      });
      it('can receive ERC1155 safeTransfer', function _callee57() {
        var _this$token;

        return regeneratorRuntime.async(function _callee57$(_context57) {
          while (1) {
            switch (_context57.prev = _context57.next) {
              case 0:
                _context57.next = 2;
                return regeneratorRuntime.awrap((_this$token = this.token).safeTransferFrom.apply(_this$token, [other, this.mock.address].concat(_toConsumableArray(Object.entries(tokenIds)[0]), [// id + amount
                '0x', {
                  from: other
                }])));

              case 2:
              case "end":
                return _context57.stop();
            }
          }
        }, null, this);
      });
      it('can receive ERC1155 safeBatchTransfer', function _callee58() {
        return regeneratorRuntime.async(function _callee58$(_context58) {
          while (1) {
            switch (_context58.prev = _context58.next) {
              case 0:
                _context58.next = 2;
                return regeneratorRuntime.awrap(this.token.safeBatchTransferFrom(other, this.mock.address, Object.keys(tokenIds), Object.values(tokenIds), '0x', {
                  from: other
                }));

              case 2:
              case "end":
                return _context58.stop();
            }
          }
        }, null, this);
      });
    });
  });
});