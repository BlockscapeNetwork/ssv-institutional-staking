import { keystorePasswordValidator } from '../validators/keystore-password';

export default {
  arg1: '-ps',
  arg2: '--password',
  options: {
    required: true,
    type: String,
    help: 'Enter password for provided keystore file'
  },
  interactive: {
    options: {
      type: 'password',
      validate: async (password: string): Promise<boolean | string> => {
        return await keystorePasswordValidator.validatePassword(password);
      },
    }
  }
};
