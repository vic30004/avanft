import { Card } from "..";

export default function MintedAvatars({ nfts, buyNft }) {
  return (
    <section className='md:pl-123 pt-10 bg-blue'>
      <h1 className='title-font text-2xl text-center md:text-left'>
        Minted Avatars
      </h1>
      <div className='grid grid-cols-1 md:grid-cols-5'>
        {nfts.map((i) => (
          <Card
            key={i.tokenId}
            title={i.name}
            price={i.price}
            description={i.description}
            picture={i.image}
            handleClick={buyNft}
            token={i}
          />
        ))}
      </div>
    </section>
  );
}
