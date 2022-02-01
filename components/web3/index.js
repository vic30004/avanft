import { ethers } from "ethers";
import Web3Modal from "web3modal";
import { createContext, useEffect, useState, useContext, useMemo } from "react";
import Web3 from "web3";
const Web3Context = createContext(null);

export default function Web3Provider({ children }) {
  const [web3Api, setWeb3Api] = useState({
    web3: null,
    signer: null,
    provider: null,
    isLoading: null,
  });

  const setUp = async () => {
    const web3Modal = new Web3Modal();
    const wallet = web3Modal.providerController.injectedProvider;
    if (wallet) {
      const connection = await web3Modal.connect();
      if (connection) {
        const web3 = new Web3(provider);
        const provider = new ethers.providers.Web3Provider(connection);
        const signer = provider.getSigner();

        setWeb3Api({
          web3,
          provider,
          connection,
          isLoading: false,
          signer,
        });
      } else {
        setWeb3Api((api) => ({ ...api, isLoading: false }));
        console.error("Please install metamask");
      }
    }
  };

  useEffect(() => {
    setUp();
  }, []);

  const _web3Api = useMemo(() => {
    const { web3, provider } = web3Api;

    return {
      ...web3Api,
      isWeb3Loaded: web3 !== null,
      connect: provider
        ? async () => {
            if (localStorage.account) {
              return localStorage.account;
            }
            try {
              const web3Modal = new Web3Modal();
              const provider = await web3Modal.connect();
              const web3 = new Web3(provider);
              const accounts = await web3.eth.getAccounts();
              return accounts[0];
            } catch (error) {
              console.error("Can not retrieve account!");
            }
          }
        : () => console.log("Install metamask"),
    };
  }, [web3Api]);

  return (
    <Web3Context.Provider value={_web3Api}>{children}</Web3Context.Provider>
  );
}

export function useWeb3() {
  return useContext(Web3Context);
}
