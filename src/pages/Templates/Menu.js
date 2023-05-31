import React from "react";
import { Card, Row, Col, Button} from "react-bootstrap";

function Menu(props){
    const {groupedFoodData, handleAddClick, showAddedMessage, cart} = props.data;

return(
    <>
     {Object.entries(groupedFoodData).map(
        ([foodType, foodItems]) => {
          return (
            <div key={foodType}>
              <h2>{foodType}</h2>
              <br></br><br></br>
              <Row md={1} lg={3} className="g-4">
                {foodItems.map((item, index) => {
                  return (
                    <Col className="d-flex align-items-stretch">
                      {/* inner card three */}
                      <Card key={index} style={{ width: "37rem" }}>
                        <Card.Img
                          variant="top"
                          src={
                            item.foodImageUrl
                              ? "https://d12zok1slvqtin.cloudfront.net/fit-in/286x180/" +
                                item.foodImageUrl
                              : ""
                          }
                        />
                        <Card.Body>
                          <Card.Text
                            style={{ fontSize: "18px" }}
                            as="h5"
                            className="text-center font-size: 10px"
                          >
                            <nobr as="h1" className="fw-bold">
                              {item.foodName}
                            </nobr>
                          </Card.Text>
                          <Card.Text>${item.foodPrice}</Card.Text>
                          <Card.Text>{item.foodDesc}</Card.Text>
                        </Card.Body>
                        <Card.Footer
                          className="border-0"
                          style={{ background: "white" }}
                        >
                          <br></br>
                          <br></br>
                          {/* Add to the cart button */}
                          <Button
                            style={{
                              position: "absolute",
                              bottom: 5,
                              left: 5,
                            }}
                            onClick={() =>
                              handleAddClick(item.foodId)
                            }
                          >
                            {showAddedMessage === item.foodId &&
                            cart[item.foodId] > 0
                              ? "✓"
                              : "Add"}
                          </Button>
                        </Card.Footer>
                        {/* end inner card three */}
                      </Card>
                    </Col>
                  );
                })}
                
              </Row>
              <br></br><br></br>
            </div>
          );
        }
      )}
      </>
)
    }
    
export default Menu;