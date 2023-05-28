"use client"

import { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
const Nav = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const router = useRouter();
  
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
    console.log(isNavOpen);
  };

  const handleNavLinkClick = (link) => {
    document.body.classList.remove('nav-open');
    if (isClient) {
      router.push(link);
    }
  };
  return (
    <header>
      <div className="logo">
        <Image src="/images/profile-pic.jpg" alt="dev And" width={100} height={100} />
      </div>
      <button className="nav-toggle" aria-label="toggle navigation" onClick={toggleNav}>
        <span className="hamburger"></span>
      </button>
      <nav className={`nav ${isNavOpen ? 'nav-open' : ''}`}>
        <ul className="nav__list">
          <li className="nav__item">
            <button className="nav__link" onClick={() => handleNavLinkClick('#home')}>
              Home
            </button>
          </li>
          <li className="nav__item">
            <button className="nav__link" onClick={() => handleNavLinkClick('#services')}>
              My Services
            </button>
          </li>
          <li className="nav__item">
            <button className="nav__link" onClick={() => handleNavLinkClick('#about')}>
              About me
            </button>
          </li>
          <li className="nav__item">
            <button className="nav__link" onClick={() => handleNavLinkClick('#work')}>
              My Work
            </button>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Nav;
