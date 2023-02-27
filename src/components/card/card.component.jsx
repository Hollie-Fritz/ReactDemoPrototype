import "./card.styles.css";
import { Card, CardGroup, ListGroup } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const CardComponent = ({
  restaurant: {
    userId,
    name,
    cuisine,
    address1,
    address2,
    city,
    state,
    zipCode,
  },
}) => {
  const navigate = useNavigate();
  return (
    <>
      <CardGroup className="my-1">
        <Card
          style={{ width: "18rem" }}
          className="card-container"
          key={userId}
          onClick={() => navigate(`/r/${userId}`)}
        >
          <Card.Body>
            <Card.Title style={{ textAlign: "center" }}>{name}</Card.Title>
            <Card.Text style={{ textAlign: "center" }}>{cuisine}</Card.Text>
            <ListGroup className="list-group-flush">
              <ListGroup.Item style={{ textAlign: "center" }}>
                {address1} {address2}, {city}, {state} {zipCode}
              </ListGroup.Item>
            </ListGroup>
          </Card.Body>
        </Card>
      </CardGroup>
    </>
  );
};

export default CardComponent;
