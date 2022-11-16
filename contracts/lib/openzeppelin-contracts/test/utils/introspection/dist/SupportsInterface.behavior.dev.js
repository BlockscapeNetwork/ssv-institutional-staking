"use strict";

var _require = require('@openzeppelin/test-helpers'),
    makeInterfaceId = _require.makeInterfaceId;

var _require2 = require('chai'),
    expect = _require2.expect;

var INTERFACES = {
  ERC165: ['supportsInterface(bytes4)'],
  ERC721: ['balanceOf(address)', 'ownerOf(uint256)', 'approve(address,uint256)', 'getApproved(uint256)', 'setApprovalForAll(address,bool)', 'isApprovedForAll(address,address)', 'transferFrom(address,address,uint256)', 'safeTransferFrom(address,address,uint256)', 'safeTransferFrom(address,address,uint256,bytes)'],
  ERC721Enumerable: ['totalSupply()', 'tokenOfOwnerByIndex(address,uint256)', 'tokenByIndex(uint256)'],
  ERC721Metadata: ['name()', 'symbol()', 'tokenURI(uint256)'],
  ERC1155: ['balanceOf(address,uint256)', 'balanceOfBatch(address[],uint256[])', 'setApprovalForAll(address,bool)', 'isApprovedForAll(address,address)', 'safeTransferFrom(address,address,uint256,uint256,bytes)', 'safeBatchTransferFrom(address,address,uint256[],uint256[],bytes)'],
  ERC1155Receiver: ['onERC1155Received(address,address,uint256,uint256,bytes)', 'onERC1155BatchReceived(address,address,uint256[],uint256[],bytes)'],
  AccessControl: ['hasRole(bytes32,address)', 'getRoleAdmin(bytes32)', 'grantRole(bytes32,address)', 'revokeRole(bytes32,address)', 'renounceRole(bytes32,address)'],
  AccessControlEnumerable: ['getRoleMember(bytes32,uint256)', 'getRoleMemberCount(bytes32)'],
  Governor: ['name()', 'version()', 'COUNTING_MODE()', 'hashProposal(address[],uint256[],bytes[],bytes32)', 'state(uint256)', 'proposalSnapshot(uint256)', 'proposalDeadline(uint256)', 'votingDelay()', 'votingPeriod()', 'quorum(uint256)', 'getVotes(address,uint256)', 'hasVoted(uint256,address)', 'propose(address[],uint256[],bytes[],string)', 'execute(address[],uint256[],bytes[],bytes32)', 'castVote(uint256,uint8)', 'castVoteWithReason(uint256,uint8,string)', 'castVoteBySig(uint256,uint8,uint8,bytes32,bytes32)'],
  GovernorWithParams: ['name()', 'version()', 'COUNTING_MODE()', 'hashProposal(address[],uint256[],bytes[],bytes32)', 'state(uint256)', 'proposalSnapshot(uint256)', 'proposalDeadline(uint256)', 'votingDelay()', 'votingPeriod()', 'quorum(uint256)', 'getVotes(address,uint256)', 'getVotesWithParams(address,uint256,bytes)', 'hasVoted(uint256,address)', 'propose(address[],uint256[],bytes[],string)', 'execute(address[],uint256[],bytes[],bytes32)', 'castVote(uint256,uint8)', 'castVoteWithReason(uint256,uint8,string)', 'castVoteWithReasonAndParams(uint256,uint8,string,bytes)', 'castVoteBySig(uint256,uint8,uint8,bytes32,bytes32)', 'castVoteWithReasonAndParamsBySig(uint256,uint8,string,bytes,uint8,bytes32,bytes32)'],
  GovernorTimelock: ['timelock()', 'proposalEta(uint256)', 'queue(address[],uint256[],bytes[],bytes32)'],
  ERC2981: ['royaltyInfo(uint256,uint256)']
};
var INTERFACE_IDS = {};
var FN_SIGNATURES = {};
var _iteratorNormalCompletion = true;
var _didIteratorError = false;
var _iteratorError = undefined;

try {
  for (var _iterator = Object.getOwnPropertyNames(INTERFACES)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
    var k = _step.value;
    INTERFACE_IDS[k] = makeInterfaceId.ERC165(INTERFACES[k]);
    var _iteratorNormalCompletion6 = true;
    var _didIteratorError6 = false;
    var _iteratorError6 = undefined;

    try {
      for (var _iterator6 = INTERFACES[k][Symbol.iterator](), _step6; !(_iteratorNormalCompletion6 = (_step6 = _iterator6.next()).done); _iteratorNormalCompletion6 = true) {
        var fnName = _step6.value;
        // the interface id of a single function is equivalent to its function signature
        FN_SIGNATURES[fnName] = makeInterfaceId.ERC165([fnName]);
      }
    } catch (err) {
      _didIteratorError6 = true;
      _iteratorError6 = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion6 && _iterator6["return"] != null) {
          _iterator6["return"]();
        }
      } finally {
        if (_didIteratorError6) {
          throw _iteratorError6;
        }
      }
    }
  }
} catch (err) {
  _didIteratorError = true;
  _iteratorError = err;
} finally {
  try {
    if (!_iteratorNormalCompletion && _iterator["return"] != null) {
      _iterator["return"]();
    }
  } finally {
    if (_didIteratorError) {
      throw _iteratorError;
    }
  }
}

function shouldSupportInterfaces() {
  var interfaces = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  describe('ERC165', function () {
    beforeEach(function () {
      this.contractUnderTest = this.mock || this.token || this.holder || this.accessControl;
    });
    it('supportsInterface uses less than 30k gas', function _callee() {
      var _iteratorNormalCompletion2, _didIteratorError2, _iteratorError2, _iterator2, _step2, k, interfaceId;

      return regeneratorRuntime.async(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _iteratorNormalCompletion2 = true;
              _didIteratorError2 = false;
              _iteratorError2 = undefined;
              _context.prev = 3;
              _iterator2 = interfaces[Symbol.iterator]();

            case 5:
              if (_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done) {
                _context.next = 16;
                break;
              }

              k = _step2.value;
              interfaceId = INTERFACE_IDS[k];
              _context.t0 = expect;
              _context.next = 11;
              return regeneratorRuntime.awrap(this.contractUnderTest.supportsInterface.estimateGas(interfaceId));

            case 11:
              _context.t1 = _context.sent;
              (0, _context.t0)(_context.t1).to.be.lte(30000);

            case 13:
              _iteratorNormalCompletion2 = true;
              _context.next = 5;
              break;

            case 16:
              _context.next = 22;
              break;

            case 18:
              _context.prev = 18;
              _context.t2 = _context["catch"](3);
              _didIteratorError2 = true;
              _iteratorError2 = _context.t2;

            case 22:
              _context.prev = 22;
              _context.prev = 23;

              if (!_iteratorNormalCompletion2 && _iterator2["return"] != null) {
                _iterator2["return"]();
              }

            case 25:
              _context.prev = 25;

              if (!_didIteratorError2) {
                _context.next = 28;
                break;
              }

              throw _iteratorError2;

            case 28:
              return _context.finish(25);

            case 29:
              return _context.finish(22);

            case 30:
            case "end":
              return _context.stop();
          }
        }
      }, null, this, [[3, 18, 22, 30], [23,, 25, 29]]);
    });
    it('all interfaces are reported as supported', function _callee2() {
      var _iteratorNormalCompletion3, _didIteratorError3, _iteratorError3, _iterator3, _step3, k, interfaceId;

      return regeneratorRuntime.async(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _iteratorNormalCompletion3 = true;
              _didIteratorError3 = false;
              _iteratorError3 = undefined;
              _context2.prev = 3;
              _iterator3 = interfaces[Symbol.iterator]();

            case 5:
              if (_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done) {
                _context2.next = 16;
                break;
              }

              k = _step3.value;
              interfaceId = INTERFACE_IDS[k];
              _context2.t0 = expect;
              _context2.next = 11;
              return regeneratorRuntime.awrap(this.contractUnderTest.supportsInterface(interfaceId));

            case 11:
              _context2.t1 = _context2.sent;
              (0, _context2.t0)(_context2.t1).to.equal(true);

            case 13:
              _iteratorNormalCompletion3 = true;
              _context2.next = 5;
              break;

            case 16:
              _context2.next = 22;
              break;

            case 18:
              _context2.prev = 18;
              _context2.t2 = _context2["catch"](3);
              _didIteratorError3 = true;
              _iteratorError3 = _context2.t2;

            case 22:
              _context2.prev = 22;
              _context2.prev = 23;

              if (!_iteratorNormalCompletion3 && _iterator3["return"] != null) {
                _iterator3["return"]();
              }

            case 25:
              _context2.prev = 25;

              if (!_didIteratorError3) {
                _context2.next = 28;
                break;
              }

              throw _iteratorError3;

            case 28:
              return _context2.finish(25);

            case 29:
              return _context2.finish(22);

            case 30:
            case "end":
              return _context2.stop();
          }
        }
      }, null, this, [[3, 18, 22, 30], [23,, 25, 29]]);
    });
    it('all interface functions are in ABI', function _callee3() {
      var _this = this;

      var _iteratorNormalCompletion4, _didIteratorError4, _iteratorError4, _iterator4, _step4, k, _iteratorNormalCompletion5, _didIteratorError5, _iteratorError5, _loop, _iterator5, _step5;

      return regeneratorRuntime.async(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _iteratorNormalCompletion4 = true;
              _didIteratorError4 = false;
              _iteratorError4 = undefined;
              _context3.prev = 3;
              _iterator4 = interfaces[Symbol.iterator]();

            case 5:
              if (_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done) {
                _context3.next = 30;
                break;
              }

              k = _step4.value;
              _iteratorNormalCompletion5 = true;
              _didIteratorError5 = false;
              _iteratorError5 = undefined;
              _context3.prev = 10;

              _loop = function _loop() {
                var fnName = _step5.value;
                var fnSig = FN_SIGNATURES[fnName];
                expect(_this.contractUnderTest.abi.filter(function (fn) {
                  return fn.signature === fnSig;
                }).length).to.equal(1);
              };

              for (_iterator5 = INTERFACES[k][Symbol.iterator](); !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
                _loop();
              }

              _context3.next = 19;
              break;

            case 15:
              _context3.prev = 15;
              _context3.t0 = _context3["catch"](10);
              _didIteratorError5 = true;
              _iteratorError5 = _context3.t0;

            case 19:
              _context3.prev = 19;
              _context3.prev = 20;

              if (!_iteratorNormalCompletion5 && _iterator5["return"] != null) {
                _iterator5["return"]();
              }

            case 22:
              _context3.prev = 22;

              if (!_didIteratorError5) {
                _context3.next = 25;
                break;
              }

              throw _iteratorError5;

            case 25:
              return _context3.finish(22);

            case 26:
              return _context3.finish(19);

            case 27:
              _iteratorNormalCompletion4 = true;
              _context3.next = 5;
              break;

            case 30:
              _context3.next = 36;
              break;

            case 32:
              _context3.prev = 32;
              _context3.t1 = _context3["catch"](3);
              _didIteratorError4 = true;
              _iteratorError4 = _context3.t1;

            case 36:
              _context3.prev = 36;
              _context3.prev = 37;

              if (!_iteratorNormalCompletion4 && _iterator4["return"] != null) {
                _iterator4["return"]();
              }

            case 39:
              _context3.prev = 39;

              if (!_didIteratorError4) {
                _context3.next = 42;
                break;
              }

              throw _iteratorError4;

            case 42:
              return _context3.finish(39);

            case 43:
              return _context3.finish(36);

            case 44:
            case "end":
              return _context3.stop();
          }
        }
      }, null, null, [[3, 32, 36, 44], [10, 15, 19, 27], [20,, 22, 26], [37,, 39, 43]]);
    });
  });
}

module.exports = {
  shouldSupportInterfaces: shouldSupportInterfaces
};