import React from "react";
import { Modal, Button, Table, Form, FloatingLabel } from "react-bootstrap";
import { useState } from "react";
import Auth from "@aws-amplify/auth";

function Cart(props) {
  const { show, handleClose, fooddata, cart, setCart, userId, name } = props;
  // const [cart, setCart] = useState(cart);
  const [customerName, setCustomerName] = useState("anonymous");
  const [note, setNote] = useState("");
  const [showMessage, setShowMessage] = useState(false);
  const [utensils, setUtensils] = useState(false);

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
    setUtensils(event.target.value === "on" ? true: false);
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
      setShowMessage(true);
      // set a timeout for how long you want the message to show up for
      setTimeout(()=>{
        setShowMessage(false);
      }, 7000) // 7 seconds
    });

    let customerId = "";
    
    try {
      let nameJson = await Auth.currentUserInfo();
      customerId = nameJson["username"];
      console.log(JSON.stringify(nameJson));
    } catch {

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

  return (
    <Modal dialogClassName="modal-90w" show={show} onHide={handleClose}>
      {showMessage ? (
        <Modal.Body>
          <h3>Your order is completed!</h3>
        </Modal.Body>
      ) : (
      <>
      <Modal.Header closeButton>
        <Modal.Title>Your Current Order</Modal.Title>
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
        <p className="text-right font-weight-bold">
          Total*: ${totalPrice.toFixed(2)}
        </p>
        <i> *10 cent/bag fee is not included </i>
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

          <div>
            <Form>
             {/* NOTE */}
              <FloatingLabel controlId="floatingTextarea2" label="note for Restaurant">
                <Form.Control
                  as="textarea"
                  placeholder="Enter a note"
                  onChange={handleNote} 
                  style={{ height: "100px" }}
                />
              </FloatingLabel>
              {/* Utensils */}
              <Form.Group className="mb-3" controlId="formBasicCheckbox">
                <Form.Check onChange={handleUtensils} type="checkbox" label="toggle for utensils" />
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