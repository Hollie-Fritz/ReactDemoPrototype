import { Button, Stack, Container, Row, Col } from "react-bootstrap";
import Auth from "@aws-amplify/auth";
import NavBarHome from "./NavBarHome";
import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState, useEffect } from "react";
import './Owner.css'; // you should create this file
import { useAuthenticator } from "@aws-amplify/ui-react";
import { useNavigate } from "react-router-dom";

function Owner() {
  const [userId, setUserId] = useState("");
  const { user } = useAuthenticator((context) => [
    context.user, 
  ]);
  const navigate = useNavigate();

  useEffect(() => {              
    if(!user){
      navigate("/login")
    }                           
    async function get(){
      const nameJson = await Auth.currentUserInfo();
      const name = nameJson["username"];
      setUserId(name);
    }
    get();
  }, []);

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
              <Col xs={12} md={6} className="mb-2">
                <Button variant="outline-light" block className="Owner-btn" href="./create">
                  Webpage Creation
                </Button>
              </Col>
              <Col xs={12} md={6} className="mb-2">
                <Button variant="outline-light" block className="Owner-btn" href="./edit">
                  Edit Restaurant Webpage
                </Button>
              </Col>
            </Row>
          </Stack>
          <Row>
            <Col xs={12} md={6} className="mb-2">
              <Button variant="outline-light" block className="Owner-btn" href="./orders">
                Check Orders
              </Button>
            </Col>
          </Row>
          <Row>
            <Col xs={12} md={6} className="mb-2">
              <Button variant="outline-light" block className="Owner-btn" href="./orders">
                Check Orders
              </Button>
            </Col>
          </Row>
        </Stack>
      </Container>
    </>
  );
}

export default Owner;
