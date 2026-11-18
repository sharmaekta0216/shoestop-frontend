
import React, { useContext } from 'react';
import './App.css';

import {
    BrowserRouter,
    Routes,
    Route,
    Navigate
} from 'react-router-dom';

import Home from './component/home/Home';
import Fav from './component/fav/Fav';
import Navbar from './component/navbar/Navbar';
import Cart from './component/cart/Cart';
import Signup from './component/signup/Signup';
import Login from './component/login/Login';
import NavbarLog from './component/navbar/NavbarLog';

import Context, { productContext } from './component/contextAPI/Context';

import 'bootstrap/dist/css/bootstrap.min.css';

const AppRoutes = () => {
    const { token } = useContext(productContext);
    const hasToken = !!token;

    return (
        <>
            {hasToken ? <NavbarLog /> : <Navbar />}

            <Routes>
                <Route
                    path="/"
                    element={hasToken ? <Home /> : <Login />}
                />

                <Route
                    path="/home"
                    element={hasToken ? <Home /> : <Navigate to="/login" replace />}
                />

                <Route
                    path="/cart"
                    element={hasToken ? <Cart /> : <Navigate to="/login" replace />}
                />

                <Route
                    path="/fav"
                    element={hasToken ? <Fav /> : <Navigate to="/login" replace />}
                />

                <Route path="/signup" element={<Signup />} />
                <Route path="/login" element={<Login />} />

                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
        </>
    );
};

const App = () => {
    return (
        <BrowserRouter>
            <Context>
                <AppRoutes />
            </Context>
        </BrowserRouter>
    );
};

export default App;
