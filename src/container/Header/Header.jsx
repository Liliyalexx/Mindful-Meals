import React, { useState, useEffect, useRef  } from 'react';
import images from '../../constants/images';
import './Header.css';
import { SubHeading } from '../../components';
import { searchYelp } from '../../api/yelpApi';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
const Header = ({ handleSearch, hasResults, isLoading, restaurants }) => {
  const mapRef = useRef(null);
  useEffect(() => {
    if (!mapRef.current || !restaurants?.length) return;

    const map = L.map(mapRef.current).setView(
      [restaurants[0].coordinates.latitude, restaurants[0].coordinates.longitude], 
      13
    );

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors'
    }).addTo(map);

    restaurants.forEach(biz => {
      L.marker([biz.coordinates.latitude, biz.coordinates.longitude])
        .bindPopup(`<b>${biz.name}</b><br>Rating: ${biz.rating} ★`)
        .addTo(map);
    });

    return () => map.remove();
  }, [restaurants]);



  const [searchTerm, setSearchTerm] = useState('');
  const [location, setLocation] = useState('');
  const [category, setCategory] = useState('gluten_free');
  const [isSearching, setIsSearching] = useState(false);


  const dietaryOptions = [
    { value: 'gluten_free', label: 'Gluten Free' },
    { value: 'vegan', label: 'Vegan' },
    { value: 'vegetarian', label: 'Vegetarian' },
    { value: 'halal', label: 'Halal' },
    { value: 'kosher', label: 'Kosher' },
    { value: 'allergy_friendly', label: 'Allergy Friendly' }
  ];
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSearching(true);
    try {
      await handleSearch(searchTerm, location, category); // Pass the parameters
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
            {dietaryOptions.map(option => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
          <button
            type="submit"
            className="custom__button"
            disabled={isSearching}
          >
            <img
          src={images.yelpSearch}
          alt="Yelp Logo"
          className="yelp-logo"
        />
            {isSearching ? 'Searching...' : 'Search Yelp'}
          </button>
        </form>
      </div>

      <div className="app__wrapper_img">
      <div className = 'map' ref={mapRef} style={{ height: '500px', width: '700px', borderRadius: '8px', borderColor: 'gold' }} />
      </div>
    </div>
  );
};

export default Header;
