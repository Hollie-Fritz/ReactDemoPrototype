import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import { Row, Container, Button, Card, Stack, Col } from "react-bootstrap";
import Cart from "./Cart";
import ReviewForm from "../components/rating/ReviewForm";
import ViewReview from "../components/rating/ViewReview";
import AverageRating from "../components/rating/AverageRating";
import NavBarHome from "../components/NavBarHome";
import $ from 'jquery';

function ViewWebpage() {
  const { id } = useParams();
  const [resdata, setresdata] = useState({});
  const [fooddata, setfooddata] = useState([]);
  const [cart, setcart] = useState({});
  const [showCart, setShowCart] = useState(false);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [showViewReviewForm, setShowViewReviewForm] = useState(false);
  const [reviews, setReviews] = useState([]);
  const [address, setAddress] = useState("");
  const handleWriteReviewClick = (event) => {
    event.stopPropagation();
    setShowReviewForm(true);
  };

  const handleShowReviewClick = (event) => {
    // event.stopPropagation();
    setShowViewReviewForm(true);
  };

  const handleReviewFormClose = (event) => {
    // event.stopPropagation()
    setShowReviewForm(false);
  };

  // const handleReviewFormSubmit = (event) => {
  //   event.preventDefault();
  //   setShowReviewForm(false);
  // };

  const handleViewReviewFormClose = (event) => {
    // event.stopPropagation();
    setShowViewReviewForm(false);
  };

  useEffect(() => {
    const fetchAverageRating = async () => {
      let url = `https://6b2uk8oqk7.execute-api.us-west-2.amazonaws.com/prod/review?userId=${id}`;
      const response = await fetch(url);
      const data = await response.json();
      setReviews(data);
    };
    fetchAverageRating();
    console.log(resdata["name"] + " is name");

    var frame = $('#abc')[0];
    frame.contentWindow.location.replace(`https://maps.google.com/maps?q=${address.replace(' ', '%20')}&t=k&z=17&ie=UTF8&iwloc=&output=embed`);
  }, [id, resdata]);

  const handleShowCart = () => {
    setShowCart(true);
  };
  const handleShowCartClose = () => {
    setShowCart(false);
  };

  useEffect(() => {
    let username = id;
    async function userAction() {
      await fetch(
        `https://6b2uk8oqk7.execute-api.us-west-2.amazonaws.com/prod/restaurantById?id=${username}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
        //check if data was correctly sent in console log
        .then((response) => response.json())
        .then((data) => {
          if (data.length !== 0) {
            setresdata(data[0]);
            setfooddata(data[0]["Food"]);
            setAddress(
                data[0]["address1"] +
                " " +
                data[0]["address2"] +
                " " +
                data[0]["city"] +
                " " +
                data[0]["state"] +
                " " +
                data[0]["zipCode"]
            );
          }
          console.log("data is below");
          console.log(JSON.stringify(data));
        });
    }
    userAction();
  }, [id]);

  const bucketUrl = "https://nuorderbucket.s3.us-west-2.amazonaws.com/" + resdata["mainImageUrl"];

  return (
    <>
      <NavBarHome />
      <Container className="d-flex vh-50">
        <Row className="m-auto align-self-center">
          <div className="row no-gutters">
            {/* outer card */}
            <Card className="mb-3" border="dark">
              <Card.Header
                border="light"
                style={{
                  backgroundImage: `url(${bucketUrl})`,
                  backgroundSize: "cover",
                  backgroundPostion: "center",
                  color: "white",
                  height: "200px",
                  display: "flex",
                  justifyContent: "left",
                  alignItems: "center",
                  position: "relative"
                }}
              >
                <h1 style={{
                  position: "absolute",
                  bottom: 0,
                  marginBottom: "0.5rem",
                  fontWeight: "bold",
                  textShadow: "1px 1px #000, -1px -1px #000, 1px -1px #000, -1px 1px #000",
                 }}>{resdata["name"]}</h1>
              </Card.Header>

              <Card.Body style={{ overflow: "hidden" }}>
                <Card.Title as="h4" className="text-center">
                  <div style={{ display: "flex", justifyContent: "center" }}>
                    <AverageRating reviews={reviews} />
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
                      <Card.Text>
                        <nobr className="fw-bold">Address: </nobr>
                        {resdata["address1"]} {resdata["address2"]},{" "}
                        {resdata["city"]}, {resdata["state"]}{" "}
                        {resdata["zipCode"]}
                      </Card.Text>
                      <Card.Text>
                        <nobr className="fw-bold">Phone: </nobr>
                        {resdata["phone"]}
                      </Card.Text>
                      <Card.Text>
                        <nobr className="fw-bold">Hours: </nobr>
                        {resdata["openHours"]} - {resdata["closeHours"]}
                      </Card.Text>
                      <Card.Text>
                        <nobr className="fw-bold">Cuisine Type: </nobr>
                        {resdata["cuisine"]}
                      </Card.Text>

                      <Card.Text>
                        <Stack direction="horizontal" gap={2}>
                          <Button
                            variant="info"
                            type="submit"
                            onClick={handleWriteReviewClick}
                          >
                            Leave Review
                          </Button>{" "}
                          <Button
                            variant="info"
                            type="submit"
                            onClick={handleShowReviewClick}
                          >
                            View Reviews
                          </Button>{" "}
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

                        {/* end inner card one */}
                      </Card.Text>
                    </Card>
                  </Col>

                  <Col
                    xs={1}
                    md={6}
                    className="mb-4"
                    style={{ display: "inline-block", alignItems: "right" }}
                  >
                    <Card className="border-0 mr-0">
                      <div
                        style={{
                          overflow: "hidden",
                          height: "200px",
                          width: "500px",
                        }}
                      >
                      <iframe
                        id="abc"
                        title="Google Map"
                        width="100%"
                        height="600"
                        frameBorder="0"
                        style={{ border: '0', marginTop: '-150px' }}
                      />
                      </div>
                    </Card>
                  </Col>
                </Row>
                <br></br>
                <Card.Title as="h4"></Card.Title>
                <Row md={1} lg={3} className="g-4">
                  {fooddata.map((item, test) => {
                    return (
                      <Col className="d-flex align-items-stretch">
                        {/* inner card two */}
                        <Card key={test} style={{ width: "37rem" }}>
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
                            <Button
                              style={{
                                position: "absolute",
                                bottom: 5,
                                left: 5,
                              }}
                              onClick={() => {
                                var temp = cart;
                                temp[item.foodId] =
                                  (temp[item.foodId] || 0) + 1;
                                setcart(temp);
                              }}
                            >
                              Add
                            </Button>
                          </Card.Footer>
                          {/* end inner card two */}
                        </Card>
                      </Col>
                    );
                  })}
                </Row>
              </Card.Body>
              {/* end outer card */}

              <Button
                className="mb-2"
                variant="primary"
                type="submit"
                onClick={handleShowCart}
              >
                View Cart
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
            </Card>
          </div>
        </Row>
      </Container>
    </>
  );
}

export default ViewWebpage;