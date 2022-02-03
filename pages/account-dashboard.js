import { useEffect } from "react";
import { useWeb3 } from "@components/web3";
import Base from "@components/ui/base";
import MintedAvatars from "@components/mintedAvatars";

function AccountDashboard() {
  const { signer, provider, loadNFTs, myNFTs, soldNFTs, isLoading } = useWeb3();

  useEffect(() => {
    if (signer && !isLoading) {
      loadNFTs(signer, "personal", provider);
    }
  }, [signer]);

  if (!isLoading && !myNFTs.length)
    return (
      <section className='pt-40'>
        {" "}
        <h1 className='text-center title-font text-6xl'>Account Dashboard</h1>
        <h2 className='px-20 py-7 text-xl text-center'>
          You do not own any NFTs currently
        </h2>
      </section>
    );
  console.log("Hello");
  return (
    <section className='pt-40'>
      <h1 className='text-center title-font text-2xl md:text-6xl'>Account Dashboard</h1>
      {myNFTs && <MintedAvatars nfts={myNFTs} title={"Minted NFT's"} />}
      {myNFTs && <MintedAvatars nfts={soldNFTs} title={"Sold NFTs"} />}
    </section>
  );
}

const Wrapper = ({ ...props }) => (
  <Base>
    <AccountDashboard {...props} />
  </Base>
);

export default Wrapper;
