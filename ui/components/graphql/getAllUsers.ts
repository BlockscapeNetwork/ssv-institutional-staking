import { gql } from "@apollo/client/core";

const GET_ALL_USERS = gql(`
  query AllUsers {
    allUsers {
      id
      role
      wallet
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
      }
    }
  }
`);

export { GET_ALL_USERS };
