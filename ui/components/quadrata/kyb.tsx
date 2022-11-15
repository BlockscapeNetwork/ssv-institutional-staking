
import { QuadrataKyb } from '@quadrata/kyb-react';
import { NextPage } from 'next';

const KYB_ID = "xgeqwrwk";
const KYB_BACKEND = "https://kyb-v1.quadrata.tech/";


const Qkyb: NextPage = () => {
    return <QuadrataKyb kybId={KYB_ID} backendUrl={KYB_BACKEND} />;
}

export default Qkyb;