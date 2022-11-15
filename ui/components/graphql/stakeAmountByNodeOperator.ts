import { gql } from "@apollo/client/core";

const GET_STAKE_AMOUNT_BY_NODE_OPERATOR = gql(`
  query StakeAmountByNodeOperator($id: Int!) {
    stakeAmountByNodeOperator(nodeOperatorUniqueInput: { id: $id }) {
      amount
    }
  }
`);

export { GET_STAKE_AMOUNT_BY_NODE_OPERATOR };
