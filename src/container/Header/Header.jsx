import React, { useState } from 'react';
import images from '../../constants/images';
import './Header.css';
import { SubHeading } from '../../components';
import { searchYelp } from '../../api/yelpApi';

const Header = ({ handleSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [location, setLocation] = useState('');
  const [category, setCategory] = useState('gluten_free');
  const [isSearching, setIsSearching] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSearching(true);
    try {
      const searchResults = await searchYelp(`${searchTerm} ${category}`, location);
      handleSearch(searchResults);
    } catch (error) {
      console.error('Yelp API error:', error);
    } finally {
      setIsSearching(false);
    }
  };

  return (
    <div className='app__header app__wrapper section__padding' id='home'>
      <div className='app__wrapper_info'>
        <SubHeading title='Chase the new flavor' />
        <h1 className='app__header-h1'>Find Your Restaurant</h1>
        <p className='p__opensans' style={{ margin: '2rem 0' }}>
          Sit tellus lobortis sed senectus vivamus molestie. Condimentum volutpat morbi facilisis quam scelerisque sapien.
        </p>

        <form onSubmit={handleSubmit} className="app__search-container">
          <input
            type="text"
            placeholder="Search for restaurants..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="app__search-input"
            required
          />
          <input
            type="text"
            placeholder="Location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="app__search-input"
            required
          />
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="app__search-input"
          >
            <option value="gluten_free">Gluten Free</option>
            <option value="vegan">Vegan</option>
            <option value="vegetarian">Vegetarian</option>
            <option value="halal">Halal</option>
            <option value="kosher">Kosher</option>
            <option value="allergy friendly">Allergy Friendly</option>
          </select>
          <button
            type="submit"
            className="custom__button"
            disabled={isSearching}
          >
            {isSearching ? 'Searching...' : 'Search Yelp'}
          </button>
        </form>
      </div>

      <div className='app__wrapper_img'>
        <img src={images.welcome} alt="header img" />
      </div>
    </div>
  );
};

export default Header;