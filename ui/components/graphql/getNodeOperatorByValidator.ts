import { gql } from "@apollo/client/core";

const GET_NODE_OPERATOR_BY_VALIDATOR = gql(`
  query NodeOperatorByValidator($pubKey: String!) {
    nodeOperatorByValidator(validatorUniqueInput: { pubKey: $pubKey }) {
    name
    network
    nodes
    website
    social
    email
    location
    category
    executionLayerClients
    consensusLayerClients
    yearsOfExperience
    cpu
    ram
    storage
    status
    description
    rate
    verified
    id
    logo
    }
  }
`);

export { GET_NODE_OPERATOR_BY_VALIDATOR };
