export const symbol = Symbol.for('@libp2p/peer-discovery');
export function isPeerDiscovery(other) {
    return other != null && Boolean(other[symbol]);
}
//# sourceMappingURL=index.js.map