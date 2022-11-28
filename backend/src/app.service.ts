import { Injectable } from '@nestjs/common';
import { ethers } from 'ethers';
import * as SSVNetwork from './assets/SSVNetwork.json';

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

  async registerValidatorSSV(): Promise<boolean> {
    const registeredVali = await this.SSVNetworkContract.registerValidator();
    return true;
  }
}
