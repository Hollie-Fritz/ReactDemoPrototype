import React from 'react'
import "./About.css"
import logo from '../assests/NuOrderLogoLarge.png'
import { Container, Navbar} from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import "../pages/About.css"
import OurStory from '../components/OurStory'

const About = () => {
  let navigate = useNavigate();
  return (
    <div className='about_bg_image' variant="sm">
      <Navbar className="navbar-default">
        <Container>
          <Navbar.Brand  onClick={() =>{navigate("/");}}>
            <img src={logo} alt='logo' className="logo-img"/>
          </Navbar.Brand>
      </Container>
      </Navbar>
       <OurStory/>
    </div>
  )
}

export default About
