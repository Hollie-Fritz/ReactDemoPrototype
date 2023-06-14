import { React } from "react";
import { Modal, Col, Row, Container, Form, Image, Button } from "react-bootstrap"; // prettier-ignore

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
      <Modal show={show} onHide={handleClose} centered  size="lg">
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
                  <Image src="https://nuorderbucket.s3.us-west-2.amazonaws.com/DefaultTemplate03.png" rounded width="275" height="144" />
                  <Form.Check
                    type="radio"
                    id="default-radio"
                    label="Default Template"
                    name="template"
                    value="template1"
                  />
                </label>
              </Col>
              <Col>
                <label>
                  <Image src="https://nuorderbucket.s3.us-west-2.amazonaws.com/UpscaleTemplate02.png" rounded width="275" height="144" />
                  <Form.Check
                    type="radio"
                    id="default-radio"
                    label="Upscale"
                    name="template"
                    value="template2"
                  />
                </label>
              </Col>
            </Row>
            <Row>
              <Col>
                <label>
                  <Image src="https://nuorderbucket.s3.us-west-2.amazonaws.com/FreshTemplate02.png" rounded width="275" height="144" />
                  <Form.Check
                    type="radio"
                    id="default-radio"
                    label="Fresh"
                    name="template"
                    value="template3"
                  />
                </label>
              </Col>
              <Col>
                <label>
                  <Image src="https://nuorderbucket.s3.us-west-2.amazonaws.com/DessertBakery02.png" rounded width="275" height="144" />
                  <Form.Check
                    type="radio"
                    id="default-radio"
                    label="Dessert/Bakery"
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