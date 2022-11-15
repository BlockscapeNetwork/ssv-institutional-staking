export const symbol = Symbol.for('@libp2p/transport');
export function isTransport(other) {
    return other != null && Boolean(other[symbol]);
}
//# sourceMappingURL=index.js.map