import { gql } from "@apollo/client/core";

const GET_ALL_NODE_OPERATORS = gql(`
  query AllNodeOperators {
    allNodeOperators {
      id
      status
      validators {
        id
        status
        pubKey
        depositDatas {
          amount
        }
        depositBalance
      }
      location
      nodes
      cpu
      ram
      executionLayerClients
      consensusLayerClients
      network
      storage
      category
      name
      yearsOfExperience
      email
      website
      social
      description
      verified
      logo
      rate
    }
  }
`);

export { GET_ALL_NODE_OPERATORS };
