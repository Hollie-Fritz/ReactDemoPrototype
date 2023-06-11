import "bootstrap/dist/css/bootstrap.min.css";
import Auth from "@aws-amplify/auth";
import React, { useState, useEffect } from "react";
import { Card, Table, Container, Row, Form, Button, Col, } from "react-bootstrap"; // prettier-ignore
import NavBarHome from "../components/NavBarHome";
import OrderProgress from "./OrderProgress";
import { useAuthenticator } from "@aws-amplify/ui-react";
import { useNavigate } from "react-router-dom";
import { Pagination, Ellipsis } from "react-bootstrap";
import style from "./ViewStatus.module.css";

//component that displays the orders
function ViewStatus() {
  const [orders, setOrders] = useState([]);
  const { user } = useAuthenticator((context) => [context.user]);
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = orders.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  //fetches the list of orders
  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
    const fetchOrder = async () => {
      try {
        let nameJson = await Auth.currentUserInfo();
        let searchId = nameJson["username"];
        const response = await fetch(
          `https://6b2uk8oqk7.execute-api.us-west-2.amazonaws.com/prod/orderByCustomerId?customerId=${searchId}`
        );
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

  const EllipsisItem = () => {
    return <Pagination.Item disabled>...</Pagination.Item>;
  };

  const renderPaginationItems = () => {
    const totalPages = Math.ceil(orders.length / itemsPerPage);
    const pageNumbers = [];

    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(i);
    }

    const items = [];

    // Previous page
    items.push(
      <Pagination.Prev
        key="prev"
        onClick={() => setCurrentPage((prevPage) => prevPage - 1)}
        disabled={currentPage === 1}
      />
    );

    // First page
    items.push(
      <Pagination.Item
        key={1}
        active={1 === currentPage}
        onClick={() => paginate(1)}
      >
        {1}
      </Pagination.Item>
    );

    // Ellipsis after the second page
    if (currentPage >= 4) {
      items.push(<EllipsisItem key="ellipsis-start" />);
    }

    // Pages between the ellipsis
    for (let i = currentPage - 1; i <= currentPage + 1; i++) {
      if (i > 1 && i < totalPages) {
        items.push(
          <Pagination.Item
            key={i}
            active={i === currentPage}
            onClick={() => paginate(i)}
          >
            {i}
          </Pagination.Item>
        );
      }
    }

    // Ellipsis before the last page
    if (currentPage <= totalPages - 3) {
      items.push(<EllipsisItem key="ellipsis-end" />);
    }

    // Last page
    items.push(
      <Pagination.Item
        key={totalPages}
        active={totalPages === currentPage}
        onClick={() => paginate(totalPages)}
      >
        {totalPages}
      </Pagination.Item>
    );

    // Next page
    items.push(
      <Pagination.Next
        key="next"
        onClick={() => setCurrentPage((prevPage) => prevPage + 1)}
        disabled={currentPage === totalPages}
      />
    );

    return items;
  };

  //rendering the component
  return (
    <>
      <NavBarHome />
      <Container>
        <Row>
          <br />
          {orders.length > 0 && (
            <h2
              style={{
                fontWeight: "bold",
                marginTop: "20px",
                marginBottom: "-25px"
              }}
            >
              My Orders:
            </h2>
          )}
          <br></br>
          {currentItems.length === 0 && (
            <>
              <h1
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  height: "100vh",
                  textAlign: "center"
                }}
              >
                You have not placed any orders.
              </h1>
            </>
          )}
          {currentItems.map((order, index) => (
            <React.Fragment key={index}>
              <OrderCard
                order={order}
                index={index}
                user={user}
                navigate={navigate}
              />
            </React.Fragment>
          ))}
        </Row>
      </Container>
      <br></br>
      <br></br>
      {orders.length > 0 && (
        <div className="d-flex justify-content-center">
          <Pagination>{renderPaginationItems()}</Pagination>
        </div>
      )}
    </>
  );
}
//subcomponent that displays single order
function OrderCard({ order, user, navigate }) {
  //convert the order's dateTime string to a Date object
  const orderDateTime = new Date(order["dateTime"]);

  return (
    <Col md={5} style={{ margin: "30px" }}>
      <Card className="mb-3" style={{ height: "456px", overflowY: "auto" }}>
        <Card.Body>
          <Card.Title>
            <nobr className="fw-bold" style={{ fontSize: "25px" }}>
              {order["restaurantName"]}
            </nobr>
          </Card.Title>
          <Card.Text>
            <nobr className="fw-bold">Order Date:</nobr>{" "}
            {orderDateTime.toLocaleDateString()}
            <br></br>
            <nobr className="fw-bold">Order Time:</nobr>{" "}
            {orderDateTime.toLocaleTimeString()}
            <Table responsive>
              <thead>
                <tr>
                  <th>Item</th>
                  <th>Quantity</th>
                  <th>Price</th>
                </tr>
              </thead>
              <tbody>
                {order["menuItems"].map((current) => {
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
            <nobr className="fw-bold border-0" style={{ background: "white" }}>
              {" "}
              Note: {order["note"]}
            </nobr>
            <br></br>
            <nobr className="fw-bold border-0" style={{ background: "white" }}>
              {" "}
              Utensils:{" "}
            </nobr>
            {order["utensils"] ? "yes" : "no"}
            <br></br>
            <nobr className="fw-bold border-0" style={{ background: "white" }}>
              {" "}
              Total Cost:{" "}
            </nobr>{" "}
            ${order["totalCost"]}
            <br></br>
            <Form.Label className="fw-bold" column sm="2">
              <nobr>Order Progress:</nobr>
            </Form.Label>
            <OrderProgress stage={order["progress"]} />
            <Button
              className={style["orders-button"]}
              style={{ marginTop: "20px" }}
              onClick={() =>
                navigate(
                  `/chat/${user.getUsername()}/${order["restaurantId"]}`,
                  {
                    state: {
                      name: order["restaurantName"]
                    }
                  }
                )
              }
            >
              Chat
            </Button>
          </Card.Text>
        </Card.Body>
      </Card>
    </Col>
  );
}

export default ViewStatus;
