import {useState} from 'react';
import HamburgerMenu from "./HamburgerMenu";
import NavList from "./NavList";

export default function Nav() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <section className=''>
      <nav className='bg-blue-light md:pl-123 h-16 pl-10'>
        <div className='flex justify-between items-center h-full'>
          <div>
            <a className='title-font text-xl' href=''>
              AVANFT
            </a>
          </div>
          <HamburgerMenu setIsOpen={setIsOpen}/>
          
          <NavList />
        </div>
      </nav>
    </section>
  );
}
