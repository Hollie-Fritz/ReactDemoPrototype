import { Button, Stack, Container, Row, Col } from "react-bootstrap";
import Auth from "@aws-amplify/auth";
import NavBarHome from "./NavBarHome";
import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState, useEffect } from "react";
import "./Owner.css"; // you should create this file
import { useAuthenticator } from "@aws-amplify/ui-react";
import { useNavigate, Link } from "react-router-dom";

function Owner() {
  const [userId, setUserId] = useState("");
  const [hasRestaurant, setHasRestaurant] = useState(false);

  const { user } = useAuthenticator((context) => [context.user]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }

    async function get() {
      const nameJson = await Auth.currentUserInfo();
      const name = nameJson["username"];
      setUserId(name);
    }
    get();

    async function checkRestaurantOwner() {
      await fetch(
        `https://6b2uk8oqk7.execute-api.us-west-2.amazonaws.com/prod/restaurantById?id=${user.username}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json"
          }
        }
      )
        //check if data was correctly sent in console log
        .then((response) => response.json())
        .then((data) => {
          console.log("restaurant length is " + data.length);
          if (data.length !== 0) {
            setHasRestaurant(true);
          }
        });
    }
    checkRestaurantOwner();
  }, []);

  async function deleteRestaurant(restaurantName) {
    await fetch(
      `https://6b2uk8oqk7.execute-api.us-west-2.amazonaws.com/prod/restaurant`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ restaurantName: restaurantName })
      }
    ).then(() => {
      window.location.reload();
    });
  }

  return (
    <>
      <NavBarHome />
      <Container fluid className="Owner-bg">
        <Row className="justify-content-center mb-4">
          <Col xs={12} md={6} className="text-center">
            <h1 className="Owner-title">Welcome, {userId}!</h1>
          </Col>
        </Row>
        <Stack gap={3}>
          <Stack direction="horizontal" gap={2}>
            <Row>
              {hasRestaurant ? (
                <>
                  <Col className="col mb-2">
                    <Button
                      variant="outline-light"
                      block
                      className="Owner-btn"
                      href="./edit"
                    >
                      Edit Restaurant Webpage
                    </Button>
                  </Col>
                </>
              ) : (
                <Col xs={12} md={6} className="mb-2">
                  <Button
                    variant="outline-light"
                    block
                    className="Owner-btn"
                    href="./create"
                  >
                    Webpage Creation
                  </Button>
                </Col>
              )}
            </Row>
          </Stack>
          {hasRestaurant ? (
            <>
              <Row>
                <Col xs={12} md={6} className="mb-2">
                  <Button
                    variant="outline-light"
                    block
                    className="Owner-btn"
                    href="./orders"
                  >
                    Check Orders
                  </Button>
                </Col>
              </Row>
              <Row>
                <Col xs={12} md={6} className="mb-2">
                  <Link to={`/r/${userId}`}>
                    <Button variant="outline-light" block className="Owner-btn">
                      View My Webpage
                    </Button>
                  </Link>
                </Col>
              </Row>
              <Row>
                <Col xs={12} md={6} className="mb-2">
                  <Button
                    variant="outline-light"
                    block
                    className="Owner-btn"
                    onClick={() => deleteRestaurant(user.getUsername())}
                  >
                    Delete Restaurant
                  </Button>
                </Col>
              </Row>
            </>
          ) : (
            ""
          )}
        </Stack>
      </Container>
    </>
  );
}

export default Owner;
