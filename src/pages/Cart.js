import React from "react";
import { Modal, Button, Table, Form, FloatingLabel } from "react-bootstrap";
import { useState } from "react";

function Cart(props) {
  const { show, handleClose, fooddata, cart, setCart, userId, name } = props;
  // const [cart, setCart] = useState(cart);
  const [customerName, setCustomerName] = useState("anonymous");

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

    const converted = {
      customerName: customerName,
      menuItems: items,
      restaurantId: userId,
      restaurantName: name,
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
          Total: ${totalPrice.toFixed(2)}
        </p>
        <div>
          <Form>
            <FloatingLabel
              controlId="floatingName"
              label="Name"
              onChange={handleCustomerName}
            >
              <Form.Control type="name" placeholder="Enter your name" />
            </FloatingLabel>
          </Form>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={handleSubmit} type="submit">
          Checkout
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default Cart;