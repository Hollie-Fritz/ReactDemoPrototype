import Card from "react-bootstrap/Card";

//testing data populating from json
function PersistResReview({ formData }) {

  return (
    <div>
      <Card>
        <Card.Header as="h1">{formData.resName}</Card.Header>
        <Card.Body>
          <Card.Title>
            Address: {formData.address1} {formData.address2}, {formData.city}, {formData.usstate}, {formData.zip}
          </Card.Title>
          <Card.Text>Phone: 1-{formData.phoneNo}</Card.Text>
          <Card.Text>Hours: {formData.openhours} - {formData.closehours}</Card.Text>
          <Card.Text>Cuisine Type: {formData.resCuisine}</Card.Text>
        </Card.Body>
      </Card>
    </div>
  );
}

export default PersistResReview;
