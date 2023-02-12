import React from "react";
import { Container, Row, Navbar } from "react-bootstrap";
import SearchBar from "../components/SearchBar";
import { useNavigate } from "react-router-dom";
import logo from "../assests/NuOrderLogoLarge.png";

const Search = () => {
  let navigate = useNavigate();
  return (
    <>
      <Navbar className="navbar-default">
        <Container>
          <Navbar.Brand
            onClick={() => {
              navigate("/");
            }}
          >
            <img src={logo} alt="logo" className="logo-img" />
          </Navbar.Brand>
        </Container>
      </Navbar>
      <Container>
          <div>
            <SearchBar />
          </div>
      </Container>
      
    </>
  );
};

export default Search;
