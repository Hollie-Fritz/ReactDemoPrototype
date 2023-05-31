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
import Template1Cart from "./Template1Cart.js";

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
          <Col className="order-first"  xs={8} md={9}>
          <div className="row no-gutters">
            {/* outer card */}
            <Card className="mb-3" border="dark">
              {/* RESTAURANT BANNER IMAGE */}
              <Banner data={{ resdata, bucketUrl }} />
              {/* RESTAURANT BANNER IMAGE */}

              <Card.Body style={{ overflow: "hidden" }}>
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
                      {
                      resdata["operatingHours"] ?
                      <>
                      <Card.Text>
                        <nobr className="fw-bold">Monday: </nobr>
                        {resdata["operatingHours"]["openHours"]["Monday"] } - {resdata["operatingHours"]["closeHours"]["Monday"] }
                      </Card.Text>
                      <Card.Text>
                        <nobr className="fw-bold">Tuesday: </nobr>
                        {resdata["operatingHours"]["openHours"]["Tuesday"] } - {resdata["operatingHours"]["closeHours"]["Tuesday"] }
                      </Card.Text>
                      <Card.Text>
                        <nobr className="fw-bold">Wednesday: </nobr>
                        {resdata["operatingHours"]["openHours"]["Wednesday"] } - {resdata["operatingHours"]["closeHours"]["Wednesday"] }
                      </Card.Text>
                      <Card.Text>
                        <nobr className="fw-bold">Thursday: </nobr>
                        {resdata["operatingHours"]["openHours"]["Thursday"] } - {resdata["operatingHours"]["closeHours"]["Thursday"] }
                      </Card.Text>
                      <Card.Text>
                        <nobr className="fw-bold">Friday: </nobr>
                        {resdata["operatingHours"]["openHours"]["Friday"] } - {resdata["operatingHours"]["closeHours"]["Friday"] }
                      </Card.Text>
                      <Card.Text>
                        <nobr className="fw-bold">Saturday: </nobr>
                        {resdata["operatingHours"]["openHours"]["Saturday"] } - {resdata["operatingHours"]["closeHours"]["Saturday"] }
                      </Card.Text>
                      <Card.Text>
                        <nobr className="fw-bold">Sunday: </nobr>
                        {resdata["operatingHours"]["openHours"]["Sunday"] } - {resdata["operatingHours"]["closeHours"]["Sunday"] }
                      </Card.Text>
                      </>
                      :
                      <Card.Text>
                      <nobr className="fw-bold">Hours: </nobr>
                      {resdata["openHours"]} - {resdata["closeHours"]}
                      </Card.Text>
                      }
                      {/* cuisine type */}
                      <Card.Text>
                        <nobr className="fw-bold">Cuisine Type: </nobr>
                        {resdata["cuisine"]}
                      </Card.Text>

                      <Card.Text>
                        <Stack direction="horizontal" gap={2}>
                          {/* REVIEW BUTTONS */}
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
                          {/* REVIEW BUTTONS */}
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
                      </Card.Text>
                    </Card>
                  </Col>
                  <Col
                    xs={12}
                    md={6}
                    className="mb-4 d-flex justify-content-center"
                    style={{ display: "inline-block", alignItems: "right" }}
                  >
                    <Card className="border-0">
                      {/* MAP */}
                      <GoogleMap data={frameRef} />
                      {/* MAP */}
                    </Card>
                  </Col>
                </Row>
              </Card.Body>
              <br></br>

              <Card.Body style={{ overflow: "hidden" }}>
                <Card.Title as="h4"></Card.Title>
                {/* MENU */}
                <Menu
                  data={{
                    groupedFoodData,
                    handleAddClick,
                    showAddedMessage,
                    cart
                  }}
                />
              </Card.Body>
            </Card>
          </div>
          </Col>
          <Col className="order-last" xs={4} md={3}>
          <Template1Cart
          fooddata={fooddata}
          cart={cart}
          setCart={setcart}
          userId={resdata["userId"]}
          name={resdata["name"]}
        />
          </Col>
        </Row>
      </Container>

      {/* REVIEW POPUP */}
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
      {/* REVIEW POPUP */}
      <Col
        md={3}
        className="position-fixed"
        style={{ top: "50%", right: 0, transform: "translateY(-50%)" }}
      >
        
      </Col>
    </>
  );
}

export default Template1;
