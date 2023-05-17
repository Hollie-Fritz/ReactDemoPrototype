import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import {
  Form,
  InputGroup,
  Row,
  Button,
  OverlayTrigger,
  Tooltip,
  FormControl,
} from "react-bootstrap";
import { v4 as uuidv4 } from "uuid";

//2nd page of restaurant owner's form, contains the form for menu items
function MenuEdit({ menuItems, setMenuItems }) {
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

  const [selectedFile, setSelectedFile] = useState([]);
  const [uploadStatus, setUploadStatus] = useState([]);

  const handleSubmitImage = async (index) => {
    //
    console.log("you pressed the upload image button");
    const imageInput = document.querySelector("#imageInput" + index);

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
      setMenuItems(updatedMenuItems);
      const newUploadStatus = [...uploadStatus];

      newUploadStatus[index] = "Success!";
      setUploadStatus(newUploadStatus);

      // const mainImage = document.querySelector("#mainImage");
      // mainImage.src = file;
    });
  };

  //function to add form items
  const handleAddItem = () => {
    setMenuItems([
      ...menuItems,
      {
        menuItem: "",
        menuPrice: "",
        menuDesc: "",
        menuType: "",
        menuImageUrl: "",
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

  const renderTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      Your menu will be ordered by the order that you input "Menu Item Type".
      For example, you input "entree" "dessert" "entree", the menu will display
      entree first and desserts second.
    </Tooltip>
  );

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
              <Form.Label>
                Menu Item Type{" "}
                <OverlayTrigger
                  placement="top"
                  delay={{ show: 250, hide: 400 }}
                  overlay={renderTooltip}
                >
                  <Button variant="info">?</Button>
                </OverlayTrigger>
              </Form.Label>
              <Form.Control
                id="validation"
                required
                className="form-control"
                type="text"
                name="menuType"
                placeholder="Enter menu item name"
                value={menu.menuType}
                onChange={(e) => handleChange(index, e)}
              ></Form.Control>
            </Form.Group>

            <Form id={"imageForm" + index} className="col col-sm-6">
              <Form.Group className="col col-sm-6 d-flex align-items-center">
                <input
                  id={"imageInput" + index}
                  type="file"
                  accept="image/*"
                  hidden
                  onChange={(e) => {
                    const newSelectedFile = [...selectedFile];
                    newSelectedFile[index] = e.target.files[0]?.name;
                    setSelectedFile(newSelectedFile);

                    const newUploadStatus = [...uploadStatus];
                    newUploadStatus[index] = "Upload";
                    setUploadStatus(newUploadStatus);
                  }}
                />
                <FormControl
                  type="text"
                  value={selectedFile[index] ?? "No File Selected"}
                  placeholder="No File Selected"
                  readOnly
                  className="mx-2"
                />
                <label
                  htmlFor={"imageInput" + index}
                  className="btn btn-primary"
                  style={{ marginRight: "10px" }}
                >
                  Browse
                </label>
                <Button onClick={() => handleSubmitImage(index)}>
                  {uploadStatus[index] ?? "Upload"}
                </Button>
              </Form.Group>
            </Form>

            <Form.Group>
              {menuItems.length !== 1 && (
                <Button variant="danger" onClick={() => handleRemove(index)}>
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
      </Form>
      {menuItems.forEach((menuItem) => {
        if (menuItem["menuImageUrl"]) {
          return (
            <img
              id="mainImage"
              src={
                `https://nuorderbucket.s3.us-west-2.amazonaws.com/` +
                menuItem["menuImageUrl"]
              }
              alt=""
            />
          );
        }
        // return arr[index] = num * 2;
      })}
    </>
  );
}

export default MenuEdit;
