import errCode from 'err-code';
import { isStartable } from './startable.js';
export function isInitializable(obj) {
    return obj != null && typeof obj.init === 'function';
}
export class Components {
    constructor(init = {}) {
        this.started = false;
        if (init.peerId != null) {
            this.setPeerId(init.peerId);
        }
        if (init.addressManager != null) {
            this.setAddressManager(init.addressManager);
        }
        if (init.peerStore != null) {
            this.setPeerStore(init.peerStore);
        }
        if (init.upgrader != null) {
            this.setUpgrader(init.upgrader);
        }
        if (init.metrics != null) {
            this.setMetrics(init.metrics);
        }
        if (init.registrar != null) {
            this.setRegistrar(init.registrar);
        }
        if (init.connectionManager != null) {
            this.setConnectionManager(init.connectionManager);
        }
        if (init.transportManager != null) {
            this.setTransportManager(init.transportManager);
        }
        if (init.connectionGater != null) {
            this.setConnectionGater(init.connectionGater);
        }
        if (init.contentRouting != null) {
            this.setContentRouting(init.contentRouting);
        }
        if (init.peerRouting != null) {
            this.setPeerRouting(init.peerRouting);
        }
        if (init.datastore != null) {
            this.setDatastore(init.datastore);
        }
        if (init.connectionProtector != null) {
            this.setConnectionProtector(init.connectionProtector);
        }
        if (init.dht != null) {
            this.setDHT(init.dht);
        }
        if (init.pubsub != null) {
            this.setPubSub(init.pubsub);
        }
    }
    isStarted() {
        return this.started;
    }
    async beforeStart() {
        await Promise.all(Object.values(this).filter(obj => isStartable(obj)).map(async (startable) => {
            if (startable.beforeStart != null) {
                await startable.beforeStart();
            }
        }));
    }
    async start() {
        await Promise.all(Object.values(this).filter(obj => isStartable(obj)).map(async (startable) => {
            await startable.start();
        }));
        this.started = true;
    }
    async afterStart() {
        await Promise.all(Object.values(this).filter(obj => isStartable(obj)).map(async (startable) => {
            if (startable.afterStart != null) {
                await startable.afterStart();
            }
        }));
    }
    async beforeStop() {
        await Promise.all(Object.values(this).filter(obj => isStartable(obj)).map(async (startable) => {
            if (startable.beforeStop != null) {
                await startable.beforeStop();
            }
        }));
    }
    async stop() {
        await Promise.all(Object.values(this).filter(obj => isStartable(obj)).map(async (startable) => {
            await startable.stop();
        }));
        this.started = false;
    }
    async afterStop() {
        await Promise.all(Object.values(this).filter(obj => isStartable(obj)).map(async (startable) => {
            if (startable.afterStop != null) {
                await startable.afterStop();
            }
        }));
    }
    setPeerId(peerId) {
        this.peerId = peerId;
        return peerId;
    }
    getPeerId() {
        if (this.peerId == null) {
            throw errCode(new Error('peerId not set'), 'ERR_SERVICE_MISSING');
        }
        return this.peerId;
    }
    setMetrics(metrics) {
        this.metrics = metrics;
        if (isInitializable(metrics)) {
            metrics.init(this);
        }
        return metrics;
    }
    getMetrics() {
        return this.metrics;
    }
    setAddressManager(addressManager) {
        this.addressManager = addressManager;
        if (isInitializable(addressManager)) {
            addressManager.init(this);
        }
        return addressManager;
    }
    getAddressManager() {
        if (this.addressManager == null) {
            throw errCode(new Error('addressManager not set'), 'ERR_SERVICE_MISSING');
        }
        return this.addressManager;
    }
    setPeerStore(peerStore) {
        this.peerStore = peerStore;
        if (isInitializable(peerStore)) {
            peerStore.init(this);
        }
        return peerStore;
    }
    getPeerStore() {
        if (this.peerStore == null) {
            throw errCode(new Error('peerStore not set'), 'ERR_SERVICE_MISSING');
        }
        return this.peerStore;
    }
    setUpgrader(upgrader) {
        this.upgrader = upgrader;
        if (isInitializable(upgrader)) {
            upgrader.init(this);
        }
        return upgrader;
    }
    getUpgrader() {
        if (this.upgrader == null) {
            throw errCode(new Error('upgrader not set'), 'ERR_SERVICE_MISSING');
        }
        return this.upgrader;
    }
    setRegistrar(registrar) {
        this.registrar = registrar;
        if (isInitializable(registrar)) {
            registrar.init(this);
        }
        return registrar;
    }
    getRegistrar() {
        if (this.registrar == null) {
            throw errCode(new Error('registrar not set'), 'ERR_SERVICE_MISSING');
        }
        return this.registrar;
    }
    setConnectionManager(connectionManager) {
        this.connectionManager = connectionManager;
        if (isInitializable(connectionManager)) {
            connectionManager.init(this);
        }
        return connectionManager;
    }
    getConnectionManager() {
        if (this.connectionManager == null) {
            throw errCode(new Error('connectionManager not set'), 'ERR_SERVICE_MISSING');
        }
        return this.connectionManager;
    }
    setTransportManager(transportManager) {
        this.transportManager = transportManager;
        if (isInitializable(transportManager)) {
            transportManager.init(this);
        }
        return transportManager;
    }
    getTransportManager() {
        if (this.transportManager == null) {
            throw errCode(new Error('transportManager not set'), 'ERR_SERVICE_MISSING');
        }
        return this.transportManager;
    }
    setConnectionGater(connectionGater) {
        this.connectionGater = connectionGater;
        if (isInitializable(connectionGater)) {
            connectionGater.init(this);
        }
        return connectionGater;
    }
    getConnectionGater() {
        if (this.connectionGater == null) {
            throw errCode(new Error('connectionGater not set'), 'ERR_SERVICE_MISSING');
        }
        return this.connectionGater;
    }
    setContentRouting(contentRouting) {
        this.contentRouting = contentRouting;
        if (isInitializable(contentRouting)) {
            contentRouting.init(this);
        }
        return contentRouting;
    }
    getContentRouting() {
        if (this.contentRouting == null) {
            throw errCode(new Error('contentRouting not set'), 'ERR_SERVICE_MISSING');
        }
        return this.contentRouting;
    }
    setPeerRouting(peerRouting) {
        this.peerRouting = peerRouting;
        if (isInitializable(peerRouting)) {
            peerRouting.init(this);
        }
        return peerRouting;
    }
    getPeerRouting() {
        if (this.peerRouting == null) {
            throw errCode(new Error('peerRouting not set'), 'ERR_SERVICE_MISSING');
        }
        return this.peerRouting;
    }
    setDatastore(datastore) {
        this.datastore = datastore;
        if (isInitializable(datastore)) {
            datastore.init(this);
        }
        return datastore;
    }
    getDatastore() {
        if (this.datastore == null) {
            throw errCode(new Error('datastore not set'), 'ERR_SERVICE_MISSING');
        }
        return this.datastore;
    }
    setConnectionProtector(connectionProtector) {
        this.connectionProtector = connectionProtector;
        if (isInitializable(connectionProtector)) {
            connectionProtector.init(this);
        }
        return connectionProtector;
    }
    getConnectionProtector() {
        return this.connectionProtector;
    }
    setDHT(dht) {
        this.dht = dht;
        if (isInitializable(dht)) {
            dht.init(this);
        }
        return dht;
    }
    getDHT() {
        if (this.dht == null) {
            throw errCode(new Error('dht not set'), 'ERR_SERVICE_MISSING');
        }
        return this.dht;
    }
    setPubSub(pubsub) {
        this.pubsub = pubsub;
        if (isInitializable(pubsub)) {
            pubsub.init(this);
        }
        return pubsub;
    }
    getPubSub() {
        if (this.pubsub == null) {
            throw errCode(new Error('pubsub not set'), 'ERR_SERVICE_MISSING');
        }
        return this.pubsub;
    }
}
//# sourceMappingURL=components.js.map