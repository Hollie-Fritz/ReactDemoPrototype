import Card from "react-bootstrap/Card";

//testing data populating from json
function PersistResReview() {
  return (
    <div>
      <Card>
        <Card.Header as="h1">resName</Card.Header>
        <Card.Body>
          <Card.Title>
            Address: address1, address2, city, usstate, zip
          </Card.Title>
          <Card.Text>Phone: phoneNo</Card.Text>
          <Card.Text>Hours: resHours</Card.Text>
          <Card.Text>Cuisine Type: resCuisine</Card.Text>
        </Card.Body>
      </Card>
    </div>
  );
}

export default PersistResReview;
