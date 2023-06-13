import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState, useEffect } from "react";
import NavBarHome from "../components/NavBarHome";
import OrderProgress from "./OrderProgress";

import Auth from "@aws-amplify/auth";
import { useAuthenticator } from "@aws-amplify/ui-react";
import { useNavigate } from "react-router-dom";

import { Card, Table, Container, Row, Form, Button, Col} from "react-bootstrap"; // prettier-ignore
import { Pagination, Ellipsis } from "react-bootstrap";
import { AiOutlineCheck } from "react-icons/ai";
import style from "./ViewStatus.module.css";


//component that displays the orders
function ViewOrder() {
  const [orders, setOrders] = useState([]);
  const [loadingState, setLoadingState] = useState({});
  const { user } = useAuthenticator((context) => [context.user]);
  const [fetched, setFetched] = useState(false);
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
    setFetched(true);
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
    ).then(()=>{
      window.location.reload();
    });

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
        {fetched && <Row>
           {currentItems.length === 0 && (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100vh",
                textAlign: "center"
              }}
            >
              <h1>Your restaurant currently doesn't have any orders.</h1>
            </div>
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
        </Row>}
        <br></br>
        <br></br>
        {orders.length > itemsPerPage && (
          <div className="d-flex justify-content-center">
            <Pagination>{renderPaginationItems()}</Pagination>
          </div>
        )}
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
            <nobr className="fw-bold"  data-cy="customerName" >{order["customerName"]}'s order</nobr>
          </Card.Title>
          <Card.Text >
            <nobr className="fw-bold" data-cy="orderDateTime">Order Date:</nobr>{" "}
            {orderDateTime.toLocaleDateString()}
            <br></br>
            <nobr className="fw-bold" data-cy="orderDateTime">Order Time:</nobr>{" "}
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
            <nobr className="fw-bold border-0" style={{ background: "white" }} data-cy="note">
              {" "}
              Note: {order["note"]}
            </nobr>
            <br></br>
            <nobr className="fw-bold border-0" style={{ background: "white" }} data-cy="utensils">
              {" "}
              Utensils:{" "}
            </nobr>
            {order["utensils"] ? "yes" : "no"}
            <br></br>
            <nobr className="fw-bold border-0" style={{ background: "white" }} data-cy="totalCost">
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
                  data-cy = "progressList"
                >
                  <option value="Order placed"> Order Placed </option>
                  <option value="Preparing"> Preparing </option>
                  <option value="Ready"> Ready </option>
                </Form.Select>
              </Col>
              <Col sm="4">
                <Button
                  className={style["orders-button"]}
                  onClick={async () => {
                    // retrieve element of form using unique id.
                    const form = document.getElementById("form" + index);
                    await updateOrderStatus(order["id"], form.value);
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
              className={style["orders-button"]}
              style={{ marginTop: "20px" }}
              onClick={() => deleteOrder(order["id"])}
            >
              Delete
            </Button>

            {user && order["customerId"] !== "" && (
              <Button
                className={style["orders-button"]}
                style={{ marginTop: "20px", marginLeft: "10px" }}
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
