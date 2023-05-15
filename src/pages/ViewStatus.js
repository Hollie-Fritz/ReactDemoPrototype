import React, { useState, useEffect } from "react";
import OrderProgress from "./OrderProgress";
import "bootstrap/dist/css/bootstrap.min.css";
import Auth from "@aws-amplify/auth";
import { Card, Table, Container, Row } from "react-bootstrap";
import res from "../assests/SmallDumpling.png";
import NavBarHome from "../components/NavBarHome";

function ViewStatus() {
  const [orders, setOrders] = useState([]);


  useEffect(() => {
    const fetchOrder = async () => {
      try {
        let nameJson = await Auth.currentUserInfo();
        let searchId = nameJson["username"];
        const response = await fetch(`https://6b2uk8oqk7.execute-api.us-west-2.amazonaws.com/prod/orderByCustomerId?customerId=${searchId}`);
        const data = await response.json();
        setOrders(data);
        console.log(JSON.stringify(orders));
      } catch (error) {
        console.error(error);
      }
    };
    fetchOrder();
    // eslint-disable-next-line
  }, []);

  return (
  <>
  <NavBarHome />
  <Container className="d-flex vh-50">
    <Row className="m-auto align-self-center">
      <Card style={{ width: "40rem" }}>
        <Card
          className="m-auto align-self-center"
          style={{ width: "30rem" }}
        >
          <nobr className="fw-bold"></nobr>

          <Card.Img variant="top" src={res} />
              {orders.map((temp) => {
                return (
                  <div>
                    <Card.Body>
                      <Card.Title>
                        <nobr className="fw-bold">
                          {temp["restaurantName"]}
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
                          Total Cost: ${temp["totalCost"]}
                        </nobr>
                        <nobr
                          className="fw-bold border-0"
                          style={{ background: "white" }}
                        >
                          <div>
                              <Card className="my-3">
                                <Card.Body>
                                  <Card.Title>Order Progress</Card.Title>
                                  <OrderProgress stage={temp["progress"]} />
                                </Card.Body>
                              </Card>
                          </div>
                        </nobr>
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
  )
}
export default ViewStatus;

// function ViewStatus({ searchId }) {
//   const [order, setOrder] = useState(null);

//   useEffect(() => {
//     const fetchOrder = async () => {
//       try {
//         const response = await fetch(`https://6b2uk8oqk7.execute-api.us-west-2.amazonaws.com/prod/orderByCustomerId?customerId=${searchId}`);
//         const data = await response.json();
//         setOrder(data[0]);
//       } catch (error) {
//         console.error(error);
//       }
//     };
//     fetchOrder();
//   }, [searchId]);

//   return (
//     <div>
//       {order && (
//         <Card className="my-3">
//           <Card.Body>
//             <Card.Title>Order Progress</Card.Title>
//             <OrderProgress stage={order.progress} />
//           </Card.Body>
//         </Card>
//       )}
//     </div>
//   );
// }


