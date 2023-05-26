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
import {
  AiOutlineInfoCircle,
  AiOutlinePlus,
  AiOutlineMinus,
} from "react-icons/ai";
import styles from "./Cart.module.css";
import { CiSquareRemove } from "react-icons/ci";

function Cart(props) {
  const { show, handleClose, fooddata, cart, setCart, userId, name } = props;
  const [customerName, setCustomerName] = useState("anonymous");
  const [note, setNote] = useState("");
  const [message, setMessage] = useState(null);
  const [utensils, setUtensils] = useState(false);

  //useEffect hook to handle message display based on cart items
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
      //if cart is empty display message
      if (items.length === 0) {
        setMessage("Your cart is currently empty.");
      } else {
        setMessage(null);
      }
    }
  }, [show, fooddata, cart]);

  //handler to decrement an item in the cart
  const handleDecrement = (foodId) => {
    const temp = { ...cart };
    if (temp[foodId] > 1) {
      temp[foodId]--;
      setCart(temp);
    }
  };

  //handler to increase an item in the cart
  const handleIncrement = (foodId) => {
    const temp = { ...cart };
    temp[foodId]++;
    setCart(temp);
  };

  //handler to remove an item from the cart
  const handleRemove = (foodId) => {
    const temp = { ...cart };
    delete temp[foodId];
    setCart(temp);
  };

  //handler to calculate total price of items in cart
  const totalPrice = fooddata.reduce((total, item) => {
    const price = item.foodPrice * (cart[item.foodId] || 0);
    return total + price;
  }, 0);

  //handler for customer name
  const handleCustomerName = (event) => {
    setCustomerName(event.target.value);
  };

  //handler for note
  const handleNote = (event) => {
    setNote(event.target.value);
  };

  //handler for toggle of utensils
  const handleUtensils = (event) => {
    setUtensils(event.target.value === "on" ? true : false);
  };

  //handler for check out
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

    //message display upon checkout
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

    //convert data to be sent serverside
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
    //send data to server
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

    //close cart modal
    handleClose();
  };

  //tooltip for total price information
  const renderTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      10¢/bag fee is not included <br />
      Tip not included -- please consider a tip upon pick upload
    </Tooltip>
  );

  return (
    // MODAL
    <Modal dialogClassName="modal-90w" show={show} onHide={handleClose}>
      {message ? (
        // if cart is empty display error message
        <Modal.Header closeButton>
          <Modal.Title
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "100%",
            }}
          >
            <h3>{message}</h3>
          </Modal.Title>
        </Modal.Header>
      ) : (
        //if not display the cart
        <>
          <Modal.Header closeButton>
            <Modal.Title>Your Current Pickup Order</Modal.Title>
          </Modal.Header>
          <Modal.Body>

            {/* TABLE */}
            {/* table that displays order items */}
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

                {/* map over the food data and display each item in a table row */}
                {fooddata.map((item, index) => {
                  const quantity = cart[item.foodId] || 0;
                  if (quantity > 0) {
                    const total = (quantity * item.foodPrice).toFixed(2);
                    return (
                      <tr key={item.foodId}>
                        <td>{item.foodName}</td>
                        <td>${item.foodPrice}</td>
                        <td>
                          {/* decrement item */}
                          <Button
                            size="sm"
                            onClick={() => handleDecrement(item.foodId)}
                            style={{
                              background: "transparent",
                              border: "none",
                              padding: 0,
                              outline: "none",
                            }}
                            className={`${styles.buttonIcon} ${styles.buttonMinus}`}
                          >
                            {/* decrement icon */}
                            <AiOutlineMinus
                              size={20}
                              className={`${styles.iconMinus}`}
                            />
                          </Button>
                          {" "}
                          {quantity}

                          {/* increment item */}
                          <Button
                            size="sm"
                            onClick={() => handleIncrement(item.foodId)}
                            style={{
                              background: "transparent",
                              border: "none",
                              padding: 0,
                              outline: "none",
                            }}
                            className={`${styles.buttonIcon} ${styles.buttonPlus}`}
                          >
                            {/* increment icon */}
                            <AiOutlinePlus
                              size={20}
                              className={styles.iconPlus}
                            />
                          </Button>
                        </td>
                        <td>${total}</td>
                        <td>
                          {/* remove item */}
                          <Button
                            size="sm"
                            onClick={() => handleRemove(item.foodId)}
                            style={{
                              background: "transparent",
                              border: "none",
                              padding: 0,
                              outline: "none",
                            }}
                            className={`${styles.buttonIcon} ${styles.buttonPlus}`}
                          >
                            {/* remove item icon */}
                            <CiSquareRemove
                              size={30}
                              className={styles.iconRemove}
                            />
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
            {/* TABLE */}

            <div className={styles.container}>
              <p className={`${styles.textRight} ${styles.fontWeightBold}`}>
                Total: ${totalPrice.toFixed(2)}
                {/* tooltip trigger for price */}
                <OverlayTrigger
                  placement="top"
                  delay={{ show: 250, hide: 400 }}
                  overlay={renderTooltip}
                >
                  {/* tooltip icon */}
                  <span className={styles.infoButton}>
                    <AiOutlineInfoCircle size={20} className={styles.icon} />
                  </span>
                </OverlayTrigger>
              </p>
            </div>

            <p></p>
            <div>
              <Form>
                {/* NAME */}
                <FloatingLabel
                  controlId="floatingName"
                  label="Name"
                  onChange={handleCustomerName}
                >
                  <Form.Control type="Name" placeholder="Enter your name" />
                </FloatingLabel>
                {/* NAME */}
              </Form>
            </div>
            <br />
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
                    {/* displays the remaining characters left for the note */}
                    {250 - note.length} characters
                  </div>
                </FloatingLabel>
                <br />
                 {/* NOTE */}

                {/* UTENSIL TOGGLE */}
                <Form.Group className="mb-3" controlId="formBasicCheckbox">
                  <Form.Check
                    onChange={handleUtensils}
                    type="checkbox"
                    label="Utensils"
                  />
                </Form.Group>
                {/* UTENSIL TOGGLE */}

              </Form>
            </div>
          </Modal.Body>
          <Modal.Footer>
            {/* button for order submission */}
            <Button variant="primary" onClick={handleSubmit} type="submit">
              Checkout
            </Button>
          </Modal.Footer>
        </>
      )}
    </Modal>
    // MODAL
  );
}

export default Cart;
