/* eslint-disable */

import { GET_ALL_NODE_OPERATORS } from "./getAllNodeOperators";
import { GET_ALL_USERS } from "./getAllUsers";
import { GET_USER_BY_WALLET } from "./getUserByWallet";
import { GET_USERS_BY_REFERRAL_CODES } from "./getUsersByReferralCodes";
import {
  GET_NODE_OPERATOR_BY_USER,
  GET_VALIDATORS_OF_NODE_OPERATOR_BY_USER,
} from "./getNodeOperatorByUser";
import { CREATE_OR_UPDATE_USER } from "./createOrUpdateUser";
import { CREATE_NODE_OPERATOR } from "./createNodeOperator";
import { GET_ALL_VALIDATORS_BY_NODE_OPERATOR } from "./validatorsByNodeOperator";
import { GET_DEPOSIT_DATAS_BY_VALIDATOR } from "./depositDatasByValidator";
import { CREATE_DEPOSIT_DATA_BY_VALIDATOR_FROM_JSON } from "./createDepositDataByValidatorFromJson";
import { GET_DEPOSIT_DATAS_BY_NODE_OPERATOR } from "./depositDatasByNodeOperator";
import { GET_NONCE_BY_USER } from "./nonceByUser";
import { GET_STAKE_AMOUNT_BY_NODE_OPERATOR } from "./stakeAmountByNodeOperator";
import { REFERRAL_BY_USER } from "./referralByUser";
import { GET_NODE_OPERATOR_BY_VALIDATOR } from "./getNodeOperatorByValidator";
import { UPLOAD_FILE } from "./uploadFile";
import { IS_TAKEN_REFERRAL_CODE } from "./isTakenReferalCode";

export {
  GET_ALL_NODE_OPERATORS,
  GET_ALL_USERS,
  GET_USER_BY_WALLET,
  GET_USERS_BY_REFERRAL_CODES,
  GET_NODE_OPERATOR_BY_USER,
  GET_VALIDATORS_OF_NODE_OPERATOR_BY_USER,
  CREATE_OR_UPDATE_USER,
  CREATE_NODE_OPERATOR,
  GET_ALL_VALIDATORS_BY_NODE_OPERATOR,
  GET_DEPOSIT_DATAS_BY_VALIDATOR,
  CREATE_DEPOSIT_DATA_BY_VALIDATOR_FROM_JSON,
  GET_DEPOSIT_DATAS_BY_NODE_OPERATOR,
  GET_NONCE_BY_USER,
  GET_STAKE_AMOUNT_BY_NODE_OPERATOR,
  REFERRAL_BY_USER,
  GET_NODE_OPERATOR_BY_VALIDATOR,
  UPLOAD_FILE,
  IS_TAKEN_REFERRAL_CODE,
};
