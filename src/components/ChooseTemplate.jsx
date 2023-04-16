import React, {useState} from 'react'
import {Modal, Col, Row, Container} from 'react-bootstrap'


const ChooseTemplate = () => {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

  return (
    <>
        <Modal show={show} onHide={handleClose}>
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