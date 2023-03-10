import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import { Row, Container, Button, Card } from "react-bootstrap";
import Cart from "./Cart";
import ReviewForm from "../components/rating/ReviewForm";
import ViewReview from "../components/rating/ViewReview";
import AverageRating from "../components/rating/AverageRating";
import { useNavigate } from "react-router-dom";
import NavBarHome from "../components/NavBarHome";

function ViewWebpage() {
  const { id } = useParams();
  const [resdata, setresdata] = useState({});
  const [fooddata, setfooddata] = useState([]);
  const [cart, setcart] = useState({});
  const [showCart, setShowCart] = useState(false);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [showViewReviewForm, setShowViewReviewForm] = useState(false);
  const [reviews, setReviews] = useState([]);

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

  const handleReviewFormSubmit = (event) => {
    event.preventDefault();
    setShowReviewForm(false);
  }

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
    console.log(resdata["name"]+ "is name");
  }, [id]);

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
          }
          console.log("data is below");
          console.log(JSON.stringify(data));
        });
    }
    userAction();
  }, [id]);
  return (
    <>
    <NavBarHome />
    <Container className="d-flex vh-50">
      <Row className="m-auto align-self-center">
        <div className="row no-gutters">
          {/* outer card */}
          <Card style={{ width: "30rem" }}>
            <Card.Header as="h1" className="text-center">
              {resdata["name"]}
            </Card.Header>
            <Card.Body>
              <Card.Title as="h4" className="text-center">
              <div style={{ display: "flex", justifyContent: "center" }}>
              <AverageRating reviews={reviews} />
            </div>
            <br/>
                Restaurant Information:
              </Card.Title>
              {/* inner card one */}
              <Card style={{ width: "25rem" }}>
                <Card.Text>
                  <nobr className="fw-bold">Address: </nobr>
                  {resdata["address1"]}{" "}
                  {resdata["address2"]}, {resdata["city"]}, {resdata["state"]}{" "}
                  {resdata["zipCode"]}
                </Card.Text>
                <Card.Text>
                  <nobr className="fw-bold">Phone:</nobr> 1-{resdata["phone"]}
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
                <div style={{ display: "flex", justifyContent: "center" }}>
              <Button
                variant="primary"
                type="submit"
                onClick={handleWriteReviewClick}
              >
                Leave Review
              </Button>{" "}
            </div>
            <br />
            <div style={{ display: "flex", justifyContent: "center" }}>
              <Button
                variant="primary"
                type="submit"
                onClick={handleShowReviewClick}
              >
                View Reviews
              </Button>{" "}
            </div>
            <ViewReview
              show={showViewReviewForm}
              handleClose={handleViewReviewFormClose}
              userId={id}
              name={resdata["name"]}
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
              <br></br>
              <Card.Title as="h4" className="text-center">
                Menu Information:{" "}
              </Card.Title>
              {fooddata.map((item, test) => {
                return (
                  // inner card two
                  <Card key={test} style={{ width: "25rem" }}>
                    <Card.Body>
                      <Card.Text>
                        <nobr className="fw-bold">{item.foodName}</nobr>
                      </Card.Text>
                      <Card.Text>${item.foodPrice}</Card.Text>
                      <Card.Text>{item.foodDesc}</Card.Text>
                      <Button
                        onClick={() => {
                          var temp = cart;
                          temp[item.foodId] = (temp[item.foodId] || 0) + 1;
                          setcart(temp);
                        }}
                      >
                        Add
                      </Button>
                    </Card.Body>
                    {/* end inner card two */}
                  </Card>
                );
              })}
            </Card.Body>
            {/* end outer card */}
            <Button variant="primary" type="submit" onClick={handleShowCart}>
              View Cart
            </Button>
            <Cart
              show={showCart}
              handleClose={handleShowCartClose}
              fooddata={fooddata}
              cart={cart}
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
