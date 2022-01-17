import React from "react";
import Image from "next/image";

const InfoBlocks = ({ svg, color, title, text }) => {
  return (
    <div className='md:mr-244'>
      <div className="-translate-x-3 pb-8">
        <Image src={svg} width={85} height={85} alt={title} />
      </div>

      <h3 className='title-font pb-6'>{title}</h3>
      <p className='w-244 text-sans leading-6'>{text}</p>
    </div>
  );
};

export default InfoBlocks;
