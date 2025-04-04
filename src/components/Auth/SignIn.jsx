import { Link } from "react-router-dom";
import "./Auth.css"; // Shared CSS for Sign In and Sign Up

const SignIn = () => {
  return (
    <div className="auth-page">
      <div className="auth-container">
        <h2 className="auth-title">Sign In</h2>
        <input type="email" placeholder="Email" className="auth-input" />
        <input type="password" placeholder="Password" className="auth-input" />
        <button className="auth-button">Sign In</button>
        <p className="auth-text">
          Don't have an account? <Link to="/signup">Sign Up</Link>
        </p>
      </div>
      <div className="welcome-container">
        <h1>Welcome to Mindful Meals</h1>
        <p>Find the best gluten-free restaurants near you!</p>
      </div>
    </div>
  );
};

export default SignIn;

