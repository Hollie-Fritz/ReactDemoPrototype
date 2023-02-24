import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState, useEffect } from "react";
import Card from "react-bootstrap/Card";
import { Row, Container } from "react-bootstrap";
import { useParams } from "react-router";

function ViewWebpage() {
  const { id } = useParams();
  const [resdata, setresdata] = useState({});
  const [fooddata, setfooddata] = useState([]);

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
        <div class="row no-gutters">
          {/* outer card */}
          <Card style={{ width: "30rem" }}>
            <Card.Header as="h1" className="text-center">
              {resdata["Name"]}
            </Card.Header>
            <Card.Body>
              <Card.Title as="h4" className="text-center">
                Restaurant Information:
              </Card.Title>
              {/* inner card one */}
              <Card style={{ width: "25rem" }}>
                <Card.Text>
                  <nobr className="fw-bold">Address: </nobr>
                  Restaurant Address: {resdata["Address"]}
                </Card.Text>
                <Card.Text>
                  <nobr className="fw-bold">Phone:</nobr> 1-{resdata["Phone"]}
                </Card.Text>
                <Card.Text>
                  <nobr className="fw-bold">Hours: </nobr>
                  {resdata["OpenHours"]} - {resdata["CloseHours"]}
                </Card.Text>
                <Card.Text>
                  <nobr className="fw-bold">Cuisine Type: </nobr>
                  {resdata["Cuisine"]}
                </Card.Text>
                {/* end inner card one */}
              </Card>
              <br></br>
              <Card.Title as="h4" className="text-center">
                Menu Information:{" "}
              </Card.Title>
              {fooddata.map((item) => {
                return (
                  // inner card two
                  <Card style={{ width: "25rem" }}>
                    <Card.Body>
                      <Card.Text>
                        <nobr className="fw-bold">{item.foodName}</nobr>
                      </Card.Text>
                      <Card.Text>${item.foodPrice}</Card.Text>
                      <Card.Text>
                        <nobr className="fw-bold">Description: </nobr>
                        {item.foodDesc}
                      </Card.Text>
                    </Card.Body>
                    {/* end inner card two */}
                  </Card>
                );
              })}
            </Card.Body>
            {/* end outer card */}
          </Card>
        </div>
      </Row>
    </Container>
  );
}

export default ViewWebpage;
