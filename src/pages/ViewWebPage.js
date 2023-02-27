import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import { Row, Container, Button, Card } from "react-bootstrap";
//import Cart from "./Cart";

function ViewWebpage() {
  const { id } = useParams();
  const [resdata, setresdata] = useState({});
  const [fooddata, setfooddata] = useState([]);
  const [cart, setcart] = useState({});
  const [showCart, setShowCart] = useState(false);
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
                Restaurant Information:
              </Card.Title>
              {/* inner card one */}
              <Card style={{ width: "25rem" }}>
                <Card.Text>
                  <nobr className="fw-bold">Address: </nobr>
                  Restaurant Address: {resdata["address1"]}{" "}
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
                        <Button style={{float: "right"}}
                        onClick={() => {
                          var temp = cart;
                          temp[item.foodId] = (temp[item.foodId] || 0) + 1;
                          setcart(temp);
                        }}
                      >
                        Add
                      </Button>
                      </Card.Text>
                      <Card.Text>${item.foodPrice}</Card.Text>
                      <Card.Text>{item.foodDesc}</Card.Text>
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
            {/* <Cart
              show={showCart}
              handleClose={handleShowCartClose}
              fooddata={fooddata}
              cart={cart}
            /> */}
          </Card>
        </div>
      </Row>
    </Container>
  );
}

export default ViewWebpage;
