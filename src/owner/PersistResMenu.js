import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Form, InputGroup, Row, Button } from "react-bootstrap";

//2nd page of restaurant owner's form, contains the form for menu items
function PersistResMenu({ menuItems, setMenuItems }) {
  //update and set the menu form items
  const handleChange = (index, e) => {
    const updatedMenuItems = [...menuItems];
    //if the input is not a number for menuPrice then do not allow it
    if (e.target.name === "menuPrice" && isNaN(e.target.value)) {
      return;
    }
    //otherwise set the values
    updatedMenuItems[index][e.target.name] = e.target.value;
    setMenuItems(updatedMenuItems);
  };

  //function to add form items
  const handleAddItem = () => {
    setMenuItems([
      ...menuItems,
      {
        menuItem: "",
        menuPrice: "",
        menuDesc: "",
      },
    ]);
  };

  //function to remove form items unless there is only one remaining
  const handleRemoveItem = () => {
    const values = [...menuItems];
    if (values.length > 1) values.pop();
    setMenuItems(values);
  };

  return (
    <Form className="container mt-3 mb-3" style={{ width: "200rem" }}>
      {menuItems.map((menu, index) => (
        <Row className="mb-3" key={index}>
          <Form.Group controlId="formItem" className="col col-sm-4">
            <Form.Label>Menu Item</Form.Label>
            <Form.Control
              required
              className="form-control"
              type="text"
              name="menuItem"
              placeholder="Enter menu item name"
              value={menu.menuItem}
              onChange={(e) => handleChange(index, e)}></Form.Control>
          </Form.Group>
          <Form.Group controlId="formItemPrice" className="col col-sm-4">
            <Form.Label>Price</Form.Label>
            <InputGroup className="mb-3">
              <Form.Control
                className="form-control"
                type="text"
                name="menuPrice"
                placeholder="Enter price"
                value={menu.menuPrice}
                onChange={(e) => handleChange(index, e)}></Form.Control>
            </InputGroup>
          </Form.Group>
          <Form.Group controlId="formItemDesc" className="col col-sm-4">
            <Form.Label>Description</Form.Label>
            <InputGroup>
              <Form.Control
                as="textarea"
                aria-label="Menu Description"
                className="form-control"
                type="text"
                name="menuDesc"
                placeholder="Enter menu item description"
                value={menu.menuDesc}
                onChange={(e) => handleChange(index, e)}></Form.Control>
            </InputGroup>
          </Form.Group>
        </Row>
      ))}
      <Button variant="primary" onClick={handleAddItem}>
        Add Item
      </Button>
      {/* button to remove iteration of the form */}
      {/* onClick calls upon handleRemoveItem to remove an iteration */}
      <Button variant="danger" onClick={handleRemoveItem}>
        Remove
      </Button>
    </Form>
  );
}

export default PersistResMenu;
