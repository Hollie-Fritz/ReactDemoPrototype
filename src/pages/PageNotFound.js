import React from "react";
import { Container, Row, Col, Image, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./PageNotFound.css";

const PageNotFound = () => {
  return (
    <>
      <Container
        fluid="md"
        className="d-flex align-items-center justify-content-center"
      >
        <Row className="align-items-center">
          <Col sm={6} className="text-center">
            <Container>
              <Row className="my-5">
                <h1>404 Page Not Found</h1>
              </Row>
              <Row>
                <h3>You can go back to:</h3>
              </Row>

              <Button className="buttonLink" as={Link} to="/">
                Home Page
              </Button>
              <br></br>
              <Button
                variant="primary"
                className="buttonLink"
                as={Link}
                to="/about"
              >
                About
              </Button>
              <br></br>
              <Button
                variant="primary"
                className="buttonLink"
                as={Link}
                to="/contact"
              >
                Contact
              </Button>
              <br></br>
            </Container>
          </Col>
          <Col sm={6}>
            <Image
              src="https://nuorderbucket.s3.us-west-2.amazonaws.com/Kyle.png"
              alt="icecream"
              className="ice-cream"
              responsive
              style={{ width: "100%", height: "100%" }}
            />
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default PageNotFound;
