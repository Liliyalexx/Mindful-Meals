import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { signUp } from '../../services/authService';
import { UserContext } from '../../context/userContext';
import './SignUp.css';

function SignUp() {
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);
  const [message, setMessage] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    passwordConf: ''
  });

  const handleChange = (e) => {
    setMessage('');
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (formData.password !== formData.passwordConf) {
        throw new Error("Passwords don't match");
      }
      
      const userData = {
        username: formData.email, // Backend expects 'username'
        password: formData.password
      };

      const newUser = await signUp(userData);
      setUser(newUser);
      navigate('/');
    } catch (error) {
      setMessage(error.message || 'Registration failed. Please try again.');
      console.error('SignUp error:', error);
    }
  };
  return (
    <div className="signup-page">
      <div className="signup-container">
        <h2>Sign Up</h2>
        {message && <div className="error-message">{message}</div>}
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <input
           autoComplete='email'
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            autoComplete='email'
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="passwordConf"
            placeholder="Confirm Password"
            value={formData.passwordConf}
            onChange={handleChange}
            required
          />
          <button type="submit">Create Account</button>
        </form>
      </div>
    </div>
  );
}

export default SignUp;