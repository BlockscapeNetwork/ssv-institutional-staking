import { Injectable } from '@nestjs/common';
import { ethers } from 'ethers';
import Web3 from 'web3';
import { EthereumKeyStore, Encryption, Threshold } from 'ssv-keys';
import { encode } from 'js-base64';
import * as SSVNetwork from './assets/SSVNetwork.json';
import * as dummyKeystore from './assets/keystore-m_12381_3600_0_0_0-1669614977.json';

const operators = [
  'LS0tLS1CRUdJTiBSU0EgUFVCTElDIEtFWS0tLS0tCk1JSUJJakFOQmdrcWhraUc5dzBCQVFFRkFBT0NBUThBTUlJQkNnS0NBUUVBNVV3SFltUnJoL3hwbWovd1RHcWwKLysvZEdNWFFlSkg0VUptSjNNWXhyMUU0aGF4ZkhLK3NzSkhXYzYvbWlpRTdZMTBxcy9sNzRvNHdGNnJ2SXYrVApTYnQ2UjdONXNKYUZsYnZ3M2ZCampiZElQTnBHQ0JTaXl3aTc3M3lQZy8vOG04OHMxNTNwYjZmVnViU2QxMzJWClpEZkhmMEdPdnA4b0hxcHY5ampsQ0NlV2phNXUzVzhqN2RwWDBsQTYvaTJRaW4yN3VESHViMHd1eWFEcGprNDcKWG1tOHV2d1VFTWw1L0trREg3Z2FXUjNzNkluZjR4TVpKbHEvMGplVkdoUll5bHg3RFE1WnVBNDNCSGNGMWtxMAo3ZHU0ejFUQ2tFN0ZIZlZRMTdFUnpwUHlmS2l5YlQ4UXdnb3VVV2hGUjJqK3ExbHZGbHJQR0U2OWpIWE9MVWM0CnV3SURBUUFCCi0tLS0tRU5EIFJTQSBQVUJMSUMgS0VZLS0tLS0K',
  'LS0tLS1CRUdJTiBSU0EgUFVCTElDIEtFWS0tLS0tCk1JSUJJakFOQmdrcWhraUc5dzBCQVFFRkFBT0NBUThBTUlJQkNnS0NBUUVBeUtVWTVEUmZZREljengzcjhVY0UKTlpFMFdIQXFuV2FIRjZYRlUydVdObjVOVE94Zkt4ZmZaLzkyeVE1citQVkJPRmQrcHhILzI2QXJVT3dNL1lBRQpRbDZ0VzBtc1FqdUtIU1Q4aUtvTDRTNUt0aDNoeTBqeFRHR1ZZaWdjWG1vRURjd2YxaG8wdWRxRmlEN3dFWXN1CmZHa2E2U1ZQNnBab1NMaU9HZFRKUWVzVDI5WEVCdDZnblhMaFB1MER2K0xsQUJJQ1pqWEFTZWtpSFVKUHRjYlgKRjZFL0lScGpkWHVNSmUyOXZDcmZudXhWWk93a1ptdzJXdGljYlNDOVJpSFRYWUQ1dnVGakZXRHNZMERHUDhzOAoyc1haVHdsNWl4dEhlUWM2N1lLRFN6YU1MNnY1VUVZblhUTzZzNHFVSWVnTXJwZjd3S0xGVWxqRTMwbnNIaVBUCjBRSURBUUFCCi0tLS0tRU5EIFJTQSBQVUJMSUMgS0VZLS0tLS0K',
  'LS0tLS1CRUdJTiBSU0EgUFVCTElDIEtFWS0tLS0tCk1JSUJJakFOQmdrcWhraUc5dzBCQVFFRkFBT0NBUThBTUlJQkNnS0NBUUVBelc5VGNJMWxXbmUydkNqZzJlb2UKY3o3NnZ4OVU2QWgvTnZRT0dJY1JTbk5mUWc1amxjM0JuTUM4eW1pQTQzVHJDejl6UFVhUVozZG5idW9DZEY3awpoOWZKcVd3SFFrU2pFQ1ZtVytQS2FVWmQ4aW42cGVGbmgrZEowenR1cUx1aUlJMWQvU05xdGJUaFA2VjQ4TGxDCklsVUhXVFRaKzNVY2dBanlwenIxRmxYU2hGV0w0aGcxeXF3K0p1WW1yTnY2cGZaeWdVbTZQaTBVazVXUVZnUk4KR2RrU3BTb2ZYZERGcElWN0xBU3V0a2dGUytqVnpaL3E5bmh1ejVjNlJWaDYvV1hiZVpDbXhnMGU2R2hIVXY0bAp4SGNaSUkraWhzWk5KM3V5b2NiaWlubE5EaTNMK2hySEUxMExNeVRoN2lVSC8yd1k4MjJKMmdDSEZzNWhkVkNrCm53SURBUUFCCi0tLS0tRU5EIFJTQSBQVUJMSUMgS0VZLS0tLS0K',
  'LS0tLS1CRUdJTiBSU0EgUFVCTElDIEtFWS0tLS0tCk1JSUJJakFOQmdrcWhraUc5dzBCQVFFRkFBT0NBUThBTUlJQkNnS0NBUUVBelRDZ1hLeStWRitvOFNIdFVwT1YKcXNDSDJHSVhOUkJtS0Ixb251aUE2TnBFK3crOXFMQllQUjdDZ0p4eWxMYWFvYnNVNWhKd001K2ZKcGF3OU9XbApzSU40MGtRNU1JaXY3SVFBTUtiSnZuNmFwYWZGYXJFTjA3WjJUN2VVWDU1RWJwSC9lRXZDUzB4WjV3dklCTTJQCnpKSU5TYlVUNHR5MTNDZkFZOE5IOWcybFdiS3AzVUtuMTZpcmRMcWFmd0tjUTNtaG90K3NBSE52NTdaNWdZS3IKUGY0Q0F4b0oyT0FEVlRYUGxuOXluOGhiU084ajZJOTVHYWxiWk9lZTdGR3FMNmYrVnJrZXBLMEU5K2VFSkJTVwpoeURxcjg4dEFydlB1VWNhUEltMll0dG5sTS9pRGJNNDNnWXRHOEV1bTAvMEZZZGY5dmtJeTRZK2VmaGdPVmluCnB3SURBUUFCCi0tLS0tRU5EIFJTQSBQVUJMSUMgS0VZLS0tLS0K',
];
const operatorIds = [42, 2, 9, 83];
const keyStorePW = 'dummy123';

@Injectable()
export class AppService {
  provider: ethers.providers.BaseProvider;
  ssvNetworkContract;
  pKey;
  signer;

  constructor() {
    this.provider = ethers.getDefaultProvider('goerli');
    this.pKey = ethers.Wallet.createRandom();
    this.signer = new ethers.Wallet(this.pKey, this.provider);
    this.ssvNetworkContract = new ethers.Contract(
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
    const privateKey = await keyStore.getPrivateKey(keyStorePW);
    return privateKey;
  }

  async getKeyThreshold(): Promise<any> {
    // Get required data from the keystore file
    const keyStore = new EthereumKeyStore(JSON.stringify(dummyKeystore));
    const thresholdInstance = new Threshold();
    // Get public key using the keystore password
    const privateKey = await keyStore.getPrivateKey(keyStorePW);
    const threshold = await thresholdInstance.create(privateKey, operatorIds);
    return threshold;
  }

  async getKeyShares(): Promise<any> {
    // Get required data from the keystore file
    const keyStore = new EthereumKeyStore(JSON.stringify(dummyKeystore));
    const thresholdInstance = new Threshold();
    // Get public key using the keystore password
    const privateKey = await keyStore.getPrivateKey(keyStorePW);
    const threshold = await thresholdInstance.create(privateKey, operatorIds);
    let shares = new Encryption(operators, threshold.shares).encrypt();
    // Loop through the operators RSA keys and format them as base64
    shares = shares.map((share) => {
      share.operatorPublicKey = encode(share.operatorPublicKey);
      // Return the operator key and KeyShares (sharePublicKey & shareEncrypted)
      return share;
    });
    return shares;
  }

  async getPayloadRegisterValidator(): Promise<any> {
    // Get required data from the keystore file
    const keyStore = new EthereumKeyStore(JSON.stringify(dummyKeystore));
    const thresholdInstance = new Threshold();
    // Get public key using the keystore password
    const privateKey = await keyStore.getPrivateKey(keyStorePW);
    const threshold = await thresholdInstance.create(privateKey, operatorIds);
    let shares = new Encryption(operators, threshold.shares).encrypt();
    // Loop through the operators RSA keys and format them as base64
    shares = shares.map((share) => {
      share.operatorPublicKey = encode(share.operatorPublicKey);
      // Return the operator key and KeyShares (sharePublicKey & shareEncrypted)
      return share;
    });
    const web3 = new Web3();
    // Loop through the operators and encode them as ABI parameters
    const operatorsPublicKeys = operators.map((operator) =>
      web3.eth.abi.encodeParameter('string', encode(operator)),
    );
    // Get all the public keys from the shares
    const sharesPublicKeys = shares.map((share) => share.publicKey);
    // Get all the private keys from the shares and encode them as ABI parameters
    const sharesEncrypted = shares.map((share) =>
      web3.eth.abi.encodeParameter('string', share.privateKey),
    );

    // Token amount (liquidation collateral and operational runway balance to be funded)
    const tokenAmount = web3.utils.toBN(123456789).toString();

    // Return all the needed params to build a transaction payload
    return [
      threshold.validatorPublicKey,
      `[${operatorIds.join(',')}]`,
      operatorsPublicKeys,
      sharesPublicKeys,
      sharesEncrypted,
      tokenAmount,
    ];
  }

  async getNetworkFeeSSV(): Promise<number> {
    const netWorkFee = await this.ssvNetworkContract.getNetworkFee();
    return netWorkFee;
  }

  async registerValidatorSSV(): Promise<string> {
    const ssvNetworkContractWithSigner = this.ssvNetworkContract.connect(
      this.signer,
    );
    const payloadRegisterValidator = await this.getPayloadRegisterValidator();
    const netWorkFee = await ssvNetworkContractWithSigner.registerValidator(
      payloadRegisterValidator[0],
      payloadRegisterValidator[1],
      payloadRegisterValidator[3],
      payloadRegisterValidator[4],
      payloadRegisterValidator[5],
    );
    return netWorkFee;
  }
}
