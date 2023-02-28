import React, { useState, useEffect } from "react";
import Rating from "react-rating-stars-component";

const AverageRating = ({ reviews }) => {
  console.log(reviews);
  const [averageRating, setAverageRating] = useState(0);

  useEffect(() => {
    if (reviews.length > 0) {
      let total = 0;
      for (let i = 0; i < reviews.length; i++) {
        total += reviews[i].rating;
      }
      console.log(total);
      const avg = total / reviews.length;
      setAverageRating(avg);
      console.log(avg);
    }
  }, [reviews]);

  const roundedRating = Math.round(averageRating * 2) / 2;

  return (
    <>
      <Rating
        value={4}
        edit={false}
        count={5}
        size={20}
        isHalf={true}
        ifHalf={true}
        half={true}
        emptyIcon={<i className="far fa-star"></i>}
        halfIcon={<i className="fa fa-star-half-alt"></i>}
        fullIcon={<i className="fa fa-star"></i>}
        activeColor="#ffd700"
      />
      <span style={{ marginLeft: "10px" }}>{roundedRating.toFixed(1)} /4</span>
    </>
  );
};

export default AverageRating;
