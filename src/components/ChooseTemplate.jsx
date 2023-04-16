import React, {useState} from 'react'
import {Modal, Col, Row, Container} from 'react-bootstrap'


const ChooseTemplate = (show, handleClose) => {

    const handleSubmit = async (event) => {
        event.preventDefault();

    };

  return (
    <>
        <Modal show={show} onHide={handleClose} centered>
            <Modal.Header closeButton>
                <Modal.Title>Template Options</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Container>
                    <Row>
                        <Col>
                        </Col>
                        <Col>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                        </Col>
                        <Col>
                        </Col>
                    </Row>
                </Container>
            </Modal.Body>
        </Modal>
      
    </>
  )
}

export default ChooseTemplate