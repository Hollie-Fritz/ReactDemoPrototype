import React from "react";
import "./Home.css";
import {Customer} from "../components/customer/Customer";
import { Container, Row } from "react-bootstrap";
import FooterHomePage from "../components/footer/FooterHomePage";

const Home = () => {
  return (
    <>
    <div className="home_bg_image">
      <Customer/>
      <FooterHomePage/>
    </div>
    </>
  );
};

export default Home;