"use client"

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import NavList from './NavList';
const Nav = ({ absolutePos }) => {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [name, setName] = useState('');
  const [profilePic, setProfilePic] = useState('');

  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
    console.log(isNavOpen);
  };

  useEffect(() => {
    const storedName = localStorage.getItem('name');
    const storedProfilePic = localStorage.getItem('profilePic');
    setName(storedName || '');
    setProfilePic(storedProfilePic || '');
  }, [name, profilePic]);

  return (
    <header>
      <div className="logo" >
        <img src="https://i.postimg.cc/63Cn0Tr3/greenletter-A.jpg" alt="dev And" />
      </div>
      <button className={`nav-toggle`} aria-label="toggle navigation" onClick={toggleNav}>
        <span className={`hamburger`}></span>
      </button>
      <div className="right-nav"> 
      {name && profilePic && (
        <div className="user-info">
          <span className="user-name">{name}</span>
          <img src={profilePic} alt="User Profile" className="profile-pic" />
        </div>
      )}
      <nav className={`nav`}>
        <NavList />
      </nav>
      </div>
      
    </header>
  );
};
export default Nav;