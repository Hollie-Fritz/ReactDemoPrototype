import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Form, InputGroup, Row } from "react-bootstrap";

//form for restaurant info such as name, phone number and address
function PersistResInfo({ formData, setFormData }) {
  return (
    //using ‘container’ and ‘mb-3’ bootstrap classes
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
            defaultValue="Choose..."
            className="form-control"
            name="usstate"
            value={formData.usstate}
            onChange={(event) =>
              setFormData({ ...formData, usstate: event.target.value })
            }>
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
        <Form.Group controlId="formOpenHours" className="col col-sm-4">
          <Form.Label>Opening Hours</Form.Label>
          <Form.Select
            defaultValue="Choose..."
            className="form-control"
            name="openhours"
            value={formData.openhours}
            onChange={(event) =>
              setFormData({ ...formData, openhours: event.target.value })
            }>
            <option value="Choose...">Choose...</option>
            <option value="0">00:00</option>
            <option value="0:30">00:30</option>
            <option value="1">01:00</option>
            <option value="1:30">01:30</option>
            <option value="2">02:00</option>
            <option value="2:30">02:30</option>
            <option value="3">03:00</option>
            <option value="3:30">03:30</option>
            <option value="4">04:00</option>
            <option value="4:30">04:30</option>
            <option value="5">05:00</option>
            <option value="5:30">05:30</option>
            <option value="6">06:00</option>
            <option value="6:30">06:30</option>
            <option value="7">07:00</option>
            <option value="7:30">07:30</option>
            <option value="8">08:00</option>
            <option value="8:30">08:30</option>
            <option value="9">09:00</option>
            <option value="9:30">09:30</option>
            <option value="10">10:00</option>
            <option value="10:30">10:30</option>
            <option value="11">11:00</option>
            <option value="11:30">11:30</option>
            <option value="12">12:00</option>
            <option value="12:30">12:30</option>
            <option value="13">13:00</option>
            <option value="13:30">13:30</option>
            <option value="14">14:00</option>
            <option value="14:30">14:30</option>
            <option value="15">15:00</option>
            <option value="15:30">15:30</option>
            <option value="16">16:00</option>
            <option value="16:30">16:30</option>
            <option value="17">17:00</option>
            <option value="17:30">17:30</option>
            <option value="18">18:00</option>
            <option value="18:30">18:30</option>
            <option value="19">19:00</option>
            <option value="19:30">19:30</option>
            <option value="20">20:00</option>
            <option value="20:30">20:30</option>
            <option value="21">21:00</option>
            <option value="21:30">21:30</option>
            <option value="22">22:00</option>
            <option value="22:30">22:30</option>
            <option value="23">23:00</option>
            <option value="23:30">23:30</option>
          </Form.Select>
        </Form.Group>

        <Form.Group controlId="formCloseHours" className="col col-sm-4">
          <Form.Label>Closing Hours</Form.Label>
          <Form.Select
            defaultValue="Choose..."
            className="form-control"
            name="closehours"
            value={formData.closehours}
            onChange={(event) =>
              setFormData({ ...formData, closehours: event.target.value })
            }>
            <option value="Choose...">Choose...</option>
            <option value="0">00:00</option>
            <option value="0:30">00:30</option>
            <option value="1">01:00</option>
            <option value="1:30">01:30</option>
            <option value="2">02:00</option>
            <option value="2:30">02:30</option>
            <option value="3">03:00</option>
            <option value="3:30">03:30</option>
            <option value="4">04:00</option>
            <option value="4:30">04:30</option>
            <option value="5">05:00</option>
            <option value="5:30">05:30</option>
            <option value="6">06:00</option>
            <option value="6:30">06:30</option>
            <option value="7">07:00</option>
            <option value="7:30">07:30</option>
            <option value="8">08:00</option>
            <option value="8:30">08:30</option>
            <option value="9">09:00</option>
            <option value="9:30">09:30</option>
            <option value="10">10:00</option>
            <option value="10:30">10:30</option>
            <option value="11">11:00</option>
            <option value="11:30">11:30</option>
            <option value="12">12:00</option>
            <option value="12:30">12:30</option>
            <option value="13">13:00</option>
            <option value="13:30">13:30</option>
            <option value="14">14:00</option>
            <option value="14:30">14:30</option>
            <option value="15">15:00</option>
            <option value="15:30">15:30</option>
            <option value="16">16:00</option>
            <option value="16:30">16:30</option>
            <option value="17">17:00</option>
            <option value="17:30">17:30</option>
            <option value="18">18:00</option>
            <option value="18:30">18:30</option>
            <option value="19">19:00</option>
            <option value="19:30">19:30</option>
            <option value="20">20:00</option>
            <option value="20:30">20:30</option>
            <option value="21">21:00</option>
            <option value="21:30">21:30</option>
            <option value="22">22:00</option>
            <option value="22:30">22:30</option>
            <option value="23">23:00</option>
            <option value="23:30">23:30</option>
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
  );
}

export default PersistResInfo;
