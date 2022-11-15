// included to mitigate cost of case conversion
const memoize = fn => {
  const cache = {}
  return key => cache[key] || (cache[key] = fn(key))
}

const normalKey = given_key => given_key.indexOf('(') === -1 ? given_key.toLowerCase().trim().replace(/ /g, '_') : given_key;

module.exports = {
  memoize,
  normalKey
}