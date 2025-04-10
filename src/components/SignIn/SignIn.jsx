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
            const signedInUser = await signIn(formData);  
            console.log(signedInUser);
            localStorage.setItem('token', signedInUser.token);
            setUser(signedInUser.user);
            navigate('/');
        } catch (error) {
            setMessage(error.message || 'Login failed. Please try again.');
        }
    };

    return (
        <div className="signin-page bg-black text-white min-h-screen p-6 flex flex-col md:flex-row justify-center items-center">
            <div className="signin-container bg-white shadow-lg rounded-lg p-8 w-full max-w-md mb-8 md:mb-0 md:mr-8">
                <h2 className="text-2xl font-bold mb-6 text-center text-black">Sign In</h2>
                {message && <p className="text-red-500 text-center mb-4">{message}</p>}
                <form onSubmit={handleSubmit}>
                    <input 
                        className="border p-3 w-full mb-4 rounded" 
                        type="text"  
                        name="username"  
                        placeholder="Username"  
                        value={formData.username}
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
                    />
                    <button 
                        className="bg-golden text-black px-4 py-3 rounded-lg w-full" 
                        type="submit"
                    >
                        Sign In
                    </button>
                </form>
                <p className="mt-4 text-sm text-center text-black">
                    Don't have an account? <button
                        className="text-golden"
                        onClick={() => navigate('/landing')}
                    >
                        Sign Up
                    </button>
                </p>
            </div>

            <div className="image-container flex justify-center items-center">
            </div>
        </div>
    );
}

export default SignIn;