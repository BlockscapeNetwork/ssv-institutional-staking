import colors from 'colors/safe';
import { BaseAction } from './BaseAction';
import { SSVKeys } from '../../lib/SSVKeys';
import { sanitizePath } from './validators/file';
import keystoreArgument from './arguments/keystore';
import ssvAmountArgument from './arguments/ssv-amount';
import { KeyShares } from '../../lib/KeyShares/KeyShares';
import operatorIdsArgument from './arguments/operator-ids';
import keystorePasswordArgument from './arguments/password';
import outputFolderArgument from './arguments/output-folder';
import { getFilePath, readFile, writeFile } from '../../lib/helpers';
import operatorPublicKeysArgument from './arguments/operator-public-keys';

/**
 * Command to build keyshares from user input.
 */
export class KeySharesAction extends BaseAction {
  static override get options(): any {
    return {
      action: 'key-shares',
      shortAction: 'ksh',
      description: 'Generate shares for a list of operators from a validator keystore file',
      arguments: [
        keystoreArgument,
        keystorePasswordArgument,
        operatorIdsArgument,
        operatorPublicKeysArgument,
        ssvAmountArgument,
        outputFolderArgument,
      ],
    }
  }

  /**
   * Decrypt and return private key.
   */
  override async execute(): Promise<any> {
    const {
      keystore,
      password,
      output_folder: outputFolder,
      ssv_token_amount: ssvAmount,
    } = this.args;

    let {
      operators_ids: operatorIds,
      operators_keys: operatorKeys,
    } = this.args;

    // Prepare data
    operatorKeys = operatorKeys.split(',');
    operatorIds = operatorIds.split(',').map((o: string) => parseInt(o, 10));
    const keystoreFilePath = sanitizePath(String(keystore).trim());
    const keystoreData = await readFile(keystoreFilePath);

    // Initialize SSVKeys SDK
    const ssvKeys = new SSVKeys();
    const privateKey = await ssvKeys.getPrivateKeyFromKeystoreData(keystoreData, password);

    // Build shares from operator IDs and public keys
    const shares = await ssvKeys.buildShares(privateKey, operatorIds, operatorKeys);

    // Now save to key shares file encrypted shares and validator public key
    const keyShares = await KeyShares.fromData({ version: 'v2' });
    await keyShares.setData({
      operators: operatorKeys.map((operator: string, index: number) => ({
        id: operatorIds[index],
        publicKey: operator,
      })),
      publicKey: ssvKeys.getValidatorPublicKey(),
      shares,
    });

    // Build payload and save it in key shares file
    const payload = await ssvKeys.buildPayload(
      ssvKeys.getValidatorPublicKey(),
      operatorIds,
      shares,
      ssvAmount,
    );
    await keyShares.setPayload(payload);

    const keySharesFilePath = await getFilePath('keyshares', outputFolder.trim());
    await writeFile(keySharesFilePath, keyShares.toString());
    return `\nKey distribution successful! Find your key shares file at ${colors.bgYellow(colors.black(keySharesFilePath))}\n`;
  }
}
