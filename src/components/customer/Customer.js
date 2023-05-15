import React from "react";
import { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import CardList from "../card-list/card-list.component";
import SearchBox from "../search-box/search-box.component";
import NavBarHome from "../NavBarHome";
import TopRatedCarousel from "../rating/TopRatedCarousel";

const Search = () => {
  const [searchField, setSearchField] = useState("");
  const [restaurants, setRestaurants] = useState([]);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      let url = `https://6b2uk8oqk7.execute-api.us-west-2.amazonaws.com/prod/restaurant?name=${searchField}`;
      const response = await fetch(url);
      const data = await response.json();
      setRestaurants(data);
      console.log(data);
    };
    fetchData();
  }, [searchField]);

  useEffect(() => {
    setNotFound(restaurants.length === 0 && searchField !== "");
  }, [restaurants, searchField]);

  const onSearchChange = (event) => {
    const searchFieldString = event.target.value.toLocaleLowerCase();
    setSearchField(searchFieldString);
  };

  return (
    <div>
      <SearchBox
        onChangeHandler={onSearchChange}
        placeholder="Search by Restaurant, Cuisine or City"
      />
      {notFound ? (
        <h2 style={{color: "#fff"}}>Restaurant cannot be found</h2>
      ) : (
        <CardList restaurants={restaurants} className="card-grid" />
      )}
    </div>
  );
};

//Customer.js
export function Customer() {
  return (
     <div className="bg">
      <NavBarHome />
      <Container fluid="md">
        <Row className="justify-content-center">
          <Col>
          <div style={{ display: "flex", justifyContent: "center" }}>
          <TopRatedCarousel/>
          </div>
          </Col>
        </Row>
        <br/><br/><br/><br/><br/>
        <Row className="justify-content-center">
          <Col>
          <Search  />
          </Col>
        </Row>
      </Container></div>

  );
}