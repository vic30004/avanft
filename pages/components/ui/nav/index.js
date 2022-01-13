export default function Nav() {
  return (
    <section className=''>
      <nav className='bg-blue-light pl-123 h-16'>
        <div className='flex justify-between items-center h-full'>
          <div>
            <a className='title-font text-xl' href=''>
              AVANFT
            </a>
          </div>
          <div className='flex items-center h-full'>
            <div className='mr-10 text-xl'>
              <a href=''>Mint NFT</a>
            </div>
            <div className='mr-10 text-xl'>
              <a href=''>My NFTs</a>
            </div>
            <div className='mr-10 text-xl border-2 rounded-md border-purple-dark'>
              <button className='py-1 px-3 '>Connect Account</button>
            </div>
          </div>
        </div>
      </nav>
    </section>
  );
}
