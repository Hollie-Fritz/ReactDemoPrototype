import React from "react";
import {
  Container,
  Dropdown,
  Button,
  Form,
  Stack,
  Row,
  Col,
  Card
} from "react-bootstrap";
import "../pages/Home.css";
import { DropdownSubmenu} from "react-bootstrap-submenu";
import { useNavigate } from "react-router-dom";

// const Restaurants = () {
//     let navigate = useNavigate();
//     const ResInfo = [
//         {
//             image: "../assests/dumpling.jpeg",
//             resname: "Mike's Noodle House",
//             address: "418 Maynard Ave S Seattle, WA 98104",
//             tel: "(206) 389-7099",
//             time: "9:30am - 8:00pm",
//             map: "Open Map",
//             category: "Chinese",
//             reviews: "Reviews"
//             // stars: 
//         },    ];

//         const renderCard = (card, index) => {
//             return (

//                 <Card style={{width: '18rem'}} className="search" key={index}>
//                     <Card.Img variant="top" src={card.image} className="avatar d-block mx-auto img-fluid wd-30"/>
//                     <Card.Body>

//                     </Card.Body>

//                 </Card>
//             );
//         }
// }

const SearchBar = () => {
  return (
    <>


      <Container fluid="sm">
        <Row className="justify-content-lg-center">
            <Col  xs lg="6">
        <Stack direction="horizontal" gap={3}>
          <div>
            <Dropdown>
              <Dropdown.Toggle variant="info" id="dropdown-basic">
                Filter
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item href="#/action-1">Top Rated</Dropdown.Item>
                <DropdownSubmenu title="Cuisine Type">
                    <Dropdown.Item href="#/action-2">Chinese</Dropdown.Item>
                    <Dropdown.Item href="#/action-3">Thai</Dropdown.Item>
                    <Dropdown.Item href="#/action-3">Italian</Dropdown.Item>
                    <Dropdown.Item href="#/action-3">Fast Food</Dropdown.Item>
                </DropdownSubmenu>
              </Dropdown.Menu>
            </Dropdown>
          </div>
          <div>
          <Form className="d-flex">
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
            />
            <Button variant="outline-dark">Search</Button>
          </Form>
          </div>
        </Stack>
        </Col>
        </Row>
      </Container>
    </>
  );
};

export default SearchBar;