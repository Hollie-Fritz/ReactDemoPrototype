import { Card, CardGroup, ListGroup, Button } from "react-bootstrap";
import { useState, useEffect } from "react";
import ReviewForm from "../rating/ReviewForm";
import ViewReview from "../rating/ViewReview";
import AverageRating from "../rating/AverageRating";
import { useNavigate } from "react-router-dom";
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
  },
}) => {
  const navigate = useNavigate();
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [showViewReviewForm, setShowViewReviewForm] = useState(false);
  const [averageRating, setAverageRating] = useState(0);
  const [reviews, setReviews] = useState([]);
  const handleWriteReviewClick = () => {
    setShowReviewForm(true);
  };
  const handleShowReviewClick = () => {
    setShowViewReviewForm(true);
  };

  const handleReviewFormClose = () => {
    setShowReviewForm(false);
  };

  const handleViewReviewFormClose = () => {
    setShowViewReviewForm(false);
  };

  useEffect(() => {
    const fetchAverageRating = async () => {
      let url = `https://6b2uk8oqk7.execute-api.us-west-2.amazonaws.com/prod/review?userId=${userId}`;
      const response = await fetch(url);
      const data = await response.json();
      setReviews(data);
    };
    fetchAverageRating();
  }, [userId]);


  return (
    <>
      <CardGroup className="my-1">
        <Card
          style={{ width: "18rem" }}
          className="card-container"
          key={userId}
          onClick={() => navigate(`/r/${userId}`)}
        >
          <Card.Body>
            <Card.Title style={{ textAlign: "center" }}>{name}</Card.Title>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <AverageRating reviews={reviews} />
            </div>
            <Card.Text style={{ textAlign: "center" }}>{cuisine}</Card.Text>
            <ListGroup className="list-group-flush">
              <ListGroup.Item style={{ textAlign: "center" }}>
                {address1} {address2}, {city}, {state} {zipCode}
              </ListGroup.Item>
            </ListGroup>
            {/* testing button for the review */}
            <div style={{ display: "flex", justifyContent: "center" }}>
              <Button
                variant="primary"
                type="submit"
                onClick={handleWriteReviewClick}
              >
                Leave Review
              </Button>{" "}
            </div>
            <br />
            <div style={{ display: "flex", justifyContent: "center" }}>
              <Button
                variant="primary"
                type="submit"
                onClick={handleShowReviewClick}
              >
                View Reviews
              </Button>{" "}
            </div>
            <ViewReview
              show={showViewReviewForm}
              handleClose={handleViewReviewFormClose}
              userId={userId}
              name={name}
            />
            <ReviewForm
              show={showReviewForm}
              handleClose={handleReviewFormClose}
              userId={userId}
              name={name}
            />
          </Card.Body>
        </Card>
      </CardGroup>
    </>
  );
};

export default CardComponent;
