import React, { useState } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import Rating from "react-rating-stars-component";

function ReviewForm({show, handleClose}) {
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    //Reset form after submission 
    setRating(0);
    setReview("");
    handleClose();
  };

  return (
    <>
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Write a review</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formRating">
                <Form.Label>Author:</Form.Label>
                <Form.Control type="text" placeholder="Your name"/>
                <br/>
              <Form.Label>Rating:</Form.Label>
                <Rating
                  name="rating"
                  count={5}
                  value={rating}
                  onChange={setRating}
                  size={24}
                  activeColor="#ffd700"
                />
            </Form.Group>
            <Form.Group controlId="formReview">
              <Form.Label>Review:</Form.Label>
              <br/>
              <Form.Control
                as="textarea"
                rows={3}
                value={review}
                onChange={(event) => setReview(event.target.value)}
              />
            </Form.Group>
            <br/>
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default ReviewForm;