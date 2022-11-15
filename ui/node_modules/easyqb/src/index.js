const core = require('./lib-core')
const dialect = require('./dialect-postgres')

const a = core({ dialect });
a.from = undefined;
module.exports = a;
