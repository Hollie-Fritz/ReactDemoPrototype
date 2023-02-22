import { useContext, useEffect, useState } from "react";
import "./MenuOrder.css";
// import axios from "axios";
import { Cartcontext } from "../../context/Context";

import { Link } from "react-router-dom";

const MenuOrder = () => {
  // const userId = this.props.match.params.id;
  const [data, setdata] = useState([]);
  // let hasCart = false
  // const setCart = () => {
  //     hasCart = !hasCart;
  // }
  
  // const fetchData = async () => {
  //   const response = await axios.get(`https://6b2uk8oqk7.execute-api.us-west-2.amazonaws.com/prod/restaurantById?id=seth`);
  //   setdata(response.data);
  //   console.log(data);
  // };
  // useEffect(() => {
  //   fetchData();
  // }, []);

  useEffect(() => {
    const fetchData = async () => {
      let url = `https://6b2uk8oqk7.execute-api.us-west-2.amazonaws.com/prod/restaurantById?id=seth`;
      const response = await fetch(url);
      const data = await response.json();
      setdata(data[0]["Food"]);
      data.forEach(current => console.log(JSON.stringify(current)))
    };
    fetchData();
  }, []);

  const Globalstate = useContext(Cartcontext);
  const dispatch = Globalstate.dispatch;
  console.log(Globalstate);

  return (
    <div className="menu">
      <div>
      <Link to="/cart">
            <button>
              Cart
            </button>
      </Link>
      </div>
      <div></div> <div></div>

      {data.map((item, foodId) => {
        item.quantity = 1;
        return (
          <div className="card-food" key={foodId}>
            <img src={item.image} alt="" />
            <p>{item.foodName}</p>
            <p>${item.foodPrice}</p>
            <button onClick={() => dispatch({ type: "ADD", payload: item })}>
              add to cart
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default MenuOrder;
