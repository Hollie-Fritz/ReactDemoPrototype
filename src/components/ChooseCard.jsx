import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuthenticator } from "@aws-amplify/ui-react";
import { Container, Col, Button, Row, Card } from "react-bootstrap";
import "../pages/Home.css";

import "@aws-amplify/ui-react/styles.css";

let Counter = () => {
  const { route, signOut } = useAuthenticator((context) => [
    context.route,
    context.signOut,
  ]);
  const navigate = useNavigate();

  function logOut() {
    signOut();
    navigate("/");
  }

  return (
    <Container variant="sm">
      <Row>
        <h1 style={{ color: "white" }}>Authentic food on your table</h1>
      </Row>
      <Row>
        <Col md={4}>
          <p style={{ color: "white" }}>
            Various options to choose from the list of local restaurants:
          </p>
        </Col>
      </Row>
      <Row>
        <Col md={4}>
          <Card
            md={4}
            className="shadow-lg"
            id="shadow"
            style={{
              marginTop: 50,
              marginBottom: 50,
              backgroundColor: "transparent",
            }}
          >
            <Card.Body>
              {route === "authenticated" ? (
                <Button
                  variant="success"
                  className="m-1"
                  onClick={() => navigate("/owner")}
                >Restauranteur
                </Button>
              ):""}
              {route !== "authenticated" ? (
                <Button
                  variant="success"
                  className="m-1"
                  onClick={() => navigate("/login")}
                >
                  {" "}
                  Restaurateur{" "}
                </Button>
              ) : (
                <Button
                  variant="success"
                  className="m-1"
                  onClick={() => logOut()}
                >
                  {" "}
                  Logout{" "}
                </Button>
              )}
              <Button variant="success" className="m-1" href="./search">
                Customer
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Counter;
