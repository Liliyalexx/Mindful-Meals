import React from 'react';
import { Link } from 'react-router-dom';
import './LandingPage.css'; 


const LandingPage = () => {
  return (
    <div className="landing-page bg-black text-white min-h-screen p-6 flex flex-col md:flex-row justify-center items-center">
      <div className="signup-container bg-white shadow-lg rounded-lg p-8 w-full max-w-md mb-8 md:mb-0 md:mr-8">
        <h2 className="text-2xl font-bold mb-6 text-center text-black">Welcome!</h2>
        <p className="text-center mb-6">Join our community of tech enthusiasts. Sign up or sign in to get started.</p>
        <div className="flex justify-center">
          <Link to="/signin" className="bg-golden text-black px-4 py-3 rounded-lg mx-2">Sign In</Link>
          <Link to="/signup" className="bg-golden text-black px-4 py-3 rounded-lg mx-2">Sign Up</Link>
        </div>
      </div>
      <div className="image-container flex justify-center items-center">
        {/* <img
          src={welcome}
          alt="Welcome"
          className="w-72 h-auto"
        /> */}
      </div>
    </div>
  );
};

export default LandingPage;
