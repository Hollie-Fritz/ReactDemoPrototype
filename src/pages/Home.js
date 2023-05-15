import React from "react";
import "./Home.css";
import ChooseCard from "../components/ChooseCard";
import { Container, Row } from "react-bootstrap";
import NavBarHome from "../components/NavBarHome";
const Home = () => {
  return (
    <>
    <div className="home_bg_image">
    <NavBarHome />
      <Container variant="sm">
        <Row>
          <ChooseCard />
        </Row>
      </Container>
    </div>
    </>
  );
};

export default Home;
