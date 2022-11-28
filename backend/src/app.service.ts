import { Injectable } from '@nestjs/common';
import { ethers } from 'ethers';
import { EthereumKeyStore } from 'ssv-keys';
import * as SSVNetwork from './assets/SSVNetwork.json';
import * as dummyKeystore from './assets/keystore-m_12381_3600_0_0_0-1669614977.json';

@Injectable()
export class AppService {
  provider: ethers.providers.BaseProvider;
  SSVNetworkContract;

  constructor() {
    this.provider = ethers.getDefaultProvider('goerli');
    this.SSVNetworkContract = new ethers.Contract(
      '0xb9e155e65B5c4D66df28Da8E9a0957f06F11Bc04',
      SSVNetwork.abi,
      this.provider,
    );
  }

  getHello(): string {
    return 'Hello World!';
  }

  // eslint-disable-next-line @typescript-eslint/no-inferrable-types
  getBlock(blockNumberOrTag = 'latest'): Promise<ethers.providers.Block> {
    return ethers.getDefaultProvider('goerli').getBlock(blockNumberOrTag);
  }

  async getKeyStore(): Promise<string> {
    // Get required data from the keystore file
    const keyStore = new EthereumKeyStore(JSON.stringify(dummyKeystore));
    // Get public key using the keystore password
    const publicKey = await keyStore.getPublicKey();
    const privateKey = await keyStore.getPrivateKey('dummy123');
    return publicKey;
  }

  async registerValidatorSSV(): Promise<boolean> {
    const registeredVali = await this.SSVNetworkContract.registerValidator();
    return true;
  }
}
