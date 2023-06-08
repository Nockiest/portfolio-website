// NavList.js
"use client"
import React, {useEffect} from "react"
import Link from 'next/link';

const NavList = () => {
  useEffect(() => {
    const navToggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelectorAll('.nav__link');

    const handleNavToggle = () => {
      console.log("toggling")
      document.body.classList.toggle('nav-open');
    };

    const handleNavLinkClick = () => {
      document.body.classList.remove('nav-open');
    };

    navToggle.addEventListener('click', handleNavToggle);

    navLinks.forEach((link) => {
      link.addEventListener('click', handleNavLinkClick);
    });

    return () => {
      navToggle.removeEventListener('click', handleNavToggle);

      navLinks.forEach((link) => {
        link.removeEventListener('click', handleNavLinkClick);
      });
    };
  }, []);



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
      <li className="nav__item">
        <Link href="/blog" className="nav__link">
          Blog
        </Link>
      </li>
    </ul>
  );
};

export default NavList;