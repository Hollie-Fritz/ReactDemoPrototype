import React from 'react';
import { useState, useEffect } from 'react';
import CardList from '../card-list/card-list.component';
import SearchBox from '../search-box/search-box.component';

import "./Customer.css";

const Search = () => {
  const [searchField, setSearchField] = useState('');
  const [selectedOption, setSelectedOption] = useState('name'); // default selected option is name
  const [restaurants, setRestaurants] = useState([]);
  const [filteredRestaurants, setFilterRestaurants] = useState([]);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      let url = '';
      if (selectedOption === 'name') {
        url = `https://6b2uk8oqk7.execute-api.us-west-2.amazonaws.com/prod/restaurant?name=${searchField}`;
      } else {
        url = `https://6b2uk8oqk7.execute-api.us-west-2.amazonaws.com/prod/restaurant?cuisine=${searchField}`;
      }
      const response = await fetch(url);
      const data = await response.json();
      setRestaurants(data);
      console.log(data);
    };
    fetchData();
  }, [searchField, selectedOption]);

  useEffect(() => {
    const newFilteredRestaurants = restaurants.filter(restaurant => {
      return selectedOption === 'name'
        ? restaurant.Name.toLocaleLowerCase().includes(searchField)
        : restaurant.Cuisine.toLocaleLowerCase().includes(searchField);
    });
    setFilterRestaurants(newFilteredRestaurants);
    setNotFound(newFilteredRestaurants.length === 0 && searchField !== '');
  }, [restaurants, searchField, selectedOption]);

  const onSearchChange = event => {
    const searchFieldString = event.target.value.toLocaleLowerCase();
    setSearchField(searchFieldString);
  };

  const onOptionChange = event => {
    setSelectedOption(event.target.value);
  };

  return (
    <div className="App">
      <h1 className="app-title"> </h1>
      <select value={selectedOption} onChange={onOptionChange}>
        <option value="name"> Name </option>
        <option value="cuisine"> Cuisine </option>
      </select>
      <SearchBox
        className="restaurant-search-box"
        onChangeHandler={onSearchChange}
        placeholder="Search Restaurant"
      />
      {notFound ? (
        <h2>Restaurant cannot be found</h2>
      ) : (
        <CardList restaurants={filteredRestaurants} />
      )}
    </div>
  );

}

export function Customer() {
    return (
      <div>
      <h1 className="header-h1"> Let's find some food! </h1>
      <Search />
      </div>
    );
  }