import React from "react";
import "./Home.css";
import { Container } from "react-bootstrap";
import NavBarHome from "../components/NavBarHome";
import { Customer } from '../components/customer/Customer';

const Home = () => {
  return (
    <>
    <div className="home_bg_image">
    <NavBarHome />
      <Container variant="sm">
        <Customer/> 
      </Container>
    </div>
    </>
  );
};

export default Home;
