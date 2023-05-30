import React from "react";
import { Row, Container, Button, Card, Col, Stack } from "react-bootstrap";
import { FaShoppingCart } from "react-icons/fa";
import Cart from "../Cart";
import AverageRating from "../../components/rating/AverageRating";
import ViewReview from "../../components/rating/ViewReview";
import ReviewForm from "../../components/rating/ReviewForm";
import styles from "./Template1.module.css";

// Template1 component
function Template1(props) {
  const {
    resdata,
    fooddata,
    cart,
    setcart,
    showCart,
    showReviewForm,
    showViewReviewForm,
    reviews,
    handleWriteReviewClick,
    handleShowReviewClick,
    handleReviewFormClose,
    handleViewReviewFormClose,
    handleShowCart,
    handleShowCartClose,
    bucketUrl,
    id,
    frameRef,
    averageRating,
    showAddedMessage,
    handleAddClick,
    cartItemCount,
    currentUserId,
    navigate,
    handleShowCartClick,
    viewCartClicked,
    setViewCartClicked,
  } = props.data;

  //helper function -- groups food items by foodType
  function groupByFoodType(foodItems) {
    //convert to object
    return foodItems.reduce((foodObj, item) => {
      const foodType = item.foodType;

      // no foodtype then assign empty array
      if (!foodObj[foodType]) {
        foodObj[foodType] = [];
      }

      //push item to it's foodtype array
      foodObj[foodType].push(item);
      return foodObj;
    }, {});
  }

  //object of food items grouped by their types
  const groupedFoodData = groupByFoodType(fooddata);

  return (
    <>
      <Container className="justify-content-center" fluid>
        <Row className="m-auto align-self-center">
          <div className="row no-gutters">
            {/* outer card */}
            <Card className="mb-3" border="dark">
              {/* restaurant banner image */}
              <Card.Header
                border="light"
                style={{
                  backgroundImage: resdata["mainImageUrl"]
                    ? `url(${bucketUrl})`
                    : "",
                  backgroundSize: "cover",
                  backgroundPostion: "center",
                  color: "#FBFAF5",
                  height: "200px",
                  display: "flex",
                  justifyContent: "left",
                  alignItems: "center",
                  position: "relative",
                }}
              >
                {/* restaurant name (displayed on banner) */}
                <h1
                  style={{
                    position: "absolute",
                    bottom: 0,
                    marginBottom: "0.5rem",
                    fontWeight: "bold",
                    textShadow:
                      "1px 1px #000, -1px -1px #000, 1px -1px #000, -1px 1px #000",
                  }}
                >
                  {resdata["name"]}
                </h1>
              </Card.Header>
              {/* restaurant rating */}
              <Card.Body style={{ overflow: "hidden" }}>
                {/* inner card one -- restaurant info */}
                <Row className="d-flex justify-content-between">
                  <Col xs={1} md={5} className="mb-4">
                    <Card
                      className={`border-0 ml-auto mr-3 ${styles.cardText} ${styles.card}`}
                      style={{ display: "inline-block", alignItems: "left" }}
                    >
                      {/* restaurant address */}
                      <Card.Text>
                        <nobr className="fw-bold">Address: </nobr>
                        {resdata["address1"]} {resdata["address2"]},{" "}
                        {resdata["city"]}, {resdata["state"]}{" "}
                        {resdata["zipCode"]}
                      </Card.Text>
                      {/* restaurant phone number */}
                      <Card.Text>
                        <nobr className="fw-bold">Phone: </nobr>
                        {resdata["phone"]}
                      </Card.Text>
                      {/* restaurant hours */}
                      <Card.Text>
                        <nobr className="fw-bold">Hours: </nobr>
                        {resdata["openHours"]} - {resdata["closeHours"]}
                      </Card.Text>
                      {/* cuisine type */}
                      <Card.Text>
                        <nobr className="fw-bold">Cuisine Type: </nobr>
                        {resdata["cuisine"]}
                      </Card.Text>
                      <Card.Text>
                        <div style={{ display: "flex", alignItems: "center" }}>
                          <span className="fw-bold">Rating: </span>
                          <AverageRating averageRating={averageRating} />
                        </div>
                      </Card.Text>
                      <Card.Text>
                        <Stack direction="horizontal" gap={2}>
                          {/* leave review */}
                          <Button
                            className={`mb-2 ${styles.reviewButton}`}
                            type="submit"
                            onClick={handleWriteReviewClick}
                          >
                            Leave Review
                          </Button>{" "}
                          {/* view review */}
                          <Button
                            className={`mb-2 ${styles.reviewButton}`}
                            type="submit"
                            onClick={handleShowReviewClick}
                          >
                            View Reviews
                          </Button>{" "}
                          {currentUserId && (
                            <Button
                              onClick={() =>
                                navigate(`/chat/${currentUserId}/${id}`, {
                                  state: {
                                    name: resdata["name"],
                                  },
                                })
                              }
                            >
                              Chat
                            </Button>
                          )}
                        </Stack>

                        <ViewReview
                          show={showViewReviewForm}
                          handleClose={handleViewReviewFormClose}
                          userId={id}
                          name={resdata["name"]}
                          reviews={reviews}
                        />
                        <ReviewForm
                          show={showReviewForm}
                          handleClose={handleReviewFormClose}
                          userId={id}
                          name={resdata["name"]}
                        />
                      </Card.Text>

                      {/* end inner card one -- restaurant info */}
                    </Card>
                  </Col>

                  <Col
                    xs={12}
                    md={6}
                    className="mb-4 d-flex justify-content-center"
                    style={{ display: "inline-block", alignItems: "right" }}
                  >
                    {/* inner card two */}
                    <Card className="border-0">
                      {/* Google Maps card display */}
                      <div
                        style={{
                          overflow: "hidden",
                          position: "relative",
                          padding: "40%",
                          height: "200px",
                          width: "500px",
                        }}
                      >
                        <iframe
                          ref={frameRef}
                          id="abc"
                          title="Google Map"
                          width="100%"
                          height="400px"
                          frameBorder="0"
                          style={{
                            border: "0",
                            position: "absolute",
                            top: "0",
                            left: "0",
                          }}
                        />
                      </div>
                      {/* end inner card two -- google maps*/}
                    </Card>
                  </Col>
                </Row>
              </Card.Body>
              <br></br>
              <Card.Body style={{ overflow: "hidden" }}>
                <Card.Title as="h4"></Card.Title>
                {/* menu: display each menu item as a card */}
                {Object.entries(groupedFoodData).map(
                  ([foodType, foodItems]) => {
                    return (
                      <div key={foodType}>
                        <h2>{foodType}</h2>
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
                      </div>
                    );
                  }
                )}
              </Card.Body>
              {/* View Cart */}
              <Button
                className={`${styles["button-class"]} mb-2`}
                variant="primary"
                type="submit"
                onClick={handleShowCartClick}
              >
                View Cart ({cartItemCount})
                <FaShoppingCart
                  className={`${styles["cart-icon"]} ${
                    viewCartClicked ? styles["roll-off"] : ""
                  }`}
                />
              </Button>
              <Cart
                show={showCart}
                handleClose={handleShowCartClose}
                fooddata={fooddata}
                cart={cart}
                setCart={setcart}
                userId={resdata["userId"]}
                name={resdata["name"]}
              />
              {/* end outer card */}
            </Card>
          </div>
        </Row>
      </Container>
    </>
  );
}

export default Template1;
