import { React } from "react";
import { Modal, Col, Row, Container, Form, Image, Button } from "react-bootstrap"; // prettier-ignore
import template1 from "../assests/template1.JPG"
import template2 from "../assests/template2.JPG"
import template3 from "../assests/template3.JPG"
import template4 from "../assests/template4.JPG"

const ChooseTemplate = ({ show, handleClose, handleTemplateSelect }) => {
  // save the value of the selected template
  const handleSubmit = async (event) => {
    event.preventDefault();
    // find radio button selection
    const selectedTemplateRadio = document.querySelector(
      'input[name="template"]:checked'
    );
    // if the radio button is selected, then save the value
    if (selectedTemplateRadio) {
      const selectedTemplate = selectedTemplateRadio.value;
      handleTemplateSelect(selectedTemplate);
    }
    handleClose();
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
                <label>
                  <Image src={template1} rounded width="153" height="72" />
                  <Form.Check
                    type="radio"
                    id="default-radio"
                    label="template1"
                    name="template"
                    value="template1"
                  />
                </label>
              </Col>
              <Col>
                <label>
                  <Image src={template2} rounded width="153" height="72" />
                  <Form.Check
                    type="radio"
                    id="default-radio"
                    label="template2"
                    name="template"
                    value="template2"
                  />
                </label>
              </Col>
            </Row>
            <Row>
              <Col>
                <label>
                  <Image src={template3}rounded width="153" height="72" />
                  <Form.Check
                    type="radio"
                    id="default-radio"
                    label="template3"
                    name="template"
                    value="template3"
                  />
                </label>
              </Col>
              <Col>
                <label>
                  <Image src={template4} rounded width="153" height="72" />
                  <Form.Check
                    type="radio"
                    id="default-radio"
                    label="template4"
                    name="template"
                    value="template4"
                  />
                </label>
              </Col>
            </Row>
          </Container>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={handleSubmit}>Submit</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ChooseTemplate;
