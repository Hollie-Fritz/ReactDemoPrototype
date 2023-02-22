import "./card.styles.css";
import { Card, CardGroup, ListGroup, Button } from "react-bootstrap";
import { useState } from "react";
import ReviewForm from "../rating/ReviewForm";

const CardComponent = ({ restaurant: { userID, Name, Cuisine, Address } }) => {
  const [showReviewForm, setShowReviewForm] = useState(false);

  const handleWriteReviewClick = () => {
    setShowReviewForm(true);
  }

  const handleReviewFormClose = () => {
    setShowReviewForm(false);
  }

  return (
    <>
      <CardGroup className="my-1">
        <Card
          style={{ width: "18rem" }}
          className="card-container"
          key={userID}
        >
          <Card.Body>
            <Card.Title style={{ textAlign: "center" }}>{Name}</Card.Title>
            <Card.Text style={{ textAlign: "center" }}>{Cuisine}</Card.Text>
            <ListGroup className="list-group-flush">
              <ListGroup.Item style={{ textAlign: "center" }}>
                {Address}
              </ListGroup.Item>
            </ListGroup>
            {/* testing button for the review */}
            <Button variant="primary" type="submit" onClick={handleWriteReviewClick}>
            Leave Review
          </Button> 
          <ReviewForm show={showReviewForm} handleClose={handleReviewFormClose} />
          </Card.Body>
        </Card>
      </CardGroup>
    </>
  );
};

export default CardComponent;
