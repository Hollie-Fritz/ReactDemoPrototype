import "bootstrap/dist/css/bootstrap.min.css";
import Auth from "@aws-amplify/auth";
import React, { useState, useEffect } from "react";
import { Card, Table, Container, Row, Form, Button } from "react-bootstrap";
import res from "../assests/SmallDumpling.png";
import NavBarHome from "../components/NavBarHome";
import OrderProgress from "./OrderProgress";
import { useAuthenticator } from "@aws-amplify/ui-react";
import { useNavigate } from "react-router-dom";

function ViewOrder() {
  const [count, setCount] = useState([]);
  const [restaurantId, setRestaurantId] = useState([""]);
  const { user } = useAuthenticator((context) => [
    context.user, 
  ]);
  const navigate = useNavigate();

  async function updateOrderStatus(orderId, status) {
    const body = {
      orderId: orderId,
      updateKey: "progress",
      updateValue: status,
    };

    await fetch(
      "https://6b2uk8oqk7.execute-api.us-west-2.amazonaws.com/prod/order",
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      }
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        window.location.reload();
      });
  }

  useEffect(() => {
    async function userAction() {
      // let user = await Auth.currentSession()
      // let token = user.getAccessToken().getJwtToken()
      let nameJson = await Auth.currentUserInfo();
      let name = nameJson["username"];
      // console.log(JSON.stringify(nameJson));
      await fetch(
        "https://6b2uk8oqk7.execute-api.us-west-2.amazonaws.com/prod/order?name=" +
          name,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          // body: token
        }
      )
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          setCount(data);
          setRestaurantId(name);
        });
    }
    userAction();
  }, []);

  return (
    <>
      <NavBarHome />
      <Container className="d-flex vh-50">
        <Row className="m-auto align-self-center">
          <Card style={{ width: "40rem" }}>
            <Card.Title className="fw-bold">
              Your Username: {restaurantId}
            </Card.Title>
            <Card
              className="m-auto align-self-center"
              style={{ width: "30rem" }}
            >
              <nobr className="fw-bold"></nobr>
              <Card.Img variant="top" src={res} />
              {count.map((temp, index) => {
                return (
                  <div>
                    <Card.Body>
                      <Card.Title>
                        <nobr className="fw-bold">
                          {temp["customerName"]}'s order
                        </nobr>
                        <br></br>Order Date/Time:{" "}
                        <nobr className="fw-bold">{temp["dateTime"]}</nobr>
                      </Card.Title>
                      <Card.Text>
                        <Table responsive>
                          <thead>
                            <tr>
                              <th>Item</th>
                              <th>Quantity</th>
                              <th>Price</th>
                              <th> </th>
                            </tr>
                          </thead>
                          <tbody>
                            {temp["menuItems"].map((current) => {
                              return (
                                <tr key={current["foodName"]}>
                                  <td>{current["foodName"]}</td>
                                  <td>{current["quantity"]}</td>
                                  <td>${current["priceEach"]}</td>
                                </tr>
                              );
                            })}
                          </tbody>
                        </Table>
                        <nobr
                          className="fw-bold border-0"
                          style={{ background: "white" }}
                        >
                          {" "}
                          Note: {temp["note"]}
                        </nobr>
                        <br></br>
                        <nobr
                          className="fw-bold border-0"
                          style={{ background: "white" }}
                        >
                          {" "}
                          Utensils: {temp["utensils"] ? "yes" : "no"}
                        </nobr>
                        <br></br>
                        {temp["phoneNumber"] && 
                        <>
                          <nobr
                            className="fw-bold border-0"
                            style={{ background: "white" }}
                          >
                            {" "}
                            Phone Number:  {temp["phoneNumber"]}
                          </nobr>
                          <br></br>
                        </>
                        }
                        <nobr
                          className="fw-bold border-0"
                          style={{ background: "white" }}
                        >
                          {" "}
                          Total Cost: ${temp["totalCost"]}
                        </nobr>
                        <br></br>
                        <Form.Label>Progress: </Form.Label>
                        <Form.Select
                          className="form-control"
                          name="progress"
                          defaultValue={temp["progress"]}
                          id={"form" + index}
                        >
                          <option value="Order placed"> Order Placed </option>
                          <option value="Preparing"> Preparing </option>
                          <option value="Ready"> Ready </option>
                        </Form.Select>
                        <Button
                          onClick={async () => {
                            const form = document.getElementById(
                              "form" + index
                            );
                            await updateOrderStatus(temp["id"], form.value);
                          }}
                        >
                          Submit Stage
                        </Button>
                        <OrderProgress stage={temp["progress"]} />
                        {
                            user
                            &&
                            temp["customerId"] !== ""
                            &&
                            <Button 
                            onClick={()=> navigate(`/chat/${user.getUsername()}/${temp["customerId"]}`, 
                            {
                              state:{
                                      name: temp["customerName"],
                                    }
                            })
                            }>Chat</Button>
                        }
                      </Card.Text>
                    </Card.Body>
                  </div>
                );
              })}
            </Card>
          </Card>
        </Row>
      </Container>
    </>
  );
}
export default ViewOrder;
