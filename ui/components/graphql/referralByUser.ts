import { gql } from "@apollo/client/core";

const REFERRAL_BY_USER = gql(`
    mutation ReferralByUser($referralCreateInput: ReferralCreateInput!, $userSignatureInput: UserSignatureInput!){
        referralByUser(data: $referralCreateInput, userSignatureInput: $userSignatureInput) {
            id
            discordId
            wallet
        }
    }
`);

export { REFERRAL_BY_USER };
