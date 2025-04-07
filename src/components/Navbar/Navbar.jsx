import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import images from '../../constants/images';
import { GiHamburgerMenu } from 'react-icons/gi';
import { MdOutlineRestaurantMenu } from 'react-icons/md';

const Navbar = ({ 
  isAuthenticated, 
  onLoginClick, 
  onSignupClick, 
  onLogoutClick,
  showAuthForm,
  setShowAuthForm
}) => {
  const [toggleMenu, setToggleMenu] = React.useState(false);

  return (
    <nav className='app__navbar'>
      <div className='app__navbar-logo'>
        <Link to="/">
          <img src={images.mindfulMeals} alt="logo" />
        </Link>
      </div>

      <ul className='app__navbar-links'>
        <li className='p__opensans'><Link to="/">Home</Link></li>
        <li className='p__opensans'><a href="#about">About</a></li>
        <li className='p__opensans'><a href="#gallery">Gallery</a></li>
        <li className='p__opensans'><a href="#contact">Contact Us</a></li>
      </ul>
      
      <div className="app__navbar-login">
  {isAuthenticated ? (
    <>
      <button 
        onClick={onLogoutClick} 
        className="navbar-auth-button"
      >
        Logout
      </button>
      <div className="navbar-auth-divider" />
      <a href="/" className="navbar-auth-button">
        Book Table
      </a>
    </>
  ) : (
    <>
      <button 
        onClick={onLoginClick} 
        className="navbar-auth-button"
      >
        Login
      </button>
      <div className="navbar-auth-divider" />
      <button 
        onClick={onSignupClick} 
        className="navbar-auth-button"
      >
        Register
      </button>
    </>
  )}
</div>

      <div className='app__navbar-smallscreen'>
        <GiHamburgerMenu 
          color='#fff' 
          fontSize={27} 
          onClick={() => setToggleMenu(true)} 
        />

        {toggleMenu && (
          <div className='app__navbar-smallscreen_overlay flex__center slide-bottom'>
            <MdOutlineRestaurantMenu 
              fontSize={27} 
              className='overlay__close' 
              onClick={() => setToggleMenu(false)} 
            />
            <ul className='app__navbar-smallscreen_links'>
              <li className='p__opensans'><Link to="/">Home</Link></li>
              <li className='p__opensans'><a href="#about">About</a></li>
              <li className='p__opensans'><a href="#gallery">Gallery</a></li>
              <li className='p__opensans'><a href="#contact">Contact Us</a></li>
              {isAuthenticated ? (
                <li className='p__opensans'>
                  <button onClick={onLogoutClick}>Logout</button>
                </li>
              ) : (
                <>
                  <li className='p__opensans'>
                    <button onClick={() => {
                      onLoginClick();
                      setToggleMenu(false);
                    }}>Login</button>
                  </li>
                  <li className='p__opensans'>
                    <button onClick={() => {
                      onSignupClick();
                      setToggleMenu(false);
                    }}>Register</button>
                  </li>
                </>
              )}
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;