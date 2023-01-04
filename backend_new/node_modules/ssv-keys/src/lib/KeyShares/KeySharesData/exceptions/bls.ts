export class BLSDeserializeError extends Error {
  public publicKey: string;

  constructor(publicKey: string, message: string) {
    super(message);
    this.publicKey = publicKey;
  }
}
