import React, { useState, useEffect } from "react";
import { Carousel } from "react-bootstrap";
import Rating from "react-rating-stars-component";

function TopRatedCarousel() {
  const [topRatedRestaurants, setTopRatedRestaurants] = useState([]);

  useEffect(() => {
    const fetchRestaurants = async () => {
      const restaurantUrl = `https://6b2uk8oqk7.execute-api.us-west-2.amazonaws.com/prod/recommendRestaurants`;
      const restaurantResponse = await fetch(restaurantUrl);
      const restaurantData = await restaurantResponse.json();
      setTopRatedRestaurants(restaurantData);
    };
    fetchRestaurants();
  }, []);

  return (
    <Carousel style={{ height: "400px", width: "1000px" }}>
      {topRatedRestaurants.map((restaurant) => {
        const imageUrl = `https://images.pexels.com/photos/3338537/pexels-photo-3338537.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1`;

        //To get the image from the S3 the url should be sth like this
        //const imageUrl = `https://<domain>/<image-path>/${restaurant.resImageUrl}`;


        return (
          <Carousel.Item key={restaurant.name}>
            <img
              className="d-block w-100"
              src={imageUrl}
              alt={restaurant.name}
              style={{ height: "400px", width: "600px", objectFit: "cover" }}
            />
            <Carousel.Caption style={{ fontWeight: 'bold', textShadow: '2px 2px 10px rgba(0, 0, 0, 0.8)' }}>
              <h1>{restaurant.name}</h1>
              <div style={{ display: "flex", justifyContent: "center" }}>
                <Rating
                  key={`stars_${restaurant.averageRating}`}
                  value={restaurant.averageRating}
                  edit={false}
                  count={5}
                  size={35}
                  isHalf={true}
                  emptyIcon={<i className="far fa-star"></i>}
                  halfIcon={<i className="fa fa-star-half-alt"></i>}
                  fullIcon={<i className="fa fa-star"></i>}
                  activeColor="#ffd700"
                />
              </div>
              <h4>
                {restaurant.address1? restaurant.address1 + ", ": ""} {restaurant.address2? restaurant.address2 + ", ": ""} {" "}
                {restaurant.city? restaurant.city + ", ": ""} {restaurant.state? restaurant.state + ", ": ""} {restaurant.zipCode? restaurant.zipCode: ""}
              </h4>
            </Carousel.Caption>
          </Carousel.Item>
        );
      })}
    </Carousel>
  );
}

export default TopRatedCarousel;
