import React from "react";
import { Row, Container, Button, Card, Col, Stack } from "react-bootstrap";
import ViewReview from "../../components/rating/ViewReview";
import ReviewForm from "../../components/rating/ReviewForm";
import Banner from "./Banner.js";
import Info from "./Info.js";
import GoogleMap from "./GoogleMap.js";
import Menu from "./Menu.js";
import Template1Cart from "./Template1Cart.js";

import styles from "./Template1.module.css";

// Template1 component
function Template1(props) {
  const {
    resdata,
    fooddata,
    cart,
    setcart,
    showReviewForm,
    showViewReviewForm,
    reviews,
    handleWriteReviewClick,
    handleShowReviewClick,
    handleReviewFormClose,
    handleViewReviewFormClose,
    bucketUrl,
    id,
    frameRef,
    averageRating,
    showAddedMessage,
    handleAddClick,
    currentUserId,
    navigate,
    groupedFoodData,
  } = props.data;

  return (
    <>
      <Container className="justify-content-center" fluid>
        <Row className="m-auto align-self-center">
          <Col className="order-first" xs={8} md={9}>
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

                      >
                        {/* RESTAURANT INFO */}
                        <Info
                          data={{
                            resdata,
                            averageRating,
                            templateName: "Template1",
                          }}
                        />
                        {/* RESTAURANT INFO */}

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
                                      name: resdata["name"],
                                    },
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
                      cart,
                    }}
                  />
                </Card.Body>
              </Card>
            </div>
          </Col>

          <Col className="order-last" xs={4} md={3}
            style={{
              position: "sticky",
              top: "0",
              right: "0",
              height: "50vh",
              overflowY: "auto"
            }}
          >
            <Template1Cart
              className={styles.floating}
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
      ></Col>

    </>
  );
}

export default Template1;