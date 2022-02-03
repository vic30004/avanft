import { ethers } from "ethers";
import Web3Modal from "web3modal";
import { createContext, useEffect, useState, useContext, useMemo } from "react";
import Web3 from "web3";
const Web3Context = createContext(null);
import axios from "axios";
import { nftaddress, nftmarketaddress } from "config";
import NFT from "../../artifacts/contracts/NFT.sol/NFT.json";
import AvanftMarket from "../../artifacts/contracts/AvanftMarket.sol/AvanftMarket.json";

export default function Web3Provider({ children }) {
  const [web3Api, setWeb3Api] = useState({
    web3: null,
    signer: null,
    provider: null,
    isLoading: null,
    myNFTs: [],
    soldNFTs: [],
  });

  const getData = async (marketContract, type) => {
    if (type === "my-nfts") {
      return await marketContract.fetchMyNFTs();
    } else if (type === "personal") {
      return await marketContract.fetchItemsCreated();
    }
    return marketContract.fetchMarketTokens();
  };

  const getMarketContract = (type, signer, contract) => {
    if (type !== "my-nfts" && type !== "personal") {
      return new ethers.Contract(nftmarketaddress, contract.abi, provider);
    } else {
      return new ethers.Contract(nftmarketaddress, contract.abi, signer);
    }
  };

  const getSoldItems = (type, items) => {
    if (type === "personal") {
      const soldItems = items.filter((i) => i.sold);
      console.log(soldItems);
      setWeb3Api((api) => ({ ...api, soldNFTs: soldItems }));
    }
  };

  const loadNFTs = async (signer, type, provider) => {
    setWeb3Api((api) => ({ ...api, isLoading: true }));

    const tokenContract = new ethers.Contract(nftaddress, NFT.abi, provider);

    const marketContract = getMarketContract(type, signer, AvanftMarket);

    const data = await getData(marketContract, type);

    const items = await Promise.all(
      data.map(async (i) => {
        if (!i) {
          return [];
        }
        const tokenUri = await tokenContract.tokenURI(i.tokenId);
        // we want to get the token metadata - json
        const meta = await axios.get(tokenUri);
        let price = ethers.utils.formatUnits(i.price.toString(), "ether");
        let item = {
          price,
          tokenId: i.tokenId.toNumber(),
          seller: i.seller,
          owner: i.owner,
          sold: i.sold,
          image: meta.data.image,
          name: meta.data.name,
          assets: meta.data.assets,
          description: meta.data.description,
        };
        console.log(item, "item");
        return item;
      })
    );

    setWeb3Api((api) => ({ ...api, myNFTs: items }));
    getSoldItems(type, items);
    setWeb3Api((api) => ({ ...api, isLoading: false }));
  };

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
          myNFTs: [],
          soldNFTs: [],
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
      loadNFTs,
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
