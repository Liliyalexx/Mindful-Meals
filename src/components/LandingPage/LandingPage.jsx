import { Link } from "react-router-dom";
import './LandingPage.css'; 
import knifeImage from "../../assets/knife.png";

function LandingPage() {
  return (
    <div className="landing-page bg-black text-white flex flex-col justify-center items-center min-h-screen p-6">
      
      {/* Welcome Section */}
      <div className="welcome-container bg-white shadow-lg rounded-lg p-8 text-center max-w-lg w-full mx-4 mt-8">
        <h1 className="text-3xl font-bold mb-4 text-white">Welcome to Mindful Meals</h1>
        <p className="mb-6 text-black">Find the best gluten-free restaurants near you!</p>
      </div>

      {/* Two containers for Sign In and Sign Up */}
      <div className="flex space-x-8 w-full max-w-6xl">
        {/* Sign In Container */}
        <div className="auth-container bg-white shadow-lg rounded-lg p-8 max-w-md w-full mx-4">
          <h2 className="text-2xl font-bold mb-6 text-center text-black">Sign In</h2>
          <input className="border p-3 w-full mb-4 rounded" type="email" placeholder="Email" />
          <input className="border p-3 w-full mb-4 rounded" type="password" placeholder="Password" />
          <button className="bg-golden text-black px-4 py-3 rounded-lg w-full">Sign In</button>
          <p className="mt-4 text-sm text-center">
            Don't have an account? <Link to="/signup" className="text-golden">Sign Up</Link>
          </p>
        </div>

        {/* Image of Knife */}
        <div className="knife-container flex justify-center items-center">
          <img 
            src={knifeImage} 
            alt="Knife" 
            className="w-24 h-24 mx-4" 
          />
        </div>

        {/* Sign Up Container */}
        <div className="auth-container bg-white shadow-lg rounded-lg p-8 max-w-md w-full mx-4">
          <h2 className="text-2xl font-bold mb-6 text-center text-black">Sign Up</h2>
          <input className="border p-3 w-full mb-4 rounded" type="text" placeholder="Full Name" />
          <input className="border p-3 w-full mb-4 rounded" type="email" placeholder="Email" />
          <input className="border p-3 w-full mb-4 rounded" type="password" placeholder="Password" />
          <button className="bg-golden text-black px-4 py-3 rounded-lg w-full">Create Account</button>
          <p className="mt-4 text-sm text-center">
            Already have an account? <Link to="/signin" className="text-golden">Sign In</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
