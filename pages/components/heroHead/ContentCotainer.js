import React from "react";
import { Button } from "..";
import Image from "next/image";

const ContentCotainer = () => {
  return (
    <>
      <div className='corner-shape bg-blue w-8/12 h-80 z-10 pt-10 md:pl-123 absolute left-0 top-0'>
        <h1 className='title-font text-6xl pb-7'>AVANFT</h1>
        <div>
          <p className='text-3xl mb-5'>
            Buy <span className='text-orange'>Avatars</span> of your favorite
          </p>
          <p className='text-3xl'>
            <span className='text-purple-reg'>NFTs</span> and use them in{" "}
            <span className='text-orange-dark'>VR</span>
          </p>
        </div>
        <Button text={"GET STARTED"} />
      </div>
      <div className='w-7/12 h-80 -z-50 absolute top-0 right-0 picture-shape'>
        <Image
          className='-z-50'
          src={
            "https://res.cloudinary.com/dawyijhjw/image/upload/c_fill,dpr_auto,fl_progressive,h_324,w_772/v1642378720/AVANFT/remy-gieling-Zf0mPf4lG-U-unsplash_bhxqu0.webp"
          }
          alt='vr-headset'
          layout='fill'
        />
      </div>
    </>
  );
};

export default ContentCotainer;
