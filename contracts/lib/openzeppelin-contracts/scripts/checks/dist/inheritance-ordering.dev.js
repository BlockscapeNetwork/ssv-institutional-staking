#!/usr/bin/env node
"use strict";

var path = require('path');

var graphlib = require('graphlib');

var _require = require('solidity-ast/utils'),
    findAll = _require.findAll;

var artifacts = require('yargs').argv._;

var _iteratorNormalCompletion = true;
var _didIteratorError = false;
var _iteratorError = undefined;

try {
  var _loop = function _loop() {
    var artifact = _step.value;

    var _require2 = require(path.resolve(__dirname, '../..', artifact)),
        solcOutput = _require2.output;

    var graph = new graphlib.Graph({
      directed: true
    });
    var names = {};
    var linearized = [];

    for (var source in solcOutput.contracts) {
      if (source.includes('/mocks/')) {
        continue;
      }

      var _iteratorNormalCompletion2 = true;
      var _didIteratorError2 = false;
      var _iteratorError2 = undefined;

      try {
        for (var _iterator2 = findAll('ContractDefinition', solcOutput.sources[source].ast)[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
          var contractDef = _step2.value;
          names[contractDef.id] = contractDef.name;
          linearized.push(contractDef.linearizedBaseContracts);
          contractDef.linearizedBaseContracts.forEach(function (c1, i, contracts) {
            return contracts.slice(i + 1).forEach(function (c2) {
              graph.setEdge(c1, c2);
            });
          });
        }
      } catch (err) {
        _didIteratorError2 = true;
        _iteratorError2 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion2 && _iterator2["return"] != null) {
            _iterator2["return"]();
          }
        } finally {
          if (_didIteratorError2) {
            throw _iteratorError2;
          }
        }
      }
    } /// graphlib.alg.findCycles will not find minimal cycles.
    /// We are only interested int cycles of lengths 2 (needs proof)


    graph.nodes().forEach(function (x, i, nodes) {
      return nodes.slice(i + 1).filter(function (y) {
        return graph.hasEdge(x, y) && graph.hasEdge(y, x);
      }).forEach(function (y) {
        console.log("Conflict between ".concat(names[x], " and ").concat(names[y], " detected in the following dependency chains:"));
        linearized.filter(function (chain) {
          return chain.includes(parseInt(x)) && chain.includes(parseInt(y));
        }).forEach(function (chain) {
          var comp = chain.indexOf(parseInt(x)) < chain.indexOf(parseInt(y)) ? '>' : '<';
          console.log("- ".concat(names[x], " ").concat(comp, " ").concat(names[y], " in ").concat(names[chain.find(Boolean)])); // console.log(`- ${names[x]} ${comp} ${names[y]}: ${chain.reverse().map(id => names[id]).join(', ')}`);
        });
        process.exitCode = 1;
      });
    });
  };

  for (var _iterator = artifacts[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
    _loop();
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

if (!process.exitCode) {
  console.log('Contract ordering is consistent.');
}