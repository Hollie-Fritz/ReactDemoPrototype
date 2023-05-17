import React from "react";
import { Navbar, Container, Nav, NavDropdown, Row, Col } from "react-bootstrap";
import logo from "../assests/DarkLogo.png";
import "../pages/Home.css";
import { useNavigate } from "react-router-dom";
import { useAuthenticator } from "@aws-amplify/ui-react";

let NavBarHome = () => {
  const { signOut, user } = useAuthenticator((context) => [
    context.route,
    context.signOut,
    context.user, 
  ]);
  const navigate = useNavigate();

  function logOut() {
    signOut();
    navigate("/");
  }

  return (
    <>
      <Container className="mt-1" fluid>
        <Navbar bg="transparent" expand="lg" variant="light" style={{fontSize: "22px"}}>
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
                <Nav className="mr-auto">
                  <Nav.Link href="/about" style={{fontWeight: "bold"}}>About</Nav.Link>
                  <Nav.Link href="/contact" style={{fontWeight: "bold"}}>Contacts</Nav.Link>
                  <NavDropdown
                    title="Action"
                    id="basic-nav-dropdown"
                    style={{fontWeight: "bold"}}
                  >
                    {user ? (
                      <NavDropdown.Item onClick={() => logOut()}>
                        Logout
                      </NavDropdown.Item>
                    ) : (
                      <>
                        <NavDropdown.Item
                          onClick={() => {
                            navigate("/login");
                          }}
                        >
                          Login or Signup
                        </NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item href="/customer">
                          Search Restaurant
                        </NavDropdown.Item>
                      </>
                    )}
                  </NavDropdown>

                  {user && (
                    <Navbar.Text className="fw-bold" style={{ position: "absolute", right: 15, fontSize: "20px", color: "#fff" }}>
                      Welcome, {user.username}
                    </Navbar.Text>
                  )}
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
