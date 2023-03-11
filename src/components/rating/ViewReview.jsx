import React from "react";
import { useState, useEffect } from "react";
import { Modal, Container, Row, Col, Table } from "react-bootstrap";
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
          <Modal.Title className="ms-auto">Reviews of {name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Table responsive="lg" hover size="sm">
            <thead>
              <tr>
                <th width='25%'>Author</th>
                <th width='20%'>Rating</th>
                <th width='18%'>Date</th>
                <th  width='40%'>Comment</th>
              </tr>
            </thead>
            <tbody>
              {reviews.map((current) => {
                return (
                  <>
                    <tr key={current["author"]}>
                      <td>{current["author"]}</td>
                      <td>
                        <Rating
                          value={current["rating"]}
                          edit={false}
                          count={5}
                          size={20}
                          activeColor="#ffd700"
                        />
                      </td>
                      <td>{current["date"]}</td>
                      <td>{current["comment"]}</td>
                    </tr>
                  </>
                );
              })}
            </tbody>
          </Table>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default ViewReview;