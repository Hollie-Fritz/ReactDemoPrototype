import React from "react";
import { Row, Container } from "react-bootstrap";
import Card from "react-bootstrap/Card";

function PersistResReview({ formData, menuItems }) {
  return (
    <div>
      <Container className="d-flex vh-50">
        <Row className="m-auto align-self-center">
          <div className="blacktext">
            {/* outer card */}
            <Card style={{ width: "40rem" }}>
              <Card.Header as="h1" className="text-center">
                {formData.resName}
              </Card.Header>
              <Card.Body>
                <Card.Title as="h4" className="text-center">
                  Restaurant General Information:
                </Card.Title>
                {/* inner card one */}
                <Card
                  className="m-auto align-self-center"
                  style={{ width: "30rem" }}
                >
                  <Card.Text>
                    <nobr className="fw-bold">Address: </nobr>
                    {formData.address1} {formData.address2}, {formData.city},{" "}
                    {formData.usstate}, {formData.zip}
                  </Card.Text>
                  <Card.Text>
                    <nobr className="fw-bold">Phone:</nobr> 1-{formData.phoneNo}
                  </Card.Text>

                  <Card.Text>
                    <div className="fw-bold">Operating Hours: </div>
                    <nobr className="fw-bold">Monday </nobr>
                    {formData["operatingHours"]["openHours"]["Monday"]} -{" "}
                    {formData["operatingHours"]["closeHours"]["Monday"]}
                    <br></br>
                    <nobr className="fw-bold">Tuesday </nobr>
                    {formData["operatingHours"]["openHours"]["Tuesday"]} -{" "}
                    {formData["operatingHours"]["closeHours"]["Tuesday"]}
                    <br></br>
                    <nobr className="fw-bold">Wednesday </nobr>
                    {
                      formData["operatingHours"]["openHours"]["Wednesday"]
                    } - {formData["operatingHours"]["closeHours"]["Wednesday"]}
                    <br></br>
                    <nobr className="fw-bold">Thursday </nobr>
                    {formData["operatingHours"]["openHours"]["Thursday"]} -{" "}
                    {formData["operatingHours"]["closeHours"]["Thursday"]}
                    <br></br>
                    <nobr className="fw-bold">Friday </nobr>
                    {formData["operatingHours"]["openHours"]["Friday"]} -{" "}
                    {formData["operatingHours"]["closeHours"]["Friday"]}
                    <br></br>
                    <nobr className="fw-bold">Saturday </nobr>
                    {formData["operatingHours"]["openHours"]["Saturday"]} -{" "}
                    {formData["operatingHours"]["closeHours"]["Saturday"]}
                    <br></br>
                    <nobr className="fw-bold">Sunday </nobr>
                    {formData["operatingHours"]["openHours"]["Sunday"]} -{" "}
                    {formData["operatingHours"]["closeHours"]["Sunday"]}
                  </Card.Text>
                  <Card.Text>
                    <nobr className="fw-bold">Cuisine Type: </nobr>
                    {formData.resCuisine}
                  </Card.Text>

                  <Card.Text>
                    <nobr className="fw-bold">Template Selection: </nobr>
                    {formData.template}
                  </Card.Text>
                  {/* end inner card one */}
                </Card>
                <br></br>
                <Card.Title as="h4" className="text-center">
                  Menu Information:{" "}
                </Card.Title>
                {menuItems.map((menuItems) => {
                  return (
                    // inner card two
                    <Card
                      className="m-auto align-self-center"
                      style={{ width: "30rem" }}
                    >
                      <Card.Body>
                        <Card.Text>
                          <nobr className="fw-bold">Menu Item Name: </nobr>
                          {menuItems.menuItem}
                        </Card.Text>
                        <Card.Text>
                          <nobr className="fw-bold">Menu Item Price: </nobr>{" "}
                          {menuItems.menuPrice}
                        </Card.Text>
                        <Card.Text>
                          <nobr className="fw-bold">
                            Menu Item Description:{" "}
                          </nobr>
                          {menuItems.menuDesc}
                        </Card.Text>
                        <Card.Text>
                          <nobr className="fw-bold">Menu Type: </nobr>
                          {menuItems.menuType}
                        </Card.Text>
                      </Card.Body>
                      {/* end inner card two */}
                    </Card>
                  );
                })}
              </Card.Body>
              {/* end outer card */}
            </Card>
          </div>
        </Row>
      </Container>
      <div>
        <br></br>
      </div>
    </div>
  );
}

export default PersistResReview;
