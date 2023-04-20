import React from "react";
import { Modal, Table } from "react-bootstrap";
import Rating from "react-rating-stars-component";

const ViewReview = ({ show, handleClose, name, reviews }) => {
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
                <th width="25%">Author</th>
                <th width="20%">Rating</th>
                <th width="18%">Date</th>
                <th width="40%">Comment</th>
              </tr>
            </thead>
            <tbody>
              {reviews.map((current, index) => {
                return (
                  <React.Fragment key={index}>
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
                  </React.Fragment>
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