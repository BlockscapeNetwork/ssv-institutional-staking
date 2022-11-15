import type { PeerInfo } from '../peer-info/index.js';
import type { EventEmitter } from '../events.js';
export declare const symbol: unique symbol;
export interface PeerDiscoveryEvents {
    'peer': CustomEvent<PeerInfo>;
}
export interface PeerDiscovery extends EventEmitter<PeerDiscoveryEvents> {
    /**
     * Used to identify the peer discovery mechanism
     */
    [Symbol.toStringTag]: string;
    /**
     * Used by the isPeerDiscovery function
     */
    [symbol]: true;
}
export declare function isPeerDiscovery(other: any): other is PeerDiscovery;
//# sourceMappingURL=index.d.ts.map