import { gql } from "@apollo/client/core";

const GET_USERS_BY_REFERRAL_CODES = gql(`
 query GetUsersByReferralCodes($referralCodes: [String]!) {
  getUsersByReferralCodes(referralCodes: $referralCodes) {
      wallet
      referralCode
    }
  }
`);

export { GET_USERS_BY_REFERRAL_CODES };
