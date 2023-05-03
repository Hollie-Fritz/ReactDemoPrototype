import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Form, InputGroup, Row, Button, Container } from "react-bootstrap";
import { v4 as uuidv4 } from "uuid";
import { useEffect } from "react";

//form for restaurant info such as name, phone number and address
function PersistResInfo({ formData, setFormData }) {
  // eslint-disable-next-line
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
    //using ‘container’ and ‘mb-3’ bootstrap classes
    <Container>
      <Form className="container mt-3 mb-3">
        {/* React-Bootstrap Row component to align particular components horizontally */}
        <Row className="mb-3">
          {/* Form.Group to group individual components into one component.  */}
          <Form.Group controlId="formResName" className="col col-sm-6">
            {/* provide a text label as a component */}
            <Form.Label>Restaurant Name</Form.Label>
            <Form.Control
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
          <Form.Group controlId="phone" className="col col-sm-6">
            <Form.Label>Phone Number</Form.Label>
            <InputGroup>
              {/* country code 1 for US */}
              <InputGroup.Text id="basic-addon1">+1</InputGroup.Text>
              <Form.Control
                aria-label="Phone Number"
                type="phone"
                aria-describedby="basic-addon1"
                className="form-control"
                name="phoneNo"
                value={formData.phoneNo}
                onChange={(event) =>
                  setFormData({ ...formData, phoneNo: event.target.value })
                }
              />
            </InputGroup>
          </Form.Group>
        </Row>
        <Row className="mb-3">
          <Form.Group className=" col col-sm-6" controlId="formGridAddress1">
            <Form.Label>Address</Form.Label>
            <Form.Control
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
              placeholder="Choose..."
              className="form-control"
              name="usstate"
              value={formData.usstate}
              onChange={(event) =>
                setFormData({ ...formData, usstate: event.target.value })
              }
            >
              <option value="Choose...">Choose...</option>
              <option value="WA">WA</option>
            </Form.Select>
          </Form.Group>
          <Form.Group controlId="formGridzip" className="col col-sm-4">
            <Form.Label>Zip Code</Form.Label>
            <Form.Control
              className="form-control"
              type="zip"
              name="zip"
              value={formData.zip}
              onChange={(event) =>
                setFormData({ ...formData, zip: event.target.value })
              }
            />
          </Form.Group>
        </Row>
        <Row className="mb-3">
  <Form.Group controlId="formOpenTime" className="col col-sm-4">
    <Form.Label>Opening Time</Form.Label>
    <Form.Control
      type="text"
      placeholder="HH:mm"
      className="form-control"
      name="opentime"
      value={formData.opentime}
      onChange={(event) =>
        setFormData({ ...formData, opentime: event.target.value })
      }
    />
  </Form.Group>
  <Form.Group controlId="formOpenTimeAMPM" className="col col-sm-4">
    <Form.Label>&nbsp;</Form.Label>
    <Form.Select
      className="form-control"
      name="opentimeampm"
      value={formData.opentimeampm}
      onChange={(event) =>
        setFormData({ ...formData, opentimeampm: event.target.value })
      }
    >
      <option value="AM">AM</option>
      <option value="PM">PM</option>
    </Form.Select>
  </Form.Group>
  <Form.Group controlId="formCloseTime" className="col col-sm-4">
    <Form.Label>Closing Time</Form.Label>
    <Form.Control
      type="text"
      placeholder="HH:mm"
      className="form-control"
      name="closetime"
      value={formData.closetime}
      onChange={(event) =>
        setFormData({ ...formData, closetime: event.target.value })
      }
    />
  </Form.Group>
  <Form.Group controlId="formCloseTimeAMPM" className="col col-sm-4">
    <Form.Label>&nbsp;</Form.Label>
    <Form.Select
      className="form-control"
      name="closetimeampm"
      value={formData.closetimeampm}
      onChange={(event) =>
        setFormData({ ...formData, closetimeampm: event.target.value })
      }
    >
      <option value="AM">AM</option>
      <option value="PM">PM</option>
    </Form.Select>
  </Form.Group>

          <Form.Group controlId="formCuisine" className="col col-sm-6">
            {/* provide a text label as a component */}
            <Form.Label>Restaurant Cuisine Type</Form.Label>
            <Form.Control
              className="form-control" //className- Bootstrap classes used
              type="cuisine" //type – declares the type of input we want
              name="resCuisine" //name – ID of the component used by JSX
              value={formData.resCuisine}
              onChange={(event) =>
                setFormData({ ...formData, resCuisine: event.target.value })
              }
            />
          </Form.Group>
        </Row>
      </Form>
      <Row className="d-flex align-items-end">
        <Form id="imageForm" className="col col-sm-6">
          <input id="imageInput" type="file" accept="image/*" />
          <Button className="col col-sm-6" type="submit">
            Upload
          </Button>
        </Form>
      </Row>
      {
        formData["mainImageUrl"]?
        <img id="mainImage"
        src={
          `https://nuorderbucket.s3.us-west-2.amazonaws.com/` +
          formData["mainImageUrl"]
        }
        alt=""
        />
        :""
      }
    </Container>
  );
}

export default PersistResInfo;