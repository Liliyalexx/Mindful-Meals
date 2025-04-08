// src/components/Navbar/Navbar.jsx
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { GiHamburgerMenu } from 'react-icons/gi';
import { MdOutlineRestaurantMenu } from 'react-icons/md';
import { useContext } from 'react';
import { UserContext } from '../../context/userContext.jsx';
import logo from '../../assets/mindful_meals.png';
import { FaHeart } from 'react-icons/fa';
import './Navbar.css';

const Navbar = () => {
  const [toggleMenu, setToggleMenu] = React.useState(false);
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    setUser(null);
    navigate('/');
  };

  return (
    <nav className='app__navbar'>
      <div className='app__navbar-logo'>
        <Link to="/">
          <img src={logo} alt="logo" />
        </Link>
      </div>

      <ul className='app__navbar-links'>
        <li className='navbar-link-item'><Link to="/">Home</Link></li>
        <li className='navbar-link-item'><a href="#about">About</a></li>
        <li className='navbar-link-item'><a href="#gallery">Gallery</a></li>
        <li className='navbar-link-item'><a href="#contact">Contact Us</a></li>
        {user && (
    <li className='navbar-link-item'>
      <Link to="/my-list" className="my-list-link">
        <FaHeart style={{ marginRight: '5px' }} /> My List
      </Link>
    </li>
  )}
</ul>
      
      
      <div className="app__navbar-login">
        {user ? (
          <>
            <button 
              onClick={handleLogout} 
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
              onClick={() => navigate('/sign-in')} 
              className="navbar-auth-button"
          >
              Login
          </button>
          <div className="navbar-auth-divider" />
          <button 
              onClick={() => navigate('/sign-up')} // Changed from '/landing'
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
              <li className='navbar-link-item'><Link to="/">Home</Link></li>
              <li className='navbar-link-item'><a href="#about">About</a></li>
              <li className='navbar-link-item'><a href="#gallery">Gallery</a></li>
              <li className='navbar-link-item'><a href="#contact">Contact Us</a></li>
              {user ? (
                <li className='navbar-link-item'>
                  <button onClick={handleLogout}>Logout</button>
                </li>
              ) : (
                <>
                  <li className='navbar-link-item'>
                    <button onClick={() => {
                      navigate('/sign-in');
                      setToggleMenu(false);
                    }}>Login</button>
                  </li>
                  <li className='navbar-link-item'>
                    <button onClick={() => {
                      navigate('/landing');
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