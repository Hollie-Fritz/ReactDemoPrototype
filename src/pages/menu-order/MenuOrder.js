import { useContext, useEffect, useState } from "react";
import "./Menu.css";
import axios from "axios";
import { Cartcontext } from "../../context/Context";

const MenuOrder = () => {
  const userId = this.props.match.params.id;
  const [data, setdata] = useState([]);
  const fetchData = async () => {
    const response = await axios.get(`https://6b2uk8oqk7.execute-api.us-west-2.amazonaws.com/prod/restaurant/${userId}`); //need the menu API here https://6b2uk8oqk7.execute-api.us-west-2.amazonaws.com/prod/restaurant?name=${searchField}`
    setdata(response.data);
    console.log(data);
  };
  useEffect(() => {
    fetchData();
  }, []);

  const Globalstate = useContext(Cartcontext);
  const dispatch = Globalstate.dispatch;
  console.log(Globalstate);

  return (
    <div className="menu">
      {data.map((item, index) => {
        item.quantity = 1;
        return (
          <div className="card-food" key={index}>
            <img src={item.image} alt="" />
            <p>{item.title}</p>
            <h3>$. {item.price}</h3>
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
