import "bootstrap/dist/css/bootstrap.min.css";
import Auth from "@aws-amplify/auth";
import React, { useState, useEffect } from "react";
import { Card, Table, Container, Row, Form, Button, Col, } from "react-bootstrap"; // prettier-ignore
import NavBarHome from "../components/NavBarHome";
import OrderProgress from "./OrderProgress";
import { useAuthenticator } from "@aws-amplify/ui-react";
import { useNavigate } from "react-router-dom";
import "./ViewStatus.module.css";

//component that displays the orders
function ViewOrder() {
  const [orders, setOrders] = useState([]);
  const { user } = useAuthenticator((context) => [context.user]);
  const navigate = useNavigate();

  //fetches the list of orders
  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
    const fetchOrder = async () => {
      try {
        let nameJson = await Auth.currentUserInfo();
        let searchId = nameJson["username"];
        const response = await fetch(
          `https://6b2uk8oqk7.execute-api.us-west-2.amazonaws.com/prod/orderByCustomerId?customerId=${searchId}`
        );
        const data = await response.json();
        setOrders(data);
        console.log(JSON.stringify(orders));
      } catch (error) {
        console.error(error);
      }
    };
    fetchOrder();

    // eslint-disable-next-line
  }, []);

  //rendering the component
  return (
    <>
      <NavBarHome />
      <Container>
        <Row>
          <br></br>
          <h2
            style={{
              fontWeight: "bold",
              marginTop: "20px",
              marginBottom: "-25px",
            }}
          >
            My Orders:
          </h2>
          {orders.map((order, index) => (
            <OrderCard
              order={order}
              index={index}
              user={user}
              navigate={navigate}
            />
          ))}
        </Row>
      </Container>
    </>
  );
}
//subcomponent that displays single order
function OrderCard({ order, user, navigate }) {
  //convert the order's dateTime string to a Date object
  const orderDateTime = new Date(order["dateTime"]);

  return (
    <Col md={5} style={{ margin: "30px" }}>
      <Card className="mb-3" style={{ height: "456px", overflowY: "auto" }}>
        <Card.Body>
          <Card.Title>
            <nobr className="fw-bold" style={{ fontSize: "25px" }}>
              {order["restaurantName"]}
            </nobr>
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
            <nobr className="fw-bold border-0" style={{ background: "white" }}>
              {" "}
              Note: {order["note"]}
            </nobr>
            <br></br>
            <nobr className="fw-bold border-0" style={{ background: "white" }}>
              {" "}
              Utensils:{" "}
            </nobr>
            {order["utensils"] ? "yes" : "no"}
            <br></br>
            <nobr className="fw-bold border-0" style={{ background: "white" }}>
              {" "}
              Total Cost:{" "}
            </nobr>{" "}
            ${order["totalCost"]}
            <br></br>
            <Form.Label className="fw-bold" column sm="2">
              <nobr>Order Progress:</nobr>
            </Form.Label>
            <OrderProgress stage={order["progress"]} />
            <Button
              style={{ marginTop: "20px" }}
              onClick={() =>
                navigate(
                  `/chat/${user.getUsername()}/${order["restaurantId"]}`,
                  {
                    state: {
                      name: order["restaurantName"],
                    },
                  }
                )
              }
            >
              Chat
            </Button>
          </Card.Text>
        </Card.Body>
      </Card>
    </Col>
  );
}

export default ViewOrder;
