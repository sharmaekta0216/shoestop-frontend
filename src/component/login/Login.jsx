

import React, { useState, useContext } from 'react';
import '../signup/signup.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { productContext } from '../contextAPI/Context';

const API_URL = (
    import.meta.env.VITE_API_URL ||
    'https://shoestop-backend-1.onrender.com'
).replace(/\/+$/, '');

const Login = () => {
    const navigate = useNavigate();
    const { setToken } = useContext(productContext);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const submitHandler = async (e) => {
        e.preventDefault();

        if (!email.trim() || !password) {
            alert('Please enter email and password');
            return;
        }

        try {
            setLoading(true);

            const res = await axios.post(`${API_URL}/login`, {
                email: email.trim(),
                password
            });

            if (res.data.token) {
                localStorage.setItem('token', res.data.token);
                setToken(res.data.token);
                navigate('/home', { replace: true });
            } else {
                alert('Login failed. Token not received.');
            }

        } catch (error) {
            console.error('Login error:', error);

            alert(
                error.response?.data?.message ||
                'Login failed. Please check your email and password.'
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="signup">
            <form onSubmit={submitHandler}>
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
                    {loading ? 'Please wait...' : 'Login'}
                </button>
            </form>
        </div>
    );
};

export default Login;
