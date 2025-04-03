import React, { useState } from 'react';
import { GiHamburgerMenu } from 'react-icons/gi';
import { MdOutlineRestaurantMenu } from 'react-icons/md';
import './Navbar.css'; // Ensure you have this linked to apply styles

const Navbar = () => {
  const [toggleMenu, setToggleMenu] = useState(false);

  return (
    <nav className='app__navbar'>
      <div className='app__navbar-logo'>
        {/* <img src={images.gericht} alt="logo" /> */}
      </div>

      <ul className='app__navbar-links'>
        <li><a href="#home">Home</a></li>
        <li><a href="#about">About</a></li>
        <li><a href="#awards">Awards</a></li>
        <li><a href="#gallery">Gallery</a></li>
        <li><a href="#contact">Contact Us</a></li>
      </ul>

      <div className="app__navbar-login">
        <a href="#login">Login / Register</a>
        <div className="divider"></div>
        <a href="/">Book Table</a>
      </div>

      <div className='app__navbar-smallscreen'>
        <GiHamburgerMenu className="menu-icon" onClick={() => setToggleMenu(true)} />

        {toggleMenu && (
          <div className='app__navbar-smallscreen_overlay'>
            <MdOutlineRestaurantMenu className='overlay__close' onClick={() => setToggleMenu(false)} />
            <ul className='app__navbar-smallscreen_links'>
              <li><a href="#home">Home</a></li>
              <li><a href="#about">About</a></li>
              <li><a href="#menu">Menu</a></li>
              <li><a href="#awards">Awards</a></li>
              <li><a href="#contact">Contact Us</a></li>
            </ul> 
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
