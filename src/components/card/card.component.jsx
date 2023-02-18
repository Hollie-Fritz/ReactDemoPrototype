import "./card.styles.css";
import { Card, CardGroup, ListGroup } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const CardComponent = ({ restaurant: { userID, Name, Cuisine, Address } }) => {
  const navigate = useNavigate();
  return (
    <>
      <CardGroup className="my-1">
        <Card
          style={{ width: "18rem" }}
          className="card-container"
          key={userID}
          onClick={() => navigate(`/${userID}`)}
        >
          <Card.Body>
            <Card.Title style={{ textAlign: "center" }}>{Name}</Card.Title>
            <Card.Text style={{ textAlign: "center" }}>{Cuisine}</Card.Text>
            <ListGroup className="list-group-flush">
              <ListGroup.Item style={{ textAlign: "center" }}>
                {Address}
              </ListGroup.Item>
            </ListGroup>
          </Card.Body>
        </Card>
      </CardGroup>
    </>
  );
};

export default CardComponent;
