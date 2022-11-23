import React from 'react';
import "./Customer.css";

export function Customer() {
    return (
      <div>
        <h1 className="header-h1"> Let's get started! </h1>
        <form className="searchbar">
          <input type="text" placeholder="Search restaurant" name="search"/>
          <button type="submit"> Search </button>
        </form>
      </div>
    );
}