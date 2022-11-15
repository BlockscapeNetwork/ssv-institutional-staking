import { gql } from "@apollo/client/core";

const GET_NONCE_BY_USER = gql(`
  mutation NonceByUser($userUniqueInput: UserUniqueInput!) {
    nonceByUser(data: $userUniqueInput) {
      wallet
      nonce
      timestamp
    }
  }
`);

export { GET_NONCE_BY_USER };
