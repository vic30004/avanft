import { Card } from "..";

export default function MintedAvatars({ nfts, buyNft, title }) {
  return (
    <section className='md:pl-123 pt-10 bg-blue'>
      <h1 className='title-font text-l md:text-2xl text-center md:text-left'>
        {title ? title : "Minted Avatars"}
      </h1>
      <div className='grid grid-cols-1 md:grid-cols-5 justify-items-center	md:justify-items-start'>
        {nfts.map((i) => (
          <Card
            key={i.tokenId}
            title={i.name}
            price={i.price}
            description={i.description}
            picture={i.image}
            handleClick={buyNft}
            assets={i.assets}
            token={i}
            sold={i.sold}
            owner={i.owner}
          />
        ))}
      </div>
    </section>
  );
}
