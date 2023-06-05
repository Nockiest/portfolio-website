"use client"

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import NavList from './NavList';

const Nav = ({ absolutePos }) => {
  const [isNavOpen, setIsNavOpen] = useState(false);

  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
    console.log(isNavOpen);
  };

  // Retrieve name and profilePic from localStorage
  const name = localStorage.getItem('name');
  const profilePic = localStorage.getItem('profilePic');

  return (
    <header className={absolutePos ? 'absolute-header' : ''}>
      <div className={`logo ${absolutePos ? 'logo-absolute' : ''}`}>
        <img src="https://i.postimg.cc/63Cn0Tr3/greenletter-A.jpg" alt="dev And" />
      </div>
      <button className={`nav-toggle ${absolutePos ? 'nav-toggle-absolute' : ''}`} aria-label="toggle navigation" onClick={toggleNav}>
        <span className="hamburger"></span>
      </button>
      <nav className={`nav ${isNavOpen ? 'nav-open' : ''}`}>
        <NavList />
      </nav>

      {name && profilePic && (
        <div className="user-info">
          <span className="user-name">{name}</span>
          <img src={profilePic} alt="User Profile" className="profile-pic" />
        </div>
      )}
    </header>
  );
};

export default Nav;