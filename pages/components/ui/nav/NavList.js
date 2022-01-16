const NavList = () => {
  return (
    <div>
      <div className='lg:flex items-center h-full hidden'>
        <div className='md:mr-10 md:text-xl'>
          <a href=''>Mint NFT</a>
        </div>
        <div className='md:mr-10 md:text-xl'>
          <a href=''>My NFTs</a>
        </div>
        <div className='md:mr-10 md:text-xl border-2 rounded-md border-purple-dark'>
          <button className='py-1 px-3 '>Connect Account</button>
        </div>
      </div>
    </div>
  );
};

export default NavList;
