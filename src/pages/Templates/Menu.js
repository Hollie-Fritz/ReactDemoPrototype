import React from "react";
import { Card, Row, Col, Button } from "react-bootstrap";
import styles from "./Template1.module.css";

function Menu(props) {
  const { groupedFoodData, handleAddClick, showAddedMessage, cart } = props.data;

  return (
    <>
      {Object.entries(groupedFoodData).map(([foodType, foodItems]) => {
        return (
          <div key={foodType}>
            <h2>{foodType}</h2>
            <br />
            <br />
            <Row md={1} lg={3} className="g-4">
              {foodItems.map((item, index) => {
                return (
                  <Col className="d-flex align-items-stretch">
                    {/* inner card three */}
                    <Card key={index} style={{ width: "45rem" }}>
                      <Card.Body>
                        <Row>
                          <Col md={8}>
                            <Card.Text
                              style={{
                                fontSize: "18px",
                                wordWrap: "break-word",
                                overflowWrap: "break-word",
                              }}
                              as="h5"
                              className="font-size: 10px"
                            >
                              <div as="h1" className="fw-bold">
                                {item.foodName}
                              </div>
                              <Card.Text>${item.foodPrice}</Card.Text>
                              <Card.Text>{item.foodDesc}</Card.Text>
                            </Card.Text>
                            <Card.Footer
                              className="border-0"
                              style={{ background: "white" }}
                            >
                              <br />
                              <br />
                              {/* Add to the cart button */}
                              <Button
                               className={styles.reviewButton}
                                style={{
                                  position: "absolute",
                                  bottom: 5,
                                  right: 5,
                                }}
                                onClick={() => handleAddClick(item.foodId)}
                              >
                                {showAddedMessage === item.foodId &&
                                cart[item.foodId] > 0
                                  ? "✓"
                                  : "Add"}
                              </Button>
                            </Card.Footer>
                          </Col>
                          <Col md={4} className="d-flex align-items-center justify-content-center">
                            <div style={{ height: "150px", width:"150px" }}>
                            {item.foodImageUrl &&
                                  <Card.Img
                                    variant="top"
                                    src={
                                      item.foodImageUrl
                                        ? "https://d12zok1slvqtin.cloudfront.net/" +
                                          item.foodImageUrl
                                        : ""
                                    }
                                    style={{objectFit: "cover",
                                  height: "100%",
                                width: "100%"}}
                                  />
                            }
                            </div>
                          </Col>
                        </Row>
                      </Card.Body>
                    </Card>
                    {/* end inner card three */}
                  </Col>
                );
              })}
            </Row>
            <br />
            <br />
          </div>
        );
      })}
    </>
  );
}

export default Menu;