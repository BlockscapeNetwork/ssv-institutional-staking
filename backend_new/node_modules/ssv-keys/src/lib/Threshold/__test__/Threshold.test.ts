import bls from '../../BLS';
import { Shares, sharesSignatures } from './helper/share_signatures';

describe('Check Threshold creation', () => {
    const privateKey = '12f1cf0ecf8086a7e1d84b3b77da48761664e3cdc73f165c644e7f0594f98bdd';
    const msg = 'this is a test message';

    it('should aggregate 4 shares signatures and verify', async () => {
        const shares: Shares = await sharesSignatures(privateKey, [1, 2, 3, 4], msg, false);
        const aggSig = new bls.Signature();
        aggSig.recover(shares.signatures, shares.ids);
        expect(shares.validatorPublicKey.verify(aggSig, msg)).toBe(true);
    });

    it('should aggregate 3 out of 4 (randomly) shares signatures and verify', async () => {
        const shares: Shares = await sharesSignatures(privateKey, [1, 2, 3, 4], msg, true);
        const aggSig = new bls.Signature();
        aggSig.recover(shares.signatures, shares.ids);
        expect(shares.validatorPublicKey.verify(aggSig, msg)).toBe(true);
    });
});
