
import axios from 'axios';
import React, { createContext, useEffect, useState } from 'react';

export const productContext = createContext();

const API_URL = import.meta.env.VITE_API_URL;

const Context = ({ children }) => {
  const [favProList, setFavProductList] = useState([]);
  const [cartProduct, setCartProducts] = useState([]);
  const [token, setToken] = useState(
    () => localStorage.getItem('token') || ''
  );

  const getTokenFromLocalStorage = () => {
    const savedToken = localStorage.getItem('token') || '';
    setToken(savedToken);
    return savedToken;
  };

  const getFav = async () => {
    try {
      const savedToken = localStorage.getItem('token');

      if (savedToken) {
        const response = await axios.get(
          `${API_URL}/api/addfav`,
          {
            headers: {
              Authorization: `Bearer ${savedToken}`,
            },
          }
        );

        setFavProductList(response.data);
      }
    } catch (error) {
      console.log('Error fetching favourites:', error);
    }
  };

  const getcart = async () => {
    try {
      const savedToken = localStorage.getItem('token');

      if (savedToken) {
        const response = await axios.get(
          `${API_URL}/api/addcart`,
          {
            headers: {
              Authorization: `Bearer ${savedToken}`,
            },
          }
        );

        setCartProducts(response.data);
      }
    } catch (error) {
      console.log('Error fetching cart:', error);
    }
  };

  useEffect(() => {
    getTokenFromLocalStorage();
  }, []);

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
