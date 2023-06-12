import React from "react";
import { Container, Row, Col, Image, ListGroup } from "react-bootstrap";
import { Link } from "react-router-dom";
import ice from "../assests/icecream.png";

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
              <Row className="my-5">
                <ListGroup>
                  <ListGroup.Item>
                    <Link to="/">Home Page</Link>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Link to="/about">About</Link>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Link to="/contact">Contact</Link>
                  </ListGroup.Item>
                </ListGroup>
              </Row>
            </Container>
          </Col>
          <Col sm={6}>
            <Image
              src={ice}
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
