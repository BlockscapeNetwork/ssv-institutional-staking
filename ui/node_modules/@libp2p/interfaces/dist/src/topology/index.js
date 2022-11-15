export const symbol = Symbol.for('@libp2p/topology');
export function isTopology(other) {
    return other != null && Boolean(other[symbol]);
}
//# sourceMappingURL=index.js.map