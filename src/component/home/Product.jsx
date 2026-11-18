

import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import './home.css';
import { Button } from 'react-bootstrap';
import { productContext } from '../contextAPI/Context';

const API_URL = import.meta.env.VITE_API_URL;

const Product = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    const { token } = useContext(productContext);

    const fetchData = async () => {
        try {
            const res = await axios.get(`${API_URL}/api/getproducts`);
            setProducts(Array.isArray(res.data) ? res.data : []);
        } catch (error) {
            console.log('Error fetching products:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const getProduct = async (image, title, company, price) => {
        try {
            const response = await axios.post(
                `${API_URL}/api/addfav`,
                { image, title, company, price },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            if (response.status === 202) {
                alert('Already in fav list');
            } else {
                alert('Item Added to fav');
            }
        } catch (error) {
            console.log('Error adding favourite:', error);
            alert('Unable to add favourite');
        }
    };

    const addtoCart = async (image, title, company, price) => {
        try {
            const response = await axios.post(
                `${API_URL}/api/addcart`,
                { image, title, company, price },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            if (response.status === 202) {
                alert('Already in cart');
            } else {
                alert('Item Added to cart');
            }
        } catch (error) {
            console.log('Error adding to cart:', error);
            alert('Unable to add item to cart');
        }
    };

    return (
        <div className="product" id="products">
            <h3 className="text-center p-4">Products</h3>

            <div className="pro-layout">
                {loading ? (
                    <p>Loading products...</p>
                ) : products.length > 0 ? (
                    products.map((li) => (
                        <div className="cardz" key={li._id}>
                            <img
                                src={li.image}
                                className="image"
                                alt={li.title}
                            />

                            <p className="title">{li.title}</p>

                            <div className="comrice">
                                <p className="company">{li.company}</p>
                                <p className="price text-dark">
                                    Rs: {li.price}
                                </p>
                            </div>

                            <div className="btns">
                                <Button
                                    variant="success"
                                    className="px-3"
                                    onClick={() =>
                                        addtoCart(
                                            li.image,
                                            li.title,
                                            li.company,
                                            li.price
                                        )
                                    }
                                >
                                    Add to Cart
                                </Button>

                                <Button
                                    variant="outline-danger"
                                    className="px-3"
                                    onClick={() =>
                                        getProduct(
                                            li.image,
                                            li.title,
                                            li.company,
                                            li.price
                                        )
                                    }
                                >
                                    Add to Favourite
                                </Button>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>No products found</p>
                )}
            </div>
        </div>
    );
};

export default Product;
