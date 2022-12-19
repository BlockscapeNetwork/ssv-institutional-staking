/* eslint-disable @next/next/no-img-element */
import type { NextPage } from "next";
import {
  useAccount,
  useBalance,
  useContractRead,
  useContractWrite,
  useNetwork,
  usePrepareContractWrite,
} from "wagmi";
import Quadrata from "../utils/Quadrata.json";
import Qkyb from "../components/quadrata/kyb";
import { useEffect, useState } from "react";
import { ethers } from "ethers";
import ETHALLOC from "../utils/EthAlloc.json";
import { useConnectModal } from "@rainbow-me/rainbowkit";
import Link from "next/link";
import { useSSVRegisterValidator } from "../hooks/write/useSSVRegisterValidator";

const Staking: NextPage = () => {
  const { chain } = useNetwork();

  const [stakeAmount, setStakeAmount] = useState("0");
  const [statusKYB, setStatusKYB] = useState(
    "Not Verified KYB - Become Verified:"
  );
  const [verified, setVerified] = useState(false);

  const { address, isConnected } = useAccount();
  const { data, isError, isLoading } = useBalance({
    address: address,
  });

  const contractAddr =
    chain?.name === "Goerli"
      ? "0x79c0dd6ae93abae714b2bec35565456140f707e1"
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

  useEffect(() => {
    if (isBusiness?.toString() === "1") {
      setStatusKYB("Verifed KYB - You are a verified business");
      setVerified(true);
    } else {
      setStatusKYB("Not Verified KYB - Become Verified:");
      setVerified(false);
    }
  }, [isSuccessTokenId, isBusiness, address]);

  let {
    config,
    error: prepareError,
    isError: isPrepareError,
    isSuccess: prepareSuccess,
  } = usePrepareContractWrite({
    address: contractAddr,
    abi: ETHALLOC.abi,
    functionName: "depositEthKYB",
    overrides: {
      value: ethers.utils.parseEther(stakeAmount || "0"),
    },
  });

  const {
    data: result,
    isLoading: writeisLoading,
    isSuccess,
    error: writeError,
    write,
  } = useContractWrite(config);

  const [showChild, setShowChild] = useState(false);
  useEffect(() => {
    setShowChild(true);
  }, []);

  // Listen for 32 eth collected event
  // TODO
  // Then ...
  // a) deposit
  // TODO
  // b) ssv keysplit on backend
  // TODO
  // c) call registerValidator on contract
  // const { data: dataSSV, write: registerVali } = useSSVRegisterValidator();

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
                Available to stake:{" "}
                {typeof data === "undefined"
                  ? "0"
                  : Number(data?.formatted) | 0}{" "}
                ETH
                <label className="input-group">
                  <span>
                    <img
                      src={process.env.NEXT_PUBLIC_BASE_PATH + "/ethL.png"}
                      width="15px"
                      height="auto"
                    />
                  </span>
                  <input
                    type="number"
                    placeholder="Enter Amount"
                    className="input input-bordered input-primary w-full max-w-xs"
                    onChange={(e) => setStakeAmount(e.target.value)}
                  />
                </label>
                {isConnected && verified ? (
                  <button
                    className="btn btn-primary btn-block"
                    onClick={() => write?.()}
                    disabled={!write}
                  >
                    Stake your ETH
                  </button>
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
            <div className="text-xm font-bold mt-12">Blockscape Statistics</div>
            <div className="card w-96 bg-base-100 shadow-xl border border-base-300 mt-1">
              <div className="card-body grid grid-cols-2">
                <div>Commission</div>
                <div className="text-right">9%</div>
                <div>
                  APR{" "}
                  <div
                    className="tooltip tooltip-primary tooltip-right"
                    data-tip="Annual Percentage Rate"
                  >
                    ⓘ
                  </div>
                </div>
                <div className="text-right">4.1%</div>
                <div>Uptime</div>
                <div className="text-right">99,95%</div>
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
