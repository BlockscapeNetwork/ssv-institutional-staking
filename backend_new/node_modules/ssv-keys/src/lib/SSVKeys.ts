import atob from 'atob';
import Web3 from 'web3';
import { encode } from 'js-base64';
import { KeyShares } from './KeyShares/KeyShares';
import Threshold, { IShares, ISharesKeyPairs } from './Threshold';
import EthereumKeyStore from './EthereumKeyStore/EthereumKeyStore';
import Encryption, { EncryptShare } from './Encryption/Encryption';


/**
 * SSVKeys class provides high-level methods to easily work with entire flow:
 *  - getting private key from keystore file using password
 *  - creating shares threshold
 *  - creating final shares
 *  - building final payload which is ready to be used in web3 transaction
 */
export class SSVKeys {
  static SHARES_FORMAT_ABI = 'abi';

  protected web3Instances: any = {};
  protected threshold: ISharesKeyPairs | undefined;

  /**
   * Getting instance of web3
   * @param nodeUrl
   */
  getWeb3(nodeUrl = process.env.NODE_URL || ''): Web3 {
    if (!this.web3Instances[nodeUrl]) {
      this.web3Instances[nodeUrl] = new Web3(String(nodeUrl || ''))
    }
    return this.web3Instances[nodeUrl];
  }

  /**
   * Extract private key from keystore data using keystore password.
   * Generally can be used in browsers when the keystore data has been provided by browser.
   * @param data
   * @param password
   */
  async getPrivateKeyFromKeystoreData(data: string, password: string): Promise<string> {
    try {
      const keyStore = new EthereumKeyStore(data);
      return await keyStore.getPrivateKey(password).then((privateKey: string) => privateKey);
    } catch (error: any) {
      return error;
    }
  }

  /**
   * Build threshold using private key for number of participants and failed participants.
   * @param privateKey
   * @param operators
   */
  async createThreshold(privateKey: string, operators: number[]): Promise<ISharesKeyPairs> {
    try {
      const threshold: Threshold = new Threshold();
      this.threshold = await threshold.create(privateKey, operators);
      return this.threshold;
    } catch (error: any) {
      return error;
    }
  }

  /**
   * Encrypt operators shares using operators public keys.
   * @param operatorsPublicKeys
   * @param shares
   * @param sharesFormat
   */
  async encryptShares(operatorsPublicKeys: string[], shares: IShares[], sharesFormat = ''): Promise<EncryptShare[]> {
    try {
      const decodedOperators = operatorsPublicKeys.map((operator: string) => String(encode(atob(operator))));
      const encryptedShares = new Encryption(decodedOperators, shares).encrypt();
      return encryptedShares.map((share: EncryptShare) => {
        share.operatorPublicKey = encode(share.operatorPublicKey);
        if (sharesFormat === SSVKeys.SHARES_FORMAT_ABI) {
          share.operatorPublicKey = this.getWeb3().eth.abi.encodeParameter('string', share.operatorPublicKey);
          share.privateKey = this.getWeb3().eth.abi.encodeParameter('string', share.privateKey);
        }
        return share;
      });
    } catch (error: any) {
      return error;
    }
  }

  /**
   * Build shares from private key, operator IDs and public keys
   * @param privateKey
   * @param operatorIds
   * @param operatorPublicKeys
   */
  async buildShares(privateKey: string, operatorIds: number[], operatorPublicKeys: string[]): Promise<EncryptShare[]> {
    const threshold = await this.createThreshold(privateKey, operatorIds);
    return this.encryptShares(operatorPublicKeys, threshold.shares);
  }

  /**
   * Getting threshold if it has been created before.
   */
  getThreshold()  {
    return this.threshold;
  }

  /**
   * Getting public key of validator
   */
  getValidatorPublicKey(): string {
    return this.getThreshold()?.validatorPublicKey || '';
  }

  /**
   * Encode with Web3 eth abi method any fields of shares array required for transaction.
   * @param encryptedShares
   * @param field
   */
  abiEncode(encryptedShares: any[], field?: string): string[] {
    return encryptedShares.map(share => {
      const value = field ? Object(share)[field] : share;
      if (String(value).startsWith('0x')) {
        return value;
      }
      return this.getWeb3().eth.abi.encodeParameter('string', value);
    });
  }

  /**
   * Build payload from encrypted shares, validator public key and operator IDs
   * @param validatorPublicKey
   * @param operatorsIds
   * @param encryptedShares
   * @param ssvAmount
   */
  buildPayload(validatorPublicKey: string,
               operatorsIds: number[],
               encryptedShares: EncryptShare[],
               ssvAmount: string | number): any {
    const sharePublicKeys: string[] = encryptedShares.map((share: EncryptShare) => share.publicKey);
    const sharePrivateKeys: string[] = this.abiEncode(encryptedShares, 'privateKey');
    return [
      validatorPublicKey,
      operatorsIds.join(','),
      sharePublicKeys,
      sharePrivateKeys,
      ssvAmount,
    ];
  }

  /**
   * Build payload from keyshares file with operators and shares details inside.
   * If ssv amount is not provided - it will be taken from keyshares file if exist there or set to 0.
   * @param keyShares
   * @param ssvAmount
   */
  buildPayloadFromKeyShares(keyShares: KeyShares, ssvAmount?: string | number): any {
    const publicKeys = keyShares.data?.shares?.publicKeys || [];
    const encryptedKeys = keyShares.data?.shares?.encryptedKeys || [];
    const operatorPublicKeys = keyShares.data?.operatorPublicKeys || [];

    if (publicKeys.length !== encryptedKeys.length
      || publicKeys.length !== operatorPublicKeys.length
      || encryptedKeys.length !== operatorPublicKeys.length
      || !encryptedKeys.length
      || !operatorPublicKeys.length
      || !publicKeys.length
    ) {
      throw Error('Operator public keys and shares public/encrypted keys length does not match or have zero length.');
    }

    return [
      keyShares.data?.publicKey,
      keyShares.data?.operatorIds?.join(',') || '',
      publicKeys,
      this.abiEncode(encryptedKeys),
      ssvAmount || keyShares.payload?.readable?.ssvAmount || 0,
    ];
  }
}
