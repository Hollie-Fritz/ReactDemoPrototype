import "bootstrap/dist/css/bootstrap.min.css";
import Auth from "@aws-amplify/auth";
import React, { useState, useEffect } from "react";
import { Card, Table, Container, Row, Form, Button, Col, } from "react-bootstrap"; // prettier-ignore
import NavBarHome from "../components/NavBarHome";
import OrderProgress from "./OrderProgress";
import { useAuthenticator } from "@aws-amplify/ui-react";
import { useNavigate } from "react-router-dom";
import { AiOutlineCheck } from "react-icons/ai";
import { Pagination } from "react-bootstrap";

//component that displays the orders
function ViewOrder() {
  const [orders, setOrders] = useState([]);
  const [loadingState, setLoadingState] = useState({});
  const { user } = useAuthenticator((context) => [context.user]);
  const navigate = useNavigate();

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = orders.slice(indexOfFirstItem, indexOfLastItem);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  //fetches the list of orders
  async function fetchOrders() {
    const { username } = await Auth.currentUserInfo();
    const response = await fetch(
      `https://6b2uk8oqk7.execute-api.us-west-2.amazonaws.com/prod/order?name=${username}`,
      {
        headers: { "Content-Type": "application/json" }
      }
    );
    const data = await response.json();
    setOrders(data);
  }

  //update the status of the orders (progress bar)
  async function updateOrderStatus(orderId, status) {
    setLoadingState((prevState) => ({ ...prevState, [orderId]: true }));

    const body = { orderId, updateKey: "progress", updateValue: status };

    //send a PATCH request to the API endpoint to update the status of the order
    await fetch(
      "https://6b2uk8oqk7.execute-api.us-west-2.amazonaws.com/prod/order",
      {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
      }
    );

    //set loading state for submit button back to false after a delay
    setTimeout(
      () =>
        setLoadingState((prevState) => ({ ...prevState, [orderId]: false })),
      800
    );
  }

  useEffect(() => {
    //fetch orders when the component mounts
    fetchOrders();
  }, []);
  const renderPaginationItems = () => {
    const totalPages = Math.ceil(orders.length / itemsPerPage);
    const visiblePages = 3;
    const pageNeighbours = Math.floor(visiblePages / 2);
    const pageNumbers = [];

    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(i);
    }

    if (totalPages <= visiblePages) {
      return pageNumbers.map((number) => (
        <Pagination.Item
          key={number}
          active={number === currentPage}
          onClick={() => paginate(number)}
        >
          {number}
        </Pagination.Item>
      ));
    }

    const leftOffset = currentPage - pageNeighbours - 1;
    const rightOffset = currentPage + pageNeighbours - totalPages;

    const hasLeftEllipsis = leftOffset > 1;
    const hasRightEllipsis = rightOffset > 1;

    let ellipsisLeftCount = Math.min(leftOffset, pageNeighbours);
    let ellipsisRightCount = Math.min(rightOffset, pageNeighbours);

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
        1
      </Pagination.Item>
    );

    // Left ellipsis
    if (hasLeftEllipsis) {
      items.push(
        <Pagination.Ellipsis
          key="ellipsis-left"
          onClick={() => paginate(currentPage - pageNeighbours - 1)}
        />
      );
    }

    // Page numbers between left and right ellipsis
    for (
      let i = currentPage - pageNeighbours;
      i <= currentPage + pageNeighbours;
      i++
    ) {
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

    // Right ellipsis
    if (hasRightEllipsis) {
      items.push(
        <Pagination.Ellipsis
          key="ellipsis-right"
          onClick={() => paginate(currentPage + pageNeighbours + 1)}
        />
      );
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

  async function deleteOrder(orderId) {
    const body = { orderId: orderId };

    await fetch(
      "https://6b2uk8oqk7.execute-api.us-west-2.amazonaws.com/prod/order",
      {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
      }
    ).then(() => {
      setOrders((prevState) =>
        prevState.filter((order) => order.id !== orderId)
      );
    });
  }

  //rendering the component
  return (
    <>
      <NavBarHome />
      <br></br>
      <Container>
        <Row>
          {currentItems.length === 0 && (
            <h2 style={{ textAlign: "center", fontWeight: "bold" }}>
              Your restaurant currently doesn't have any orders.
            </h2>
          )}
          {currentItems.map((order, index) => (
            <OrderCard
              order={order}
              index={index}
              user={user}
              loadingState={loadingState}
              updateOrderStatus={updateOrderStatus}
              navigate={navigate}
              deleteOrder={deleteOrder}
            />
          ))}
        </Row>
        <div className="d-flex justify-content-center">
          <Pagination>{renderPaginationItems()}</Pagination>
        </div>
      </Container>
    </>
  );
}
//subcomponent that displays single order
function OrderCard({
  order,
  index,
  user,
  loadingState,
  updateOrderStatus,
  navigate,
  deleteOrder
}) {
  //convert the order's dateTime string to a Date object
  const orderDateTime = new Date(order["dateTime"]);

  return (
    <Col md={5} style={{ margin: "30px" }}>
      <Card className="mb-3" style={{ height: "456px", overflowY: "auto" }}>
        <Card.Body>
          <Card.Title>
            <nobr className="fw-bold">{order["customerName"]}'s order</nobr>
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
            <Form.Label className="fw-bold" column sm="3">
              Progress:
            </Form.Label>
            <Form.Group as={Row}>
              <Col>
                <Form.Select
                  className="form-control"
                  name="progress"
                  defaultValue={order["progress"]}
                  id={"form" + index}
                >
                  <option value="Order placed"> Order Placed </option>
                  <option value="Preparing"> Preparing </option>
                  <option value="Ready"> Ready </option>
                </Form.Select>
              </Col>
              <Col sm="4">
                <Button
                  onClick={async () => {
                    // retrieve element of form using unique id.
                    const form = document.getElementById("form" + index);
                    await updateOrderStatus(order["id"], form.value);
                  }}
                  style={{
                    marginBottom: "20px",
                    backgroundColor: "#212529",
                    color: "white"
                  }}
                >
                  {loadingState[order["id"]] ? (
                    //checkmark
                    <AiOutlineCheck size={20} />
                  ) : (
                    "Submit Stage"
                  )}
                </Button>
              </Col>
            </Form.Group>
            <OrderProgress stage={order["progress"]} />
            <Button
              style={{ marginTop: "20px" }}
              onClick={() => deleteOrder(order["id"])}
            >
              Delete
            </Button>
            {user && order["customerId"] !== "" && (
              <Button
                style={{ marginTop: "20px" }}
                onClick={() =>
                  navigate(
                    `/chat/${user.getUsername()}/${order["customerId"]}`,
                    {
                      state: {
                        name: order["customerName"]
                      }
                    }
                  )
                }
              >
                Chat
              </Button>
            )}
          </Card.Text>
        </Card.Body>
      </Card>
    </Col>
  );
}

export default ViewOrder;
