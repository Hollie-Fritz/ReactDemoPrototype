import React from "react";
import {Customer} from "../components/customer/Customer";

import "./Home.css";

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