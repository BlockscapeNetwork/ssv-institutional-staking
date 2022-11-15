import { gql } from "@apollo/client/core";

const CREATE_OR_UPDATE_USER = gql(`
  mutation createOrUpdateUser($createOrUpdateUserInput: CreateOrUpdateUserInput!, $userSignatureInput: UserSignatureInput!) {
    createOrUpdateUser(data: $createOrUpdateUserInput, userSignatureInput: $userSignatureInput) {
      id
      role
      wallet
      referralCode
    }
  }
`);

export { CREATE_OR_UPDATE_USER };
