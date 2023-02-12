import React from 'react'
import "./Home.css"
import NavBarHome from '../components/NavBarHome'
import ChooseCard from '../components/ChooseCard'
import { Container, Row } from 'react-bootstrap'

const Home = () => {
  return (
    <div className='home_bg_image'float>
      <div><NavBarHome/></div>
      <Container variant="sm">
        <Row>
          <ChooseCard/>
        </Row>
      </Container>
    </div>
  )
}

export default Home 