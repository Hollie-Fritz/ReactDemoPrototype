import React from "react";
import { useState, useEffect } from "react";
import { Modal, Container, Row, Col } from "react-bootstrap";
import Rating from "react-rating-stars-component";

const ViewReview = ({ show, handleClose, userId, name }) => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      let url = `https://6b2uk8oqk7.execute-api.us-west-2.amazonaws.com/prod/review?userId=${userId}`;
      const response = await fetch(url);
      const data = await response.json();
      setReviews(data);
      console.log(JSON.stringify(data));
    };
    fetchData();
  }, [userId]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    handleClose();
  };

  return (
    <>
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Reviews of {name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {reviews.map((current) => {
            return (
              <>
                <Container>
                  <Row>
                    <Col>{current["author"]}</Col>
                    <Col>
                        <Rating 
                            value={current["rating"]}
                            edit={false}
                            count={5}
                            size={20}
                            activeColor="#ffd700"
                        /></Col>
                    <Col>{current["date"]}</Col>
                  </Row>
                  <Row>
                    <Col>{current["comment"]}</Col>
                  </Row>
                </Container>{" "}
                <br></br>
              </>
            );
          })}
        </Modal.Body>
      </Modal>
    </>
  );
};

export default ViewReview;