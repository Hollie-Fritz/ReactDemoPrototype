import React, { useState }from "react";
import { useNavigate } from "react-router-dom";
import ViewReview from "../rating/ViewReview";
import AverageRating from "../rating/AverageRating";
import { Card, CardGroup, ListGroup, Button } from "react-bootstrap";

import "./card.styles.css";

const CardComponent = ({
  restaurant: {
    userId,
    name,
    cuisine,
    address1,
    address2,
    city,
    state,
    zipCode,
    averageRating,
  },
}) => {
  const navigate = useNavigate();
  const [showViewReviewForm, setShowViewReviewForm] = useState(false);
  const [reviews, setReviews] = useState([]);

  const handleShowReviewClick = (event) => {
    event.stopPropagation();
    getReviews();
    setShowViewReviewForm(true);
  };

  async function getReviews(){
    let url = `https://6b2uk8oqk7.execute-api.us-west-2.amazonaws.com/prod/review?userId=${userId}`;
    const response = await fetch(url);
    const data = await response.json();
    setReviews(data);
  }

  const handleViewReviewFormClose = (event) => {
    // event.stopPropagation();
    setShowViewReviewForm(false);
  };

  return (
    <>
      <CardGroup className="my-1">
        <Card style={{ width: "18rem",  border: '3px ridge #212529', borderRadius: '30px' }}
        className="card-container"
        >
          <Card.Body key={userId}
          onClick={() => {
            navigate(`/r/${userId}`)
            window.location.reload()
          }
          }>
            <Card.Title style={{ textAlign: "center" }}>{name}</Card.Title>
            {averageRating !== 0 ? (
              <div style={{ display: "flex", justifyContent: "center" }}>
                <AverageRating averageRating={averageRating} />
              </div>
            ) : (
              ""
            )}
            <Card.Text style={{ textAlign: "center" }}>{cuisine}</Card.Text>
            <ListGroup className="list-group-flush">
              <ListGroup.Item style={{ textAlign: "center" }}>
                {address1} {address2}, {city}, {state} {zipCode}
              </ListGroup.Item>
            </ListGroup>
          </Card.Body>
          <Card.Footer className="border-0" style={{ background: "white" }}>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <Button
                type="submit"
                onClick={handleShowReviewClick}
                className="reviews"
              >
                View Reviews
              </Button>{" "}
            </div>
            <ViewReview
              show={showViewReviewForm}
              handleClose={handleViewReviewFormClose}
              userId={userId}
              name={name}
              reviews={reviews}
            />
          </Card.Footer>
        </Card>
      </CardGroup>
    </>
  );
};

export default CardComponent;
