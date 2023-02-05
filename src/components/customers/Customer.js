// import React, { useState } from 'react';

// export function Customer() {
//   const [searchTerm, setSearchTerm] = useState('');
//   const [searchBy, setSearchBy] = useState('restaurantName');
//   const [restaurants, setRestaurants] = useState([]);

//   const handleSearchChange = (event) => {
//     setSearchTerm(event.target.value);
//   };

//   const handleSearchByChange = (event) => {
//     setSearchBy(event.target.value);
//   };

//   const handleSearchSubmit = async (event) => {
//     // console.log("hello");
//     event.preventDefault();
//     // fetch restaurants data from the backend
//     const response = await fetch(`ec2-52-13-123-227.us-west-2.compute.amazonaws.com:8080/restaurant/${searchTerm}`);
//     const data = await response.json();
//     setRestaurants(data);
//     console.log(data);
//     console.log(response);
   
//   };

//   // Filter the restaurants based on the search term and search by value
//   let filteredRestaurants = restaurants;
//   if (searchTerm) {
//     filteredRestaurants = restaurants.filter((restaurant) => {
//       if (searchBy === 'restaurantName') {
//         return restaurant.name.toLowerCase().includes(searchTerm.toLowerCase());
//       } else if (searchBy === 'cuisine') {
//         return restaurant.cuisine.toLowerCase().includes(searchTerm.toLowerCase());
//       }
//       // return null;
//     });
//   }

//   return (
//     <div>
//       <form onSubmit={handleSearchSubmit}>
//         <label>
//           Search:
//           <input type="text" value={searchTerm} onChange={handleSearchChange} />
//         </label>
//         <label>
//           Search by:
//           <select value={searchBy} onChange={handleSearchByChange}>
//             <option value="restaurantName">Name</option>
//             <option value="cuisine">Cuisine</option>
//           </select>
//         </label>
//         <input type="submit" value="Search"/>
//       </form>
//       <ul>
//         {filteredRestaurants.map((restaurant) => (
//           <li>{restaurant.restaurantName}</li>
//         ))}
//       </ul>
//     </div>
//   );
// }

import React, { useState } from 'react';

export function Customer() {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchBy, setSearchBy] = useState('name');
  const [restaurants, setRestaurants] = useState([]);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearchByChange = (event) => {
    setSearchBy(event.target.value);
  };

  const handleSearchSubmit = async (event) => {
    event.preventDefault();
    // fetch restaurants data from the backend
    const response = await fetch(`http://ec2-52-13-123-227.us-west-2.compute.amazonaws.com:8080/restaurant/${searchTerm}`);
    const data = await response.json();
    setRestaurants(data);
  };

  // Filter the restaurants based on the search term and search by value
  let filteredRestaurants = restaurants;
  if (searchTerm) {
    filteredRestaurants = restaurants.filter((restaurant) => {
      if (searchBy === 'restaurantName') {
        return restaurant.Name.toLowerCase().includes(searchTerm.toLowerCase());
      } else if (searchBy === 'cuisine') {
        return restaurant.Cuisine.toLowerCase().includes(searchTerm.toLowerCase());
      }
      return null;
    });
  }

  return (
    <div>
      <form onSubmit={handleSearchSubmit}>
        <label>
          Search:
          <input type="text" value={searchTerm} onInput={handleSearchChange} />
        </label>
        <label>
          Search by:
          <select value={searchBy} onInput={handleSearchByChange}>
            <option value="restaurantName">Name</option>
            <option value="cuisine">Cuisine</option>
          </select>
        </label>
        
      </form>
      {searchTerm === '' || filteredRestaurants.length === 0 ? 
        <p>Please enter a search term</p> :
        <ul>
          {filteredRestaurants.map((restaurant) => (
            <li>{restaurant.Name}</li>
          ))}
        </ul>
      }
    </div>
  );
}


// import React, { useState } from "react";

// const SearchBar = () => {
//   const [searchTerm, setSearchTerm] = useState("");
//   const [searchType, setSearchType] = useState("name");
//   const [searchHistory, setSearchHistory] = useState([]); // added state to track search history
//   const [suggestions, setSuggestions] = useState([]);
//   const [restaurants, setRestaurants] = useState([]);
//   const [cuisines, setCuisines] = useState([]);
//   const [fuse, setFuse] = useState();

//   // Fuse.js options for search
//   const options = {
//     shouldSort: true,
//     threshold: 0.6,
//     location: 0,
//     distance: 100,
//     maxPatternLength: 32,
//     minMatchCharLength: 1,
//     keys: [searchType],
//   };

//   useEffect(() => {
//     fetch(`http://ec2-52-13-123-227.us-west-2.compute.amazonaws.com:8080/restaurant/${searchTerm}`)
//       .then((response) => response.json())
//       .then((data) => {
//         setRestaurants(data);
//         const cuisines = new Set(data.map((r) => r.cuisine));
//         setCuisines([...cuisines]);
//         setFuse(new Fuse([...cuisines], options));
//       });
//   }, []);

//   const handleSearch = (e) => {
//     setSearchTerm(e.target.value);
//     setSuggestions(fuse.search(e.target.value));
//     setSearchHistory([...searchHistory, searchTerm]); // add current search term to history
//   };

//   const toggleSearchType = () => {
//     if (searchType === "name") {
//       setSearchType("cuisine");
//       setFuse(new Fuse(cuisines, options));
//     } else {
//       setSearchType("name");
//       setFuse(new Fuse(restaurants, options));
//     }
//   };

//   // function to get the most common search terms
//   const getCommonSearches = () => {
//     const searchCount = {};
//     for (let i = 0; i < searchHistory.length; i++) {
//       const term = searchHistory[i];
//       if (searchCount[term]) {
//         searchCount[term]++;
//       } else {
//         searchCount[term] = 1;
//       }
//     }

//     // sort the searchCount object by value in descending order
//     const commonSearches = Object.entries(searchCount).sort(
//       (a, b) => b[1] - a[1]
//     );
//     return commonSearches;
//   };

//   return (
//     <div>
//       <input
//         type="text"
//         placeholder={`Search for a ${searchType}`}
//         value={searchTerm}
//         onChange={handleSearch}
//       />
//       <button onClick={toggleSearchType}>
//         {searchType === "name" ? "Search by Cuisine" : "Search by Name"}
//       </button>
//       <div>
//         {suggestions.map((suggestion) => (
         

