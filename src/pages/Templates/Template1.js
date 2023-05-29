import React from "react";
import { Row, Container, Button, Card, Stack, Col } from "react-bootstrap";
import Cart from "../Cart";
import AverageRating from "../../components/rating/AverageRating";
import ViewReview from "../../components/rating/ViewReview";
import ReviewForm from "../../components/rating/ReviewForm";

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
    setShowAddedMessage,
    handleAddClick,
    cartItemCount,
    currentUserId,
    navigate
  } = props.data;

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
                <Card.Title as="h4" className="text-center">
                  <div style={{ display: "flex", justifyContent: "center" }}>
                    <AverageRating averageRating={averageRating} />
                  </div>
                  <br />
                </Card.Title>
                {/* inner card one */}
                <Row className="d-flex justify-content-between">
                  <Col xs={1} md={5} className="mb-4">
                    <Card
                      className="border-0 ml-auto mr-3"
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
                          {/* leave review */}
                          <Button
                            variant="info"
                            type="submit"
                            onClick={handleWriteReviewClick}
                          >
                            Leave Review
                          </Button>{" "}
                          {/* view review */}
                          <Button
                            variant="info"
                            type="submit"
                            onClick={handleShowReviewClick}
                          >
                            View Reviews
                          </Button>{" "}
                          {
                            currentUserId
                            &&
                            <Button
                            onClick={()=> navigate(`/chat/${currentUserId}/${id}`,
                            {
                              state:{
                                      name: resdata["name"],
                                    }
                            })
                            }>Chat</Button>
                          }
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
                      {/* end inner card one */}
                    </Card>
                  </Col>

                  <Col
                    xs={1}
                    md={6}
                    className="mb-4"
                    style={{ display: "inline-block", alignItems: "right" }}
                  >
                    {/* inner card two */}
                    <Card className="border-0 mr-0">
                      {/* Google Maps card display */}
                      <div
                        style={{
                          overflow: "hidden",
                          position: "relative",
                          padding: "56.25%",
                          height: "200px",
                          width: "500px",
                        }}
                      >
                        <iframe
                          ref={frameRef}
                          id="abc"
                          title="Google Map"
                          width="100%"
                          height="100%"
                          frameBorder="0"
                          style={{ border: "0", position: "absolute", top: "0", left: "0" }}
                        />
                      </div>
                      {/* end inner card two */}
                    </Card>
                  </Col>
                </Row>
                <br></br>
                <Card.Title as="h4"></Card.Title>
                <Row md={1} lg={3} className="g-4">
                  {/* menu: display each menu item as a card */}
                  {fooddata.map((item, test) => {
                    return (
                      <Col className="d-flex align-items-stretch">
                        {/* inner card three */}
                        <Card key={test} style={{ width: "37rem" }}>
                        <Card.Img variant="top" src= {item.foodImageUrl? "https://d12zok1slvqtin.cloudfront.net/fit-in/286x180/" + item.foodImageUrl : ""}/>
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
                              onClick={() =>  handleAddClick(item.foodId)}
                            >
                              {showAddedMessage === item.foodId && cart[item.foodId] > 0 ? "✓" : "Add"}
                            </Button>
                          </Card.Footer>
                          {/* end inner card three */}
                        </Card>
                      </Col>
                    );
                  })}
                </Row>
              </Card.Body>
              {/* View Cart */}
              <Button
                className="mb-2"
                variant="primary"
                type="submit"
                onClick={handleShowCart}
              >
                View Cart ({cartItemCount})
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