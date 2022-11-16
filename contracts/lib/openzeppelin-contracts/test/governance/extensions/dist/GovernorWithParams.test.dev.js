"use strict";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var _require = require('@openzeppelin/test-helpers'),
    BN = _require.BN,
    expectEvent = _require.expectEvent;

var _require2 = require('chai'),
    expect = _require2.expect;

var ethSigUtil = require('eth-sig-util');

var Wallet = require('ethereumjs-wallet')["default"];

var _require3 = require('ethereumjs-util'),
    fromRpcSig = _require3.fromRpcSig;

var Enums = require('../../helpers/enums');

var _require4 = require('../../helpers/eip712'),
    EIP712Domain = _require4.EIP712Domain;

var _require5 = require('../../helpers/governance'),
    GovernorHelper = _require5.GovernorHelper;

var Token = artifacts.require('ERC20VotesCompMock');

var Governor = artifacts.require('GovernorWithParamsMock');

var CallReceiver = artifacts.require('CallReceiverMock');

var rawParams = {
  uintParam: new BN('42'),
  strParam: 'These are my params'
};
var encodedParams = web3.eth.abi.encodeParameters(['uint256', 'string'], Object.values(rawParams));
contract('GovernorWithParams', function (accounts) {
  var _accounts = _slicedToArray(accounts, 6),
      owner = _accounts[0],
      proposer = _accounts[1],
      voter1 = _accounts[2],
      voter2 = _accounts[3],
      voter3 = _accounts[4],
      voter4 = _accounts[5];

  var name = 'OZ-Governor';
  var version = '1';
  var tokenName = 'MockToken';
  var tokenSymbol = 'MTKN';
  var tokenSupply = web3.utils.toWei('100');
  var votingDelay = new BN(4);
  var votingPeriod = new BN(16);
  var value = web3.utils.toWei('1');
  beforeEach(function _callee() {
    return regeneratorRuntime.async(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return regeneratorRuntime.awrap(web3.eth.getChainId());

          case 2:
            this.chainId = _context.sent;
            _context.next = 5;
            return regeneratorRuntime.awrap(Token["new"](tokenName, tokenSymbol));

          case 5:
            this.token = _context.sent;
            _context.next = 8;
            return regeneratorRuntime.awrap(Governor["new"](name, this.token.address));

          case 8:
            this.mock = _context.sent;
            _context.next = 11;
            return regeneratorRuntime.awrap(CallReceiver["new"]());

          case 11:
            this.receiver = _context.sent;
            this.helper = new GovernorHelper(this.mock);
            _context.next = 15;
            return regeneratorRuntime.awrap(web3.eth.sendTransaction({
              from: owner,
              to: this.mock.address,
              value: value
            }));

          case 15:
            _context.next = 17;
            return regeneratorRuntime.awrap(this.token.mint(owner, tokenSupply));

          case 17:
            _context.next = 19;
            return regeneratorRuntime.awrap(this.helper.delegate({
              token: this.token,
              to: voter1,
              value: web3.utils.toWei('10')
            }, {
              from: owner
            }));

          case 19:
            _context.next = 21;
            return regeneratorRuntime.awrap(this.helper.delegate({
              token: this.token,
              to: voter2,
              value: web3.utils.toWei('7')
            }, {
              from: owner
            }));

          case 21:
            _context.next = 23;
            return regeneratorRuntime.awrap(this.helper.delegate({
              token: this.token,
              to: voter3,
              value: web3.utils.toWei('5')
            }, {
              from: owner
            }));

          case 23:
            _context.next = 25;
            return regeneratorRuntime.awrap(this.helper.delegate({
              token: this.token,
              to: voter4,
              value: web3.utils.toWei('2')
            }, {
              from: owner
            }));

          case 25:
            // default proposal
            this.proposal = this.helper.setProposal([{
              target: this.receiver.address,
              value: value,
              data: this.receiver.contract.methods.mockFunction().encodeABI()
            }], '<proposal description>');

          case 26:
          case "end":
            return _context.stop();
        }
      }
    }, null, this);
  });
  it('deployment check', function _callee2() {
    return regeneratorRuntime.async(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.t0 = expect;
            _context2.next = 3;
            return regeneratorRuntime.awrap(this.mock.name());

          case 3:
            _context2.t1 = _context2.sent;
            _context2.t2 = name;
            (0, _context2.t0)(_context2.t1).to.be.equal(_context2.t2);
            _context2.t3 = expect;
            _context2.next = 9;
            return regeneratorRuntime.awrap(this.mock.token());

          case 9:
            _context2.t4 = _context2.sent;
            _context2.t5 = this.token.address;
            (0, _context2.t3)(_context2.t4).to.be.equal(_context2.t5);
            _context2.t6 = expect;
            _context2.next = 15;
            return regeneratorRuntime.awrap(this.mock.votingDelay());

          case 15:
            _context2.t7 = _context2.sent;
            _context2.t8 = votingDelay;
            (0, _context2.t6)(_context2.t7).to.be.bignumber.equal(_context2.t8);
            _context2.t9 = expect;
            _context2.next = 21;
            return regeneratorRuntime.awrap(this.mock.votingPeriod());

          case 21:
            _context2.t10 = _context2.sent;
            _context2.t11 = votingPeriod;
            (0, _context2.t9)(_context2.t10).to.be.bignumber.equal(_context2.t11);

          case 24:
          case "end":
            return _context2.stop();
        }
      }
    }, null, this);
  });
  it('nominal is unaffected', function _callee3() {
    return regeneratorRuntime.async(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return regeneratorRuntime.awrap(this.helper.propose({
              from: proposer
            }));

          case 2:
            _context3.next = 4;
            return regeneratorRuntime.awrap(this.helper.waitForSnapshot());

          case 4:
            _context3.next = 6;
            return regeneratorRuntime.awrap(this.helper.vote({
              support: Enums.VoteType.For,
              reason: 'This is nice'
            }, {
              from: voter1
            }));

          case 6:
            _context3.next = 8;
            return regeneratorRuntime.awrap(this.helper.vote({
              support: Enums.VoteType.For
            }, {
              from: voter2
            }));

          case 8:
            _context3.next = 10;
            return regeneratorRuntime.awrap(this.helper.vote({
              support: Enums.VoteType.Against
            }, {
              from: voter3
            }));

          case 10:
            _context3.next = 12;
            return regeneratorRuntime.awrap(this.helper.vote({
              support: Enums.VoteType.Abstain
            }, {
              from: voter4
            }));

          case 12:
            _context3.next = 14;
            return regeneratorRuntime.awrap(this.helper.waitForDeadline());

          case 14:
            _context3.next = 16;
            return regeneratorRuntime.awrap(this.helper.execute());

          case 16:
            _context3.t0 = expect;
            _context3.next = 19;
            return regeneratorRuntime.awrap(this.mock.hasVoted(this.proposal.id, owner));

          case 19:
            _context3.t1 = _context3.sent;
            (0, _context3.t0)(_context3.t1).to.be.equal(false);
            _context3.t2 = expect;
            _context3.next = 24;
            return regeneratorRuntime.awrap(this.mock.hasVoted(this.proposal.id, voter1));

          case 24:
            _context3.t3 = _context3.sent;
            (0, _context3.t2)(_context3.t3).to.be.equal(true);
            _context3.t4 = expect;
            _context3.next = 29;
            return regeneratorRuntime.awrap(this.mock.hasVoted(this.proposal.id, voter2));

          case 29:
            _context3.t5 = _context3.sent;
            (0, _context3.t4)(_context3.t5).to.be.equal(true);
            _context3.t6 = expect;
            _context3.next = 34;
            return regeneratorRuntime.awrap(web3.eth.getBalance(this.mock.address));

          case 34:
            _context3.t7 = _context3.sent;
            (0, _context3.t6)(_context3.t7).to.be.bignumber.equal('0');
            _context3.t8 = expect;
            _context3.next = 39;
            return regeneratorRuntime.awrap(web3.eth.getBalance(this.receiver.address));

          case 39:
            _context3.t9 = _context3.sent;
            _context3.t10 = value;
            (0, _context3.t8)(_context3.t9).to.be.bignumber.equal(_context3.t10);

          case 42:
          case "end":
            return _context3.stop();
        }
      }
    }, null, this);
  });
  it('Voting with params is properly supported', function _callee4() {
    var weight, tx, votes;
    return regeneratorRuntime.async(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.next = 2;
            return regeneratorRuntime.awrap(this.helper.propose({
              from: proposer
            }));

          case 2:
            _context4.next = 4;
            return regeneratorRuntime.awrap(this.helper.waitForSnapshot());

          case 4:
            weight = new BN(web3.utils.toWei('7')).sub(rawParams.uintParam);
            _context4.next = 7;
            return regeneratorRuntime.awrap(this.helper.vote({
              support: Enums.VoteType.For,
              reason: 'no particular reason',
              params: encodedParams
            }, {
              from: voter2
            }));

          case 7:
            tx = _context4.sent;
            expectEvent(tx, 'CountParams', _objectSpread({}, rawParams));
            expectEvent(tx, 'VoteCastWithParams', {
              voter: voter2,
              proposalId: this.proposal.id,
              support: Enums.VoteType.For,
              weight: weight,
              reason: 'no particular reason',
              params: encodedParams
            });
            _context4.next = 12;
            return regeneratorRuntime.awrap(this.mock.proposalVotes(this.proposal.id));

          case 12:
            votes = _context4.sent;
            expect(votes.forVotes).to.be.bignumber.equal(weight);

          case 14:
          case "end":
            return _context4.stop();
        }
      }
    }, null, this);
  });
  it('Voting with params by signature is properly supported', function _callee5() {
    var _this = this;

    var voterBySig, voterBySigAddress, signature, weight, tx, votes;
    return regeneratorRuntime.async(function _callee5$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            voterBySig = Wallet.generate();
            voterBySigAddress = web3.utils.toChecksumAddress(voterBySig.getAddressString());

            signature = function signature(message) {
              return regeneratorRuntime.async(function signature$(_context5) {
                while (1) {
                  switch (_context5.prev = _context5.next) {
                    case 0:
                      return _context5.abrupt("return", fromRpcSig(ethSigUtil.signTypedMessage(voterBySig.getPrivateKey(), {
                        data: {
                          types: {
                            EIP712Domain: EIP712Domain,
                            ExtendedBallot: [{
                              name: 'proposalId',
                              type: 'uint256'
                            }, {
                              name: 'support',
                              type: 'uint8'
                            }, {
                              name: 'reason',
                              type: 'string'
                            }, {
                              name: 'params',
                              type: 'bytes'
                            }]
                          },
                          domain: {
                            name: name,
                            version: version,
                            chainId: _this.chainId,
                            verifyingContract: _this.mock.address
                          },
                          primaryType: 'ExtendedBallot',
                          message: message
                        }
                      })));

                    case 1:
                    case "end":
                      return _context5.stop();
                  }
                }
              });
            };

            _context6.next = 5;
            return regeneratorRuntime.awrap(this.token.delegate(voterBySigAddress, {
              from: voter2
            }));

          case 5:
            _context6.next = 7;
            return regeneratorRuntime.awrap(this.helper.propose());

          case 7:
            _context6.next = 9;
            return regeneratorRuntime.awrap(this.helper.waitForSnapshot());

          case 9:
            weight = new BN(web3.utils.toWei('7')).sub(rawParams.uintParam);
            _context6.next = 12;
            return regeneratorRuntime.awrap(this.helper.vote({
              support: Enums.VoteType.For,
              reason: 'no particular reason',
              params: encodedParams,
              signature: signature
            }));

          case 12:
            tx = _context6.sent;
            expectEvent(tx, 'CountParams', _objectSpread({}, rawParams));
            expectEvent(tx, 'VoteCastWithParams', {
              voter: voterBySigAddress,
              proposalId: this.proposal.id,
              support: Enums.VoteType.For,
              weight: weight,
              reason: 'no particular reason',
              params: encodedParams
            });
            _context6.next = 17;
            return regeneratorRuntime.awrap(this.mock.proposalVotes(this.proposal.id));

          case 17:
            votes = _context6.sent;
            expect(votes.forVotes).to.be.bignumber.equal(weight);

          case 19:
          case "end":
            return _context6.stop();
        }
      }
    }, null, this);
  });
});