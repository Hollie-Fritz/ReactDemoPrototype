import React, { useState, useEffect } from "react";
import { Carousel } from "react-bootstrap";

function TopRatedCarousel({ id }) {
  const [topRatedRestaurants, setTopRatedRestaurants] = useState([]);

  useEffect(() => {
    const fetchRestaurants = async () => {
        const reviewUrl = `https://6b2uk8oqk7.execute-api.us-west-2.amazonaws.com/prod/review?userId=${id}`;
        const reviewResponse = await fetch(reviewUrl);
        const reviewData = await reviewResponse.json();
      
        const restaurantNames = Array.from(new Set(reviewData.map(review => review.resName)));
      
        const restaurantUrl = `https://6b2uk8oqk7.execute-api.us-west-2.amazonaws.com/prod/restaurant?name=${restaurantNames.join(',')}`;
        const restaurantResponse = await fetch(restaurantUrl);
        const restaurantData = await restaurantResponse.json();
      
        // Group reviews by restaurant name and calculate average rating for each restaurant
        const restaurants = {};
        reviewData.forEach((review) => {
          const { resName, rating } = review;
          if (!restaurants[resName]) {
            restaurants[resName] = {
              name: resName,
              rating: rating,
              count: 1,
            };
          } else {
            restaurants[resName].rating += rating;
            restaurants[resName].count += 1;
          }
        });
      
        // Merge restaurant information with review data
        Object.values(restaurants).forEach((restaurant) => {
          const matchedRestaurant = restaurantData.find((res) => res.name === restaurant.name);
          if (matchedRestaurant) {
            restaurant.image = matchedRestaurant.resImageUrl;
            restaurant.address = `${matchedRestaurant.address1}, ${matchedRestaurant.city}, ${matchedRestaurant.state} ${matchedRestaurant.zipCode}`;
          }
        });
      
        // Sort the restaurants by rating in descending order
        const sortedRestaurants = Object.values(restaurants).sort(
          (a, b) => b.rating / b.count - a.rating / a.count
        );
      
        // Get the top three restaurants
        const topRated = sortedRestaurants.slice(0, 3);
      
        setTopRatedRestaurants(topRated);
      };      

    fetchRestaurants();
  }, [id]);

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