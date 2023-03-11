import React from "react";
import { Navbar, Container, Nav, NavDropdown, Row, Col } from "react-bootstrap";
import logo from "../assests/NuOrderLogoLarge.png";
import "../pages/Home.css";
import { useNavigate } from "react-router-dom";

let NavBarHome = () => {
  let navigate = useNavigate();
  return (
    <>
      <Container className="mt-1" fluid>
        <Navbar bg="transparent" expand="lg" variant="dark">
          <Row>
            <Col md="auto">
              <Navbar.Brand>
                <Nav.Link
                  onClick={() => {
                    navigate("/");
                  }}
                >
                  <img src={logo} alt="logo" className="logoHome" />
                </Nav.Link>
              </Navbar.Brand>
            </Col>
            <Col className="md-auto">
              <Navbar.Toggle aria-controls="navbarScroll" />
              <Navbar.Collapse id="navbarScroll">
                <Nav className="justify-content-end">
                  <Nav.Link className="fw-bold" href="/about">About</Nav.Link>
                  <Nav.Link className="fw-bold" href="/contact">Contacts</Nav.Link>
                  <NavDropdown className="fw-bold"  title="Action" id="basic-nav-dropdown">
                    <NavDropdown.Item onClick={() => {
                    navigate("/login");
                    }}>
                      Login or Signup
                    </NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item href="/customer">
                      Search Restaurant
                    </NavDropdown.Item>
                  </NavDropdown>
                </Nav>
              </Navbar.Collapse>
            </Col>
          </Row>
        </Navbar>
      </Container>
    </>
  );
};

export default NavBarHome;
