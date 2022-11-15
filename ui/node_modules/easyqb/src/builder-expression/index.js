const createExpressionCompiler = require('./compile')
const { normalKey } = require('../lib-util');

const aggregator = (op) => (columnName) => `${op}(${normalKey(columnName)})`;

module.exports = ({ defaultContext, expression }) => {
  const { expressions } = expression
  const newContext = createNewContext(defaultContext)
  const compile = createExpressionCompiler(expressions)
  const builder = () => {} // must not be object literal
  const chain = createChain(builder)
  Object.defineProperties(builder, {
    ...builderProperties({ compile, newContext }),
    ...methodProperties({ expressions, chain }),
  })
  const ret = chain();
  ret.max = aggregator('max');
  ret.min = aggregator('min');
  ret.avg = aggregator('avg');
  ret.count = aggregator('count');
  ret.sum = aggregator('sum');
  return ret;
}

const builderProperties = ({ compile, newContext }) => ({
  _build: {
    value: function(inherit) {
      return compile(newContext(inherit), this.current)
    }
  },
  query: {
    get: function() {
      return this._build()
    }
  },
  unparameterized: {
    get: function() {
      return this._build({ unparameterized: true }).text
    }
  }
})

const createNewContext = defaultContext => {
  const { build, parameterize, escape, mapKey } = defaultContext
  return inherit => {
    const { params = [], unparameterized = false } = inherit || {}
    return {
      // EasyQB instance properties
      build,
      parameterize,
      escape,
      mapKey,

      // inherited properties
      params,
      unparameterized
    }
  }
}

const createChain = prototype => {
  const chain = current => {
    const fn = (...args) => chain({ prev: current, args })
    fn.current = current
    Object.setPrototypeOf(fn, prototype)
    return fn
  }
  return chain
}

const methodProperties = ({ expressions, chain }) => {
  const properties = {}
  for (const name in expressions) {
    properties[name] = {
      get: function() {
        return chain({ prev: this.current, name })
      }
    }
  }
  return properties
}
