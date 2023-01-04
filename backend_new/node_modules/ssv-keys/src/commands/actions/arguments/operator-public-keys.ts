import { operatorValidator } from '../validators/operator';

const uniqueOperators: any = {};

export default {
  arg1: '-ok',
  arg2: '--operators-keys',
  options: {
    type: String,
    required: true,
    help: 'Comma-separated list of base64 operator keys. ' +
      'Require at least 4 operators'
  },
  interactive: {
    repeat: 4,
    options: {
      type: 'text',
      message: 'Enter operator key for {{index}} operator',
      validate: async (value: string) => {
        if (uniqueOperators[value]) {
          return 'This operator already used';
        }
        const returnValue = await operatorValidator(value);
        if (returnValue === true) {
          uniqueOperators[value] = true;
        }
        return returnValue;
      }
    }
  }
};
