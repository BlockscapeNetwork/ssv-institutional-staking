import { gql } from "@apollo/client/core";

const GET_DEPOSIT_DATAS_BY_VALIDATOR = gql(`
  query DepositDatasByValidator($pubKey: String!, $amount: String!) {
    depositDatasByValidator(validatorUniqueInput: { pubKey: $pubKey }, amount: $amount) {
      id
      signature
      amount
      depositDataRoot
    }
  }
`);

export { GET_DEPOSIT_DATAS_BY_VALIDATOR };
