import bls from '../../../BLS';
import Threshold, { IShares } from '../../../Threshold';

export interface Shares {
    validatorPrivateKey: any,
    validatorPublicKey: any,
    signatures: any[],
    ids: any[],
}

export const sharesSignatures = async (privateKey: string, operators: number[], message: string, threshold: boolean): Promise<Shares> => {
     return new Threshold().create(privateKey, operators).then((response) => {
        const validatorPrivateKey = bls.deserializeHexStrToSecretKey(privateKey);
        const validatorPublicKey = validatorPrivateKey.getPublicKey();
        const signatures: any[] = [];
        const ids: any[] = [];
        const randomIndex: number = getRandomInt(4);

        response.shares.forEach((share: IShares, index: number) => {
            if (threshold && index === randomIndex) {
                return;
            }
            const sharePrivateKey = share.privateKey.substr(2);
            const shareBlsPrivateKey = bls.deserializeHexStrToSecretKey(sharePrivateKey);
            signatures.push(shareBlsPrivateKey.sign(message));
            ids.push(share.id);
        });
        return {
            validatorPrivateKey,
            validatorPublicKey,
            signatures,
            ids,
        };
    });
};

function getRandomInt(max: number): number {
    return Math.floor(Math.random() * max);
}
