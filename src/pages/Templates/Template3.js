import React from "react";
import { Row, Container, Button, Card, Stack, Col } from "react-bootstrap";
import { FaShoppingCart } from "react-icons/fa";
import Cart from "../Cart";
import AverageRating from "../../components/rating/AverageRating";
import ViewReview from "../../components/rating/ViewReview";
import ReviewForm from "../../components/rating/ReviewForm";
import styles from "./Template3.module.css";
import Info from "./Info.js";

// Template3 component
function Template3(props) {
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
    groupedFoodData
  } = props.data;

  return (
    <>
      <Container
        className="justify-content-center"
        style={{ marginTop: "2rem" }}
        fluid
      >
        <Row className="m-auto align-self-center">
          <div className="row no-gutters">
            {/* outer card */}
            <Card
              className={`mb-3 border=dark ${styles.cardText} ${styles.card}`}
            >
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
                  position: "relative"
                }}
              >
                {/* restaurant name (displayed on banner) */}
                <h1
                  className={styles.bubbleLetters}
                  style={{
                    position: "absolute",
                    bottom: 0,
                    marginBottom: "0.5rem",
                    fontWeight: "bold",
                    textShadow:
                      "1px 1px #000, -1px -1px #000, 1px -1px #000, -1px 1px #000"
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
                     {/* RESTAURANT INFO */}
                     <Info data={{ resdata, averageRating }} />
                      {/* RESTAURANT INFO */}
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
                              {/* CHAT */}
                              {currentUserId && (
                            <Button
                            className={`mb-2 ${styles.reviewButton}`}
                              onClick={() =>
                                navigate(`/chat/${currentUserId}/${id}`, {
                                  state: {
                                    name: resdata["name"]
                                  }
                                })
                              }
                            >
                              Chat
                            </Button>
                          )}
                          {/* CHAT */}
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
                    xs={1}
                    md={6}
                    className="mb-4"
                    style={{ display: "inline-block", alignItems: "right" }}
                  >
                    {/* inner card two -- google maps */}
                    <Card className="border-0 mr-0">
                      {/* Google Maps card display */}
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          width: "100px",
                          height: "400px"
                        }}
                      >
                        <iframe
                          ref={frameRef}
                          id="abc"
                          title="Google Map"
                          width="100%"
                          height="100%"
                          frameBorder="0"
                          style={{
                            border: "0",
                            position: "absolute",
                            top: "0",
                            left: "0"
                          }}
                        />
                      </div>
                      {/* end inner card two -- google maps*/}
                    </Card>
                  </Col>
                </Row>
                <br></br>
                <Card.Title as="h4"></Card.Title>
                {/* menu: display each menu item as a card */}
                {Object.entries(groupedFoodData).map(
                  ([foodType, foodItems]) => {
                    return (
                      <div key={foodType}>
                        <h2>{foodType}</h2>
                        <br></br>
                        <br></br>
                        <Row md={1} lg={3} className="g-4">
                          {foodItems.map((item, index) => {
                            return (
                              <Col className="d-flex align-items-stretch">
                                {/* inner card three */}
                                <Card
                                  className={` ${styles.cardText} ${styles.card} ${styles.cardItem}`}
                                  key={index}
                                  style={{ width: "37rem" }}
                                >
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
                                    <div className={styles.menuItem}>
                                      <Card.Text
                                        style={{ fontSize: "18px" }}
                                        as="h5"
                                        className={`${styles.menuItemTitle}`}
                                      >
                                        <nobr
                                          as="h1"
                                          className={`fw-bold ${styles.cardText}`}
                                        >
                                          {item.foodName}
                                        </nobr>
                                      </Card.Text>
                                      <Card.Text>${item.foodPrice}</Card.Text>
                                    </div>
                                    <Card.Text>{item.foodDesc}</Card.Text>
                                  </Card.Body>
                                  <Card.Footer
                                    className={`border-0 ${styles.cardFooter}`}
                                  >
                                    <br></br>
                                    <br></br>
                                    {/* Add to the cart button */}
                                    <Button
                                      className={`${styles.addButton}`}
                                      style={{
                                        backgroundColor: "var(--white)",
                                        color: "var(--dark)",
                                        borderColor: "var(--biscuit)",
                                        borderWidth: "2px",
                                        fontWeight: "bold",
                                        position: "absolute",
                                        bottom: 5,
                                        left: 5
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
                        <br></br>
                        <br></br>
                      </div>
                    );
                  }
                )}
              </Card.Body>
              {/* View Cart */}
              <Button
                className={`${styles["button-class"]} ${styles.cartButton} mb-2`}
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

export default Template3;
