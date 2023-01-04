import os from 'os';
import path from 'path';

const defaultTargetPath = `${path.join(os.homedir(), 'ssv-keys')}${path.sep}`;

export default {
  arg1: '-of',
  arg2: '--output-folder',
  options: {
    type: String,
    required: false,
    default: defaultTargetPath,
    help: `Target path to generate the output to. Default: ${defaultTargetPath}`
  },
  interactive: {
    options: {
      type: 'text',
      message: 'Please provide a target path to generate the output to',
      initial: defaultTargetPath,
      validate: (value: string) => {
        value = value.trim();
        return !value ? 'Invalid target path' : true;
      }
    }
  }
};
