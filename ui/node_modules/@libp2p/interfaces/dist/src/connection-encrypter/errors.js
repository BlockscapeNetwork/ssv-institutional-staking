export class UnexpectedPeerError extends Error {
    constructor(message = 'Unexpected Peer') {
        super(message);
        this.code = UnexpectedPeerError.code;
    }
    static get code() {
        return 'ERR_UNEXPECTED_PEER';
    }
}
export class InvalidCryptoExchangeError extends Error {
    constructor(message = 'Invalid crypto exchange') {
        super(message);
        this.code = InvalidCryptoExchangeError.code;
    }
    static get code() {
        return 'ERR_INVALID_CRYPTO_EXCHANGE';
    }
}
export class InvalidCryptoTransmissionError extends Error {
    constructor(message = 'Invalid crypto transmission') {
        super(message);
        this.code = InvalidCryptoTransmissionError.code;
    }
    static get code() {
        return 'ERR_INVALID_CRYPTO_TRANSMISSION';
    }
}
//# sourceMappingURL=errors.js.map