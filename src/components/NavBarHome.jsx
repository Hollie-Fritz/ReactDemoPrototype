import React from 'react';
import {Navbar, Container, Nav, NavDropdown, Row, Col} from 'react-bootstrap';
import logo from '../assests/NuOrderLogoLarge.png'
import "../pages/Home.css"
import { useNavigate } from 'react-router-dom'

let NavBarHome = () =>  {
    let navigate = useNavigate();
    return (
      <>
      <Container className='mt-1'fluid>
        <Navbar bg='transparent' expand='lg' variant='dark'>
            <Row>
                <Col md="auto">
                    <Navbar.Brand>
                         <Nav.Link  onClick={() =>{navigate("/");}}><img src={logo} alt='logo' className='logoHome'/></Nav.Link>
                    </Navbar.Brand>
                </Col>
                <Col className='md-auto'>
                    <Navbar.Toggle aria-controls='navbarScroll'/>
                    <Navbar.Collapse id='navbarScroll'>
                    <Nav className='justify-content-end'>
                        <Nav.Link href='/about'>About</Nav.Link> 
                        <Nav.Link href='/contact'>Contacts</Nav.Link> 
                    <NavDropdown title="Action" id="basic-nav-dropdown">
                        <NavDropdown.Item href="#action/3.1">Login</NavDropdown.Item>
                        <NavDropdown.Item href="#action/3.2">Sign Up</NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item href="#action/3.3">Search Restaurant</NavDropdown.Item>
                    </NavDropdown>
                    </Nav>
                    </Navbar.Collapse>
                </Col>

            </Row>
            </Navbar>
        </Container>
     
      </>
    );
}

export default NavBarHome;