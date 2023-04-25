import React, { useState, useEffect } from "react";
import { Carousel } from "react-bootstrap";

function TopRatedCarousel({ id }) {
  const [topRatedRestaurants, setTopRatedRestaurants] = useState([]);

  useEffect(() => {
    const fetchRestaurants = async () => {
      // fetching reviews by restaurant id
        const restaurantUrl = `https://6b2uk8oqk7.execute-api.us-west-2.amazonaws.com/prod/recommendRestaurants`;
        const restaurantResponse = await fetch(restaurantUrl);
        const restaurantData = await restaurantResponse.json();
        setTopRatedRestaurants(restaurantData);
      };

    fetchRestaurants();
  }, []);

  return (
    <Carousel>
      {topRatedRestaurants.map((restaurant) => (
        <Carousel.Item key={restaurant.name}>
          <img
            className="d-block w-100"
            src={restaurant.resImageUrl}
            alt={restaurant.name}
          />
          <Carousel.Caption>
            <h3>{restaurant.name}</h3>
            <p>Rating: {restaurant.rating / restaurant.count}</p>
            <p>Address: {restaurant.address1}, {restaurant.address2}, {restaurant.city}, {restaurant.state} {restaurant.zipCode}</p>
          </Carousel.Caption>
        </Carousel.Item>
      ))}
    </Carousel>
  );
}

export default TopRatedCarousel;