import { Link, useNavigate } from "react-router-dom";
import './LandingPage.css'; 
import images from '../../constants/images';

function LandingPage() {
  const navigate = useNavigate();
  
  const handleSignUp = () => {
    // Here you would typically handle the signup logic
    // For now, just navigate to home
    onSignUp();
    navigate("/home"); 
  };

  return (
    <div className="landing-page bg-black text-white min-h-screen p-6 flex flex-col md:flex-row justify-center items-center">
      <div className="signup-container bg-white shadow-lg rounded-lg p-8 w-full max-w-md mb-8 md:mb-0 md:mr-8">
        <h2 className="text-2xl font-bold mb-6 text-center text-black">Sign Up</h2>
        <input className="border p-3 w-full mb-4 rounded" type="text" placeholder="Full Name" />
        <input className="border p-3 w-full mb-4 rounded" type="email" placeholder="Email" />
        <input className="border p-3 w-full mb-4 rounded" type="password" placeholder="Password" />
        <button className="bg-golden text-black px-4 py-3 rounded-lg w-full" onClick={handleSignUp}>Create Account</button>
        <p className="mt-4 text-sm text-center">
          Already have an account? <Link to="/signin" className="text-golden">Sign In</Link>
        </p>
      </div>

      <div className="image-container flex justify-center items-center">
        <img 
          src={images.findus} 
          alt="Find Us" 
          className="w-72 h-auto" 
        />
      </div>
    </div>
  );
}

export default LandingPage;