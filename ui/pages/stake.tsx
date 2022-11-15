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
import SWNFT from "../utils/SWNFTUpgrade.json";
import { useConnectModal } from "@rainbow-me/rainbowkit";
import { useQuery, useLazyQuery } from "@apollo/client";
import {
  GET_ALL_NODE_OPERATORS,
  GET_DEPOSIT_DATAS_BY_NODE_OPERATOR,
} from "../components/graphql/swellGraphQL";

const Staking: NextPage = () => {
  const { chain } = useNetwork();

  const [stakeAmount, setStakeAmount] = useState("0");
  const [statusKYB, setStatusKYB] = useState(
    "Not Verified KYC/KYB - Become Verified:"
  );
  const [disabled, setDisabled] = useState(true);

  const { address, isConnected } = useAccount();
  const { data, isError, isLoading } = useBalance({
    addressOrName: address,
  });

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

  const {
    loading,
    error,
    data: operatorData,
  } = useQuery(GET_ALL_NODE_OPERATORS);

  console.log(operatorData);

  const [
    getDepositData,
    { loading: depositLoading, error: depositError, data: depositData },
  ] = useLazyQuery(GET_DEPOSIT_DATAS_BY_NODE_OPERATOR, {});

  useEffect(() => {
    getDepositData({ variables: { id: opID, amount: stakeAmount } }).then(
      (res) => {
        const stakes: any = [
          {
            pubKey: res.data?.depositDatasByNodeOperator[0]?.validator?.pubKey,
            signature: res.data?.depositDatasByNodeOperator[0]?.signature,
            depositDataRoot:
              res.data?.depositDatasByNodeOperator[0]?.depositDataRoot,
            amount: ethers.utils
              .parseEther(
                res.data?.depositDatasByNodeOperator[0]?.amount || "0"
              )
              .toString(),
          },
        ];
        setdeData(stakes);
        refetch();
      }
    );
  }, [stakeAmount, opID]);

  useEffect(() => {
    (window as any)?.ethereum.on("chainChanged", () => {
      window.location.reload();
    });
  }, []);

  let {
    config,
    error: prepareError,
    isError: isPrepareError,
    isSuccess: prepareSuccess,
    status,
    refetch,
  } = usePrepareContractWrite({
    addressOrName: contractAddr,
    contractInterface: SWNFT,
    functionName: "stake",
    args: [deData, "test"],
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

  console.log(deData);
  console.log(status);
  console.log(prepareError);

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
              Stake Ether. Carbon neutral.
            </div>
            <div className="text-xm font-bold">Receive <div className="tooltip tooltip-primary " data-tip="swETH is an non-rebasing ERC-20 token. It can be traded on the secondary market. Once  Beacon Chain withdraws are enabled you can exchange your swETH to ETH 1=1."><div className="text-primary">swETH</div></div> and a <div className="tooltip tooltip-primary " data-tip="swNFT is a ERC-721 token and earns the staking APR. It represents your staked ETH on the blockscape validators."><div className="text-primary">swNFT</div></div>.</div>
            <div className="card w-96 glass shadow-xl mt-2  justify-items-center">
              <div className="card-body text-center text-xs items-center">
                Available to stake:{" "}
                {typeof data === "undefined"
                  ? "0"
                  : Number(data?.formatted) | 0}{" "}
                ETH
                <label className="input-group">
                  <span>
                    <img src={process.env.NEXT_PUBLIC_BASE_PATH+"/ethL.png"} width="15px" height="auto" />
                  </span>
                  <input
                    type="number"
                    placeholder="Amount - only whole numbers"
                    className="input input-bordered input-primary w-full max-w-xs"
                    onChange={(e) => setStakeAmount(e.target.value)}
                  />
                </label>
                {isConnected && disabled ? (
                  <button
                    className="btn btn-primary btn-block"
                    onClick={() => write?.()}
                    disabled={!write}
                  >
                    Stake your ETH
                  </button>
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
            <div className="text-xm font-bold mt-12">
              Swell & Blockscape Statistics
            </div>
            <div className="card w-96 bg-base-100 shadow-xl border border-base-300 mt-1">
              <div className="card-body grid grid-cols-2">
                <div>Commission</div>
                <div className="text-right">9%</div>
                <div>APR <div className="tooltip tooltip-primary tooltip-right" data-tip="Annual Percentage Rate">ⓘ</div></div>
                <div className="text-right">4.1%</div>
                <div>Exchange rate</div>
                <div className="text-right">1 ETH = 1 swETH</div>
                <div>Uptime</div>
                <div className="text-right">99,95%</div>
              </div>
            </div>
            <br />
            <div className="text-xm font-bold">FAQs</div>
            <div
              tabIndex={0}
              className="collapse collapse-arrow border border-base-300 bg-base-100 rounded-box shadow-xl mt-1 w-96"
            >
              <div className="collapse-title text-xl font-medium">
                What is Swell Network?
              </div>
              <div className="collapse-content">
                <p>
                  Swell Network is a permissionless, non-custodial, and liquid
                  ETH staking protocol built for stakers, node operators, and
                  the Ethereum ecosystem.
                </p>
              </div>
            </div>
            <div
              tabIndex={0}
              className="collapse collapse-arrow border border-base-300 bg-base-100 rounded-box shadow-xl mt-2 w-96"
            >
              <div className="collapse-title text-xl font-medium">
                How does Swell work?
              </div>
              <div className="collapse-content">
                <p>
                  Swell works as a marketplace for stakers and node operators to
                  earn rewards from running validators to attest transactions
                  and propose blocks on the Ethereum Beacon Chain. stakers
                  choose a node operator and deposit their ETH directly with
                  their validator to earn ETH staking rewards, minus any
                  penalties and protocol fees and receive in return a liquid
                  staking derivative token called swETH which is a 1:1
                  representation of their staked ETH. Node operators with the
                  technical expertise and infrastructure are able to register
                  and set up validators with Swell in order to attract stakers
                  to fill the 32 ETH requirement to run a validator. This is
                  done in a permissionless manner and requires 16 ETH as
                  collateral. Institutional blockchain infrastructure providers
                  are also able to register with Swell to provide validation
                  services to stakers with 1 ETH as collateral. This will
                  however require being verified by the Swell Network DAO.
                </p>
              </div>
            </div>
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
          {/* <><div className="toast toast-end">
           <div className="alert alert-error">
             <div>
               <span>{(prepareError || error)?.message}</span>
             </div>
           </div>
         </div></> */}
        </main>
      </>
    );
  }
};
export default Staking;
