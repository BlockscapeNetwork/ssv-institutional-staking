const { buildTaggedTemplate } = require('../lib-util')

const dateToYYYYMMDD = d => [
    d.getFullYear(),
    ('0' + (d.getMonth() + 1)).slice(-2),
    ('0' + d.getDate()).slice(-2)
].join('-');

const build = (ctx, arg) => {
    // compiled expression string
    if (arg.exp) return arg.exp
    // tagged template argument
    if (arg.tag) return buildTaggedTemplate(ctx, arg.tag)
    // expression, subquery or fragment argument
    return ctx.build(arg.arg)
}

const unaryPre = op => ({
    minArgs: 1,
    maxArgs: 1,
    build: (ctx, args) => `(${op} ${build(ctx, args[0])})`
})

const unaryPost = op => ({
    minArgs: 1,
    maxArgs: 1,
    build: (ctx, args) => `(${build(ctx, args[0])} ${op})`
})

const unaryFunction = op => ({
    minArgs: 1,
    maxArgs: 1,
    build: (ctx, args) => `${op}(${build(ctx, args[0])})`
})

const binary = op => ({
    minArgs: 2,
    maxArgs: 2,
    build: (ctx, args) => `(${build(ctx, args[0])} ${op} ${build(ctx, args[1])})`
})

const dateBinary = op => ({
    minArgs: 2,
    maxArgs: 2,
    build: (ctx, args) => {
        const inDate = args[1].arg;
        if (typeof inDate.getMonth === 'function') {
            args[1].arg = dateToYYYYMMDD(inDate);
        }
        return `date(${build(ctx, args[0])}, 'YYYY-MM-DD') ${op} ${build(ctx, args[1])}`
    }
})


const ternary = (op1, op2) => ({
    minArgs: 3,
    maxArgs: 3,
    build: (ctx, args) =>
        `(${build(ctx, args[0])} ${op1} ${build(ctx, args[1])} ${op2} ${build(
            ctx,
            args[2]
        )})`
})

const nary = op => ({
    minArgs: 1,
    maxArgs: Number.MAX_SAFE_INTEGER,
    build: (ctx, args) => {
        if (args.length === 1) return build(ctx, args[0])
        let txt = '('
        for (let i = 0; i < args.length; ++i) {
            if (i !== 0) txt += ` ${op} `
            txt += build(ctx, args[i])
        }
        return txt + ')'
    }
})

const naryFunction = fn => ({
    minArgs: 1,
    maxArgs: Number.MAX_SAFE_INTEGER,
    build: (ctx, args) => {
        let txt = `${fn}(`
        for (let i = 0; i < args.length; ++i) {
            if (i !== 0) txt += `, `
            txt += build(ctx, args[i])
        }
        return txt + ')'
    }
})

const oneValue = {
    minArgs: 1,
    maxArgs: 1,
    build: (ctx, args) => build(ctx, args[0])
}

const compositeValue = {
    minArgs: 1,
    maxArgs: Number.MAX_SAFE_INTEGER,
    build: (ctx, args) => {
        if (args.length === 1) return build(ctx, args[0])
        let txt = ''
        for (let i = 0; i < args.length; ++i) {
            if (i !== 0) txt += ', '
            txt += build(ctx, args[i])
        }
        return args.length > 1 ? `(${txt})` : txt
    }
}

const buildValuesList = (ctx, values) => {
    if (values.length === 0) throw Error('Error: .in operation values list empty')
    let txt = '('
    for (let i = 0; i < values.length; ++i) {
        if (i !== 0) txt += ', '
        txt += ctx.build(values[i])
    }
    return txt + ')'
}

const membership = op => ({
    minArgs: 2,
    maxArgs: 2,
    build: (ctx, [arg1, arg2]) =>
        `(${build(ctx, arg1)} ${op} ${Array.isArray(arg2.arg)
            ? buildValuesList(ctx, arg2.arg)
            : build(ctx, arg2)
        })`
})

const quantifiedComparison = op => ({
    minArgs: 2,
    maxArgs: 2,
    build: (ctx, args) => `(${build(ctx, args[0])} ${op}(${build(ctx, args[1])}))`
})

module.exports = {
    build,
    unaryFunction,
    unaryPre,
    unaryPost,
    binary,
    ternary,
    nary,
    naryFunction,
    oneValue,
    compositeValue,
    membership,
    quantifiedComparison,
    dateBinary
}
