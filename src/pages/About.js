import React from "react";
import "./About.css";
import "../pages/About.css";
import OurStory from "../components/OurStory";
import NavBarHome from "../components/NavBarHome";

const About = () => {
  return (
    <div className="about_bg_image" variant="sm">
     <NavBarHome/>
      <OurStory />
    </div>
  );
};

export default About;
