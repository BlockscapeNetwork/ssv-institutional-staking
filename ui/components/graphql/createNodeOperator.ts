import { gql } from "@apollo/client/core";

const CREATE_NODE_OPERATOR = gql(`
  mutation CreateNodeOperator($userNodeOperatorCreateInput: UserNodeOperatorCreateInput!, $userSignatureInput: UserSignatureInput!) {
    createNodeOperator(data: $userNodeOperatorCreateInput, userSignatureInput: $userSignatureInput) {
      id
      role
      wallet
      referralCode
      nodeOperator {
        id
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
        logo
      }
    }
  }
`);

export { CREATE_NODE_OPERATOR };
