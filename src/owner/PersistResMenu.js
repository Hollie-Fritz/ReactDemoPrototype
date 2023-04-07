import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Form, InputGroup, Row, Button } from "react-bootstrap";
import { v4 as uuidv4 } from "uuid";

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

  const handleSubmitImage = async (index) => {//
    console.log("you pressed the upload image button")
    const imageInput = document.querySelector("#imageInput"+index);

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
      const updatedMenuItems = [...menuItems];
      updatedMenuItems[index]["menuImageUrl"] = imageName;
      setMenuItems(updatedMenuItems); //

      // const mainImage = document.querySelector("#mainImage");
      // mainImage.src = file;
    });
  }

  //function to add form items
  const handleAddItem = () => {
    setMenuItems([
      ...menuItems,
      {
        menuItem: "",
        menuPrice: "",
        menuDesc: "",
        menuType: "",
        menuImageUrl:""
      },
    ]);
  };

  //function to remove form items unless there is only one remaining
  // const handleRemoveItem = () => {
  //   const values = [...menuItems];
  //   if (values.length > 1) values.pop();
  //   setMenuItems(values);
  // };

  const handleRemove = (index) => {
    const temp = [...menuItems];
    temp.splice(index, 1);
    setMenuItems(temp);
  };



  return (
    <>
    <Form className="container mt-3 mb-3" style={{ width: "200rem" }}>
      {menuItems.map((menu, index) => (
        <Row className="mb-3" key={index}>
          <Form.Group controlId="formItem" className="col col-sm-3">
            <Form.Label>Menu Item</Form.Label>
            <Form.Control
              required
              className="form-control"
              type="text"
              name="menuItem"
              placeholder="Enter menu item name"
              value={menu.menuItem}
              onChange={(e) => handleChange(index, e)}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId="formItemPrice" className="col col-sm-3">
            <Form.Label>Price</Form.Label>
            <InputGroup className="mb-3">
              <Form.Control
                className="form-control"
                type="text"
                name="menuPrice"
                placeholder="Enter price"
                value={menu.menuPrice}
                onChange={(e) => handleChange(index, e)}
              ></Form.Control>
            </InputGroup>
          </Form.Group>
          <Form.Group controlId="formItemDesc" className="col col-sm-3">
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
                onChange={(e) => handleChange(index, e)}
              ></Form.Control>
            </InputGroup>
          </Form.Group>
          <Form.Group controlId="formItemType" className="col col-sm-3">
            <Form.Label>Menu Item Type</Form.Label>
            <Form.Select
              placeholder="Choose..."
              className="form-control"
              name="menuType"
              value={menu.menuType}
              onChange={(e) => handleChange(index, e)}
            >
              <option value="Choose...">Choose...</option>
              <option value="Appetizer">Appetizer</option>
              <option value="Entree">Entree</option>
              <option value="Dessert">Dessert</option>
            </Form.Select>
          </Form.Group>

          <Form id={"imageForm"+index} className="col col-sm-6">
            <input id={"imageInput"+index} type="file" accept="image/*" />
            <Button className="col col-sm-6" onClick={()=> handleSubmitImage(index)}>
              Upload
            </Button>
          </Form>


          <Form.Group>
            {menuItems.length !== 1 && (
              <Button
              variant="danger"
              onClick={() => handleRemove(index)}
              >
                Remove
              </Button>
            )}
          </Form.Group>
        </Row>
      ))}
      <Button variant="primary" onClick={handleAddItem}>
        Add Item
      </Button>
      {/* button to remove iteration of the form */}
      {/* onClick calls upon handleRemoveItem to remove an iteration */}
    </Form>
    {/* {
      menuItems.forEach((menuItem) => {
        if(menuItem["menuImageUrl"]){
          return (
            <img id="mainImage"
            src={
              `https://nuorderbucket.s3.us-west-2.amazonaws.com/` +
              menuItem["menuImageUrl"]
            }
            alt=""
            />
          )
        }
        // return arr[index] = num * 2;
      })
    } */}
    </>
  );
}

export default PersistResMenu;
