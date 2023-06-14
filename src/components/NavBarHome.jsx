import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuthenticator } from "@aws-amplify/ui-react";
// import { useNavigate, useLocation } from "react-router-dom";
import { Navbar, Container, Nav, NavDropdown, Row, Col } from "react-bootstrap";
import logo from "../assests/NuOrderLogoLarge.png";

import "../pages/Home.css";

let NavBarHome = () => {
  const { signOut, user } = useAuthenticator((context) => [
    context.route,
    context.signOut,
    context.user
  ]);
  const navigate = useNavigate();

  function logOut() {
    signOut();
    navigate("/");
    window.location.reload();
    navigate(-1);
  }

  return (
    <>
      <Navbar bg="dark" expand="lg" variant="dark" style={{ fontSize: "22px" }}>
        <Container className="mt-1" fluid>
          <Row>
            <Col md="auto">
              <Navbar.Brand>
                <Nav.Link href="/">
                  <img src={logo} alt="logo" className="logoHome" />
                </Nav.Link>
              </Navbar.Brand>
            </Col>
            <Col className="md-auto">
              <Navbar.Toggle aria-controls="navbarScroll" />
              <Navbar.Collapse id="navbarScroll">
                <Nav className="mr-auto">
                  <Nav.Link href="/about" style={{ fontWeight: "bold" }}>
                    About
                  </Nav.Link>
                  <Nav.Link href="/contact" style={{ fontWeight: "bold" }}>
                    Contact
                  </Nav.Link>
                  {user ? (
                    <>
                      <Nav.Link
                        href="/orderStatus"
                        style={{ fontWeight: "bold" }}
                      >
                        {" "}
                        My Orders{" "}
                      </Nav.Link>
                      <Nav.Link href="/owner" style={{ fontWeight: "bold" }}>
                        {" "}
                        Merchant Portal{" "}
                      </Nav.Link>
                      <Nav.Link
                        href="/chat"
                        style={{
                          fontWeight: "bold",
                          position: "absolute",
                          right: 200
                        }}
                      >
                        {" "}
                        Chat{" "}
                      </Nav.Link>
                      <NavDropdown
                        title={user.username}
                        id="basic-nav-dropdown"
                        className="fw-bold dropdown"
                        style={{
                          position: "absolute",
                          right: 15,
                          fontSize: "20px",
                          color: "#fff"
                        }}
                      >
                        <NavDropdown.Item
                          onClick={() => {
                            logOut();
                          }}
                          style={{ fontWeight: "bold" }}
                        >
                          Sign Out
                        </NavDropdown.Item>
                      </NavDropdown>
                    </>
                  ) : (
                    <Nav.Link
                      onClick={() => {
                        navigate("/login");
                      }}
                      style={{
                        position: "absolute",
                        right: 15,
                        fontWeight: "bold"
                      }}
                    >
                      {" "}
                      Sign Up/Login{" "}
                    </Nav.Link>
                  )}
                </Nav>
              </Navbar.Collapse>
            </Col>
          </Row>
        </Container>
      </Navbar>
    </>
  );
};

export default NavBarHome;
