import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  Form,
  InputGroup,
  Row,
  Button,
  Container,
  FormControl,
  Tooltip,
  OverlayTrigger,
} from "react-bootstrap";
import { v4 as uuidv4 } from "uuid";

import ChooseTemplate from "../components/ChooseTemplate";
import { useEffect, useState } from "react";

//form for restaurant info such as name, phone number and address
function InfoEdit({ formData, setFormData }) {
  const [showChooseTemplate, setShowChooseTemplate] = useState(false);

  // show the ChooseTemplate modal
  const handleChooseTemplate = () => {
    setShowChooseTemplate(true);
  };

  // show the Template modal
  const handleChooseTemplateClose = () => {
    setShowChooseTemplate(false);
  };

  // save the template selection
  const handleTemplateSelect = (template) => {
    setFormData({ ...formData, template: template });
  };

  const [selectedFile, setSelectedFile] = useState("");

  // save the uploaded image name to display
  const handleFileChange = (e) => {
    if (e.target.files.length > 0) {
      setSelectedFile(e.target.files[0].name);
    }
  };

  const renderTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      The restaurant banner looks best with the following dimensions:<br></br>
      ?x?<br></br>
      It will be displayed at the top of your web page with your restaurant name
      over it.
    </Tooltip>
  );

  useEffect(() => {
    const imageForm = document.querySelector("#imageForm");
    const imageInput = document.querySelector("#imageInput");

    const handleSubmit = async (event) => {
      event.preventDefault();
      const file = imageInput.files[0];
      const imageName = uuidv4();

      await fetch(
        "https://6b2uk8oqk7.execute-api.us-west-2.amazonaws.com/prod/s3/nuorderbucket/" +
          imageName,
        {
          method: "PUT",
          body: file,
          headers: {
            "Content-type": file.type,
          },
        }
      ).then(() => {
        setFormData({ ...formData, mainImageUrl: imageName });
        const mainImage = document.querySelector("#mainImage");
        mainImage.src = file;
      });
    };

    imageForm.addEventListener("submit", handleSubmit);

    return () => {
      imageForm.removeEventListener("submit", handleSubmit);
    };
    // eslint-disable-next-line
  }, [formData]);

  return (
    <Container>
      {/* //using ‘container’ and ‘mb-3’ bootstrap classes */}
      <Form className="container mt-3 mb-3">
        {/* React-Bootstrap Row component to align particular components horizontally */}
        <Row className="mb-3">
          {/* Form.Group to group individual components into one component.  */}
          {/* RES NAME */}
          <Form.Group controlId="formResName" className="col col-sm-6">
            {/* provide a text label as a component */}
            <Form.Label>Restaurant Name</Form.Label>
            <Form.Control
              id="validation"
              required
              type="resName" //type – declares the type of input we want
              name="resName" //name – ID of the component used by JSX, must be the same as the value
              value={formData.resName}
              // persist the entered information by saving the entered data
              onChange={(event) =>
                setFormData({ ...formData, resName: event.target.value })
              }
              className="form-control" //className- Bootstrap classes used
            />
          </Form.Group>
          {/* RES NAME */}

          {/* PHONE */}
          <Form.Group controlId="phone" className="col col-sm-6">
            <Form.Label>Phone Number</Form.Label>
            <InputGroup>
              {/* country code 1 for US */}
              <InputGroup.Text id="basic-addon1">+1</InputGroup.Text>
              <Form.Control
                id="validation"
                aria-label="Phone Number"
                type="phone"
                title="Enter a 10 digit number"
                className="form-control"
                name="phoneNo"
                value={formData.phoneNo}
                required
                onChange={(event) =>
                  setFormData({ ...formData, phoneNo: event.target.value })
                }
              />
            </InputGroup>
          </Form.Group>
          {/* PHONE */}
        </Row>
        <Row className="mb-3">
          {/* ADDRESS */}
          <Form.Group className=" col col-sm-6" controlId="formGridAddress1">
            <Form.Label>Address</Form.Label>
            <Form.Control
              id="validation"
              required
              className="form-control"
              type="text"
              name="address1"
              value={formData.address1}
              onChange={(event) =>
                setFormData({ ...formData, address1: event.target.value })
              }
            />
          </Form.Group>
          <Form.Group className="col col-sm-6" controlId="formGridAddress2">
            <Form.Label>Address 2</Form.Label>
            <Form.Control
              className="form-control"
              name="address2"
              value={formData.address2}
              onChange={(event) =>
                setFormData({ ...formData, address2: event.target.value })
              }
              type="text"
            />
          </Form.Group>
        </Row>
        <Row className="mb-3">
          <Form.Group controlId="formGridCity" className="col col-sm-4">
            <Form.Label>City</Form.Label>
            <Form.Control
              id="validation"
              required
              className="form-control"
              type="text"
              name="city"
              value={formData.city}
              onChange={(event) =>
                setFormData({ ...formData, city: event.target.value })
              }
            />
          </Form.Group>
          <Form.Group controlId="formGridState" className="col col-sm-4">
            <Form.Label>State</Form.Label>
            <Form.Select
              id="validation"
              required
              placeholder="Choose..."
              className="form-control"
              name="usstate"
              value={formData.usstate}
              onChange={(event) =>
                setFormData({ ...formData, usstate: event.target.value })
              }
            >
              <option value="">Choose...</option>
              <option value="WA">WA</option>
            </Form.Select>
          </Form.Group>
          <Form.Group controlId="formGridzip" className="col col-sm-4">
            <Form.Label>Zip Code</Form.Label>
            <Form.Control
              id="validation"
              required
              className="form-control"
              type="text"
              name="zip"
              pattern="[0-9]{5}"
              value={formData.zip}
              onChange={(event) =>
                setFormData({
                  ...formData,
                  zip: event.target.value.replace(/\D/g, ""),
                })
              }
              onInvalid={(event) => {
                event.target.setCustomValidity(
                  "Please enter a valid 5 digit zipcode"
                );
              }}
              onInput={(event) => {
                event.target.setCustomValidity("");
              }}
            />
          </Form.Group>
          {/* ADDRESS */}
        </Row>
        <Row className="mb-3">
          {/* HOURS */}
          <Form.Group controlId="formOpenHours" className="col col-sm-4">
            <Form.Label>Opening Hours</Form.Label>
            <Form.Select
              id="validation"
              required
              placeholder="Choose..."
              className="form-control"
              name="openhours"
              value={formData.openhours}
              onChange={(event) =>
                setFormData({ ...formData, openhours: event.target.value })
              }
            >
              <option value="">Choose...</option>
              {Array.from({ length: 48 }, (_, i) => {
                const hours24 = Math.floor(i / 2);
                const hours12 = hours24 % 12 || 12;
                const minutes = i % 2 === 0 ? "00" : "30";
                const period = hours24 < 12 ? "AM" : "PM";
                const time = `${hours12}:${minutes} ${period}`;
                return (
                  <option key={time} value={time}>
                    {time}
                  </option>
                );
              })}
            </Form.Select>
          </Form.Group>

          <Form.Group controlId="formCloseHours" className="col col-sm-4">
            <Form.Label>Closing Hours</Form.Label>
            <Form.Select
              id="validation"
              required
              placeholder="Choose..."
              className="form-control"
              name="closehours"
              value={formData.closehours}
              onChange={(event) =>
                setFormData({ ...formData, closehours: event.target.value })
              }
            >
              <option value="">Choose...</option>
              {Array.from({ length: 48 }, (_, i) => {
                const hours24 = Math.floor(i / 2);
                const hours12 = hours24 % 12 || 12;
                const minutes = i % 2 === 0 ? "00" : "30";
                const period = hours24 < 12 ? "AM" : "PM";
                const time = `${hours12}:${minutes} ${period}`;
                return (
                  <option key={time} value={time}>
                    {time}
                  </option>
                );
              })}
            </Form.Select>
          </Form.Group>
          {/* HOURS */}
        </Row>
        <Row className="mb-3">
          {/* CUISINE */}
          <Form.Group controlId="formCuisine" className="col col-sm-6">
            {/* provide a text label as a component */}
            <Form.Label>Restaurant Cuisine Type</Form.Label>
            <Form.Control
              id="validation"
              required
              className="form-control" //className- Bootstrap classes used
              type="cuisine" //type – declares the type of input we want
              name="resCuisine" //name – ID of the component used by JSX
              value={formData.resCuisine}
              onChange={(event) =>
                setFormData({ ...formData, resCuisine: event.target.value })
              }
            />
          </Form.Group>
          {/* CUISINE */}

          {/* TEMPLATE */}
          <Form.Group
            controlId="template"
            className="col col-sm-6 d-flex flex-column justify-content-between"
          >
            <div className="d-flex align-items-end">
              <Button
                variant="primary"
                onClick={handleChooseTemplate}
                className="me-2"
              >
                Choose a template
              </Button>
              <div>
                <Form.Label>Selected Template</Form.Label>
                <FormControl
                  id="validation"
                  required
                  type="text"
                  value={
                    formData.template
                      ? formData.template
                      : "No Template Selected"
                  }
                  readOnly
                />
              </div>
            </div>
          </Form.Group>
          {/* TEMPLATE */}
        </Row>
      </Form>
      {/* RES IMAGE */}
      <Row className="d-flex align-items-end">
        <Form.Label>
          Restaurant Banner Image{" "}
          <OverlayTrigger
            placement="top"
            delay={{ show: 250, hide: 400 }}
            overlay={renderTooltip}
          >
            <Button variant="info">?</Button>
          </OverlayTrigger>
        </Form.Label>
        <Form id="imageForm" className="col col-sm-6 d-flex">
          <input
            id="imageInput"
            type="file"
            accept="image/*"
            hidden
            onChange={handleFileChange}
          />
          <FormControl
            type="text"
            value={selectedFile}
            placeholder="No File Selected"
            readOnly
            className="mx-2"
          />
          <label htmlFor="imageInput" className="btn btn-primary mb-0 mx-2">
            Browse
          </label>
          <Button className="mb-0 mx-2" type="submit">
            Upload
          </Button>
          <Button className="mb-0 mx-2 remove-button" variant="danger">
            Remove Image
          </Button>
        </Form>

        {formData["mainImageUrl"] ? (
          <img
            id="mainImage"
            src={
              `https://d12zok1slvqtin.cloudfront.net/fit-in/300x300/` +
              formData["mainImageUrl"]
            }
            alt=""
          />
        ) : (
          ""
        )}
      </Row>
      {/* RES IMAGE */}
      <ChooseTemplate
        show={showChooseTemplate}
        handleClose={handleChooseTemplateClose}
        handleTemplateSelect={handleTemplateSelect}
      />
      <br></br>
    </Container>
  );
}

export default InfoEdit;
