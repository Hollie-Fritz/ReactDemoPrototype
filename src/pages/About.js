import React from "react";
import OurStory from "../components/OurStory";
import NavBarHome from "../components/NavBarHome";

import "../pages/About.css";

const About = () => {
  return (
    <div className="about_bg_image" variant="sm">
     <NavBarHome/>
      <OurStory />
    </div>
  );
};

export default About;
