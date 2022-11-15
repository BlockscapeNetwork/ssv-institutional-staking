import { gql } from "@apollo/client/core";

const GET_ALL_VALIDATORS_BY_NODE_OPERATOR = gql(`
  query ValidatorsByNodeOperator($id: Int!) {
    validatorsByNodeOperator(nodeOperatorUniqueInput: { id: $id }) {
      id
      pubKey
      depositDatas {
        amount
        signature
        depositDataRoot
      }
    }
  }
`);

export { GET_ALL_VALIDATORS_BY_NODE_OPERATOR };
