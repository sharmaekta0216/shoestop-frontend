
import React, { useContext } from 'react';
import './fav.css';
import { Button } from 'react-bootstrap';
import { productContext } from '../contextAPI/Context';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

const Fav = () => {
  const url = `${API_URL}/api/addfav`;

  const { favProList, setFavProductList, token } = useContext(productContext);

  const getFav = async () => {
    try {
      if (token) {
        const response = await axios.get(url, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setFavProductList(response.data);
      }
    } catch (error) {
      console.log('Error fetching favourites:', error);
    }
  };

  const removeFavItems = async (id) => {
    try {
      await axios.delete(`${url}/${id}`);
      getFav();
    } catch (error) {
      console.log('Error removing favourite:', error);
    }
  };

  return (
    <div>
      {favProList.length > 0 ? (
        <div className="fav">
          <h4>{favProList.length} fav items here</h4>

          {favProList.map((li) => (
            <div className="items" key={li._id}>
              <img src={li.image} className="img" alt={li.title} />

              <p className="title">{li.title}</p>
              <p className="company">{li.company}</p>
              <p className="price text-dark">Rs: {li.price}</p>

              <div className="Fbtns">
                <Button
                  variant="danger"
                  onClick={() => removeFavItems(li._id)}
                >
                  Remove From Favourite
                </Button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="no-items">
          <p>No fav items here</p>
        </div>
      )}
    </div>
  );
};

export default Fav;