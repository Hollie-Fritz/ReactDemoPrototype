import React, { useState, useEffect } from "react";
import {
  Modal,
  Button,
  Table,
  Form,
  FloatingLabel,
  Tooltip,
  OverlayTrigger,
} from "react-bootstrap";
import Auth from "@aws-amplify/auth";
import { AiOutlineInfoCircle } from "react-icons/ai";
import styles from "./Cart.module.css";

function Cart(props) {
  const { show, handleClose, fooddata, cart, setCart, userId, name } = props;
  // const [cart, setCart] = useState(cart);
  const [customerName, setCustomerName] = useState("anonymous");
  const [note, setNote] = useState("");
  const [message, setMessage] = useState(null);
  const [utensils, setUtensils] = useState(false);

  useEffect(() => {
    if (show) {
      const items = [];
      fooddata.forEach((item) => {
        const quantity = cart[item.foodId] || 0;
        if (quantity > 0) {
          items.push({
            foodId: item.foodId,
            foodName: item.foodName,
            priceEach: item.foodPrice,
            quantity: quantity,
          });
        }
      });

      if (items.length === 0) {
        setMessage(
          "No items in the cart. Please add some items before checking out!"
        );
      } else {
        setMessage(null);
      }
    }
  }, [show, fooddata, cart]);

  const handleDecrement = (foodId) => {
    const temp = { ...cart };
    if (temp[foodId] > 1) {
      temp[foodId]--;
      setCart(temp);
    }
  };

  const handleIncrement = (foodId) => {
    const temp = { ...cart };
    temp[foodId]++;
    setCart(temp);
  };

  const handleRemove = (foodId) => {
    const temp = { ...cart };
    delete temp[foodId];
    setCart(temp);
  };

  const totalPrice = fooddata.reduce((total, item) => {
    const price = item.foodPrice * (cart[item.foodId] || 0);
    return total + price;
  }, 0);

  const handleCustomerName = (event) => {
    setCustomerName(event.target.value);
  };

  const handleNote = (event) => {
    setNote(event.target.value);
  };

  const handleUtensils = (event) => {
    setUtensils(event.target.value === "on" ? true : false);
  };

  const handleSubmit = async () => {
    const items = [];
    fooddata.forEach((item) => {
      const quantity = cart[item.foodId] || 0;
      if (quantity > 0) {
        items.push({
          foodId: item.foodId,
          foodName: item.foodName,
          priceEach: item.foodPrice,
          quantity: quantity,
        });
      }
    });

    if (items.length === 0) {
      return; // Don't proceed if no items in the cart.
    }

    setMessage("Your order is completed!");
    setTimeout(() => {
      setMessage(null);
    }, 7000); // 7 seconds

    let customerId = "";

    try {
      let nameJson = await Auth.currentUserInfo();
      customerId = nameJson["username"];
      console.log(JSON.stringify(nameJson));
    } catch {}

    const converted = {
      customerName: customerName,
      customerId: customerId,
      menuItems: items,
      restaurantId: userId,
      restaurantName: name,
      note: note,
      utensils: utensils,
      progress: "Order placed",
      totalCost: totalPrice,
    };
    await fetch(
      "https://6b2uk8oqk7.execute-api.us-west-2.amazonaws.com/prod/order",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(converted),
      }
    )
      //check if data was correctly sent in console log
      .then((response) => response.json())
      .then((data) => {
        console.log("order data submitted");
        console.log(data);
      });
    handleClose();
  };

  const renderTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      10¢/bag fee is not included <br></br>
      Tip not included -- please consider a tip upon pick upload
    </Tooltip>
  );

  return (
    <Modal dialogClassName="modal-90w" show={show} onHide={handleClose}>
      {message ? (
        <Modal.Body>
          <h3>{message}</h3>
        </Modal.Body>
      ) : (
        <>
          <Modal.Header closeButton>
            <Modal.Title>Your Current Pickup Order</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Table responsive>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Subtotal</th>
                  <th> </th>
                </tr>
              </thead>
              <tbody>
                {fooddata.map((item, index) => {
                  const quantity = cart[item.foodId] || 0;
                  if (quantity > 0) {
                    const total = (quantity * item.foodPrice).toFixed(2);
                    return (
                      <tr key={item.foodId}>
                        <td>{item.foodName}</td>
                        <td>${item.foodPrice}</td>
                        <td>
                          <Button
                            variant="secondary"
                            size="sm"
                            onClick={() => handleDecrement(item.foodId)}
                          >
                            -
                          </Button>{" "}
                          {quantity}{" "}
                          <Button
                            variant="secondary"
                            size="sm"
                            onClick={() => handleIncrement(item.foodId)}
                          >
                            +
                          </Button>
                        </td>
                        <td>${total}</td>
                        <td>
                          <Button
                            variant="danger"
                            size="sm"
                            onClick={() => handleRemove(item.foodId)}
                          >
                            X
                          </Button>
                        </td>
                      </tr>
                    );
                  } else {
                    return null;
                  }
                })}
              </tbody>
            </Table>
            <div className={styles.container}>
              <p className={`${styles.textRight} ${styles.fontWeightBold}`}>
                Total: ${totalPrice.toFixed(2)}
                <OverlayTrigger
                  placement="top"
                  delay={{ show: 250, hide: 400 }}
                  overlay={renderTooltip}
                >
                  <span className={styles.infoButton}>
                    <AiOutlineInfoCircle size={20} className={styles.icon} />
                  </span>
                </OverlayTrigger>
              </p>
            </div>

            <p></p>
            <div>
              <Form>
                <FloatingLabel
                  controlId="floatingName"
                  label="Name"
                  onChange={handleCustomerName}
                >
                  <Form.Control type="Name" placeholder="Enter your name" />
                </FloatingLabel>
              </Form>
            </div>
            <br></br>
            <div>
              <Form>
                {/* NOTE */}
                <FloatingLabel controlId="floatingTextarea2" label="Note">
                  <Form.Control
                    as="textarea"
                    placeholder="Enter a note"
                    onChange={handleNote}
                    style={{ height: "100px" }}
                    maxLength="250"
                  />
                  <div style={{ textAlign: "left" }}>
                    {250 - note.length} characters
                  </div>
                </FloatingLabel>
                <br></br>
                {/* Utensils */}
                <Form.Group className="mb-3" controlId="formBasicCheckbox">
                  <Form.Check
                    onChange={handleUtensils}
                    type="checkbox"
                    label="Utensils"
                  />
                </Form.Group>
              </Form>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="primary" onClick={handleSubmit} type="submit">
              Checkout
            </Button>
          </Modal.Footer>
        </>
      )}
    </Modal>
  );
}

export default Cart;
