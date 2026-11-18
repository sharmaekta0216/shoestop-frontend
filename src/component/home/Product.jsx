
import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import './home.css';
import { Button } from 'react-bootstrap';
import { productContext } from '../contextAPI/Context';

const API_URL = import.meta.env.VITE_API_URL;

const Product = () => {
    const [products, setProducts] = useState([]);
    const { token } = useContext(productContext);

    const fetchData = async () => {
        try {
            const res = await axios.get(`${API_URL}/api/getproducts`);
            setProducts(res.data);
        } catch (error) {
            console.log('Error fetching products:', error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const getProduct = (image, title, company, price) => {
        const headers = {
            Authorization: `Bearer ${token}`,
        };

        axios.post(
            `${API_URL}/api/addfav`,
            { image, title, company, price },
            { headers }
        )
        .then((response) => {
            if (response.status === 202) {
                alert('Already in fav list');
            } else {
                alert('Item Added to fav');
            }
        })
        .catch((error) => {
            console.log('Error adding favourite:', error);
        });
    };

    const addtoCart = (image, title, company, price) => {
        axios.post(
            `${API_URL}/api/addcart`,
            { image, title, company, price },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        )
        .then((response) => {
            if (response.status === 202) {
                alert('Already in cart');
            } else {
                alert('Item Added to cart');
            }
        })
        .catch((error) => {
            console.log('Error adding to cart:', error);
        });
    };

    return (
        <div className="product">
            <h3 className="text-center p-4">Products</h3>

            <div className="pro-layout">
                {products && products.length > 0 ? (
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
                                    Rs:{li.price}
                                </p>
                            </div>

                            <div className="btns">
                                <Button
                                    variant="success px-4"
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
                            </div>
                        </div>
                    ))
                ) : (
                    <div>
                        <p>No product found</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Product;
