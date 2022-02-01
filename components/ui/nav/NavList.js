import { useEffect, useState } from "react";
import Link from "next/link";

const NavList = ({ connect, isLoading }) => {
  const [account, setAccount] = useState();

  const handleConnect = async () => {
    const account = await connect();
    if (!account) return;
    localStorage.setItem("account", account);
    setAccount(account);
  };
  useEffect(() => {
    if (localStorage.getItem("account")) {
      setAccount(localStorage.account);
    }
  }, []);
  return (
    <div>
      <div className='lg:flex items-center h-full hidden'>
        <div className='md:mr-10 md:text-xl'>
          <Link href='mint-nft'>Mint NFT</Link>
        </div>
        <div className='md:mr-10 md:text-xl'>
          <Link href='my-nfts'>My NFTs</Link>
        </div>
        <div className='md:mr-10 md:text-xl border-2 rounded-md border-purple-dark'>
          {account ? (
            <div className='md:mr-10 md:text-xl'>{account} </div>
          ) : (
            <button className='py-1 px-3' onClick={handleConnect}>
              Connect Account
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default NavList;
