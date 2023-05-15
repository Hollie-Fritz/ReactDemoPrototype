import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuthenticator } from "@aws-amplify/ui-react";
import { Container, Col, Button, Row, Card } from "react-bootstrap";
import "../pages/Home.css";
import "@aws-amplify/ui-react/styles.css";
//Hello Hollie


let ChooseCard = () => {
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
        <h2 style={{ color: "white" }}>Simplifying online ordering for<br></br> restaurant owners and customers alike.</h2>
      </Row>
      <Row>
        <Col md={4}>
        <Card
            md={4}
            className="border-0"
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
                  variant="light"
                  className="m-1"
                  onClick={() => navigate("/owner")}
                >
                  Restaurateur
                </Button>
              ) : (
                ""
              )}
              {route !== "authenticated" ? (
                <Button
                  variant="light"
                  className="m-1"
                  onClick={() => navigate("/login")}
                >
                  {" "}
                  Restaurateur{" "}
                </Button>
              ) : (
                <Button
                  variant="secondary"
                  className="m-1"
                  onClick={() => logOut()}
                >
                  {" "}
                  Logout{" "}
                </Button>
              )}
              <Button variant="light" className="m-1" href="./customer">
                Customer
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default ChooseCard;