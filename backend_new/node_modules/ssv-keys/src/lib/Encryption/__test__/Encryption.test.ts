import { decode } from 'js-base64';
import JSEncrypt from '../../JSEncrypt';
import * as operatorKeys from './RsaKeys';
import Threshold, { ISharesKeyPairs } from '../../Threshold';
import Encryption, { EncryptShare } from '../../Encryption/Encryption';

describe('Check Encryption shares', () => {
  it('should use raw public keys of operators and return encrypt shares without error', async () => {
    const validatorPrivateKey = '12f1cf0ecf8086a7e1d84b3b77da48761664e3cdc73f165c644e7f0594f98bdd';
    const threshold: Threshold = new Threshold();
    const thresholdResult: ISharesKeyPairs = await threshold.create(validatorPrivateKey, [9, 10, 11, 12]);
    const encryptedShares: EncryptShare[] = new Encryption(
      operatorKeys.publicKeys,
      thresholdResult.shares
    ).encrypt();

    encryptedShares.forEach((share: EncryptShare, index: number) => {
      const decrypt = new JSEncrypt({});
      decrypt.setPrivateKey(decode(operatorKeys.privateKeys[index]));
      const decrypted = decrypt.decrypt(share.privateKey) || '';
      expect(decrypted).toEqual(thresholdResult.shares[index].privateKey);
      expect(encryptedShares[index].operatorPublicKey).toEqual(decode(operatorKeys.publicKeys[index]));
    });
  });
});
