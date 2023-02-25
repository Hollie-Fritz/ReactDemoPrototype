import React from "react";
import { Modal } from "react-bootstrap";

const Cart = (show, handleClose, fooddata, cart) => {
  return (
    <>
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Your current order</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {Object.keys(cart || {}).map(function (key) {
                for (var i = 0; i < fooddata.length; i++) {
                  if (fooddata[i]["foodId"] === key) {
                    return (

                        <div>
                          <div>{fooddata[i]["foodId"]}</div>
                          <div>{fooddata[i]["foodName"]}</div>
                          <div>{fooddata[i]["priceEach"]}</div>
                          <div>{cart[key]}</div>
                        </div>

                    );
                  }
                }
                return {};
              })}
        </Modal.Body>
      </Modal>
    </>
  );
};

export default Cart;