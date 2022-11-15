/* eslint-disable @next/next/no-img-element */
import type { NextPage } from "next";
import SWNFT from "../utils/SWNFTUpgrade.json";
import SWETH from "../utils/SWETH.json";
import { useAccount, useContractWrite, useNetwork, usePrepareContractWrite } from "wagmi";
import { ethers } from "ethers";
import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { GET_NODE_OPERATOR_BY_VALIDATOR } from "../components/graphql/swellGraphQL";
import { useLazyQuery } from "@apollo/client";
import Link from "next/link";
import { useConnectModal } from "@rainbow-me/rainbowkit";

const Account: NextPage = () => {
  const [metaArray, setMetaArray] = useState<any[]>([]);
  const [valiArray, setValiArray] = useState<any[]>([]);
  const [pubKeysArray, setpubKeysArray] = useState<any[]>([]);
  const [apeMode, setapeMode] = useState<boolean>(false);

  const [isLoaded, setIsLoaded] = useState(false);
  const [showChild, setShowChild] = useState(false);

  const { address, isConnected } = useAccount();
  const { chain } = useNetwork();
  const { openConnectModal } = useConnectModal();

  const beaconchain =
    chain?.name === "Mainnet"
      ? "https://beaconcha.in/validator/"
      : "https://goerli.beaconcha.in/validator/";

  const [
    getValidator,
    { loading: valiLoading, error: valiError, data: valiData },
  ] = useLazyQuery(GET_NODE_OPERATOR_BY_VALIDATOR, {});

  const contractAddr =
    chain?.name === "Goerli"
      ? "0x23e33FC2704Bb332C0410B006e8016E7B99CF70A"
      : chain?.name === "Mainnet"
      ? "0xe0C8df4270F4342132ec333F6048cb703E7A9c77"
      : "0x0000000000000000000000000000000000000000";

  const swETHAddr = 
  chain?.name === "Goerli"
      ? "0x30ebB58888E94095939e220CAb04C59Ea65ded2E"
      : chain?.name === "Mainnet"
      ? "0x37e487b233b440673a75Da0d5e28d7fA16F41c67"
      : "0x0000000000000000000000000000000000000000"; 

      const {
        config:configWithdraw,
        error: prepareWithdrawError,
        isError: isPrepareWithdrawError,
        isSuccess: prepareWithdrawSuccess,
      } = usePrepareContractWrite({
        addressOrName: contractAddr,
        contractInterface: SWNFT,
        functionName: "withdraw",
        args: ["tokenid", "amount"],
      });

      const {
        data: resultWithdraw,
        isLoading: writeWithdrawisLoading,
        error: writeErrorWithdraw,
        write: writeWithdraw,
      } = useContractWrite(configWithdraw);


      const {
        config:configDeposit,
        error: prepareDepositError,
        isError: isPrepareDepositError,
        isSuccess: prepareDepositSuccess,
      } = usePrepareContractWrite({
        addressOrName: contractAddr,
        contractInterface: SWNFT,
        functionName: "deposit",
        args: ["tokenid", "amount"],
      });
    
      const {
        data: resultDeposit,
        isLoading: writeDepositisLoading,
        error: writeErrorDeposit,
        write: writeDeposit,
      } = useContractWrite(configDeposit);

      const {
        config:configApprove,
        error: prepareApproveError,
        isError: isPrepareApproveError,
        isSuccess: prepareApproveSuccess,
      } = usePrepareContractWrite({
        addressOrName: contractAddr,
        contractInterface: SWETH,
        functionName: "approve",
        args: [contractAddr, "amount"],
      });

      const {
        data: resultApprove,
        write: writeApprove,
      } = useContractWrite(configApprove);

  const getNFT = useCallback(async () => {
    const tokenID: any = new Array();
    const res = await axios.get(
      `https://api-goerli.etherscan.io/api?module=account&action=tokennfttx&address=${address}&contractAddress=${contractAddr}&startblock=5000&endblock=latest&sort=asc&apikey=KUDEE9ZTSCPEGMQE5PK8YN7TIA1ZDM7U9B`
    );
    await res.data.result.map((item: any) => {
      tokenID.push(item.tokenID);
    });
    return tokenID;
  }, []);

  const getMeta = useCallback(async (tokenID: any) => {
    const provider = new ethers.providers.Web3Provider(window.ethereum as any);
    const swNFT = new ethers.Contract(contractAddr, SWNFT, provider);
    const meta: any = new Array();
    const pubKeys: any = new Array();
    let i = 0;
    while (i < tokenID?.length) {
      const res = await swNFT.tokenURI(tokenID[i]);
      const decoded = Buffer.from(
        await res.split("data:application/json;base64,")[1],
        "base64"
      ).toString("utf8");
      await meta.push(await JSON.parse(decoded));
      await pubKeys.push(
        "0x" +
          String(await JSON.parse(decoded).name)
            .split(" 0x")[1]
            .split(" <>")[0]
      );
      i++;
    }

    return [await meta, await pubKeys];
  }, []);

  const getVali = useCallback(async (pubKeys: any) => {
    const vali: any = new Array();
    let i = 0;
    while (i < pubKeys?.length) {
      const valiData = await getValidator({
        variables: {
          pubKey: String(pubKeys[i]),
        },
      });
      vali.push(valiData.data.nodeOperatorByValidator);
      i++;
    }
    return vali;
  }, []);

  useEffect(() => {
    if (isConnected) {
      getNFT().then((tokenID) => {
        getMeta(tokenID).then(([meta, pubKeys]) => {
          setMetaArray(meta);
          setpubKeysArray(pubKeys);
          getVali(pubKeys).then((res) => {
            setValiArray(res);
            setIsLoaded(true);
          });
        });

        setShowChild(true);
      });
    } else {
      setIsLoaded(true);
      setShowChild(true);
    }
  }, [getNFT, getMeta, getVali]);

  if (!showChild) {
    return null;
  }

  if (typeof window === "undefined") {
    return <></>;
  } else {
    if (window.ethereum != undefined) {
      window.ethereum.on?.("accountsChanged", function () {
        window.location.reload();
      });
      window.ethereum.on?.("chainChanged", function () {
        window.location.reload();
      });
    }
    return (
      <main className="min-h-screen">
        <div className="grid justify-items-center">
          {!isLoaded && (
            <div className="place-items-center mt-16">
              <div className="place-self-center text-center">Loading...</div>
              <br />
              <progress className="progress progress-primary w-56"></progress>
            </div>
          )}

          {!isConnected && (
            <div className="place-items-center mt-16">
              <div className="place-self-center text-center text-2xl">
                <button className="btn btn-primary" onClick={openConnectModal}>
                  Connect Wallet
                </button>
              </div>
            </div>
          )}

          {valiArray.length === 0 && isLoaded && isConnected && (
            <div className="place-items-center mt-16">
              <div className="place-self-center text-center text-2xl">
                No staked ETH positions yet!
              </div>
            </div>
          )}

          {(isLoaded && isConnected && valiArray.length !== 0) && (
            <>
              <div className="text-2xl font-bold mt-6">
                Your staked ETH positions
                <div
                  className="tooltip tooltip-primary"
                  data-tip="activate advanced options"
                >
                  <label
                    htmlFor="advanced"
                    className="btn btn-ghost btn-xs btn-circle text-lg no-animation btn-link modal-button"
                  >
                    ⚙
                  </label>
                </div>
              </div>
              <div className="flex flex-col w-full lg:flex-row mt-1 lg:mt-6">
                {metaArray.map((item: any, index: number) => {
                  return (
                    <>
                      <div className="divider lg:divider-horizontal"></div>
                      <div className="grid flex-grow card glass bg-base-300 rounded-box place-items-center lg:m-0 ml-20 mr-20">
                        <h1 className="card-title mb-2 mt-1 text-2xl">
                          {valiArray[index]?.name} {valiArray[index]?.verified ? "verified" : "not verified"}
                        </h1>
                        <img src={item.image} width="80%" height="40%" />

                        <div className="card-body grid grid-cols-2">
                          <div>Location</div>
                          <div className="text-right">
                            {valiArray[index]?.location}
                          </div>
                          <div>
                            Execution Client{" "}
                            <div
                              className="tooltip tooltip-primary tooltip-right"
                              data-tip="info"
                            >
                              ⓘ
                            </div>
                          </div>
                          <div className="text-right">
                            {valiArray[index]?.executionLayerClients ||
                              "no data"}
                          </div>
                          <div>
                            Consenus Client{" "}
                            <div
                              className="tooltip tooltip-primary tooltip-right"
                              data-tip="info"
                            >
                              ⓘ
                            </div>
                          </div>
                          <div className="text-right">
                            {valiArray[index]?.consensusLayerClients ||
                              "no data"}
                          </div>
                        </div>
                        <div className="mb-2 link-primary link-hover">
                          <Link href={beaconchain + pubKeysArray[index]}>
                            Validator details 🔗
                          </Link>
                        </div>
                        
                      </div>
                      <div className="divider lg:divider-horizontal "></div>
                    </>
                  );
                })}
                
              </div>
              {apeMode && (
                <><div className="text-2xl font-bold mt-10">
                  Withdraw & Deposit swETH
                </div><div className="card glass mt-2">
                    <div className="card-body">
                      <select className="select select-primary select-sm" title="Select swNFT"></select>
                      <input
                        className="input input-primary input-sm"
                        placeholder="Enter swETH Amount"
                      ></input>
                      <button className="btn btn-primary btn-xs">
                        Withdraw swETH
                      </button>
                      <button className="btn btn-primary btn-xs">
                        Deposit swETH
                      </button>
                    </div>
                  </div></>
                        )}
            </>
          )}
          <input type="checkbox" id="advanced" className="modal-toggle" />
          <div className="modal">
            <div className="modal-box relative">
              <label
                htmlFor="advanced"
                className="btn btn-sm btn-circle absolute right-2 top-2"
              >
                ✕
              </label>
              <h3 className="text-lg font-bold">Activate Advanced Mode</h3>
              <p className="py-4">
                Are you sure you want to activate advanced options? This will
                allow to withdraw your staked swETH and use it in the broader
                DeFi ecosystem.
              </p>
              <div className="modal-action">
                <label htmlFor="advanced" className="btn">
                  Abort
                </label>
                <label htmlFor="advanced" className="btn btn-primary" onClick={() => setapeMode(true)}>
                  Confirm
                </label>
              </div>
            </div>
          </div>
        </div>
      </main>
    );
  }
};

export default Account;
