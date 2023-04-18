import React, { useState, useEffect } from "react";
import Rating from "react-rating-stars-component";

const AverageRating = ({ reviews }) => {
  const [averageRating, setAverageRating] = useState(0);

  useEffect(() => {
    if (reviews.length > 0) {
      let total = 0;
      for (let i = 0; i < reviews.length; i++) {
        total += reviews[i].rating;
      }
      const avg = total / reviews.length;
      setAverageRating(avg);
    }
  }, [reviews]);

  const roundedRating = Math.round(averageRating * 2) / 2;

  return (
    <>
      <Rating
        key={`stars_${roundedRating}`}
        value={averageRating}
        edit={false}
        count={5}
        size={20}
        isHalf={true}
        emptyIcon={<i className="far fa-star"></i>}
        halfIcon={<i className="fa fa-star-half-alt"></i>}
        fullIcon={<i className="fa fa-star"></i>}
        activeColor="#ffd700"
      />
    </>
  );
};

export default AverageRating;