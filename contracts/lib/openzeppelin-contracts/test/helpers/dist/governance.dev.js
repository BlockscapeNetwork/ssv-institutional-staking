"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

var _require = require('@openzeppelin/test-helpers'),
    time = _require.time;

function zip() {
  for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  return Array(Math.max.apply(Math, _toConsumableArray(args.map(function (array) {
    return array.length;
  })))).fill().map(function (_, i) {
    return args.map(function (array) {
      return array[i];
    });
  });
}

function concatHex() {
  var _ref;

  for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
    args[_key2] = arguments[_key2];
  }

  return web3.utils.bytesToHex((_ref = []).concat.apply(_ref, _toConsumableArray(args.map(function (h) {
    return web3.utils.hexToBytes(h || '0x');
  }))));
}

function concatOpts(args) {
  var opts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
  return opts ? args.concat(opts) : args;
}

var GovernorHelper =
/*#__PURE__*/
function () {
  function GovernorHelper(governor) {
    _classCallCheck(this, GovernorHelper);

    this.governor = governor;
  }

  _createClass(GovernorHelper, [{
    key: "delegate",
    value: function delegate() {
      var _delegation$token;

      var delegation = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var opts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
      return Promise.all([delegation.token.delegate(delegation.to, {
        from: delegation.to
      }), delegation.value && (_delegation$token = delegation.token).transfer.apply(_delegation$token, _toConsumableArray(concatOpts([delegation.to, delegation.value])).concat([opts])), delegation.tokenId && delegation.token.ownerOf(delegation.tokenId).then(function (owner) {
        var _delegation$token2;

        return (_delegation$token2 = delegation.token).transferFrom.apply(_delegation$token2, _toConsumableArray(concatOpts([owner, delegation.to, delegation.tokenId], opts)));
      })]);
    }
  }, {
    key: "propose",
    value: function propose() {
      var _this$governor$method;

      var opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
      var proposal = this.currentProposal;
      return (_this$governor$method = this.governor.methods)[proposal.useCompatibilityInterface ? 'propose(address[],uint256[],string[],bytes[],string)' : 'propose(address[],uint256[],bytes[],string)'].apply(_this$governor$method, _toConsumableArray(concatOpts(proposal.fullProposal, opts)));
    }
  }, {
    key: "queue",
    value: function queue() {
      var _this$governor$method2, _this$governor$method3;

      var opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
      var proposal = this.currentProposal;
      return proposal.useCompatibilityInterface ? (_this$governor$method2 = this.governor.methods)['queue(uint256)'].apply(_this$governor$method2, _toConsumableArray(concatOpts([proposal.id], opts))) : (_this$governor$method3 = this.governor.methods)['queue(address[],uint256[],bytes[],bytes32)'].apply(_this$governor$method3, _toConsumableArray(concatOpts(proposal.shortProposal, opts)));
    }
  }, {
    key: "execute",
    value: function execute() {
      var _this$governor$method4, _this$governor$method5;

      var opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
      var proposal = this.currentProposal;
      return proposal.useCompatibilityInterface ? (_this$governor$method4 = this.governor.methods)['execute(uint256)'].apply(_this$governor$method4, _toConsumableArray(concatOpts([proposal.id], opts))) : (_this$governor$method5 = this.governor.methods)['execute(address[],uint256[],bytes[],bytes32)'].apply(_this$governor$method5, _toConsumableArray(concatOpts(proposal.shortProposal, opts)));
    }
  }, {
    key: "cancel",
    value: function cancel() {
      var _this$governor$method6, _this$governor$method7;

      var opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
      var proposal = this.currentProposal;
      return proposal.useCompatibilityInterface ? (_this$governor$method6 = this.governor.methods)['cancel(uint256)'].apply(_this$governor$method6, _toConsumableArray(concatOpts([proposal.id], opts))) : (_this$governor$method7 = this.governor.methods)['cancel(address[],uint256[],bytes[],bytes32)'].apply(_this$governor$method7, _toConsumableArray(concatOpts(proposal.shortProposal, opts)));
    }
  }, {
    key: "vote",
    value: function vote() {
      var _this = this,
          _this$governor3,
          _this$governor4,
          _this$governor5;

      var _vote = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      var opts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
      var proposal = this.currentProposal;
      return _vote.signature // if signature, and either params or reason →
      ? _vote.params || _vote.reason ? _vote.signature({
        proposalId: proposal.id,
        support: _vote.support,
        reason: _vote.reason || '',
        params: _vote.params || ''
      }).then(function (_ref2) {
        var _this$governor;

        var v = _ref2.v,
            r = _ref2.r,
            s = _ref2.s;
        return (_this$governor = _this.governor).castVoteWithReasonAndParamsBySig.apply(_this$governor, _toConsumableArray(concatOpts([proposal.id, _vote.support, _vote.reason || '', _vote.params || '', v, r, s], opts)));
      }) : _vote.signature({
        proposalId: proposal.id,
        support: _vote.support
      }).then(function (_ref3) {
        var _this$governor2;

        var v = _ref3.v,
            r = _ref3.r,
            s = _ref3.s;
        return (_this$governor2 = _this.governor).castVoteBySig.apply(_this$governor2, _toConsumableArray(concatOpts([proposal.id, _vote.support, v, r, s], opts)));
      }) : _vote.params // otherwise if params
      ? (_this$governor3 = this.governor).castVoteWithReasonAndParams.apply(_this$governor3, _toConsumableArray(concatOpts([proposal.id, _vote.support, _vote.reason || '', _vote.params], opts))) : _vote.reason // otherwise if reason
      ? (_this$governor4 = this.governor).castVoteWithReason.apply(_this$governor4, _toConsumableArray(concatOpts([proposal.id, _vote.support, _vote.reason], opts))) : (_this$governor5 = this.governor).castVote.apply(_this$governor5, _toConsumableArray(concatOpts([proposal.id, _vote.support], opts)));
    }
  }, {
    key: "waitForSnapshot",
    value: function waitForSnapshot() {
      var offset = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
      var proposal = this.currentProposal;
      return this.governor.proposalSnapshot(proposal.id).then(function (blockNumber) {
        return time.advanceBlockTo(blockNumber.addn(offset));
      });
    }
  }, {
    key: "waitForDeadline",
    value: function waitForDeadline() {
      var offset = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
      var proposal = this.currentProposal;
      return this.governor.proposalDeadline(proposal.id).then(function (blockNumber) {
        return time.advanceBlockTo(blockNumber.addn(offset));
      });
    }
  }, {
    key: "waitForEta",
    value: function waitForEta() {
      var offset = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
      var proposal = this.currentProposal;
      return this.governor.proposalEta(proposal.id).then(function (timestamp) {
        return time.increaseTo(timestamp.addn(offset));
      });
    }
    /**
     * Specify a proposal either as
     * 1) an array of objects [{ target, value, data, signature? }]
     * 2) an object of arrays { targets: [], values: [], data: [], signatures?: [] }
     */

  }, {
    key: "setProposal",
    value: function setProposal(actions, description) {
      var targets, values, signatures, data, useCompatibilityInterface;

      if (Array.isArray(actions)) {
        useCompatibilityInterface = actions.some(function (a) {
          return 'signature' in a;
        });
        targets = actions.map(function (a) {
          return a.target;
        });
        values = actions.map(function (a) {
          return a.value || '0';
        });
        signatures = actions.map(function (a) {
          return a.signature || '';
        });
        data = actions.map(function (a) {
          return a.data || '0x';
        });
      } else {
        useCompatibilityInterface = Array.isArray(actions.signatures);
        targets = actions.targets;
        values = actions.values;
        var _actions$signatures = actions.signatures;
        signatures = _actions$signatures === void 0 ? [] : _actions$signatures;
        data = actions.data;
      }

      var fulldata = zip(signatures.map(function (s) {
        return s && web3.eth.abi.encodeFunctionSignature(s);
      }), data).map(function (hexs) {
        return concatHex.apply(void 0, _toConsumableArray(hexs));
      });
      var descriptionHash = web3.utils.keccak256(description); // condensed version for queueing end executing

      var shortProposal = [targets, values, fulldata, descriptionHash]; // full version for proposing

      var fullProposal = [targets, values].concat(_toConsumableArray(useCompatibilityInterface ? [signatures] : []), [data, description]); // proposal id

      var id = web3.utils.toBN(web3.utils.keccak256(web3.eth.abi.encodeParameters(['address[]', 'uint256[]', 'bytes[]', 'bytes32'], shortProposal)));
      this.currentProposal = {
        id: id,
        targets: targets,
        values: values,
        signatures: signatures,
        data: data,
        fulldata: fulldata,
        description: description,
        descriptionHash: descriptionHash,
        shortProposal: shortProposal,
        fullProposal: fullProposal,
        useCompatibilityInterface: useCompatibilityInterface
      };
      return this.currentProposal;
    }
  }]);

  return GovernorHelper;
}();

module.exports = {
  GovernorHelper: GovernorHelper
};