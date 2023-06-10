import { Button, Modal, Stack, Container, Row, Col } from "react-bootstrap";
import Auth from "@aws-amplify/auth";
import NavBarHome from "./NavBarHome";
import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState, useEffect } from "react";
import "./Owner.css";
import { useAuthenticator } from "@aws-amplify/ui-react";
import { useNavigate, Link } from "react-router-dom";
import { AiOutlineWarning } from "react-icons/ai"; //prettier-ignore


function Owner() {
  const [userId, setUserId] = useState("");
  const [hasRestaurant, setHasRestaurant] = useState(false);

  const { user } = useAuthenticator((context) => [context.user]);
  const navigate = useNavigate();

  const [showModal, setShowModal] = useState(false);

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
        .then((response) => response.json())
        .then((data) => {
          if (data.length !== 0) {
            setHasRestaurant(true);
          }
        });
    }
    checkRestaurantOwner();
  }, []);

  function deleteRestaurant() {
    setShowModal(true);
  }

  async function confirmDelete(restaurantName) {
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

        <Row className="justify-content-center">
          {hasRestaurant ? (
            <Col xs={12} md="auto" className="mb-2 text-center">
              <Button
                variant="outline-light"
                className="Owner-btn"
                href="./edit"
              >
                Edit Restaurant Webpage
              </Button>
            </Col>
          ) : (
            <Col xs={12} md="auto" className="mb-2 text-center">
              <Button
                variant="outline-light"
                className="Owner-btn"
                href="./create"
              >
                Webpage Creation
              </Button>
            </Col>
          )}
          {hasRestaurant && (
            <>
              <Col xs={12} md="auto" className="mb-2 text-center">
                <Button
                  variant="outline-light"
                  className="Owner-btn"
                  href="./orders"
                >
                  Check Orders
                </Button>
              </Col>
              <Col xs={12} md="auto" className="mb-2 text-center">
                <Link to={`/r/${userId}`}>
                  <Button variant="outline-light" className="Owner-btn">
                    View My Webpage
                  </Button>
                </Link>
              </Col>
            </>
          )}
        </Row>
        <br></br>
        {hasRestaurant && (
          <Row className="justify-content-center">
            <Col xs={12} md="auto" className="deletebutton">
              <Button
                variant="outline-light"
                className="Owner-btn"
                onClick={() => deleteRestaurant(user.getUsername())}
              >
                Delete Restaurant
              </Button>
            </Col>
          </Row>
        )}
      </Container>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header style={{ justifyContent: "center" }}>
          <Modal.Title style={{ position: "relative", fontWeight: "bold" }}>
          <AiOutlineWarning size={30} className="dangericon"/>Delete Restaurant<AiOutlineWarning size={30} className="dangericon"/>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
        Are you sure you want to <b>delete</b> your restaurant's webpage?
          <br></br>
          We will be unable to recover your account if you proceed.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Go Back
          </Button>
          <Button variant="danger" onClick={() => confirmDelete(userId)}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Owner;
