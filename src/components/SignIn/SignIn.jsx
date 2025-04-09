// src/components/SignIn/SignIn.jsx
import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { signIn } from '../../services/authService';
import { UserContext } from '../../context/userContext';
import './SignIn.css';

function SignIn() {
    const navigate = useNavigate();
    const { setUser } = useContext(UserContext);
    const [message, setMessage] = useState('');
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const handleChange = (evt) => {
        setMessage('');
        setFormData({
            ...formData,
            [evt.target.name]: evt.target.value
        });
    };
    const handleSubmit = async (evt) => {
      evt.preventDefault();
      try {
        const signedInUser = await signIn({
          username: formData.email,  // 👈 This must match what backend expects
          password: formData.password
        });
        setUser(signedInUser);
        navigate('/');
      } catch (error) {
        setMessage(error.message || 'Login failed. Please try again.');
      }
    };
    return (
        <div className="signin-page">
            <div className="signin-container">
                <h2>Sign In</h2>
                {message && <p className="signin-error">{message}</p>}

                <form onSubmit={handleSubmit}>
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                />
                <button type="submit">Sign In</button>
                </form>

            <div className="signin-toggle">
                Don't have an account?{' '}
                <button onClick={() => navigate('/landing')}>Sign Up</button>
            </div>
        </div>
    </div>

    );
}

export default SignIn;