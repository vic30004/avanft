import InfoBlocks from "./InfoBlocks";

export default function HowItWorks() {
  return (
    <section className='md:pl-123 pt-10 bg-blue-light'>
      <h1 className='title-font text-2xl text-center md:text-left'>How It Works</h1>
      <div className='flex flex-wrap py-8 md:w-2/3 items-center md:justify-start justify-center'>
        <InfoBlocks
          svg={
            "https://res.cloudinary.com/dawyijhjw/image/upload/v1642453178/AVANFT/earth-alt-svgrepo-com_1_aangsr.svg"
          }
          title={"Browse NFTs"}
          text={"Browse through the website and find an avatar you like."}
        />
        <InfoBlocks
          svg={
            "https://res.cloudinary.com/dawyijhjw/image/upload/v1642453126/AVANFT/cart_mesxep.svg"
          }
          title={"Make A Purchase"}
          text={"Purchase the one and only avatar and make it yours."}
        />
        <InfoBlocks
          svg={
            "https://res.cloudinary.com/dawyijhjw/image/upload/v1642453272/AVANFT/import-svgrepo-com_1_zmr0qq.svg"
          }
          title={"Download Assets"}
          text={"Downalod the assets for your newly pruchased NFT."}
        />
        <InfoBlocks
          svg={
            "https://res.cloudinary.com/dawyijhjw/image/upload/v1642453272/AVANFT/folder-open-svgrepo-com_1_i8yna9.svg"
          }
          title={"Load The Assets"}
          text={
            "Upload your assets to a game like vr chat and enjoy masquarading as your new avatar."
          }
        />
      </div>
    </section>
  );
}
