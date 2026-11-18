
import React, { useContext, useState } from 'react';
import '../signup/signup.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { productContext } from '../contextAPI/Context';

const API_URL = import.meta.env.VITE_API_URL;

const Login = () => {
    const navigate = useNavigate();
    const { setToken } = useContext(productContext);

    const [email, setMail] = useState('');
    const [password, setPassword] = useState('');

    const url = `${API_URL}/login`;

    const changeMailHandler = (e) => {
        setMail(e.target.value);
    };

    const changePasswordHandler = (e) => {
        setPassword(e.target.value);
    };

    const submitHandler = async () => {
        try {
            const res = await axios.post(url, {
                email,
                password
            });

            if (res.status === 200 || res.status === 201) {
                localStorage.setItem('token', res.data.token);
                setToken(res.data.token);
                navigate('/home');
            }
        } catch (error) {
            console.log('Login error:', error);
            alert('Login failed. Please check your email and password.');
        }
    };

    return (
        <div className="signup">
            <input
                type="email"
                placeholder="email"
                value={email}
                onChange={changeMailHandler}
            />

            <input
                type="password"
                placeholder="password"
                value={password}
                onChange={changePasswordHandler}
            />

            <button onClick={submitHandler}>Login</button>
        </div>
    );
};

export default Login;
