import Base from "@components/ui/base";
import HeroHead from "@components/heroHead";
import HowItWorks from "@components/howItWorks";
import MintedAvatars from "@components/mintedAvatars";
import { ethers } from "ethers";
import { useEffect, useState } from "react";
import axios from "axios";
import Web3Modal from "web3modal";
import { nftaddress, nftmarketaddress } from "../config";
import NFT from "../artifacts/contracts/NFT.sol/NFT.json";
import AvanftMarket from "../artifacts/contracts/AvanftMarket.sol/AvanftMarket.json";
import { getSigner } from "@components/web3";

function Home() {
  const [nfts, setNfts] = useState([]);
  const [loadingState, setLoadingState] = useState("not-loaded");
  useEffect(() => {
    loadNFTs();
  }, []);
  async function loadNFTs() {
    /* create a generic provider and query for unsold market items */
    const provider = new ethers.providers.JsonRpcProvider();
    const tokenContract = new ethers.Contract(nftaddress, NFT.abi, provider);
    const marketContract = new ethers.Contract(
      nftmarketaddress,
      AvanftMarket.abi,
      provider
    );
    const data = await marketContract.fetchMarketTokens();

    /*
     *  map over items returned from smart contract and format
     *  them as well as fetch their token metadata
     */
    const items = await Promise.all(
      data.map(async (i) => {
        const tokenUri = await tokenContract.tokenURI(i.tokenId);
        const meta = await axios.get(tokenUri);
        let price = ethers.utils.formatUnits(i.price.toString(), "ether");
        let item = {
          price,
          tokenId: i.tokenId.toNumber(),
          seller: i.seller,
          owner: i.owner,
          image: meta.data.image,
          name: meta.data.name,
          description: meta.data.description,
        };
        return item;
      })
    );
    setNfts(items);
    setLoadingState("loaded");
  }

  async function buyNft(nft) {
    // /* needs the user to sign the transaction, so will use Web3Provider and sign it */
    // const signer = await getSigner()

    // const contract = new ethers.Contract(nftmarketaddress, AvanftMarket.abi, signer);

    // /* user will be prompted to pay the asking proces to complete the transaction */
    // const price = ethers.utils.parseUnits(nft.price.toString(), "ether");
    // const transaction = await contract.createMarketSale(
    //   nftaddress,
    //   nft.tokenId,
    //   {
    //     value: price,
    //   }
    // );
    // await transaction.wait();
    // loadNFTs();
    return [];
  }

  return (
    <>
      <HeroHead />
      <HowItWorks />
      <MintedAvatars nfts={nfts} buyNft={buyNft} />
    </>
  );
}

const Wrapper = ({ ...props }) => (
  <Base>
    <Home {...props} />
  </Base>
);

export default Wrapper;
