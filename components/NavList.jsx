// NavList.js
import React from 'react';
import Link from 'next/link';

const NavList = () => {
  return (
    <ul className="nav__list">
      <li className="nav__item">
        <Link href="#home" className="nav__link">
          Home
        </Link>
      </li>
      <li className="nav__item">
        <Link href="#services" className="nav__link">
          My Services
        </Link>
      </li>
      <li className="nav__item">
        <Link href="#about" className="nav__link">
          About me
        </Link>
      </li>
      <li className="nav__item">
        <Link href="#work" className="nav__link">
          My Work
        </Link>
      </li>
    </ul>
  );
};

export default NavList;