const createNewContext = require('./context')
const createQueryBuilder = ({ defaultContext, query, e, config }) => {
    const { queries, methods, properties } = query
    const newContext = createNewContext(defaultContext)
    const reducers = createReducers(methods)
    const updateContext = applyReducers(reducers)
    reducers.extend = (ctx, args) => {
        const arr = Array.isArray(args[0]) ? args[0] : args
        for (let i = 0; i < arr.length; ++i) {
            updateContext(arr[i].method, ctx)
        }
    }
    const builder = () => { } // must not be object literal
    const chain = createChain(builder)

    const executeProperties = {
        one: {
            value: async function () {
                const ret = await config.oneCallback(this.query, config.tableName, config.userAssociatedRecordsOnly)
                return ret;
            }
        },
        all: {
            value: async function () {
                const ret = await config.allCallback(this.query, config.tableName, config.userAssociatedRecordsOnly)
                return ret;
            }
        },
        _tableName: {
            get: function () {
                return config.tableName
            }
        }
    }

    // EasyQB no access to from
    const _methodProperties = methodProperties({ methods, chain });
    delete _methodProperties.from;

    Object.defineProperties(builder, {
        ...builderProperties({ chain, newContext, updateContext, queries }),
        ..._methodProperties,
        ...executeProperties,
        ...properties,
        e: {
            value: e
        }
    })
    return chain()
}

/** Creates a new builder instance */
const createChain = prototype => {
    const chain = method => {
        const fn = (...args) => chain({ name: 'express', args, prev: method })
        fn.method = method
        Object.setPrototypeOf(fn, prototype)
        return fn
    }
    return chain
}

/** Creates an object containing all method reducers */
const createReducers = methods => {
    const reducers = {}
    for (const name in methods) {
        const { updateContext, properties = {} } = methods[name]
        reducers[name] = updateContext
        // some methods have subproperties, e.g. .unionAll
        for (const key in properties) {
            reducers[`${name}.${key}`] = properties[key]
        }
    }
    return reducers
}

/** Follows a method chain, applying each method's reducer, to ctx */
const applyReducers = reducers => (method, ctx) => {
    // follow method links to construct methods array (in reverse)
    const methods = []
    for (; method !== undefined; method = method.prev) {
        methods.push(method)
    }
    // build methods object by processing methods in call order
    const express = { id: 0 }
    for (let i = methods.length - 1; i >= 0; --i) {
        const method = methods[i]
        reducers[method.name](ctx, method.args, express)
    }
    return ctx
}

/** Default properties of all SQL Query Builders */
const builderProperties = ({ newContext, updateContext, queries }) => ({
    _build: {
        value: function (inheritedContext) {
            const ctx = updateContext(this.method, newContext(inheritedContext))
            return queries[ctx.type](ctx)
        }
    },
    query: {
        get: function () {
            return this._build()
        }
    },
    unparameterized: {
        get: function () {
            return this._build({ unparameterized: true }).text
        }
    }
})

/** Builds object containing a property for every query building method */
const methodProperties = ({ methods, chain }) => {
    const properties = {}
    for (const name in methods) {
        const { getter } = methods[name]
        if (getter) {
            // add getter methods
            properties[name] = {
                get: function () {
                    return chain({ name, prev: this.method })
                }
            }
        } else {
            // add function call methods
            properties[name] = {
                value: function (...args) {
                    return chain({ name, args, prev: this.method })
                }
            }
        }
    }
    return properties
}

module.exports = createQueryBuilder