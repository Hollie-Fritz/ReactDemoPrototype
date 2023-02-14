import "bootstrap/dist/css/bootstrap.min.css";
import Auth from "@aws-amplify/auth";
import React, { useState, useEffect } from "react";
import Card from 'react-bootstrap/Card';

function ViewOrder() {

  const[count, setCount] = useState([]);
  const[restaurantId, setRestaurantId] = useState(['']);

  useEffect(() => {
      async function userAction() {
          // let user = await Auth.currentSession()
          // let token = user.getAccessToken().getJwtToken()
          let nameJson = await Auth.currentUserInfo()
          let name = nameJson['username']
          console.log(JSON.stringify(nameJson))

          await fetch('https://6b2uk8oqk7.execute-api.us-west-2.amazonaws.com/prod/order?name=' + name, 
                {
                  method: 'GET',
                  headers: {
                    'Content-Type': 'application/json'
                  }
                  // body: token
                }
            ).then(
                response => response.json()
            ).then(
              data => {
                console.log(data)
                setCount(data)
                setRestaurantId(name)
              }
            );
      }
      userAction();
    }, []
  );

  return (
    <>
      {/* <div style={{color: "orange"}} >{restaurantId}</div>
      <div style={{color: "orange"}} >
          {
            count.map((one) => {return <div>{JSON.stringify(one)}</div>})
          }
      </div> */}
      
      <div>
        <Card style={{ width: '30rem' }}>
          <Card.Title>Your Username: {restaurantId}</Card.Title>
        </Card>
          {
            count.map((temp) => {
              return  <Card style={{ width: '30rem' }}>
              <Card.Img variant="top" src="../assests/dumpling.jpeg" />
              <Card.Body>
                <Card.Title>{temp["customerName"]}'s order</Card.Title>
                <Card.Text>
                <div>Quantity: {temp["quantity"]}</div>
                <div>Restaurant Name: {temp["restaurantName"]}</div>
                <div>Order Date/Time: {temp["dateTime"]}</div>
                <div>Total Cost: {temp["totalCost"]}</div>
                </Card.Text>
              </Card.Body>
            </Card>
            })
          }
      </div>
    </>
  );

}
export default ViewOrder;