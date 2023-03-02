import React from "react";
import "./Home.css";
import ChooseCard from "../components/ChooseCard";
import { Container, Row } from "react-bootstrap";

const Home = () => {
  return (
    <div className="home_bg_image">
      <Container variant="sm">
        <Row>
          <ChooseCard />
        </Row>
      </Container>
    </div>
  );
};

export default Home;
