/* eslint-disable @next/next/no-img-element */
import type { NextPage } from "next";
import {
  useAccount,
  useContractRead,
  useNetwork,
} from "wagmi";
import Quadrata from "../utils/Quadrata.json";
import Qkyb from "../components/quadrata/kyb";
import { useEffect, useState } from "react";
import { ethers } from "ethers";
import { useConnectModal } from "@rainbow-me/rainbowkit";

const Partner: NextPage = () => {
  const { chain } = useNetwork();

  const [stakeAmount, setStakeAmount] = useState("0");
  const [statusKYB, setStatusKYB] = useState(
    "Not Verified KYC/KYB - Become Verified:"
  );
  const [disabled, setDisabled] = useState(true);

  const { address, isConnected } = useAccount();

  const [deData, setdeData] = useState<any>();

  const opID =
    chain?.name === "Goerli" ? 78 : chain?.name === "Mainnet" ? 28 : 0; // default operator id blockscape

  const contractAddr =
    chain?.name === "Goerli"
      ? "0x23e33FC2704Bb332C0410B006e8016E7B99CF70A"
      : chain?.name === "Mainnet"
      ? "0xe0C8df4270F4342132ec333F6048cb703E7A9c77"
      : "0x0000000000000000000000000000000000000000";

  const { openConnectModal } = useConnectModal();

  const {
    data: isBusiness,
    isLoading: isLoadingTokenId,
    isSuccess: isSuccessTokenId,
    error: cRead,
  } = useContractRead({
    addressOrName: "0x5C6b81212c0A654B6e247F8DEfeC9a95c63EF954",
    contractInterface: Quadrata,
    functionName: "getAttributesFree",
    args: [address, 1, ethers.utils.id("IS_BUSINESS")],
  });

  useEffect(() => {
    if (isSuccessTokenId) {
      if (
        isBusiness?.[0].toString() ===
        "0x7749ed7587e6dbf171ce6be50bea67236732d7ccfd51e327bc28b612ec06faa7"
      ) {
        setStatusKYB("Verifed KYB - You are a verified business");
        setDisabled(true);
      } else if (
        isBusiness?.[0].toString() ===
        "0xa357fcb91396b2afa7ab60192e270c625a2eb250b8f839ddb179f207b40459b4"
      ) {
        setStatusKYB("Verified KYC - You are a verified individual");
        setDisabled(true);
      }
    } else {
      setStatusKYB("Not Verified KYC/KYB - Become Verified:");
      setDisabled(false);
    }
  }, [isSuccessTokenId, isBusiness]);

  useEffect(() => {
   
  }, []);

  useEffect(() => {
    (window as any)?.ethereum.on("chainChanged", () => {
      window.location.reload();
    });
  }, []);


  const [showChild, setShowChild] = useState(false);
  useEffect(() => {
    setShowChild(true);
  }, []);

  if (!showChild) {
    return null;
  }

  if (typeof window === "undefined") {
    return <></>;
  } else {
    window.ethereum.on('accountsChanged', function () {
      window.location.reload();
    })
    window.ethereum.on('chainChanged', function () {
      window.location.reload();
    })
    return (
      <>
        <main className="min-h-screen">
          <div className="grid justify-items-center">
            <div className="text-2xl font-bold mt-8">
              Our partners
            </div>
            <div className="card w-96 glass shadow-xl mt-2  justify-items-center">
              <div className="card-body text-center text-xs items-center">
                {isConnected && disabled ? (
                  <div
                    className="text-center text-lg items-center"
                  >
                    Congrats, you are verified!
                  </div>
                ) : isConnected && !disabled ? (
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
export default Partner;
