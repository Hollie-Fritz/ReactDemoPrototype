import React from "react";
import { Row, Container, Button, Card, Col, Stack } from "react-bootstrap";
import { FaShoppingCart } from "react-icons/fa";
import Cart from "../Cart";
import ViewReview from "../../components/rating/ViewReview";
import ReviewForm from "../../components/rating/ReviewForm";
import styles from "./Template1.module.css";
import Banner from "./Banner.js";
import Info from "./Info.js";
import GoogleMap from "./GoogleMap.js";
import Menu from "./Menu.js";
import Template1Cart from "./Template1Cart.js"

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
      <Container className="justify-content-center" fluid>
        <Row className="m-auto align-self-center">
          <div className="row no-gutters">
            {/* outer card */}
            <Card className="mb-3" border="dark">
    
              {/* RESTAURANT BANNER IMAGE */}
              <Banner data={{ resdata, bucketUrl }}/>
              {/* RESTAURANT BANNER IMAGE */}
              
              <Card.Body style={{ overflow: "hidden" }}>
                <Row className="d-flex justify-content-between">
                  <Col xs={1} md={5} className="mb-4">
                    <Card
                      className={`border-0 ml-auto mr-3 ${styles.cardText} ${styles.card}`}
                      style={{ display: "inline-block", alignItems: "left" }}
                    >
                      {/* RESTAURANT INFO */}
                      <Info data={{ resdata, averageRating }}/>
                      {/* RESTAURANT INFO */}
                      
                      <Card.Text>
                        <Stack direction="horizontal" gap={2}>
                          {/* REVIEW BUTTONS */ }
                          <Button
                            className={`mb-2 ${styles.reviewButton}`}
                            type="submit"
                            onClick={handleWriteReviewClick}
                          >
                            Leave Review
                          </Button>{" "}
                          <Button
                            className={`mb-2 ${styles.reviewButton}`}
                            type="submit"
                            onClick={handleShowReviewClick}
                          >
                            View Reviews
                          </Button>{" "}
                          {/* REVIEW BUTTONS */ }
                          
                          {/* CHAT */ }
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
                           {/* CHAT */ }
                        </Stack>
                      </Card.Text>
                    </Card>
                  </Col>
                  <Col xs={12} md={6} className="mb-4 d-flex justify-content-center"
                      style={{ display: "inline-block", alignItems: "right" }}
                  >
                  <Card className="border-0">
                        {/* MAP */}
                    <GoogleMap data={frameRef}/>
                        {/* MAP */}
                  </Card>
                  </Col>
                </Row>
              </Card.Body>
              
              <br></br>

              <Card.Body style={{ overflow: "hidden" }}>
                <Card.Title as="h4"></Card.Title>
                {/* MENU */}
               <Menu data={{groupedFoodData, handleAddClick, showAddedMessage, cart}}/>
               
              </Card.Body>
              {/* View Cart */}
              {/* <Button
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
              </Button> */}
            </Card>
          </div>
        </Row>
      </Container>
      {/* <Cart
        show={showCart}
        handleClose={handleShowCartClose}
        fooddata={fooddata}
        cart={cart}
        setCart={setcart}
        userId={resdata["userId"]}
        name={resdata["name"]}
      /> */}

      {/* REVIEW POPUP */ }
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
      {/* REVIEW POPUP */ }

  <Col md={3} md={3} className="position-fixed" style={{top: 0, right: 0}}>
  <Template1Cart
    fooddata={fooddata}
    cart={cart}
    setCart={setcart}
    userId={resdata["userId"]}
    name={resdata["name"]}
  />
</Col>
    </>
  );
}

export default Template1;
