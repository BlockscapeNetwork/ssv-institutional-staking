import { gql } from "@apollo/client/core";

const IS_TAKEN_REFERRAL_CODE = gql(`
  query isTakenReferalCode($referralCode: String!) {
    isTakenReferalCode(referralCode: $referralCode) {
      status
    }
  }
`);

export { IS_TAKEN_REFERRAL_CODE };
