import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Form, InputGroup, Row, Button, Container, FormControl, Tooltip, OverlayTrigger, Col } from "react-bootstrap"; // prettier-ignore
import { v4 as uuidv4 } from "uuid";
import { useEffect, useState } from "react";
import ChooseTemplate from "../components/ChooseTemplate";
import { AiOutlineInfoCircle } from "react-icons/ai";
import styles from "./Form.module.css";
import { CgAsterisk } from "react-icons/cg";

// form for restaurant info such as name, phone number and address
function PersistResInfo({ formData, setFormData }) {
  const [showChooseTemplate, setShowChooseTemplate] = useState(false);
  const [uploadStatus, setUploadStatus] = useState("Upload");

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
    setFormData({ ...formData, template: template || "template1" });
  };

  // save the file name
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
      1250x200<br></br>
      It will be displayed at the top of your web page with your restaurant name
      over it.
    </Tooltip>
  );

  // handles form submission and image upload
  // eslint-disable-next-line
  useEffect(() => {
    const imageForm = document.querySelector("#imageForm");
    const imageInput = document.querySelector("#imageInput");

    const handleSubmit = async (event) => {
      // event.preventDefault();
      const file = imageInput.files[0];
      const imageName = uuidv4();

      //PUT request to upload res image banner
      await fetch(
        "https://6b2uk8oqk7.execute-api.us-west-2.amazonaws.com/prod/s3/nuorderbucket/" +
          imageName,
        {
          method: "PUT",
          body: file,
          headers: {
            "Content-type": file.type
          }
        }
      )
        .then(() => {
          setFormData({ ...formData, mainImageUrl: imageName });
          const mainImage = document.querySelector("#mainImage");
          mainImage.src = file;
        })
        .then(() => {
          setUploadStatus("Success!");
        });
    };

    imageForm.addEventListener("submit", handleSubmit);

    return () => {
      imageForm.removeEventListener("submit", handleSubmit);
    };
    // eslint-disable-next-line
  }, [formData]);

  const handleRemove = async (event) => {
    event.preventDefault();
    setFormData((prevState) => {
      var newData = { ...prevState };
      newData["mainImageUrl"] = "";
      return newData;
    });
    setUploadStatus("Removed");
  };

  const renderTooltipTwo = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      If no template is chosen the default template will be chosen.
    </Tooltip>
  );

  return (
    //using ‘container’ and ‘mb-3’ bootstrap classes
    <Container>
      <Form className="container mt-3 mb-3">
        {/* React-Bootstrap Row component to align particular components horizontally */}
        <Row className="mb-3">
          {/* Form.Group to group individual components into one component.  */}
          <Form.Group className="col col-sm-6">
            {/* provide a text label as a component */}
            {/* RES NAME */}
            <Form.Label className="fw-bold">
              Restaurant Name{" "}
              <span className={styles.asteriskicon}>
                <CgAsterisk />
              </span>
            </Form.Label>
            <Form.Control
              id="validation"
              type="resName" //type – declares the type of input we want
              name="resName" //name – ID of the component used by JSX, must be the same as the value
              value={formData.resName}
              required
              // persist the entered information by saving the entered data
              onChange={(event) =>
                setFormData({ ...formData, resName: event.target.value })
              }
              className="form-control" //className- Bootstrap classes used
            />
          </Form.Group>
          {/* RES NAME */}

          {/* PHONE */}
          <Form.Group noValidate className="col col-sm-6">
            <Form.Label className="fw-bold">Phone Number{" "}
              <span className={styles.asteriskicon}>
                <CgAsterisk />
              </span></Form.Label>
            <InputGroup>
              {/* country code 1 for US */}
              <InputGroup.Text id="basic-addon1">+1</InputGroup.Text>
              <Form.Control
                id="validation"
                aria-label="Phone Number"
                type="tel"
                title="Enter a 10 digit number"
                className="form-control"
                name="phoneNo"
                pattern="[0-9]{10}"
                value={formData.phoneNo}
                required
                onChange={(event) =>
                  setFormData({
                    ...formData,
                    phoneNo: event.target.value.replace(/\D/g, "")
                  })
                }
                onInvalid={(event) => {
                  event.target.setCustomValidity(
                    "Please enter a valid 10 digit phone number"
                  );
                }}
                onInput={(event) => {
                  event.target.setCustomValidity("");
                }}
              />
            </InputGroup>
          </Form.Group>
          {/* PHONE */}
        </Row>
        <Row className="mb-3">
          {/* ADDRESS */}
          <Form.Group className=" col col-sm-6">
            <Form.Label className="fw-bold">Address{" "}
              <span className={styles.asteriskicon}>
                <CgAsterisk />
              </span></Form.Label>
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
          <Form.Group className="col col-sm-6">
            <Form.Label className="fw-bold">Address 2</Form.Label>
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
          <Form.Group className="col col-sm-4">
            <Form.Label className="fw-bold">City{" "}
              <span className={styles.asteriskicon}>
                <CgAsterisk />
              </span></Form.Label>
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
          <Form.Group className="col col-sm-4">
            <Form.Label className="fw-bold">State</Form.Label>
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
              <option value="WA">WA</option>
            </Form.Select>
          </Form.Group>
          <Form.Group className="col col-sm-4">
            <Form.Label className="fw-bold">Zip Code{" "}
              <span className={styles.asteriskicon}>
                <CgAsterisk />
              </span></Form.Label>
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
                  zip: event.target.value.replace(/\D/g, "")
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
        {/* HOURS */}
        <Row className="mb-3 no-gutters">
          {/* WEEKDAY HOURS */}
          <Col md={6}>
            <h3>Weekday Hours</h3>

            {/* MONDAY */}
            <Row className="mb-3 no-gutters">
              <Form.Group className="col col-sm-6 pr-2">
                <Form.Label className="fw-bold">
                  Monday: Opening Hours
                </Form.Label>
                <Form.Select
                  id="validation"
                  required
                  placeholder="Choose..."
                  className="form-control"
                  name="openhours"
                  value={formData["operatingHours"]["openHours"]["Monday"]}
                  onChange={(event) => {
                    setFormData({
                      ...formData,
                      operatingHours: {
                        ...formData["operatingHours"],
                        openHours: {
                          ...formData["operatingHours"]["openHours"],
                          Monday: event.target.value
                        }
                      }
                    });
                  }}
                >
                  <option key="closed" value="Closed">
                    Closed
                  </option>

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

              <Form.Group className="col col-sm-6 pr-2">
                <Form.Label className="fw-bold">Closing Hours</Form.Label>
                <Form.Select
                  id="validation"
                  required
                  placeholder="Choose..."
                  className="form-control"
                  name="closehours"
                  value={formData["operatingHours"]["closeHours"]["Monday"]}
                  onChange={(event) => {
                    setFormData({
                      ...formData,
                      operatingHours: {
                        ...formData["operatingHours"],
                        closeHours: {
                          ...formData["operatingHours"]["closeHours"],
                          Monday: event.target.value
                        }
                      }
                    });
                  }}
                >
                  <option key="closed" value="Closed">
                    Closed
                  </option>
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
            </Row>

            {/* MONDAY */}
            <br></br>
            {/* TUESDAY */}
            <Row className="mb-3 no-gutters">
              <Form.Group className="col col-sm-6 pr-2">
                <Form.Label className="fw-bold">
                  Tuesday: Opening Hours
                </Form.Label>
                <Form.Select
                  id="validation"
                  required
                  placeholder="Choose..."
                  className="form-control"
                  name="openhours"
                  value={formData["operatingHours"]["openHours"]["Tuesday"]}
                  onChange={(event) => {
                    setFormData({
                      ...formData,
                      operatingHours: {
                        ...formData["operatingHours"],
                        openHours: {
                          ...formData["operatingHours"]["openHours"],
                          Tuesday: event.target.value
                        }
                      }
                    });
                  }}
                >
                  <option key="closed" value="Closed">
                    Closed
                  </option>
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

              <Form.Group className="col col-sm-6 pr-2">
                <Form.Label className="fw-bold">Closing Hours</Form.Label>
                <Form.Select
                  id="validation"
                  required
                  placeholder="Choose..."
                  className="form-control"
                  name="closehours"
                  value={formData["operatingHours"]["closeHours"]["Tuesday"]}
                  onChange={(event) => {
                    setFormData({
                      ...formData,
                      operatingHours: {
                        ...formData["operatingHours"],
                        closeHours: {
                          ...formData["operatingHours"]["closeHours"],
                          Tuesday: event.target.value
                        }
                      }
                    });
                  }}
                >
                  <option key="closed" value="Closed">
                    Closed
                  </option>
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
            </Row>
            {/* TUESDAY */}
            <br></br>
            {/* WEDNESDAY */}
            <Row className="mb-3 no-gutters">
              <Form.Group className="col col-sm-6 pr-2">
                <Form.Label className="fw-bold">
                  Wednesday: Opening Hours
                </Form.Label>
                <Form.Select
                  id="validation"
                  required
                  placeholder="Choose..."
                  className="form-control"
                  name="openhours"
                  value={formData["operatingHours"]["openHours"]["Wednesday"]}
                  onChange={(event) => {
                    setFormData({
                      ...formData,
                      operatingHours: {
                        ...formData["operatingHours"],
                        openHours: {
                          ...formData["operatingHours"]["openHours"],
                          Wednesday: event.target.value
                        }
                      }
                    });
                  }}
                >
                  <option key="closed" value="Closed">
                    Closed
                  </option>
                  <option key="closed" value="Closed">
                    Closed
                  </option>
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

              <Form.Group className="col col-sm-6 pr-2">
                <Form.Label className="fw-bold">Closing Hours</Form.Label>
                <Form.Select
                  id="validation"
                  required
                  placeholder="Choose..."
                  className="form-control"
                  name="closehours"
                  value={formData["operatingHours"]["closeHours"]["Wednesday"]}
                  onChange={(event) => {
                    setFormData({
                      ...formData,
                      operatingHours: {
                        ...formData["operatingHours"],
                        closeHours: {
                          ...formData["operatingHours"]["closeHours"],
                          Wednesday: event.target.value
                        }
                      }
                    });
                  }}
                >
                  <option key="closed" value="Closed">
                    Closed
                  </option>
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
            </Row>
            {/* WEDNESDAY */}

            <br></br>
            {/* THURSDAY */}
            <Row className="mb-3 no-gutters">
              <Form.Group className="col col-sm-6 pr-2">
                <Form.Label className="fw-bold">
                  Thursday: Opening Hours
                </Form.Label>
                <Form.Select
                  id="validation"
                  required
                  placeholder="Choose..."
                  className="form-control"
                  name="openhours"
                  value={formData["operatingHours"]["openHours"]["Thursday"]}
                  onChange={(event) => {
                    setFormData({
                      ...formData,
                      operatingHours: {
                        ...formData["operatingHours"],
                        openHours: {
                          ...formData["operatingHours"]["openHours"],
                          Thursday: event.target.value
                        }
                      }
                    });
                  }}
                >
                  <option key="closed" value="Closed">
                    Closed
                  </option>
                  <option key="closed" value="Closed">
                    Closed
                  </option>
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

              <Form.Group className="col col-sm-6 pr-2">
                <Form.Label className="fw-bold">Closing Hours</Form.Label>
                <Form.Select
                  id="validation"
                  required
                  placeholder="Choose..."
                  className="form-control"
                  name="closehours"
                  value={formData["operatingHours"]["closeHours"]["Thursday"]}
                  onChange={(event) => {
                    setFormData({
                      ...formData,
                      operatingHours: {
                        ...formData["operatingHours"],
                        closeHours: {
                          ...formData["operatingHours"]["closeHours"],
                          Thursday: event.target.value
                        }
                      }
                    });
                  }}
                >
                  <option key="closed" value="Closed">
                    Closed
                  </option>
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
            </Row>
            {/* THURSDAY */}
            <br></br>
            {/* FRIDAY */}
            <Row className="mb-3 no-gutters">
              <Form.Group className="col col-sm-6 pr-2">
                <Form.Label className="fw-bold">
                  Friday: Opening Hours
                </Form.Label>
                <Form.Select
                  id="validation"
                  required
                  placeholder="Choose..."
                  className="form-control"
                  name="openhours"
                  value={formData["operatingHours"]["openHours"]["Friday"]}
                  onChange={(event) => {
                    setFormData({
                      ...formData,
                      operatingHours: {
                        ...formData["operatingHours"],
                        openHours: {
                          ...formData["operatingHours"]["openHours"],
                          Friday: event.target.value
                        }
                      }
                    });
                  }}
                >
                  <option key="closed" value="Closed">
                    Closed
                  </option>
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

              <Form.Group className="col col-sm-6 pr-2">
                <Form.Label className="fw-bold">Closing Hours</Form.Label>
                <Form.Select
                  id="validation"
                  required
                  placeholder="Choose..."
                  className="form-control"
                  name="closehours"
                  value={formData["operatingHours"]["closeHours"]["Friday"]}
                  onChange={(event) => {
                    setFormData({
                      ...formData,
                      operatingHours: {
                        ...formData["operatingHours"],
                        closeHours: {
                          ...formData["operatingHours"]["closeHours"],
                          Friday: event.target.value
                        }
                      }
                    });
                  }}
                >
                  <option key="closed" value="Closed">
                    Closed
                  </option>
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
            </Row>

            {/* FRIDAY */}
          </Col>
          {/* WEEKDAY HOURS */}

          {/* WEEKEND HOURS */}
          <Col md={6}>
            <h3>Weekend Hours</h3>

            {/* SATURDAY */}
            <Row className="mb-3 no-gutters">
              <Form.Group className="col col-sm-6 pr-2">
                <Form.Label className="fw-bold">
                  Saturday: Opening Hours
                </Form.Label>
                <Form.Select
                  id="validation"
                  required
                  placeholder="Choose..."
                  className="form-control"
                  name="openhours"
                  value={formData["operatingHours"]["openHours"]["Saturday"]}
                  onChange={(event) => {
                    setFormData({
                      ...formData,
                      operatingHours: {
                        ...formData["operatingHours"],
                        openHours: {
                          ...formData["operatingHours"]["openHours"],
                          Saturday: event.target.value
                        }
                      }
                    });
                  }}
                >
                  <option key="closed" value="Closed">
                    Closed
                  </option>
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

              <Form.Group className="col col-sm-6 pr-2">
                <Form.Label className="fw-bold">Closing Hours</Form.Label>
                <Form.Select
                  id="validation"
                  required
                  placeholder="Choose..."
                  className="form-control"
                  name="closehours"
                  value={formData["operatingHours"]["closeHours"]["Saturday"]}
                  onChange={(event) => {
                    setFormData({
                      ...formData,
                      operatingHours: {
                        ...formData["operatingHours"],
                        closeHours: {
                          ...formData["operatingHours"]["closeHours"],
                          Saturday: event.target.value
                        }
                      }
                    });
                  }}
                >
                  <option key="closed" value="Closed">
                    Closed
                  </option>
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
            </Row>
            {/* SATURDAY */}
            <br></br>
            {/* SUNDAY */}
            <Row className="mb-3 no-gutters">
              <Form.Group className="col col-sm-6 pr-2">
                <Form.Label className="fw-bold">
                  Sunday: Opening Hours
                </Form.Label>
                <Form.Select
                  id="validation"
                  required
                  placeholder="Choose..."
                  className="form-control"
                  name="openhours"
                  value={formData["operatingHours"]["openHours"]["Sunday"]}
                  onChange={(event) => {
                    setFormData({
                      ...formData,
                      operatingHours: {
                        ...formData["operatingHours"],
                        openHours: {
                          ...formData["operatingHours"]["openHours"],
                          Sunday: event.target.value
                        }
                      }
                    });
                  }}
                >
                  <option key="closed" value="Closed">
                    Closed
                  </option>
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

              <Form.Group className="col col-sm-6 pr-2">
                <Form.Label className="fw-bold">Closing Hours</Form.Label>
                <Form.Select
                  id="validation"
                  required
                  placeholder="Choose..."
                  className="form-control"
                  name="closehours"
                  value={formData["operatingHours"]["closeHours"]["Sunday"]}
                  onChange={(event) => {
                    setFormData({
                      ...formData,
                      operatingHours: {
                        ...formData["operatingHours"],
                        closeHours: {
                          ...formData["operatingHours"]["closeHours"],
                          Sunday: event.target.value
                        }
                      }
                    });
                  }}
                >
                  <option key="closed" value="Closed">
                    Closed
                  </option>
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
            </Row>
            {/* SUNDAY */}
            {/* HOURS */}
          </Col>
        </Row>
        <Row className="mb-3">
          {/* CUISINE */}
          <Form.Group className="col col-sm-6">
            {/* provide a text label as a component */}
            <Form.Label className="fw-bold">Restaurant Cuisine Type{" "}
              <span className={styles.asteriskicon}>
                <CgAsterisk />
              </span></Form.Label>
            <Form.Control
              id="validation"
              required
              className="form-control"
              type="cuisine"
              name="resCuisine"
              value={formData.resCuisine}
              onChange={(event) =>
                setFormData({ ...formData, resCuisine: event.target.value })
              }
            />
          </Form.Group>
          {/* CUISINE */}

          {/* TEMPLATE */}
          <Form.Group className="col col-sm-6 d-flex flex-column justify-content-between">
            <div className="d-flex align-items-end">
              <Button
                variant="primary"
                onClick={handleChooseTemplate}
                className={styles.templatebutton}
              >
                Choose a template
              </Button>

              <div>
                <Form.Label className="fw-bold">Selected Template</Form.Label>
                <OverlayTrigger
                  placement="top"
                  delay={{ show: 250, hide: 400 }}
                  overlay={renderTooltipTwo}
                >
                  <span className={styles.removeimage}>
                    <AiOutlineInfoCircle size={20} className={styles.icon} />
                  </span>
                </OverlayTrigger>
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
      <Row className="d-flex align-items-end">
        {/* RES IMAGE */}
        <Form.Label className="fw-bold">
          Restaurant Banner Image{" "}
          <OverlayTrigger
            placement="top"
            delay={{ show: 250, hide: 400 }}
            overlay={renderTooltip}
          >
            <span className={styles.removeimage}>
              <AiOutlineInfoCircle size={20} className={styles.icon} />
            </span>
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
          <Button type="submit" className="mb-0 mx-2">
            Upload
          </Button>
          <Button
            className={styles.removebutton}
            variant="danger"
            onClick={handleRemove}
          >
            {uploadStatus === "Removed" ? "Image Removed" : "Remove Image"}
          </Button>
        </Form>

        {formData["mainImageUrl"] ? (
          <img
            id="mainImage"
            src={
              `https://nuorderbucket.s3.us-west-2.amazonaws.com/` +
              formData["mainImageUrl"]
            }
            alt=""
          />
        ) : (
          ""
        )}
      </Row>
      <Row className="d-flex align-items-end"></Row>

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

export default PersistResInfo;
