import { Injectable } from "@nestjs/common";
import { KeystoreService } from "src/keystore/keystore.service";
import { EthereumKeyStore } from "ssv-keys";
import * as dummyKeystore from '../assets/keystore-m_12381_3600_0_0_0-1669614977.json';

interface Key {
  id: string,
  key: string
}

@Injectable()
export class SsvService {
  constructor(
    private keyStoreService: KeystoreService
  ) { }

  async getKeyStore(): Promise<string> {
    // Get required data from the keystore file
    const keyStore = new EthereumKeyStore(JSON.stringify(dummyKeystore));
    // Get public key using the keystore password
    const publicKey = await keyStore.getPublicKey();
    const key: Key = null;
    key.key = publicKey;
    this.keyStoreService.addKeystore(key);
    return publicKey;
  }

}