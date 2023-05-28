import "./card-list.styles.css";
import Card from "../card/card.component";
import { Container, Row } from "react-bootstrap";
import React from "react";

const CardList = ({ restaurants }) => (
  <>
    <Container fluid>
      <Row xs={2} md={3} lg={4} >
        {restaurants.map((restaurant) => {
          return <Card key={restaurant.userId}restaurant={restaurant} />;
        })}
      </Row>
    </Container>
  </>
);

export default CardList;