import { Link } from "react-router-dom";
import './LandingPage.css'; 
import findus from "../../assets/findus.png";

function LandingPage() {
  return (
    <div className="landing-page bg-black text-white flex justify-center items-center min-h-screen p-6">
      
      {/* Left Side - Sign Up Form */}
      <div className="signup-container bg-white shadow-lg rounded-lg p-8 max-w-md w-full">
        <h2 className="text-2xl font-bold mb-6 text-center text-black">Sign Up</h2>
        <input className="border p-3 w-full mb-4 rounded" type="text" placeholder="Full Name" />
        <input className="border p-3 w-full mb-4 rounded" type="email" placeholder="Email" />
        <input className="border p-3 w-full mb-4 rounded" type="password" placeholder="Password" />
        <button className="bg-golden text-black px-4 py-3 rounded-lg w-full">Create Account</button>
        <p className="mt-4 text-sm text-center">
          Already have an account? <Link to="/signin" className="text-golden">Sign In</Link>
        </p>
      </div>

      {/* Right Side - Image */}
      <div className="image-container flex justify-center items-center ml-8">
        <img 
          src={findus} 
          alt="Find Us" 
          className="w-72 h-auto" 
        />
      </div>
      
    </div>
  );
}

export default LandingPage;
