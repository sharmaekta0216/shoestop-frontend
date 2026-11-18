
import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Home from './component/home/Home';
import Fav from './component/fav/Fav';
import Navbar from './component/navbar/Navbar';
import Cart from './component/cart/Cart';
import Signup from './component/signup/Signup';
import Login from './component/login/Login';
import NavbarLog from './component/navbar/NavbarLog';
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
  const hasToken = !!localStorage.getItem('token');

  return (
    <BrowserRouter>
      {hasToken ? <NavbarLog /> : <Navbar />}

      <Routes>
        <Route path="/" element={hasToken ? <Home /> : <Login />} />
        <Route path="/home" element={hasToken ? <Home /> : <Navigate to="/login" />} />
        <Route path="/cart" element={hasToken ? <Cart /> : <Navigate to="/login" />} />
        <Route path="/fav" element={hasToken ? <Fav /> : <Navigate to="/login" />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
