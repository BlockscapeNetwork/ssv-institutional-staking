import "../styles/globals.css";
import "@rainbow-me/rainbowkit/styles.css";
import type { AppProps } from "next/app";
import Head from "next/head";
import {
  RainbowKitProvider,
  getDefaultWallets,
  lightTheme,
  darkTheme,
  connectorsForWallets,
  wallet,
} from "@rainbow-me/rainbowkit";
import {
  Chain,
  configureChains,
  createClient,
  WagmiConfig,
  chain,
  useNetwork,
} from "wagmi";
import { publicProvider } from "wagmi/providers/public";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import Router from "next/router";
import NProgress from "nprogress"; //nprogress module
import "../styles/progressBar.css"; //styles of nprogress
import { useEffect, useState } from "react";
import Link from "next/link";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";

const { chains, provider, webSocketProvider } = configureChains(
  [chain.mainnet, chain.goerli],
  [publicProvider()]
);



const needsInjectedWalletFallback =
  typeof window !== 'undefined' &&
  window.ethereum &&
  !window.ethereum.isMetaMask &&
  !window.ethereum.isCoinbaseWallet;

  const connectors = connectorsForWallets([
    {
      groupName: 'Suggested',
      wallets: [
        wallet.metaMask({ chains }),
        wallet.walletConnect({ chains }),
        wallet.coinbase({ appName: 'Bountyscape', chains }),
        wallet.ledger({ chains }),
        ...(needsInjectedWalletFallback
          ? [wallet.injected({ chains })]
          : []),
      ],
    },
  ]);

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
  webSocketProvider,
});

//Binding events.
Router.events.on("routeChangeStart", () => NProgress.start());
Router.events.on("routeChangeComplete", () => NProgress.done());
Router.events.on("routeChangeError", () => NProgress.done());

function MyApp({ Component, pageProps }: AppProps) {
  const [mode, setMode] = useState(lightTheme({ accentColor: "#E79132" }));
  const [isOpen, setOpen] = useState(
    typeof window !== "undefined"
      ? JSON.parse(localStorage.getItem("is-open"))
      : null || false
  );

  const handleToggle = () => {
    localStorage.setItem("is-open", JSON.stringify(!isOpen));

    setOpen(!isOpen);
  };

  const onSelectMode = (mode: any) => {
    setMode(mode);
  };

  const { chain: ethChain } = useNetwork();

  const client =
    ethChain?.name === "Goerli"
      ? new ApolloClient({
          uri: "https://production.swellnetwork.io/graphql",
          cache: new InMemoryCache(),
          headers: {
            chainid: "5",
          },
        })
      : new ApolloClient({
          uri: "https://production.swellnetwork.io/graphql",
          cache: new InMemoryCache(),
        });

  useEffect(() => {
    window
      .matchMedia("(prefers-color-scheme: dark)")
      .addEventListener("change", (e) =>
        onSelectMode(
          e.matches
            ? darkTheme({ accentColor: "#E79132" })
            : lightTheme({ accentColor: "#E79132" })
        )
      );

    onSelectMode(
      document.body.getAttribute("data-theme")?.match("halloween")
        ? darkTheme({ accentColor: "#E79132" })
        : lightTheme({ accentColor: "#E79132" })
    );

    onSelectMode(
      document.body.getAttribute("data-theme")?.match("garden")
        ? lightTheme({ accentColor: "#E79132" })  
        : darkTheme({ accentColor: "#E79132" })
    );


    return () => {
      window
        .matchMedia("(prefers-color-scheme: dark)")
        .removeEventListener("change", () => {});
    };
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
    return (
      <div>
        <Head>
          <title>blockscape ether staking</title>
          <meta name="description" content="blockscape" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        {/* {!isOpen ? (
          <div className="alert-warning shadow-xs items-center text-center">
            <div />
            <Link className="link " href="https://blcs-pro-staking.vercel.app">
              👀 Looking for institutional-grade ether staking?
              Click here! 
            </Link>
            {" "}
            <button
              className="btn btn-xs btn-base-100 m-1"
              onClick={() => handleToggle()}
            >
              Dismiss
            </button>
          </div>
        ) : null} */}
        <ApolloProvider client={client}>
          <WagmiConfig client={wagmiClient}>
            <RainbowKitProvider
            modalSize="compact"
              chains={chains}
              theme={{
                lightMode: lightTheme({ accentColor: "#E79132" }),
                darkMode: darkTheme({ accentColor: "#E79132" }),
              }}
            >
              <Navbar />
              <Component {...pageProps} />
              {/* <Footer/> */}
            </RainbowKitProvider>
          </WagmiConfig>
        </ApolloProvider>
      </div>
    );
  }
}

export default MyApp;
