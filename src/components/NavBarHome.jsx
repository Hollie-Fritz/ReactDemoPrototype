import React from "react";
import { Navbar, Container, Nav, NavDropdown, Row, Col } from "react-bootstrap";
import logo from "../assests/NuOrderLogoLarge.png";
import "../pages/Home.css";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuthenticator } from "@aws-amplify/ui-react";

let NavBarHome = () => {
  const { signOut, user } = useAuthenticator((context) => [
    context.route,
    context.signOut,
    context.user, 
  ]);
  const navigate = useNavigate();
  const location = useLocation();

  function logOut() {
    signOut();
    navigate("/");
  }
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
                <Nav className="mr-auto">
                  <Nav.Link href="/about" style={{fontWeight: "bold"}}>About</Nav.Link>
                  <Nav.Link href="/contact" style={{fontWeight: "bold"}}>Contacts</Nav.Link>
                  <NavDropdown
                    title="Action"
                    id="basic-nav-dropdown"
                    style={{fontWeight: "bold"}}
                  >
                    {user ? (
                      <NavDropdown.Item onClick={() => {
                          logOut()
                          navigate(location.pathname === "/owner" ? "/":location.pathname);
                          }
                        }>
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
                        <NavDropdown.Divider />
                        <NavDropdown.Item onClick={() => {
                          navigate("/owner");
                          }} style={{fontWeight: "bold"}}
                        > Merchant Portal
                        </NavDropdown.Item>
                      </>
                    )}
                  </NavDropdown>
                  
                  <Nav.Link onClick={() => {
                    navigate("/login");
                    }} style={{fontWeight: "bold"}}
                  > Create Account/Login </Nav.Link>
                  
                  <Nav.Link onClick={() => {
                    navigate("/owner");
                    }} style={{fontWeight: "bold"}}
                  > Merchant Portal </Nav.Link>

                  {user && (
                    <>
                    <Nav.Link href="/orderStatus" style={{ fontWeight: "bold" }}>My Orders</Nav.Link>
                    <Navbar.Text className="fw-bold" style={{ position: "absolute", right: 15, fontSize: "20px", color: "#fff" }}>
                      Welcome, {user.username}
                    </Navbar.Text>
                    </>
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

