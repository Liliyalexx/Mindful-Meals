import { Link, useNavigate } from "react-router-dom";
import './SignIn.css'; 
import images from '../../constants/images';

function SignIn({ onSignIn }) {
    const navigate = useNavigate();
    
  const handleSignIn = () => {
    onSignIn();
    navigate("/home"); 
  };

  return (
    <div className="signin-page bg-black text-white min-h-screen p-6 flex flex-col md:flex-row justify-center items-center">
      <div className="signin-container bg-white shadow-lg rounded-lg p-8 w-full max-w-md mb-8 md:mb-0 md:mr-8">
        <h2 className="text-2xl font-bold mb-6 text-center text-black">Sign In</h2>
        <input className="border p-3 w-full mb-4 rounded" type="email" placeholder="Email" />
        <input className="border p-3 w-full mb-4 rounded" type="password" placeholder="Password" />
        <button className="bg-golden text-black px-4 py-3 rounded-lg w-full" onClick={handleSignIn}>Sign In</button>
        <p className="mt-4 text-sm text-center">
          Don't have an account? <Link to="/" className="text-golden">Sign Up</Link>
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

export default SignIn;