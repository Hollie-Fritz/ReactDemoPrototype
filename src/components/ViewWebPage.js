import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState, useEffect } from "react";
import Card from "react-bootstrap/Card";

function ViewWebpage(props) {
  const [count, setCount] = useState([]);
  const [restaurantId, setRestaurantId] = useState([""]);

  useEffect(() => {
    let username = this.props.match.params.id;
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
          console.log("data is below");
          console.log(JSON.stringify(data));
        });
    }
    userAction();
  });
  return (
    <>
      <div>
        {count.map((temp) => {
          return (
            <Card style={{ width: "30rem" }}>
              <Card.Body>
                <Card.Title>{temp["Name"]}</Card.Title>
                <Card.Text>
                  <div>Phone: {temp["Phone"]}</div>
                  <div>Restaurant Address: {temp["Address"]}</div>
                  <div>Hours: {temp["OpenHours"]} - {temp["CloseHours"]}</div>
                  <div>Cuisine: {temp["Cuisine"]}</div>
                </Card.Text>
              </Card.Body>


              </Card>
          );
        })}
      </div>
    </>
  );
}
export default ViewWebpage;