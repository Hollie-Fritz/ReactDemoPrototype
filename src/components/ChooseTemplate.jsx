import React from "react";
import { Modal, Col, Row, Container, Form, Image, Button } from "react-bootstrap";
import square from "./square.jpg"; // placeholder image, needs to be removed from final file

const ChooseTemplate = ({ show, handleClose }) => {
  const handleSubmit = async (event) => {
    event.preventDefault();
  };

  return (
    <>
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title as="h2" className="ms-auto fw-bold">
            Template Options
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Container>
            {/* template selection in the form of images and radio buttons */}
            <Row>
              <Col>
              {/* label tag enables users to click on image or button to make selection */}
              <label>
                <Image src={square} rounded width="150" height="150" />
                <Form.Check
                  type="radio"
                  id="default-radio"
                  label="default template"
                  name="test"
                />
                </label>
              </Col>
              <Col>
              <label>
                <Image src={square} rounded width="150" height="150" />
                <Form.Check
                  type="radio"
                  id="default-radio"
                  label="template 2"
                  name="test"
                />
                </label>
              </Col>
            </Row>
            <Row>
              <Col>
              <label>
                <Image src={square} rounded width="150" height="150" />
                <Form.Check
                  type="radio"
                  id="default-radio"
                  label="template 3"
                  name="test"
                />
                </label>
              </Col>
              <Col>
              <label>
                <Image src={square} rounded width="150" height="150" />
                <Form.Check
                  type="radio"
                  id="default-radio"
                  label="template 4"
                  name="test"
                />
                </label>
              </Col>
            </Row>
          </Container>
        </Modal.Body>
        <Modal.Footer>
          {" "}
          {/* submit needs to be handled, the choice needs to be pushed to the database */}
          {/* const [formData, setFormData] = useState({ template: "", }); */}
          <Button onClick={handleSubmit}>Submit</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ChooseTemplate;