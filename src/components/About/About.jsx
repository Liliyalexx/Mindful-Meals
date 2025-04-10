import React from 'react';
import './About.css';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import yelpIcon from '../../assets/yelpSearch.png';

const About = () => {
    const navigate = useNavigate();

    return (
        <div className="about-container">
            {/* Back button outside of description */}
            <div className="button-section">
                <button onClick={() => navigate('/')} className="back-button">
                <FaArrowLeft /> Back
                </button>
            </div>

            {/* About section */}
            <h1 className="about-title">About Mindful Meals</h1>
            <p className="about-description">
                Welcome to Mindful Meals, a place where you can find restaurants that suit your dietary needs and preferences. Whether you're looking for gluten-free, vegan, or allergy-friendly options, we have it all!
            </p>
            <p className="about-description">
                Our mission is to make dining out easier for everyone by providing personalized recommendations that fit your lifestyle.
            </p>

            {/* Powered by Yelp with icon */}
            <div className="powered-by">
                <img src={yelpIcon} alt="Yelp logo" className="yelp-icon" />
                <p>Powered by <a href="https://www.yelp.com" target="_blank" rel="noopener noreferrer" className="yelp-link">Yelp</a></p>
            </div>
        </div>
    );
};

export default About;
