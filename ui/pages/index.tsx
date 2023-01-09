/* eslint-disable @next/next/no-img-element */
import type { NextPage } from "next";
import {
  useAccount,
  useBalance,
  useContractRead,
  useContractWrite,
  useNetwork,
  usePrepareContractWrite,
  useSigner,
} from "wagmi";
import Quadrata from "../utils/Quadrata.json";
import Qkyb from "../components/quadrata/kyb";
import { useEffect, useState } from "react";
import { ethers } from "ethers";
import { useConnectModal } from "@rainbow-me/rainbowkit";
import Link from "next/link";
import * as InstSta from "../utils/InstSta.json";


const Staking: NextPage = () => {
  interface Key {
    id?: string;
    key: string;
  }

  const operators = [
    "LS0tLS1CRUdJTiBSU0EgUFVCTElDIEtFWS0tLS0tCk1JSUJJakFOQmdrcWhraUc5dzBCQVFFRkFBT0NBUThBTUlJQkNnS0NBUUVBM3FncW9MMUlERWhTZ3RoMkYycUEKS3dtekhFblQrTkoxNVk5L3B0UTVBOFZpdXNtazgrbEVKcUNjYlN2YTRIZTlNQVNPWDBVU210d2tiaS9IdFVSTAp2Qi9adFE5MFZqK2NuZ2Q5KzZjY2VtNVkwMm50K3hjUFg4TStkYWYzYVVFbHZ1REtPemtxWmZXMjQxQnpCMFdtCmFlaVFlWE1QUTlSNmkzSGFrZC9KNlhyck02QmUyR0FWT0x6ZE52eUNFdFJjVjRVTXc2NzBwUDhjYldhRkVWdEoKWlBPOFc4MGx3anZkQ0NCUTBRMlppVEkySG43N1lXc01xeExVaTJNSjN6WCtPeVFvaVJ5cFpyU2FzaitTTTJaWQpXNGRPMUNRcXJHZ3pPS2JXMnFBWjBHZytrdytQeHdyOUtYRE84WGJlKytVTFhEaWFneFZmZjg5ODZCOXRUYWlaCmp3SURBUUFCCi0tLS0tRU5EIFJTQSBQVUJMSUMgS0VZLS0tLS0K",
    "LS0tLS1CRUdJTiBSU0EgUFVCTElDIEtFWS0tLS0tCk1JSUJJakFOQmdrcWhraUc5dzBCQVFFRkFBT0NBUThBTUlJQkNnS0NBUUVBeUtVWTVEUmZZREljengzcjhVY0UKTlpFMFdIQXFuV2FIRjZYRlUydVdObjVOVE94Zkt4ZmZaLzkyeVE1citQVkJPRmQrcHhILzI2QXJVT3dNL1lBRQpRbDZ0VzBtc1FqdUtIU1Q4aUtvTDRTNUt0aDNoeTBqeFRHR1ZZaWdjWG1vRURjd2YxaG8wdWRxRmlEN3dFWXN1CmZHa2E2U1ZQNnBab1NMaU9HZFRKUWVzVDI5WEVCdDZnblhMaFB1MER2K0xsQUJJQ1pqWEFTZWtpSFVKUHRjYlgKRjZFL0lScGpkWHVNSmUyOXZDcmZudXhWWk93a1ptdzJXdGljYlNDOVJpSFRYWUQ1dnVGakZXRHNZMERHUDhzOAoyc1haVHdsNWl4dEhlUWM2N1lLRFN6YU1MNnY1VUVZblhUTzZzNHFVSWVnTXJwZjd3S0xGVWxqRTMwbnNIaVBUCjBRSURBUUFCCi0tLS0tRU5EIFJTQSBQVUJMSUMgS0VZLS0tLS0K",
    "LS0tLS1CRUdJTiBSU0EgUFVCTElDIEtFWS0tLS0tCk1JSUJJakFOQmdrcWhraUc5dzBCQVFFRkFBT0NBUThBTUlJQkNnS0NBUUVBelc5VGNJMWxXbmUydkNqZzJlb2UKY3o3NnZ4OVU2QWgvTnZRT0dJY1JTbk5mUWc1amxjM0JuTUM4eW1pQTQzVHJDejl6UFVhUVozZG5idW9DZEY3awpoOWZKcVd3SFFrU2pFQ1ZtVytQS2FVWmQ4aW42cGVGbmgrZEowenR1cUx1aUlJMWQvU05xdGJUaFA2VjQ4TGxDCklsVUhXVFRaKzNVY2dBanlwenIxRmxYU2hGV0w0aGcxeXF3K0p1WW1yTnY2cGZaeWdVbTZQaTBVazVXUVZnUk4KR2RrU3BTb2ZYZERGcElWN0xBU3V0a2dGUytqVnpaL3E5bmh1ejVjNlJWaDYvV1hiZVpDbXhnMGU2R2hIVXY0bAp4SGNaSUkraWhzWk5KM3V5b2NiaWlubE5EaTNMK2hySEUxMExNeVRoN2lVSC8yd1k4MjJKMmdDSEZzNWhkVkNrCm53SURBUUFCCi0tLS0tRU5EIFJTQSBQVUJMSUMgS0VZLS0tLS0K",
    "LS0tLS1CRUdJTiBSU0EgUFVCTElDIEtFWS0tLS0tCk1JSUJJakFOQmdrcWhraUc5dzBCQVFFRkFBT0NBUThBTUlJQkNnS0NBUUVBelRDZ1hLeStWRitvOFNIdFVwT1YKcXNDSDJHSVhOUkJtS0Ixb251aUE2TnBFK3crOXFMQllQUjdDZ0p4eWxMYWFvYnNVNWhKd001K2ZKcGF3OU9XbApzSU40MGtRNU1JaXY3SVFBTUtiSnZuNmFwYWZGYXJFTjA3WjJUN2VVWDU1RWJwSC9lRXZDUzB4WjV3dklCTTJQCnpKSU5TYlVUNHR5MTNDZkFZOE5IOWcybFdiS3AzVUtuMTZpcmRMcWFmd0tjUTNtaG90K3NBSE52NTdaNWdZS3IKUGY0Q0F4b0oyT0FEVlRYUGxuOXluOGhiU084ajZJOTVHYWxiWk9lZTdGR3FMNmYrVnJrZXBLMEU5K2VFSkJTVwpoeURxcjg4dEFydlB1VWNhUEltMll0dG5sTS9pRGJNNDNnWXRHOEV1bTAvMEZZZGY5dmtJeTRZK2VmaGdPVmluCnB3SURBUUFCCi0tLS0tRU5EIFJTQSBQVUJMSUMgS0VZLS0tLS0K",
  ];

  const { chain } = useNetwork();
  const { data: signer } = useSigner();

  const [statusKYB, setStatusKYB] = useState(
    "Not Verified KYB - Become Verified:"
  );
  const [verified, setVerified] = useState(false);
  const [valisData, getValisData] = useState<any>([]);

  const { address, isConnected } = useAccount();
 

  const contractAddr =
    chain?.name === "Goerli"
      ? "0x12f8172983d4622ddCaAE7c1f2b91FFB8455f9c0"
      : chain?.name === "Mainnet"
      ? "0xe0C8df4270F4342132ec333F6048cb703E7A9c77"
      : "0x0000000000000000000000000000000000000000";

  const contractAddrQuadrata =
    chain?.name === "Goerli"
      ? "0x5C6b81212c0A654B6e247F8DEfeC9a95c63EF954"
      : chain?.name === "Mainnet"
      ? "0xFEB98861425C6d2819c0d0Ee70E45AbcF71b43Da"
      : "0x0000000000000000000000000000000000000000";

  const { openConnectModal } = useConnectModal();

  const {
    data: isBusiness,
    isLoading: isLoadingTokenId,
    isSuccess: isSuccessTokenId,
    error: cRead,
  } = useContractRead({
    address: contractAddrQuadrata,
    abi: Quadrata,
    functionName: "balanceOf",
    args: [address, ethers.utils.id("IS_BUSINESS")],
  });

  const fetchValis = useContractRead({
    address: contractAddr,
    abi: InstSta.abi,
    functionName: "getValidator",
    args: [address],
    onSuccess(data) {
      getValisData(data);
    },
  });

  useEffect(() => {
    if (isBusiness?.toString() === "1") {
      setStatusKYB("Verifed KYB - You are a verified business");
      setVerified(true);
    } else {
      setStatusKYB("Not Verified KYB - Become Verified:");
      setVerified(false);
    }
  }, [isSuccessTokenId, isBusiness, address]);

 

  const {
    config: configTest,
    error: prepareErrorTest,
    isError: isPrepareErrorTest,
    isSuccess: prepareSuccessTest,
  } = usePrepareContractWrite({
    address: contractAddr,
    abi: InstSta.abi,
    functionName: "depositIntoContractTest",
  });

  const {
    data: resultTest,
    isLoading: writeisLoadingTest,
    isSuccess,
    error: writeErrorTest,
    write: writeContractTest,
  } = useContractWrite(configTest);

  const {
    config,
    error: prepareError,
    isError: isPrepareError,
    isSuccess: prepareSuccess,
  } = usePrepareContractWrite({
    address: contractAddr,
    abi: InstSta.abi,
    functionName: "depositIntoContract",
    overrides: {
      value: ethers.utils.parseEther('32'),
    },
  });

  const {
    data: result,
    isLoading: writeisLoading,
    error: writeError,
    write: writeContract,
  } = useContractWrite(config);

  useEffect(() => {
    console.log("result", result);
    console.log("resultTest", resultTest);
  }, [resultTest, result])

  const [showChild, setShowChild] = useState(false);
  useEffect(() => {
    setShowChild(true);
  }, []);
  const instStaContract = new ethers.Contract(
    contractAddr,
    InstSta.abi,
    signer as any
  );

  if (!showChild) {
    return null;
  }
  if (typeof window === "undefined") {
    return <></>;
  } else {
    return (
      <>
        <main className="min-h-screen">
          <div className="grid justify-items-center">
            <div className="text-xl font-bold mt-8">
              Stake Ether. Carbon neutral. Verified.
            </div>
            {/* <div className="text-xm font-bold">Receive <div className="tooltip tooltip-primary " data-tip="swETH is an non-rebasing ERC-20 token. It can be traded on the secondary market. Once  Beacon Chain withdraws are enabled you can exchange your swETH to ETH 1=1."><div className="text-primary">swETH</div></div> and a <div className="tooltip tooltip-primary " data-tip="swNFT is a ERC-721 token and earns the staking APR. It represents your staked ETH on the blockscape validators."><div className="text-primary">swNFT</div></div>.</div> */}
            <div className="card w-96 glass shadow-xl mt-2  justify-items-center">
              <div className="card-body text-center text-xs items-center">
                {/* Available: {Number(data?.formatted).toFixed(4)} ETH */}
                <img
                  src={process.env.NEXT_PUBLIC_BASE_PATH + "/ethL.png"}
                  width="35px"
                  height="auto"
                  className="mb-2"
                />
                {isConnected && verified ? (
                  <>
                   
                    <button
                      className="btn btn-primary btn-block"
                      onClick={() => writeContract?.()}
                    >
                      Deposit & Stake 32 GöETH 
                    </button>
                    <div className="divider p-0 m-0">OR</div>
                    <button
                      className="btn-sm btn-primary btn-block rounded-xl"
                      onClick={() => writeContractTest?.()}
                    >
                      Just Test SSV Validator Registration
                    </button>
                  </>
                ) : isConnected && !verified && chain?.name === "Goerli" ? (
                  <Link
                    className="btn btn-primary btn-block"
                    href="https://sandbox.quadrata.com/"
                  >
                    Become Verified (Goerli)
                  </Link>
                ) : isConnected && !verified && chain?.name !== "Goerli" ? (
                  <label htmlFor="kyb" className="btn btn-primary btn-block">
                    Become Verified
                  </label>
                ) : (
                  <button
                    className="btn btn-primary btn-block"
                    onClick={openConnectModal}
                  >
                    Connect Wallet
                  </button>
                )}
              </div>
            </div>
            <div className="text-xm font-bold mt-12 mb-2">
              Your KYB'ed Validators
            </div>
            <div className="card w-96 bg-base-100 shadow-xl border border-base-300">
              <div className="card-body grid grid-cols-1">
                {/* {console.log(valisData)} */}
                {valisData?.map(
                  (vali: any, index: number) =>
                    valisData.length > 0 && (
                      <div
                        className="link text-xm font-bold mt-1 text-center"
                        key={index}
                      >
                        {index + 1}.{" "}
                        <a
                          href={
                            "https://explorer.ssv.network/validators/" + vali
                          }
                        >
                          SSV Explorer: {String(vali).slice(0, 5)}...
                          {String(vali).slice(93, 99)}{" "}
                        </a>
                      </div>
                    )
                )}
                {valisData?.length == 0 && (
                  <div className="text-xm font-bold mt-1 text-center">
                    No KYB'ed Validators. Start Staking!
                  </div>
                )}
              </div>
            </div>
            <br />
            <div className="text-xm font-bold">FAQs</div>
            <div
              tabIndex={0}
              className="collapse collapse-arrow border border-base-300 bg-base-100 rounded-box shadow-xl mt-2 w-96"
            >
              <div className="collapse-title text-xl font-medium">
                Who is blockscape?
              </div>
              <div className="collapse-content">
                <p>
                  We are a team of blockchain ethusiasts and software engineers
                  providing staking and validation services to the many
                  blockchain ecosystems.
                </p>
              </div>
            </div>
            <input type="checkbox" id="kyb" className="modal-toggle" />
            <div className="modal">
              <div className="modal-box relative">
                <label
                  htmlFor="kyb"
                  className="btn btn-sm btn-circle absolute right-2 top-2"
                >
                  ✕
                </label>
                <Qkyb />
              </div>
            </div>
          </div>
        </main>
      </>
    );
  }
};
export default Staking;
