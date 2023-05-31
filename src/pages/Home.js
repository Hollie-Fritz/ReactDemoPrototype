import React from "react";
import "./Home.css";
import {Customer} from "../components/customer/Customer";

const Home = () => {
  return (
    <>
    <div className="home_bg_image">
      <Customer/>
    </div>
    </>
  );
};

export default Home;