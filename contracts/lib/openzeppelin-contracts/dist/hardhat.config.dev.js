"use strict";

/// ENVVAR
// - CI:                output gas report to file instead of stdout
// - COVERAGE:          enable coverage report
// - ENABLE_GAS_REPORT: enable gas report
// - COMPILE_MODE:      production modes enables optimizations (default: development)
// - COMPILE_VERSION:   compiler version (default: 0.8.9)
// - COINMARKETCAP:     coinmarkercat api key for USD value in gas report
var fs = require('fs');

var path = require('path');

var argv = require('yargs/yargs')().env('').options({
  coverage: {
    type: 'boolean',
    "default": false
  },
  gas: {
    alias: 'enableGasReport',
    type: 'boolean',
    "default": false
  },
  gasReport: {
    alias: 'enableGasReportPath',
    type: 'string',
    implies: 'gas',
    "default": undefined
  },
  mode: {
    alias: 'compileMode',
    type: 'string',
    choices: ['production', 'development'],
    "default": 'development'
  },
  ir: {
    alias: 'enableIR',
    type: 'boolean',
    "default": false
  },
  compiler: {
    alias: 'compileVersion',
    type: 'string',
    "default": '0.8.13'
  },
  coinmarketcap: {
    alias: 'coinmarketcapApiKey',
    type: 'string'
  }
}).argv;

require('@nomiclabs/hardhat-truffle5');

require('hardhat-ignore-warnings');

require('solidity-docgen');

if (argv.gas) {
  require('hardhat-gas-reporter');
}

var _iteratorNormalCompletion = true;
var _didIteratorError = false;
var _iteratorError = undefined;

try {
  for (var _iterator = fs.readdirSync(path.join(__dirname, 'hardhat'))[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
    var f = _step.value;

    require(path.join(__dirname, 'hardhat', f));
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

var withOptimizations = argv.gas || argv.compileMode === 'production';
/**
 * @type import('hardhat/config').HardhatUserConfig
 */

module.exports = {
  solidity: {
    version: argv.compiler,
    settings: {
      optimizer: {
        enabled: withOptimizations,
        runs: 200
      },
      viaIR: withOptimizations && argv.ir
    }
  },
  warnings: {
    '*': {
      'code-size': withOptimizations,
      'unused-param': !argv.coverage,
      // coverage causes unused-param warnings
      "default": 'error'
    }
  },
  networks: {
    hardhat: {
      blockGasLimit: 10000000,
      allowUnlimitedContractSize: !withOptimizations
    }
  },
  gasReporter: {
    showMethodSig: true,
    currency: 'USD',
    outputFile: argv.gasReport,
    coinmarketcap: argv.coinmarketcap
  },
  docgen: require('./docs/config')
};

if (argv.coverage) {
  require('solidity-coverage');

  module.exports.networks.hardhat.initialBaseFeePerGas = 0;
}