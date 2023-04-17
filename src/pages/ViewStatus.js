import React, { useState, useEffect } from "react";
import { Card } from "react-bootstrap";
import OrderProgress from "./OrderProgress";

function ViewStatus({ searchId }) {
  const [order, setOrder] = useState(null);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const response = await fetch(`https://6b2uk8oqk7.execute-api.us-west-2.amazonaws.com/prod/orderByCustomerId?customerId=${searchId}`);
        const data = await response.json();
        setOrder(data[0]);
      } catch (error) {
        console.error(error);
      }
    };
    fetchOrder();
  }, [searchId]);

  return (
    <div>
      {order && (
        <Card className="my-3">
          <Card.Body>
            <Card.Title>Order Progress</Card.Title>
            <OrderProgress stage={order.progress} />
          </Card.Body>
        </Card>
      )}
    </div>
  );
}

export default ViewStatus;
