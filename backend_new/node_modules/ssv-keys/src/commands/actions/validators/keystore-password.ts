import EthereumKeyStore from 'eth2-keystore-js';
import { readFile } from '../../../lib/helpers';


export class KeystorePasswordValidator {
  protected keystoreFilePath = '';

  setKeystoreFilePath(filePath: string): void {
    this.keystoreFilePath = filePath;
  }

  async validatePassword(password: string): Promise<boolean | string> {
    if (!password.trim().length) {
      return 'Password is empty';
    }
    const errorMessage = 'Invalid password';
    try {
      let dots = 1;
      const message = `\rChecking password`
      process.stdout.write('\r' + String(' ').repeat(250));
      process.stdout.write(`\r${message}`);
      const messageInterval = setInterval(() => {
        const progressMessage = `\r${message}` +
          `${String('.').repeat(dots)}${String(' ').repeat(30 - dots)}`;
        process.stdout.write(progressMessage);
        dots += 1;
        if (dots > 3) {
          dots = 1;
        }
      }, 1000);

      const data = await readFile(this.keystoreFilePath);
      const keyStore = new EthereumKeyStore(data);
      const privateKey = await keyStore.getPrivateKey(password)
        .then((privateKey: string) => {
          clearInterval(messageInterval);
          return privateKey;
        })
        .catch(() => { clearInterval(messageInterval); });
      return privateKey ? true : errorMessage;
    } catch (e) {
      if (e instanceof Error) {
        return e.message;
      }
      return errorMessage;
    }
  }
}

export const keystorePasswordValidator = new KeystorePasswordValidator();
