import Card from "react-bootstrap/Card";
import { Row, Container } from "react-bootstrap";

function PersistResReview({ formData, menuItems }) {
  return (
    <Container className="d-flex vh-50">
      <Row className="m-auto align-self-center">
        <div>
          {/* outer card */}
          <Card style={{ width: "30rem" }}>
            <Card.Header as="h1" className="text-center">
              {formData.resName}
            </Card.Header>
            <Card.Body>
              <Card.Title as="h4" className="text-center">
                Restaurant General Information:
              </Card.Title>
              {/* inner card one */}
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
                {/* end inner card one */}
              </Card>
              <br></br>
              <Card.Title as="h4" className="text-center">
                Menu Information:{" "}
              </Card.Title>
              {menuItems.map((menuItems) => {
                return (
                  // inner card two
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
  );
}

export default PersistResReview;
