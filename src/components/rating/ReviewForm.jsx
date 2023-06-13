import React, { useState } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import Rating from "react-rating-stars-component";
import "./ViewReview.css";

function ReviewForm({ show, handleClose, userId, name }) {
  const [rating, setRating] = useState(1);
  const [review, setReview] = useState("");
  const [author, setAuthor] = useState("Anonymous");

  const handleSubmit = async (event) => {
    event.preventDefault();

    const data = {
      author: author,
      comment: review,
      rating: rating,
      resName: name,
      userId: userId
    };

    await fetch(
      "https://6b2uk8oqk7.execute-api.us-west-2.amazonaws.com/prod/review",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      }
    )
      //check if data was correctly sent in console log
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      });
    //Reset form after submission
    setRating(1);
    setReview("");
    window.location.reload();
    handleClose();
  };

  return (
    <>
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title className="ms-auto">
            <b>Write a Review</b>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formRating">
              <Form.Label>
                <b>Author:</b>
              </Form.Label>
              <Form.Control
                type="text"
                placeholder="Your name"
                value={author}
                onChange={(event) => setAuthor(event.target.value)}
              />
              <br />
              <div style={{ display: "flex", alignItems: "center" }}>
                <Form.Label
                  style={{ marginRight: "10px", alignSelf: "flex-end" }}
                >
                  <b>Rating:</b>
                </Form.Label>
                <div style={{ marginTop: "-9px" }}>
                  <Rating
                    name="rating"
                    count={5}
                    value={rating}
                    onChange={setRating}
                    size={24}
                    activeColor="#ffd700"
                  />
                </div>
              </div>
            </Form.Group>
            <Form.Group controlId="formReview">
              <Form.Label>
                <b>Review: </b>
              </Form.Label>
              <br />
              <Form.Control
                as="textarea"
                rows={3}
                value={review}
                onChange={(event) => setReview(event.target.value)}
                style={{ height: "100px" }}
                maxLength="250"
              />
              <div style={{ textAlign: "left" }}>
                {250 - review.length} characters
              </div>
            </Form.Group>
            <br />
            <Button className="submitButton" type="submit">
              Submit
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default ReviewForm;
