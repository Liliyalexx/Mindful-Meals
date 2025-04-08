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
    username: '',  
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
  
      if (formData.password.length < 6) {
        throw new Error("Password must be at least 6 characters");
      }
  
      const newUser = await signUp({
        email: formData.email,
        password: formData.password
      });
      
      setUser(newUser);
      navigate('/');
    } catch (error) {
      setMessage(error.message);
      console.error('SignUp error:', error);
    }
  };
  return (
    <div className="signup-page bg-black text-white min-h-screen p-6 flex flex-col md:flex-row justify-center items-center">
      <div className="signup-container bg-white shadow-lg rounded-lg p-8 w-full max-w-md mb-8 md:mb-0 md:mr-8">
        <h2 className="text-2xl font-bold mb-6 text-center text-black">Sign Up</h2>
        {message && <p className="text-red-500 text-center mb-4">{message}</p>}
        <form onSubmit={handleSubmit}>
          <input
            className="border p-3 w-full mb-4 rounded"
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <input
            className="border p-3 w-full mb-4 rounded"
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            className="border p-3 w-full mb-4 rounded"
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
            minLength="6"
          />
          <input
            className="border p-3 w-full mb-4 rounded"
            type="password"
            name="passwordConf"
            placeholder="Confirm Password"
            value={formData.passwordConf}
            onChange={handleChange}
            required
            minLength="6"
          />
          <button 
            className="bg-golden text-black px-4 py-3 rounded-lg w-full" 
            type="submit"
          >
            Create Account
          </button>
        </form>
        <p className="mt-4 text-sm text-center text-black">
          Already have an account?{' '}
          <button
            className="text-golden"
            onClick={() => navigate('/sign-in')}
          >
            Sign In
          </button>
        </p>
      </div>
    </div>
  );
}

export default SignUp;