import React from "react";
import "./Home.css";
import {Customer} from "../components/customer/Customer";
import { Container, Row } from "react-bootstrap";

const Home = () => {
  return (
    <>
    <div className="home_bg_image">
      <Container variant="sm">
        <Row>
          <Customer/>
        </Row>
      </Container>
    </div>
    </>
  );
};

export default Home;
