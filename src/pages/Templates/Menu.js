import React from "react";
import { Card, Row, Col, Button } from "react-bootstrap";
import { AiOutlineCheck } from "react-icons/ai";
import styles from "./Template1.module.css";

function Menu(props) {
  const { groupedFoodData, handleAddClick, showAddedMessage, cart } =
    props.data;

  return (
    <>
      {Object.entries(groupedFoodData).map(([foodType, foodItems]) => {
        return (
          <div key={foodType}>
            <h2>{foodType}</h2>
            <hr/>
            <Row md={1} lg={3} className="g-4">
              {foodItems.map((item, index) => {
                return (
                  <Col className={`${styles.cardContainer} d-flex align-items-stretch`}>
                    {/* inner card three */}
                    <Card key={index} className={styles.card}>
                      <Card.Body className={styles.cardBody}>
                        <div className={styles.menuDetails}>
                          <Card.Title as="h5"><b>{item.foodName}</b></Card.Title>
                          <Card.Text>${item.foodPrice}</Card.Text>
                          <Card.Text className={styles.menuDesc}>{item.foodDesc}</Card.Text>
                        </div>
                        <div className={styles.imageContainer}>
                          {item.foodImageUrl && (
                            <Card.Img
                              variant="top"
                              src={
                                item.foodImageUrl
                                  ? "https://d12zok1slvqtin.cloudfront.net/" +
                                    item.foodImageUrl
                                  : ""
                              }
                              className={styles.cardImage}
                            />
                          )}
                        </div>
                      </Card.Body>
                      <Button
                        className={styles.addButton}
                        onClick={() => handleAddClick(item.foodId)}
                      >
                        {showAddedMessage === item.foodId &&
                        cart[item.foodId] > 0
                          ? <AiOutlineCheck/>
                          : "Add"}
                      </Button>
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
