import { useEffect, useState } from "react";
import Base from "@components/ui/base";
import { ethers } from "ethers";
import axios from "axios";
import MintedAvatars from "@components/mintedAvatars";
import { nftaddress, nftmarketaddress } from "config";
import NFT from "../artifacts/contracts/NFT.sol/NFT.json";
import AvanftMarket from "../artifacts/contracts/AvanftMarket.sol/AvanftMarket.json";
import { useWeb3 } from "@components/web3";

function MyAssets() {
  const [nfts, setNfts] = useState();
  const [loadingState, setLoadingState] = useState(false);
  const { signer, provider } = useWeb3();

  async function loadNFTs() {
    // get msg.sender hook up to the signer to display the owner nfts

    const tokenContract = new ethers.Contract(nftaddress, NFT.abi, provider);
    const marketContract = new ethers.Contract(
      nftmarketaddress,
      AvanftMarket.abi,
      signer
    );

    const data = await marketContract.fetchMyNFTs();
    const items = await Promise.all(
      data.map(async (i) => {
        const tokenUri = await tokenContract.tokenURI(i.tokenId);
        // we want to get the token metadata - json
        const meta = await axios.get(tokenUri);
        let price = ethers.utils.formatUnits(i.price.toString(), "ether");
        let item = {
          price,
          tokenId: i.tokenId.toNumber(),
          seller: i.seller,
          owener: i.owner,
          image: meta.data.image,
          name: meta.data.name,
          description: meta.data.description,
        };
        return item;
      })
    );
    setNfts(items);
    setLoadingState(true);
  }
  console.log(signer);
  useEffect(() => {
    if (signer && provider) {
      loadNFTs();
    }
  }, [signer, provider]);

  if (loadingState && !nfts.length)
    return (
      <section className='pt-40'>
        {" "}
        <h1 className='text-center title-font text-6xl'>My NFT's</h1>
        <h2 className='px-20 py-7 text-xl text-center'>
          You do not own any NFTs currently
        </h2>
      </section>
    );

  return (
    <section className='pt-40'>
      <h1 className='text-center title-font text-6xl'>My NFT's</h1>
      {nfts && <MintedAvatars nfts={nfts} />}
    </section>
  );
}

const Wrapper = ({ ...props }) => (
  <Base>
    <MyAssets {...props} />
  </Base>
);

export default Wrapper;
