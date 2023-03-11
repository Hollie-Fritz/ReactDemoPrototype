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
  // const wholeRating = Math.round(roundedRating * 2);

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

      {/* <ReactStars
          count={5}
          size={24}
          isHalf={true}
          emptyIcon={<i className="far fa-star"></i>}
          halfIcon={<i className="fa fa-star-half-alt"></i>}
          fullIcon={<i className="fa fa-star"></i>}
          activeColor="#ffd700"
      />
      <Rating
        initialRating={roundedRating}
        emptySymbol={<i className="far fa-star"></i>}
        fullSymbol={<i className="fas fa-star"></i>}
        readonly
      />
      <br/>
      <span style={{ marginLeft: "10px" }}><strong>Rating:</strong> {roundedRating.toFixed(1)}/5</span> */}
    </>
  );
};

export default AverageRating;