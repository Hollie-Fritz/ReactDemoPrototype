import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState, useEffect } from "react";
import Card from "react-bootstrap/Card";

function ViewWebpage() {
  const [count, setCount] = useState([]);
  const [restaurantId, setRestaurantId] = useState([""]);

  useEffect(() => {
    let username = "jona";
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
          console.log(data);
          setCount(data);
          setRestaurantId(username);
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

            {count.map((temp) => {
                return (
                  // inner card two
                  <Card style={{ width: "25rem" }}>
                    <Card.Body>
                      <Card.Text>
                        <nobr className="fw-bold">Menu Item Name: </nobr>
                        {temp["FoodId"]}
                      </Card.Text>
                      <Card.Text>
                        <nobr className="fw-bold">Menu Item Price: </nobr>{" "}
                        {/* {menuItems.menuPrice} */}
                      </Card.Text>
                      <Card.Text>
                        <nobr className="fw-bold">Menu Item Description: </nobr>
                        {/* {menuItems.menuDesc} */}
                      </Card.Text>
                    </Card.Body>
                    {/* end inner card two */}
                  </Card>
                );
              })}
              </Card>
          );
        })}
      </div>
    </>
  );
}
export default ViewWebpage;