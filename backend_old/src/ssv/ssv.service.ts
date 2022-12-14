import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { KeystoreService } from 'src/keystore/keystore.service';
import { ethers } from 'ethers';
import Web3 from 'web3';
import { encode } from 'js-base64';
import { Encryption, EthereumKeyStore, Threshold } from 'ssv-keys';
import * as SSVNetwork from '../assets/SSVNetwork.json';
import * as SSVToken from '../assets/SSVToken.json';
import * as EthAlloc from '../assets/EthAlloc.json';
import * as InstSta from '../assets/InstSta.json';
import fs from 'fs';
import path from 'path';

import * as dummyKeystore1 from '../assets/keys/1.json'; // 32eth deposited and ssv register done
import * as dummyKeystore2 from '../assets/keys/2.json'; // 32eth deposited and ssv register done
import * as dummyKeystore3 from '../assets/keys/3.json'; // 32eth deposited and ssv register done
import * as dummyKeystore4 from '../assets/keys/4.json'; // 32eth deposited and ssv register done
import * as dummyKeystore5 from '../assets/keys/5.json'; // 32eth deposited and ssv register done
import * as dummyKeystore6 from '../assets/keys/6.json'; // 32eth deposited and ssv register done
import * as dummyKeystore7 from '../assets/keys/7.json'; // 32eth deposited and ssv register done
import * as dummyKeystore8 from '../assets/keys/8.json'; // 32eth deposited and ssv register done
import * as dummyKeystore9 from '../assets/keys/9.json'; // 32eth deposited and ssv register done
import * as dummyKeystore10 from '../assets/keys/10.json'; // 32eth deposited and ssv register done
import * as dummyKeystore11 from '../assets/keys/11.json'; // 32eth deposited and ssv register done
import * as dummyKeystore12 from '../assets/keys/12.json'; // 32eth deposited and ssv register done


interface Key {
  id?: string;
  key: string;
}

const operators = [
  'LS0tLS1CRUdJTiBSU0EgUFVCTElDIEtFWS0tLS0tCk1JSUJJakFOQmdrcWhraUc5dzBCQVFFRkFBT0NBUThBTUlJQkNnS0NBUUVBM3FncW9MMUlERWhTZ3RoMkYycUEKS3dtekhFblQrTkoxNVk5L3B0UTVBOFZpdXNtazgrbEVKcUNjYlN2YTRIZTlNQVNPWDBVU210d2tiaS9IdFVSTAp2Qi9adFE5MFZqK2NuZ2Q5KzZjY2VtNVkwMm50K3hjUFg4TStkYWYzYVVFbHZ1REtPemtxWmZXMjQxQnpCMFdtCmFlaVFlWE1QUTlSNmkzSGFrZC9KNlhyck02QmUyR0FWT0x6ZE52eUNFdFJjVjRVTXc2NzBwUDhjYldhRkVWdEoKWlBPOFc4MGx3anZkQ0NCUTBRMlppVEkySG43N1lXc01xeExVaTJNSjN6WCtPeVFvaVJ5cFpyU2FzaitTTTJaWQpXNGRPMUNRcXJHZ3pPS2JXMnFBWjBHZytrdytQeHdyOUtYRE84WGJlKytVTFhEaWFneFZmZjg5ODZCOXRUYWlaCmp3SURBUUFCCi0tLS0tRU5EIFJTQSBQVUJMSUMgS0VZLS0tLS0K',
  'LS0tLS1CRUdJTiBSU0EgUFVCTElDIEtFWS0tLS0tCk1JSUJJakFOQmdrcWhraUc5dzBCQVFFRkFBT0NBUThBTUlJQkNnS0NBUUVBeUtVWTVEUmZZREljengzcjhVY0UKTlpFMFdIQXFuV2FIRjZYRlUydVdObjVOVE94Zkt4ZmZaLzkyeVE1citQVkJPRmQrcHhILzI2QXJVT3dNL1lBRQpRbDZ0VzBtc1FqdUtIU1Q4aUtvTDRTNUt0aDNoeTBqeFRHR1ZZaWdjWG1vRURjd2YxaG8wdWRxRmlEN3dFWXN1CmZHa2E2U1ZQNnBab1NMaU9HZFRKUWVzVDI5WEVCdDZnblhMaFB1MER2K0xsQUJJQ1pqWEFTZWtpSFVKUHRjYlgKRjZFL0lScGpkWHVNSmUyOXZDcmZudXhWWk93a1ptdzJXdGljYlNDOVJpSFRYWUQ1dnVGakZXRHNZMERHUDhzOAoyc1haVHdsNWl4dEhlUWM2N1lLRFN6YU1MNnY1VUVZblhUTzZzNHFVSWVnTXJwZjd3S0xGVWxqRTMwbnNIaVBUCjBRSURBUUFCCi0tLS0tRU5EIFJTQSBQVUJMSUMgS0VZLS0tLS0K',
  'LS0tLS1CRUdJTiBSU0EgUFVCTElDIEtFWS0tLS0tCk1JSUJJakFOQmdrcWhraUc5dzBCQVFFRkFBT0NBUThBTUlJQkNnS0NBUUVBelc5VGNJMWxXbmUydkNqZzJlb2UKY3o3NnZ4OVU2QWgvTnZRT0dJY1JTbk5mUWc1amxjM0JuTUM4eW1pQTQzVHJDejl6UFVhUVozZG5idW9DZEY3awpoOWZKcVd3SFFrU2pFQ1ZtVytQS2FVWmQ4aW42cGVGbmgrZEowenR1cUx1aUlJMWQvU05xdGJUaFA2VjQ4TGxDCklsVUhXVFRaKzNVY2dBanlwenIxRmxYU2hGV0w0aGcxeXF3K0p1WW1yTnY2cGZaeWdVbTZQaTBVazVXUVZnUk4KR2RrU3BTb2ZYZERGcElWN0xBU3V0a2dGUytqVnpaL3E5bmh1ejVjNlJWaDYvV1hiZVpDbXhnMGU2R2hIVXY0bAp4SGNaSUkraWhzWk5KM3V5b2NiaWlubE5EaTNMK2hySEUxMExNeVRoN2lVSC8yd1k4MjJKMmdDSEZzNWhkVkNrCm53SURBUUFCCi0tLS0tRU5EIFJTQSBQVUJMSUMgS0VZLS0tLS0K',
  'LS0tLS1CRUdJTiBSU0EgUFVCTElDIEtFWS0tLS0tCk1JSUJJakFOQmdrcWhraUc5dzBCQVFFRkFBT0NBUThBTUlJQkNnS0NBUUVBelRDZ1hLeStWRitvOFNIdFVwT1YKcXNDSDJHSVhOUkJtS0Ixb251aUE2TnBFK3crOXFMQllQUjdDZ0p4eWxMYWFvYnNVNWhKd001K2ZKcGF3OU9XbApzSU40MGtRNU1JaXY3SVFBTUtiSnZuNmFwYWZGYXJFTjA3WjJUN2VVWDU1RWJwSC9lRXZDUzB4WjV3dklCTTJQCnpKSU5TYlVUNHR5MTNDZkFZOE5IOWcybFdiS3AzVUtuMTZpcmRMcWFmd0tjUTNtaG90K3NBSE52NTdaNWdZS3IKUGY0Q0F4b0oyT0FEVlRYUGxuOXluOGhiU084ajZJOTVHYWxiWk9lZTdGR3FMNmYrVnJrZXBLMEU5K2VFSkJTVwpoeURxcjg4dEFydlB1VWNhUEltMll0dG5sTS9pRGJNNDNnWXRHOEV1bTAvMEZZZGY5dmtJeTRZK2VmaGdPVmluCnB3SURBUUFCCi0tLS0tRU5EIFJTQSBQVUJMSUMgS0VZLS0tLS0K',
];
const operatorIds = [91, 2, 9, 83];
const keyStorePW = 'dummy123';

@Injectable()
export class SsvService {
  provider: ethers.providers.BaseProvider;
  ssvNetworkContract;
  ssvTokenContract;
  ethAllocContract;
  instStaContract;
  pKey;
  signer;

  constructor(private keyStoreService: KeystoreService) {
    this.provider = new ethers.providers.AlchemyProvider(
      'goerli',
      'DElz4cgMfsJeX-LChvkiWEA2FlbIeDed',
    );
    this.pKey = process.env.PRIVATE_KEY;
    this.signer = new ethers.Wallet(this.pKey, this.provider);
    this.ssvNetworkContract = new ethers.Contract(
      '0xb9e155e65B5c4D66df28Da8E9a0957f06F11Bc04',
      SSVNetwork.abi,
      this.signer,
    );
    this.ssvTokenContract = new ethers.Contract(
      '0x3a9f01091C446bdE031E39ea8354647AFef091E7',
      SSVToken.abi,
      this.signer,
    );
    this.ethAllocContract = new ethers.Contract(
      '0xf235770a3eb1ff6bfdf06defd0ebcb66a6865da9',
      EthAlloc.abi,
      this.signer,
    );
    this.instStaContract = new ethers.Contract(
      '0xaa666b558633e5e9992040b1c50b5e8be2615f22',
      InstSta.abi,
      this.signer,
    );
  }

  async getPayloadForRegisterValidator(): Promise<any> {
    // Get required data from the keystore file
   
    const keyStore = new EthereumKeyStore(JSON.stringify(dummyKeystore9));
    console.log('keyStore', keyStore);

    const thresholdInstance = new Threshold();
    // Get public key using the keystore password
    const privateKey = await keyStore.getPrivateKey(keyStorePW);
    const threshold = await thresholdInstance.create(privateKey, operatorIds);
    console.log('keyStore', keyStore);
    console.log('privateKey', privateKey);
    let shares = new Encryption(operators, threshold.shares).encrypt();
    // Loop through the operators RSA keys and format them as base64
    shares = shares.map((share) => {
      share.operatorPublicKey = encode(share.operatorPublicKey);
      // Return the operator key and KeyShares (sharePublicKey & shareEncrypted)
      return share;
    });
    const web3 = new Web3();
    // Get all the public keys from the shares
    const sharesPublicKeys = shares.map((share) => share.publicKey);
    // Get all the private keys from the shares and encode them as ABI parameters
    const sharesEncrypted = shares.map((share) =>
      web3.eth.abi.encodeParameter('string', share.privateKey),
    );

    // Token amount (liquidation collateral and operational runway balance to be funded)
    const tokenAmount = web3.utils.toBN(21342395400000000000).toString();
    const operatorIdsArray = Array.from(operatorIds);

    // Return all the needed params to build a transaction payload
    return [
      threshold.validatorPublicKey,
      operatorIdsArray,
      sharesPublicKeys,
      sharesEncrypted,
      tokenAmount,
    ];
  }


  // - new func all in one 
  async getPayload(): Promise<any> {
    // Get required data from the keystore file
    const textpath = path.join(__dirname, '../assets/keys/latest.txt');
    const i = fs.readFileSync(textpath).toString();
    const jsonpath = path.join(__dirname, '../assets/keys/' + i + '.json');
    const dummyKeystore = fs.readFileSync(jsonpath).toString();

    const keyStore = new EthereumKeyStore(dummyKeystore);
    console.log('keyStore', keyStore);
    const thresholdInstance = new Threshold();
    // Get public key using the keystore password
    const privateKey = await keyStore.getPrivateKey(keyStorePW);
    console.log('keyStore', keyStore);
    console.log('privateKey', privateKey);
    const threshold = await thresholdInstance.create(privateKey, operatorIds);
    let shares = new Encryption(operators, threshold.shares).encrypt();
    // Loop through the operators RSA keys and format them as base64
    shares = shares.map((share) => {
      share.operatorPublicKey = encode(share.operatorPublicKey);
      // Return the operator key and KeyShares (sharePublicKey & shareEncrypted)
      return share;
    });
    const web3 = new Web3();
    // Get all the public keys from the shares
    const sharesPublicKeys = shares.map((share) => share.publicKey);
    // Get all the private keys from the shares and encode them as ABI parameters
    const sharesEncrypted = shares.map((share) =>
      web3.eth.abi.encodeParameter('string', share.privateKey),
    );

    // Token amount (liquidation collateral and operational runway balance to be funded)
    const tokenAmount = web3.utils.toBN(21342395400000000000).toString();
    const operatorIdsArray = Array.from(operatorIds);

    // Return all the needed params to build a transaction payload - deposit contract
    const withdrawal_credentials = "";
    const signature = "";
    const deposit_data_root = "";

    const newI = Number(i) + Number(1);


    fs.writeFile(textpath, String(newI), err => {
      if (err) {
        console.error(err);
      }
      // file written successfully
    });

    // Return all the needed params to build a transaction payload
    return [
      threshold.validatorPublicKey,
      operatorIdsArray,
      sharesPublicKeys,
      sharesEncrypted,
      tokenAmount,
      withdrawal_credentials,
      signature,
      deposit_data_root,
    ];
  }
  // - new func all in one


  // needs to be tested !!!! 
  async registerValidatorSSV(): Promise<string> {

    const payloadRegisterValidator =
      await this.getPayloadForRegisterValidator();
    // const action = 'registerValidator';
    const action = 'depositTestSSVMultiSig';

    await this.instStaContract.depositIntoMultiSig();
    await this.ssvTokenContract.approve(
      '0xb9e155e65B5c4D66df28Da8E9a0957f06F11Bc04',
      payloadRegisterValidator[4],
    );
    await this.ssvTokenContract.approve(
      '0xaa666b558633e5e9992040b1c50b5e8be2615f22',
      payloadRegisterValidator[4],
    );

    try {
      // const unsignedTx = await this.ssvNetworkContract.populateTransaction[
      const unsignedTx = await this.instStaContract.populateTransaction[
        action
      ](...payloadRegisterValidator);


      console.log(unsignedTx, 'unsignedTx');

      const tx = await this.signer.sendTransaction(unsignedTx);

      console.log('tx pending...');
      console.log('\x1b[5m...\x1b[0m');
      const txReceipt = await tx.wait();
      console.log(txReceipt.status);

      console.log(
        `\x1b[32m Success\x1b[0m Created Validator ${payloadRegisterValidator[0]}`,
      );

      return tx;
    } catch (err) {
      console.log(err);
      console.error(
        `\x1b[31m FAILED\x1b[0m tx: ${err.transactionHash}`,
        'revert reason:',
        err.reason,
      );
      throw new HttpException(
        `Could not create validator`,
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async registerDepositSSV(): Promise<string> {
    const payloadRegisterValidator =
      await this.registerValidatorSSV();
    const action = 'depositSSV';

    try {
      const unsignedTx = await this.instStaContract.populateTransaction[
        action
      ](...payloadRegisterValidator);
      const tx = await this.signer.sendTransaction(unsignedTx);

      console.log('tx pending...');
      console.log('\x1b[5m...\x1b[0m');
      const txReceipt = await tx.wait();
      console.log(txReceipt.status);

      console.log(
        `\x1b[32m Success\x1b[0m Created Validator ${payloadRegisterValidator[0]}`,
      );

      return tx;
    } catch (err) {
      console.log(err);
      console.error(
        `\x1b[31m FAILED\x1b[0m tx: ${err.transactionHash}`,
        'revert reason:',
        err.reason,
      );
      throw new HttpException(
        `Error:`,
        HttpStatus.BAD_REQUEST,
      );
    }
  }


  // TODO: create keystore file

  // Then ... next function
  async addKeyStoreToDB(): Promise<string> {
    // Get required data from the keystore file
    const i = 1;
    const keyStore = new EthereumKeyStore(JSON.stringify(eval("dummyKeystore" + i)));
    // Get public key using the keystore password
    const publicKey = await keyStore.getPublicKey();
    const key: Key = { key: null };
    key.key = publicKey;
    this.keyStoreService.addKeystore(key);
    return publicKey;
  }
}
