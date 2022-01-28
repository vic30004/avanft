import { useState } from "react";
import Link from "next/link";

const HamburgerMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <div
        className='p-4 ml-60 space-y-2 bg-blue rounded shadow lg:hidden relative'
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? (
          <>
            <span className='block w-8 h-0.5 bg-blue-dark animate-pulse rotate-45 absolute top-6'></span>
            <span className='block w-8 h-0.5 bg-blue-dark animate-pulse -rotate-45 '></span>
          </>
        ) : (
          <>
            <span className='block w-8 h-0.5 bg-blue-dark animate-pulse'></span>
            <span className='block w-8 h-0.5 bg-blue-dark animate-pulse'></span>
            <span className='block w-8 h-0.5 bg-blue-dark animate-pulse'></span>
          </>
        )}
      </div>
      <ul
        className={`absolute ${
          isOpen ? "flex" : "hidden"
        } flex-col space-y-6 mt-14 p-6 top-0 right-2 bg-blue shadow-md rounded`}
      >
        <li className=''>
          <Link href='mint-nft'>Mint NFT</Link>
        </li>
        <li>My NFT's</li>
        <li>Connect Account</li>
      </ul>
    </>
  );
};

export default HamburgerMenu;
