import React from "react";
import "./About.css";
import logo from "../assests/NuOrderLogoLarge.png";
import { Container, Navbar } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "../pages/About.css";
import OurStory from "../components/OurStory";
import NavBarHome from "../components/NavBarHome";

const About = () => {
  let navigate = useNavigate();
  return (
    <div className="about_bg_image" variant="sm">
     <NavBarHome/>
      <OurStory />
    </div>
  );
};

export default About;
