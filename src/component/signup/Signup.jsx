



import React, { useState, useContext } from 'react';
import './signup.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { productContext } from '../contextAPI/Context';

const API_URL = (
    import.meta.env.VITE_API_URL ||
    'https://shoestop-backend-1.onrender.com'
).replace(/\/+$/, '');

const Signup = () => {
    const navigate = useNavigate();
    const { setToken } = useContext(productContext);

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const submitHandler = async (e) => {
        e.preventDefault();

        if (!name.trim() || !email.trim() || !password) {
            alert('Please fill all fields');
            return;
        }

        try {
            setLoading(true);

            const res = await axios.post(`${API_URL}/signup`, {
                name: name.trim(),
                email: email.trim(),
                password
            });

            if (res.status === 200 || res.status === 201) {
                localStorage.removeItem('token');
                setToken(null);

                alert('Signup successful! Please login.');
                navigate('/login', { replace: true });
            }
        } catch (error) {
            console.error('Signup error:', error);
            alert(
                error.response?.data?.message ||
                'Signup failed. Please try again.'
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="signup">
            <form onSubmit={submitHandler}>
                <input
                    type="text"
                    placeholder="Username"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />

                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <button type="submit" disabled={loading}>
                    {loading ? 'Please wait...' : 'SignUp'}
                </button>
            </form>
        </div>
    );
};

export default Signup;
