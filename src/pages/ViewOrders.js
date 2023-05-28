import "bootstrap/dist/css/bootstrap.min.css";
import Auth from "@aws-amplify/auth";
import React, { useState, useEffect } from "react";
import { Card, Table, Container, Row, Form, Button, Col, Accordion, } from "react-bootstrap";
import NavBarHome from "../components/NavBarHome";
import OrderProgress from "./OrderProgress";
import { useAuthenticator } from "@aws-amplify/ui-react";
import { useNavigate } from "react-router-dom";
import { AiOutlineCheck } from "react-icons/ai";

function ViewOrder() {
  const [orders, setOrders] = useState([]);
  const [loadingState, setLoadingState] = useState({});
  const { user } = useAuthenticator((context) => [context.user]);
  const navigate = useNavigate();

  async function fetchOrders() {
    const { username } = await Auth.currentUserInfo();
    const response = await fetch(
      `https://6b2uk8oqk7.execute-api.us-west-2.amazonaws.com/prod/order?name=${username}`,
      {
        headers: { "Content-Type": "application/json" },
      }
    );
    const data = await response.json();
    setOrders(data);
  }

  async function updateOrderStatus(orderId, status) {
    setLoadingState((prevState) => ({ ...prevState, [orderId]: true }));

    const body = { orderId, updateKey: "progress", updateValue: status };

    await fetch(
      "https://6b2uk8oqk7.execute-api.us-west-2.amazonaws.com/prod/order",
      {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      }
    );

    setTimeout(
      () =>
        setLoadingState((prevState) => ({ ...prevState, [orderId]: false })),
      800
    );
  }

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <>
      <NavBarHome />
      <Container>
        <Row>
          {orders.map((order, index) => (
            <OrderCard
              order={order}
              index={index}
              user={user}
              loadingState={loadingState}
              updateOrderStatus={updateOrderStatus}
              navigate={navigate}
            />
          ))}
        </Row>
      </Container>
    </>
  );
}

function OrderCard({
  order,
  index,
  user,
  loadingState,
  updateOrderStatus,
  navigate,
}) {
  const orderDateTime = new Date(order["dateTime"]);

  return (
    <Col md={5}>
      <Accordion defaultActiveKey="0">
        <Card className="mb-3">
          <Card.Body>
            <Card.Title>
              <nobr className="fw-bold">{order["customerName"]}'s order</nobr>
            </Card.Title>
            <Card.Text>
              <nobr className="fw-bold">Order Date:</nobr>{" "}
              {orderDateTime.toLocaleDateString()}
              <br></br>
              <nobr className="fw-bold">Order Time:</nobr>{" "}
              {orderDateTime.toLocaleTimeString()}
              <Table responsive>
                <thead>
                  <tr>
                    <th>Item</th>
                    <th>Quantity</th>
                    <th>Price</th>
                  </tr>
                </thead>
                <tbody>
                  {order["menuItems"].map((current) => {
                    return (
                      <tr key={current["foodName"]}>
                        <td>{current["foodName"]}</td>
                        <td>{current["quantity"]}</td>
                        <td>${current["priceEach"]}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </Table>
              <nobr
                className="fw-bold border-0"
                style={{ background: "white" }}
              >
                {" "}
                Note: {order["note"]}
              </nobr>
              <br></br>
              <nobr
                className="fw-bold border-0"
                style={{ background: "white" }}
              >
                {" "}
                Utensils:{" "}
              </nobr>
              {order["utensils"] ? "yes" : "no"}
              <br></br>
              <nobr
                className="fw-bold border-0"
                style={{ background: "white" }}
              >
                {" "}
                Total Cost:{" "}
              </nobr>{" "}
              ${order["totalCost"]}
              <br></br>
              <Form.Label className="fw-bold" column sm="2">
                Progress:
              </Form.Label>
              <Form.Group as={Row}>
                <Col>
                  <Form.Select
                    className="form-control"
                    name="progress"
                    defaultValue={order["progress"]}
                    id={"form" + index}
                  >
                    <option value="Order placed"> Order Placed </option>
                    <option value="Preparing"> Preparing </option>
                    <option value="Ready"> Ready </option>
                  </Form.Select>
                </Col>
                <Col sm="4">
                  <Button
                    onClick={async () => {
                      const form = document.getElementById("form" + index);
                      await updateOrderStatus(order["id"], form.value);
                    }}
                    style={{ marginBottom: "20px" }}
                  >
                    {loadingState[order["id"]] ? (
                      <AiOutlineCheck size={20} />
                    ) : (
                      "Submit Stage"
                    )}
                  </Button>
                </Col>
              </Form.Group>
              <OrderProgress stage={order["progress"]} />
              {user && order["customerId"] !== "" && (
                <Button
                  style={{ marginTop: "20px" }}
                  onClick={() =>
                    navigate(
                      `/chat/${user.getUsername()}/${order["customerId"]}`,
                      {
                        state: {
                          name: order["customerName"],
                        },
                      }
                    )
                  }
                >
                  Chat
                </Button>
              )}
            </Card.Text>
          </Card.Body>
        </Card>
      </Accordion>
    </Col>
  );
}

export default ViewOrder;
