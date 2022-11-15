import type { PeerId } from '../peer-id/index.js';
import type { CID } from 'multiformats/cid';
import type { PeerInfo } from '../peer-info/index.js';
import type { AbortOptions } from '../index.js';
import type { PeerDiscovery } from '../peer-discovery/index.js';
/**
 * The types of events emitted during DHT queries
 */
export declare enum EventTypes {
    SENDING_QUERY = 0,
    PEER_RESPONSE = 1,
    FINAL_PEER = 2,
    QUERY_ERROR = 3,
    PROVIDER = 4,
    VALUE = 5,
    ADDING_PEER = 6,
    DIALING_PEER = 7
}
/**
 * The types of messages sent to peers during DHT queries
 */
export declare enum MessageType {
    PUT_VALUE = 0,
    GET_VALUE = 1,
    ADD_PROVIDER = 2,
    GET_PROVIDERS = 3,
    FIND_NODE = 4,
    PING = 5
}
export declare type MessageName = keyof typeof MessageType;
export interface DHTRecord {
    key: Uint8Array;
    value: Uint8Array;
    timeReceived?: Date;
}
export interface QueryOptions extends AbortOptions {
    queryFuncTimeout?: number;
}
/**
 * Emitted when sending queries to remote peers
 */
export interface SendingQueryEvent {
    to: PeerId;
    type: EventTypes.SENDING_QUERY;
    name: 'SENDING_QUERY';
    messageName: keyof typeof MessageType;
    messageType: MessageType;
}
/**
 * Emitted when query responses are received form remote peers.  Depending on the query
 * these events may be followed by a `FinalPeerEvent`, a `ValueEvent` or a `ProviderEvent`.
 */
export interface PeerResponseEvent {
    from: PeerId;
    type: EventTypes.PEER_RESPONSE;
    name: 'PEER_RESPONSE';
    messageName: keyof typeof MessageType;
    messageType: MessageType;
    closer: PeerInfo[];
    providers: PeerInfo[];
    record?: DHTRecord;
}
/**
 * Emitted at the end of a `findPeer` query
 */
export interface FinalPeerEvent {
    from: PeerId;
    peer: PeerInfo;
    type: EventTypes.FINAL_PEER;
    name: 'FINAL_PEER';
}
/**
 * Something went wrong with the query
 */
export interface QueryErrorEvent {
    from: PeerId;
    type: EventTypes.QUERY_ERROR;
    name: 'QUERY_ERROR';
    error: Error;
}
/**
 * Emitted when providers are found
 */
export interface ProviderEvent {
    from: PeerId;
    type: EventTypes.PROVIDER;
    name: 'PROVIDER';
    providers: PeerInfo[];
}
/**
 * Emitted when values are found
 */
export interface ValueEvent {
    from: PeerId;
    type: EventTypes.VALUE;
    name: 'VALUE';
    value: Uint8Array;
}
/**
 * Emitted when peers are added to a query
 */
export interface AddingPeerEvent {
    type: EventTypes.ADDING_PEER;
    name: 'ADDING_PEER';
    peer: PeerId;
}
/**
 * Emitted when peers are dialled as part of a query
 */
export interface DialingPeerEvent {
    peer: PeerId;
    type: EventTypes.DIALING_PEER;
    name: 'DIALING_PEER';
}
export declare type QueryEvent = SendingQueryEvent | PeerResponseEvent | FinalPeerEvent | QueryErrorEvent | ProviderEvent | ValueEvent | AddingPeerEvent | DialingPeerEvent;
export interface RoutingTable {
    size: number;
}
export interface DHT extends PeerDiscovery {
    /**
     * Get a value from the DHT, the final ValueEvent will be the best value
     */
    get: (key: Uint8Array, options?: QueryOptions) => AsyncIterable<QueryEvent>;
    /**
     * Find providers of a given CID
     */
    findProviders: (key: CID, options?: QueryOptions) => AsyncIterable<QueryEvent>;
    /**
     * Find a peer on the DHT
     */
    findPeer: (id: PeerId, options?: QueryOptions) => AsyncIterable<QueryEvent>;
    /**
     * Find the closest peers to the passed key
     */
    getClosestPeers: (key: Uint8Array, options?: QueryOptions) => AsyncIterable<QueryEvent>;
    /**
     * Store provider records for the passed CID on the DHT pointing to us
     */
    provide: (key: CID, options?: QueryOptions) => AsyncIterable<QueryEvent>;
    /**
     * Store the passed value under the passed key on the DHT
     */
    put: (key: Uint8Array, value: Uint8Array, options?: QueryOptions) => AsyncIterable<QueryEvent>;
    /**
     * Returns the mode this node is in
     */
    getMode: () => Promise<'client' | 'server'>;
    /**
     * If 'server' this node will respond to DHT queries, if 'client' this node will not
     */
    setMode: (mode: 'client' | 'server') => Promise<void>;
    /**
     * Force a routing table refresh
     */
    refreshRoutingTable: () => Promise<void>;
}
export interface SingleDHT extends DHT {
    routingTable: RoutingTable;
}
export interface DualDHT extends DHT {
    wan: SingleDHT;
    lan: SingleDHT;
}
/**
 * A selector function takes a DHT key and a list of records and returns the
 * index of the best record in the list
 */
export interface SelectFn {
    (key: Uint8Array, records: Uint8Array[]): number;
}
/**
 * A validator function takes a DHT key and the value of the record for that key
 * and throws if the record is invalid
 */
export interface ValidateFn {
    (key: Uint8Array, value: Uint8Array): Promise<void>;
}
/**
 * Selectors are a map of key prefixes to selector functions
 */
export declare type Selectors = Record<string, SelectFn>;
/**
 * Validators are a map of key prefixes to validator functions
 */
export declare type Validators = Record<string, ValidateFn>;
//# sourceMappingURL=index.d.ts.map