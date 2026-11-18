
import React, { createContext, useEffect, useState } from 'react';
import axios from 'axios';

export const productContext = createContext();

const API_URL = (
    import.meta.env.VITE_API_URL ||
    'https://shoestop-backend-1.onrender.com'
).replace(/\/+$/, '');

const Context = ({ children }) => {
    const [favProList, setFavProductList] = useState([]);
    const [cartProduct, setCartProducts] = useState([]);

    const [token, setToken] = useState(
        () => localStorage.getItem('token') || ''
    );

    const getFav = async () => {
        if (!token) {
            setFavProductList([]);
            return;
        }

        try {
            const response = await axios.get(
                `${API_URL}/api/addfav`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            setFavProductList(response.data);
        } catch (error) {
            console.error('Error fetching favourites:', error);
        }
    };

    const getcart = async () => {
        if (!token) {
            setCartProducts([]);
            return;
        }

        try {
            const response = await axios.get(
                `${API_URL}/api/addcart`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            setCartProducts(response.data);
        } catch (error) {
            console.error('Error fetching cart:', error);
        }
    };

    useEffect(() => {
        if (token) {
            getFav();
            getcart();
        } else {
            setFavProductList([]);
            setCartProducts([]);
        }
    }, [token]);

    return (
        <productContext.Provider
            value={{
                favProList,
                setFavProductList,
                cartProduct,
                setCartProducts,
                token,
                setToken,
                getFav,
                getcart,
            }}
        >
            {children}
        </productContext.Provider>
    );
};

export default Context;
