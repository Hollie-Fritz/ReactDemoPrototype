import Rating from "react-rating-stars-component";
import React from "react";

const AverageRating = (props) => {
  const roundedRating = Math.round(props.averageRating * 2) / 2;

  return (
    <>
      <Rating
        key={`stars_${roundedRating}`}
        value={props.averageRating}
        edit={false}
        count={5}
        size={20}
        isHalf={true}
        emptyIcon={<i className="far fa-star"></i>}
        halfIcon={<i className="fa fa-star-half-alt"></i>}
        fullIcon={<i className="fa fa-star"></i>}
        activeColor="#ffd700"
      />
      {/* <br/> <br/>
      <h1>{props.averageRating}</h1> */}
    </>
  );
};

export default AverageRating;
