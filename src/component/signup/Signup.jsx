

i
import React, { useState, useContext } from 'react';
import './signup.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { productContext } from '../contextAPI/Context';

const API_URL = import.meta.env.VITE_API_URL;

const Signup = () => {
    const navigate = useNavigate();
    const { setToken } = useContext(productContext);

    const [name, setName] = useState('');
    const [email, setMail] = useState('');
    const [password, setPassword] = useState('');

    const submitHandler = async () => {
        if (!name || !email || !password) {
            alert('Please fill all fields');
            return;
        }

        try {
            const res = await axios.post(`${API_URL}/signup`, {
                name,
                email,
                password
            });

            if (res.status === 200 || res.status === 201) {
                alert('Signup successful! Please login.');

                localStorage.removeItem('token');
                setToken(null);

                navigate('/login', { replace: true });
            }
        } catch (error) {
            console.log('Signup error:', error);
            alert(
                error.response?.data?.message ||
                'Signup failed. Please try again.'
            );
        }
    };

    return (
        <div className="signup">
            <input
                type="text"
                placeholder="username"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />

            <input
                type="email"
                placeholder="email"
                value={email}
                onChange={(e) => setMail(e.target.value)}
            />

            <input
                type="password"
                placeholder="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />

            <button onClick={submitHandler}>SignUp</button>
        </div>
    );
};

export default Signup;
