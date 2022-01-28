import { useState } from "react";
import HamburgerMenu from "./HamburgerMenu";
import NavList from "./NavList";
import Link from "next/link";
import { useWeb3 } from "@components/web3";

export default function Nav() {
  const [isOpen, setIsOpen] = useState(false);
  const { connect, isLoading } = useWeb3();
  return (
    <section className=''>
      <nav className='bg-blue-light md:pl-123 h-16 pl-10'>
        <div className='flex justify-between items-center h-full'>
          <div>
            <Link className='title-font text-xl' href='/'>
              AVANFT
            </Link>
          </div>
          <HamburgerMenu setIsOpen={setIsOpen} />

          <NavList connect={connect} isLoading={isLoading} />
        </div>
      </nav>
    </section>
  );
}
