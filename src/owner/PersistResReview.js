import Card from "react-bootstrap/Card";
import { Row, Container } from "react-bootstrap";

//testing data populating from json
function PersistResReview({ formData, menuItems }) {
  return (
    <Container className="d-flex vh-50">
      <Row className="m-auto align-self-center">
        <div>
          <Card style={{ width: "30rem" }}>
            <Card.Header as="h1" className="text-center">
              {formData.resName}
            </Card.Header>
            <Card.Body>
              <Card.Title as="h4" className="text-center">
                Restaurant General Information:
              </Card.Title>
              <Card style={{ width: "25rem" }}>
                <Card.Text>
                  <nobr className="fw-bold">Address: </nobr>
                  {formData.address1} {formData.address2}, {formData.city},{" "}
                  {formData.usstate}, {formData.zip}
                </Card.Text>
                <Card.Text>
                  <nobr className="fw-bold">Phone:</nobr> 1-{formData.phoneNo}
                </Card.Text>
                <Card.Text>
                  <nobr className="fw-bold">Hours: </nobr>
                  {formData.openhours} - {formData.closehours}
                </Card.Text>
                <Card.Text>
                  <nobr className="fw-bold">Cuisine Type: </nobr>
                  {formData.resCuisine}
                </Card.Text>
              </Card>
              <br></br>
              <Card.Title as="h4" className="text-center">
                Menu Information:{" "}
              </Card.Title>
              {menuItems.map((menuItems) => {
                return (
                  <Card style={{ width: "25rem" }}>
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
                        <nobr className="fw-bold">Menu Item Description: </nobr>
                        {menuItems.menuDesc}
                      </Card.Text>
                    </Card.Body>
                  </Card>
                );
              })}
            </Card.Body>
          </Card>
        </div>
      </Row>
    </Container>
  );
}

export default PersistResReview;
