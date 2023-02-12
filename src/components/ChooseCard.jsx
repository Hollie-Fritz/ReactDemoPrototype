import React from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useAuthenticator , Button as button} from '@aws-amplify/ui-react';
import { Container, Col, Button, Row, Card} from 'react-bootstrap';
import "../pages/Home.css"


import '@aws-amplify/ui-react/styles.css';

let Counter = () => {

    // const { route, signOut } = useAuthenticator((context) => [
    //     context.route,
    //     context.signOut,
    //   ]);
    //   const navigate = useNavigate();
    
    // function logOut() {
    //     signOut();
    //     navigate('/login');
    // }

    return (
        
            <Container variant="sm">
                <Row>
                    <h1 style={{color: 'white'}}>Authentic food on your table</h1>
                </Row>
                <Row>
                    <Col md={4}>
                        <p style={{color: 'white'}}>Various options to choose from the list of local restaurants:</p>
                    </Col>
                </Row>
                <Row>
                    <Col md={4}>
                        
                        <Card md={4} className='shadow-lg' id="shadow" style={{marginTop: 50, marginBottom: 50, backgroundColor: 'transparent'}}>
                            <Card.Body>
                                <p className='display-6' style={{color: 'white'}}>I am...</p>
                                <Button variant='success' className='m-1' href='./search'>Customer</Button> 
                                <Button variant='success' className='m-1'>Restaurateaur</Button>

{/* 
                                {route !== 'authenticated' ? (
                                <button style={{color: "orange"}} onClick={() => navigate('/login')}> Restaurateur </button>
                                ) : (
                                <button onClick={() => logOut()}> Logout </button>
                                )} */}

                            </Card.Body>
                        </Card>

                    </Col>
                </Row>
            </Container>
        
    )
};

export default Counter;