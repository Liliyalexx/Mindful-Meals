import React, { useState, useEffect, useRef } from 'react';
import 'leaflet/dist/leaflet.css';
import './Header.css';
import SubHeading from '../../components/SubHeading/SubHeading';
import L from 'leaflet';


const Header = ({ handleSearch, restaurants }) => {
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null); // to store Leaflet map instance
  const [cityCoordinates, setCityCoordinates] = useState(null); // Store coordinates
  const [formCoordinates, setFormCoordinates] = useState(null); // Store coordinates from form location

  const [searchTerm, setSearchTerm] = useState('');
  const [location, setLocation] = useState('');
  const [category, setCategory] = useState('');
  const [isSearching, setIsSearching] = useState(false);

  const dietaryOptions = [
    { value: 'gluten_free', label: 'Gluten Free' },
    { value: 'vegan', label: 'Vegan' },
    { value: 'vegetarian', label: 'Vegetarian' },
    { value: 'halal', label: 'Halal' },
    { value: 'kosher', label: 'Kosher' },
    { value: 'allergy_friendly', label: 'Allergy Friendly' },
  ];

  // Initialize map with coordinates
  const initializeMap = (lat, lng) => {
    if (!mapRef.current) return;

    // Clear any existing map
    if (mapInstanceRef.current) {
      mapInstanceRef.current.remove();
    }

    const map = L.map(mapRef.current).setView([lat, lng], 13);
    mapInstanceRef.current = map;

    // Add tile layer (background of the map)
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap',
    }).addTo(map);
  };

  // Update map markers based on restaurant data
  const updateMapMarkers = (restaurantList) => {
    if (!mapInstanceRef.current) return;

    // Remove previous markers
    mapInstanceRef.current.eachLayer((layer) => {
      if (layer instanceof L.Marker) {
        mapInstanceRef.current.removeLayer(layer);
      }
    });

    // Add markers based on restaurant data
    restaurantList.forEach((biz) => {
      if (biz.coordinates && biz.coordinates.latitude && biz.coordinates.longitude) {
        L.marker([biz.coordinates.latitude, biz.coordinates.longitude])
          .bindPopup(`<b>${biz.name}</b><br>Rating: ${biz.rating} ★`)
          .addTo(mapInstanceRef.current);
      }
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSearching(true);
    try {
      await handleSearch(searchTerm, location, category); // Perform Yelp search
    } catch (error) {
      console.error('Yelp API error:', error);
    } finally {
      setIsSearching(false);
    }
  };

  // Function to handle city input to latitude and longitude
  const handleLocationSubmit = async () => {
    // Use Yelp API or any geocoding service (e.g., Google Geocoding) to get coordinates from location
    // Here, we're assuming the location is passed as a string (e.g., "San Francisco").
    const geoCodeUrl = `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(location)}&key=YELP_API_KEY`;
    const response = await fetch(geoCodeUrl);
    const data = await response.json();
    const geoCoordinates = data.results[0]?.geometry;
    if (geoCoordinates) {
      setFormCoordinates({
        latitude: geoCoordinates.lat,
        longitude: geoCoordinates.lng,
      });
    }
  };

  // Use geolocation if formLocation is not provided
  useEffect(() => {
    if (!cityCoordinates) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setCityCoordinates({ latitude, longitude });
        },
        () => {
          setCityCoordinates({ latitude: 47.6062, longitude: -122.3321 }); // Fallback to Seattle if geolocation fails
        }
      );
    }
  }, []); // Run once on mount to get user's geolocation

  // Update map with markers whenever restaurants or form coordinates change
  useEffect(() => {
    const coordinates = formCoordinates || cityCoordinates; // Use form coordinates if provided
    if (coordinates) {
      const { latitude, longitude } = coordinates;
      initializeMap(latitude, longitude); // Initialize map with the new location

      if (restaurants?.length) {
        updateMapMarkers(restaurants); // Update markers with new restaurant data
      }
    }
  }, [formCoordinates, cityCoordinates, restaurants]); // Trigger map update when either cityCoordinates, formCoordinates or restaurants change

  return (
    <div className='app__header' id='home'>
      <div className='app__wrapper_info'>
        <SubHeading title='Where Taste Meets Your Lifestyle' />
        <h1 className='app__header-h1'>Find Your Restaurant</h1>
        <p className='p__opensans' style={{ margin: '2rem 0' }}>
          Discover restaurants tailored to your needs — whether you're gluten-free, vegan, or have specific dietary preferences. Mindful Meals helps you explore spots that align with your lifestyle, without the guesswork.
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
            className="app__search-input app__search-select"
            required
          >
            <option value="" disabled hidden>Select Dietary Preference</option>
            {dietaryOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <button
            type="submit"
            className="custom__button"
            disabled={isSearching}
            onClick={handleLocationSubmit} // Add this line for form submission
          >
            {isSearching ? 'Searching...' : 'Search'}
          </button>
        </form>
      </div>

      {/* Map below the search form */}
      <div className='map-container' style={{ marginTop: '3rem' }}>
        <div
          className='map'
          ref={mapRef}
          style={{
            height: '500px',
            width: '700px',
            borderRadius: '8px',
            border: '3px solid gold',
          }}
        />
      </div>
    </div>
  );
};

export default Header;
