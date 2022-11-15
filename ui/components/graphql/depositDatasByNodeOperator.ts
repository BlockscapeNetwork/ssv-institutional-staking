import { gql } from "@apollo/client/core";

const GET_DEPOSIT_DATAS_BY_NODE_OPERATOR = gql(`
  query DepositDatasByNodeOperator($id: Int!, $amount: String) {
    depositDatasByNodeOperator(nodeOperatorUniqueInput: { id: $id }, amount: $amount) {
      id
      signature
      amount
      depositDataRoot
      validator {
        pubKey
      }
    }
  }
`);

export { GET_DEPOSIT_DATAS_BY_NODE_OPERATOR };
