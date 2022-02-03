import { useEffect, useState } from "react";
import Base from "@components/ui/base";

import MintedAvatars from "@components/mintedAvatars";
import { useWeb3 } from "@components/web3";

function MyAssets() {
  const { signer, loadNFTs, provider, myNFTs, isLoading } = useWeb3();

  useEffect(() => {
    if (signer && !isLoading) {
      console.log(loadNFTs);
      loadNFTs(signer, "my-nfts", provider);
    }
  }, [signer]);

  if (!isLoading && !myNFTs.length)
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
      {myNFTs && <MintedAvatars nfts={myNFTs} title={"My NFT's"} />}
    </section>
  );
}

const Wrapper = ({ ...props }) => (
  <Base>
    <MyAssets {...props} />
  </Base>
);

export default Wrapper;
