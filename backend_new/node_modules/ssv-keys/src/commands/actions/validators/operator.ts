import { decode } from 'js-base64';
import JSEncrypt from '../../../lib/JSEncrypt';
import { InvalidOperatorKeyException } from '../../../lib/Encryption/Encryption';

export const operatorValidator = async (operator: string): Promise<string | boolean> => {
  try {
    const errorMessage = 'Invalid operator key format, make sure the operator exists in the network';
    const decodedOperator = decode(operator);
    if (!decodedOperator.startsWith('-----BEGIN RSA PUBLIC KEY-----')) {
      throw Error(errorMessage);
    }
    const encrypt = new JSEncrypt({});
    try {
      encrypt.setPublicKey(decodedOperator);
    } catch (error) {
      throw new InvalidOperatorKeyException(
        {
          rsa: decodedOperator,
          base64: operator,
        },
        errorMessage,
      );
    }
    return true;
  } catch (e) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const { message } = e;
    return message;
  }
}
