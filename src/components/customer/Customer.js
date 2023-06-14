import React, { useState, useEffect } from "react";
import NavBarHome from "../NavBarHome";
import CardList from "../card-list/card-list.component";
import SearchBox from "../search-box/search-box.component";
import TopRatedCarousel from "../rating/TopRatedCarousel";
import { Container, Row, Col } from "react-bootstrap";

const Search = () => {
  const [searchField, setSearchField] = useState("");
  const [restaurants, setRestaurants] = useState([]);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      await fetch(
        `https://search-vs-nuorder-domain-6xjby743ln7v46sb2oob5alsj4.us-west-2.es.amazonaws.com/restaurant/_search?q=*${searchField}*&size=50`,
        {
          method: "GET",
          headers: {
            "Authorization": "Basic a3lsZW1haTpQYXNzd29yZDEyMyQ=",
          },
        } 
      )
      .then((response)=> response.json())
      .then((data) => {
          console.log(data)
          var list = [];
          for(var current of data["hits"]["hits"]){
            list.push(
              {...current["_source"], userId: current["_id"]}
            )
          }
          setRestaurants(list);
        }
      )
      .catch((error) => console.log(error));
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
        placeholder="Search by keyword (Restaurant, Cuisine, City, etc..)"
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
          <br></br>
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
      </Container>
    </div>
  );
}