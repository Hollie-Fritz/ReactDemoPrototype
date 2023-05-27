import React from "react";
import { Container, Row, Col } from "react-bootstrap";

let FooterHomePage = () => {
  return (
    <>
      <footer className="bg-dark text-light">
        <Container>
          <Row>
            <Col md={6}>
              <br></br>
              <h5>NuOrder</h5>
              <p>
                We offer restaurant owners a website for free to present their
                own restaurant page on the site as well as take in orders and
                requests. No prior experience is needed to use NuOrder for
                creating the restaurant wesite.
              </p>
            </Col>
            <Col md={3} className="text-center">
              <br></br>
              <h5>Links</h5>
              <ul className="list-unstyled">
                <li>
                  <a href="/">Home</a>
                </li>
                <li>
                  <a href="/">Home</a>
                </li>
                <li>
                  <a href="/about">About</a>
                </li>
                <li>
                  <a href="/contact">Contact</a>
                </li>
              </ul>
            </Col>
            <Col md={3}>
              <br></br>
              <h5>Contact Us</h5>
              <ul className="list-unstyled">
                <li>3000 Landerholm Cir SE</li>
                <li>Bellevue, WA</li>
                <li>admin@nuorder.shop</li>
                <li>(425) 564-1000</li>
              </ul>
            </Col>
          </Row>
        </Container>
        <div className="text-center py-3">
          &copy; {new Date().getFullYear()} NuOrder. All rights reserved.
        </div>
      </footer>
    </>
  );
};

export default FooterHomePage;
