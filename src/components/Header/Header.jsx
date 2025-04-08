import React, { useState, useEffect, useRef  } from 'react';
import 'leaflet/dist/leaflet.css';
import './Header.css';
import  SubHeading from '../../components/SubHeading/SubHeading';
import { searchYelp } from '../../api/yelpApi';
import L from 'leaflet';
import yelpLogo from '../../assets/yelpSearch.png';

const Header = ({ handleSearch, restaurants }) => {
  const mapRef = useRef(null);
  useEffect(() => {
    if (!mapRef.current || !restaurants?.length) return;

    const map = L.map(mapRef.current).setView(
      [restaurants[0].coordinates.latitude, restaurants[0].coordinates.longitude], 
      13
    );

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap'
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
      await handleSearch(searchTerm, location, category); 
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
           <img src={yelpLogo} alt="Yelp Logo" />

            {isSearching ? 'Searching...' : 'Search Yelp'}
          </button>
        </form>
      </div>
        {/* Map below the search form */}
  <div className='map-container' style={{ marginTop: '3rem' }}>
    <div className='map' ref={mapRef} style={{ height: '500px', width: '700px', borderRadius: '8px', border: '3px solid gold' }} />
  </div>
    </div>
  );
};

export default Header;




