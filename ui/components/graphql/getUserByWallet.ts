import { gql } from "@apollo/client/core";

const GET_USER_BY_WALLET = gql(`
 query GetUserByWallet($wallet: String!) {
  getUserByWallet(userUniqueInput: { wallet: $wallet }) {
      id
      wallet
      role
      referralCode
    }
  }
`);

export { GET_USER_BY_WALLET };
