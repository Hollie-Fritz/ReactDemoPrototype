import React, { useState, useEffect } from "react";
import { Button, Table, Form, FloatingLabel, Tooltip, OverlayTrigger, Card, } from "react-bootstrap"; //prettier-ignore
import { AiOutlineInfoCircle, AiOutlinePlus, AiOutlineMinus, } from "react-icons/ai"; //prettier-ignore
import styles from "./Template1Cart.module.css";
import { CiSquareRemove } from "react-icons/ci";
import { useAuthenticator } from "@aws-amplify/ui-react";

const Template1Cart = ({
  show,
  handleClose,
  fooddata,
  cart,
  setCart,
  userId,
  name
}) => {
  const [customerName, setCustomerName] = useState("");
  const [note, setNote] = useState("");
  const [message, setMessage] = useState(null); //empty or order completed
  const [utensils, setUtensils] = useState(false);
  const [checkout, setCheckout] = useState(false); //check out
  const [purchased, setPurchased] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [reviewOrder, setReviewOrder] = useState(false);
  const [showFields, setShowFields] = useState(false);
  const { user } = useAuthenticator((context) => [context.user]);

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
            quantity: quantity
          });
        }
      });

      //if cart is empty display messages
      if (items.length === 0) {
        if (!purchased) {
          console.log("purchased is false");
          setMessage(
            <span style={{ fontWeight: "bold" }}>
              Your cart is currently empty.
            </span>
          );
        } else {
          setPurchased(false);
        }
      } else {
        setMessage(null);
      }
    }
    // eslint-disable-next-line
  }, [show, fooddata, cart]);

  const handlePhoneNumber = (event) => {
    setPhoneNumber(event.target.value);
  };

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
    var items = [];
    fooddata.forEach((item) => {
      const quantity = cart[item.foodId] || 0;
      if (quantity > 0) {
        items.push({
          foodId: item.foodId,
          foodName: item.foodName,
          priceEach: item.foodPrice,
          quantity: quantity
        });
      }
    });

    let customerId = "";

    try {
      customerId = user.getUsername();
      console.log(customerId);
    } catch (err) {
      console.log(err);
    }

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
      phoneNumber: phoneNumber
    };
    //send data to server
    await fetch(
      "https://6b2uk8oqk7.execute-api.us-west-2.amazonaws.com/prod/order",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(converted)
      }
    )
      //check if data was correctly sent in console log
      .then((response) => response.json())
      .then((data) => {
        console.log("order data submitted");
        console.log(data);
      });
  };

  const handlePlaceOrder = async () => {
    ////////////////////////////////////////
    console.log(customerName);
    const FormControl = document.querySelectorAll('[id*="validation"]');
    console.log(FormControl.length);
    let isValid = true;
    // force validity to go in descending order instead of ascending order
    for (let index = FormControl.length - 1; index >= 0; index--) {
      if (!FormControl[index].checkValidity()) {
        console.log("is false");
        isValid = false;
        FormControl[index].reportValidity();
      }
    }
    if (!isValid) {
      // enables next button to work by incrementing
      return;
    }
    /////////////////////////////////////////
    await handleSubmit();
    //order completed message after submit
    setMessage(
      <>
        <p style={{ textAlign: "center", fontWeight: "bold" }}>Order placed!</p>
        <p style={{ textAlign: "center", fontSize: "18px" }}>
          See "My Orders" for the current status of your order.
        </p>
      </>
    );

    setCart({});
    setCheckout(false);
    setPurchased(true);
    setShowFields(false);
  };

  //tooltip for total price information
  const renderTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      10¢/bag fee is not included <br />
      Tip not included -- please consider a tip upon pick up!
    </Tooltip>
  );

  //check if the cart is empty
  const isCartEmpty = () => {
    return Object.values(cart).every((value) => value === 0);
  };

  const handleReviewOrder = () => {
    setShowFields(true);
  };

  //renders the table of items
  const renderTable = (checkoutTable) => (
    <Table responsive>
      <thead>
        <tr>
          <th>Name</th>
          <th>Price</th>
          <th>Quantity</th>
          <th>Subtotal</th>
          {checkoutTable && <th> </th>}
        </tr>
      </thead>
      <tbody>
        {/* map over the food data and display each item in a table row */}
        {fooddata.map((item, index) => {
          const quantity = cart[item.foodId] || 0;
          if (quantity <= 0) return null;

          const total = (quantity * item.foodPrice).toFixed(2);
          return (
            <tr key={item.foodId}>
              <td>{item.foodName}</td>
              <td>${item.foodPrice}</td>
              <td>
                {checkoutTable && (
                  <td>
                    {/* decrement item */}
                    <Button
                      size="sm"
                      onClick={() => handleDecrement(item.foodId)}
                      style={{
                        background: "transparent",
                        border: "none",
                        padding: 0,
                        outline: "none"
                      }}
                      classcheckoutTable={`${styles.buttonIcon} ${styles.buttonMinus} ${styles.decrementButton}`}
                    >
                      <AiOutlineMinus
                        size={20}
                        className={`${styles.iconMinus}`}
                      />
                    </Button>{" "}
                    {quantity}
                    {/* increment item */}
                    <Button
                      size="sm"
                      onClick={() => handleIncrement(item.foodId)}
                      style={{
                        background: "transparent",
                        border: "none",
                        padding: 0,
                        outline: "none"
                      }}
                      className={`${styles.buttonIcon} ${styles.buttonPlus} ${styles.incrementButton}`}
                    >
                      <AiOutlinePlus size={20} className={styles.iconPlus} />
                    </Button>
                  </td>
                )}
                {!checkoutTable && quantity}
              </td>
              <td>${total}</td>
              {checkoutTable && (
                <td>
                  <td>
                    {/* remove item */}
                    <Button
                      size="sm"
                      onClick={() => handleRemove(item.foodId)}
                      style={{
                        background: "transparent",
                        border: "none",
                        padding: 0,
                        outline: "none"
                      }}
                      className={`${styles.buttonIcon} ${styles.buttonPlus}`}
                    >
                      {/* remove item icon */}
                      <CiSquareRemove size={30} className={styles.iconRemove} />
                    </Button>
                  </td>
                </td>
              )}
            </tr>
          );
        })}
      </tbody>
      {checkoutTable && (
        <tfoot>
          <tr>
            <td colSpan="3">Total:</td>
            <td>${totalPrice.toFixed(2)}</td>
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
          </tr>
        </tfoot>
      )}
    </Table>
  );

  //renders the form for note, name, utensils, phone
  const renderForm = () => (
    <Form>
           <nobr className="fw-bold" colSpan="3">Total: </nobr>
           <nobr>${totalPrice.toFixed(2)}</nobr>
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
            <br></br>
      {/* NAME */}
      <br></br>
      <FloatingLabel
        controlId="floatingName"
        label="Name"
      >
      <Form.Control type="Name" placeholder="Enter your name" id = "validation"
        required
        onInvalid={(event) => {
          event.target.setCustomValidity(
              "Please enter a name"
          );
          }}
          onInput={(event) => {
            event.target.setCustomValidity("");
          }}
          onChange={(event)=> {
            console.log(customerName);
            handleCustomerName(event)
            }
          }
          value ={customerName}
      />
      </FloatingLabel>
      <br></br>
      {/* NOTE */}
      <FloatingLabel controlId="floatingTextarea2" label="Note">
        <Form.Control
          as="textarea"
          placeholder="Enter a note"
          onChange={handleNote}
          style={{ height: "100px" }}
          maxLength="250"
        />
        <div style={{ textAlign: "left" }}>{250 - note.length} characters</div>
      </FloatingLabel>
      <br></br>
      {/* PHONE NUMBER */}
      <FloatingLabel
        controlId="floatingPhoneNumber"
        label="Phone Number"
        onChange={handlePhoneNumber}
      >
        <Form.Control
          type="PhoneNumber"
          placeholder="Enter your Phone Number"
        />
      </FloatingLabel>
      <br></br>
      {/* UTENSIL TOGGLE */}
      <Form.Group className="mb-3" controlId="formBasicCheckbox">
        <Form.Check
          onChange={handleUtensils}
          type="checkbox"
          label="Utensils"
        />
      </Form.Group>
    </Form>
  );
  return (
    <div className="cart-container">
      <Card className="cart-card">
        <Card.Title>
          {isCartEmpty()
            ? "Add items to your cart to get started!"
            : "Your Current Pickup Order"}
        </Card.Title>
        {message ? (
          <Card.Body>{message}</Card.Body>
        ) : checkout ? (
          <>
            {!isCartEmpty() && (
              <Card.Body>
                {renderTable(false)}
                {showFields && renderForm()}
              </Card.Body>
            )}
            {!isCartEmpty() && (
              <Card.Footer>
                <Button
                  variant="secondary"
                  onClick={() => {
                    setCheckout(false);
                    setShowFields(false);
                  }}
                >
                  Edit Order
                </Button>
                {showFields ? (

                  <Button variant="primary" onClick={handlePlaceOrder}>
                    Place Order
                  </Button>
                ) : (
                  <Button variant="primary" onClick={handleReviewOrder}>
                    Add Details
                  </Button>
                )}
              </Card.Footer>
            )}
          </>
        ) : (
          <>
            {!isCartEmpty() && (
              <Card.Body>
                {renderTable(true)}
                {showFields && renderForm()}
              </Card.Body>
            )}
            {!isCartEmpty() && (
              <Card.Footer>
                <Button
                  variant="primary"
                  onClick={() => {
                    setCheckout(true);
                    setShowFields(false);
                  }}
                  disabled={isCartEmpty()}
                >
                  Review Order
                </Button>
              </Card.Footer>
            )}
          </>
        )}
      </Card>
    </div>
  );
};
export default Template1Cart;
