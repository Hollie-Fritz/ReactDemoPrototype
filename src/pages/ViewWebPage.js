import React from "react";
import { useState, useEffect, useRef, useCallback } from "react"; // prettier-ignore
import { useParams } from "react-router-dom";
import NavBarHome from "../components/NavBarHome";
import Template1 from "./Templates/Template1";
import Template2 from "./Templates/Template2";
import Template3 from "./Templates/Template3";
import Template4 from "./Templates/Template4";

export function ViewWebPage() {
  // variables to be shared across all the templates
  const { id } = useParams();
  const [resdata, setresdata] = useState({});
  const [fooddata, setfooddata] = useState([]);
  const [cart, setcart] = useState({});
  const [showCart, setShowCart] = useState(false);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [showViewReviewForm, setShowViewReviewForm] = useState(false);
  const [reviews, setReviews] = useState([]);
  const [address, setAddress] = useState("");
  const [averageRating, setAverageRating] = useState(0);


  // write reviews handlers
  const handleWriteReviewClick = (event) => {
    event.stopPropagation();
    setShowReviewForm(true);
  };

  const handleReviewFormClose = () => {
    setShowReviewForm(false);
  };

  // view reviews handlers
  const handleShowReviewClick = () => {
    setShowViewReviewForm(true);
  };

  const handleViewReviewFormClose = () => {
    setShowViewReviewForm(false);
  };

  // reference for iframe
  const frameRef = useRef(null);
  // function to update the iframe location for Google Maps
  const updateiframeLocation = useCallback(() => {
    if (frameRef.current) {
      frameRef.current.contentWindow.location.replace(
        `https://maps.google.com/maps?q=${address.replace(
          " ",
          "%20"
        )}&t=k&z=17&ie=UTF8&iwloc=&output=embed`
      );
    }
  }, [address]);

  // fetch reviews and update the Google Maps iframe location
  useEffect(() => {
    const fetchAverageRating = async () => {
      let url = `https://6b2uk8oqk7.execute-api.us-west-2.amazonaws.com/prod/review?userId=${id}`;
      const response = await fetch(url);
      const data = await response.json();
      setReviews(data);
    };
    fetchAverageRating();
    console.log(resdata["name"] + " is name");

    updateiframeLocation();
  }, [id, resdata, updateiframeLocation]);

  // view and close cart
  const handleShowCart = () => {
    setShowCart(true);
  };
  const handleShowCartClose = () => {
    setShowCart(false);
  };

  // fetch restaurant data and update the state
  useEffect(() => {
    let username = id;
    async function userAction() {
      await fetch(
        `https://6b2uk8oqk7.execute-api.us-west-2.amazonaws.com/prod/restaurantById?id=${username}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
        //check if data was correctly sent in console log
        .then((response) => response.json())
        .then((data) => {
          if (data.length !== 0) {
            setAverageRating(data[0]["averageRating"]);
            setresdata(data[0]);
            setfooddata(data[0]["Food"]);
            setAddress(
              data[0]["address1"] +
                " " +
                data[0]["address2"] +
                " " +
                data[0]["city"] +
                " " +
                data[0]["state"] +
                " " +
                data[0]["zipCode"]
            );
          }
          // console.log("data is below");
          // console.log(JSON.stringify(data));
        });
        console.log(JSON.stringify(averageRating))

    }
    userAction();
  }, [id]);

  // url for restaurant's main image (banner image)
  const bucketUrl =
    "https://d12zok1slvqtin.cloudfront.net/fit-in/1250x200/" +
    resdata["mainImageUrl"];

  // object to hold all the variables and handlers
  const webPageVars = {
    resdata,
    fooddata,
    cart,
    setcart,
    showCart,
    showReviewForm,
    showViewReviewForm,
    reviews,
    handleWriteReviewClick,
    handleShowReviewClick,
    handleReviewFormClose,
    handleViewReviewFormClose,
    handleShowCart,
    handleShowCartClose,
    bucketUrl,
    id,
    frameRef,
    averageRating,
  };

  // return the WebPageContext.Provider component with the object of all the variables and handlers
  // so that all the templates will have access to it

  function handleTemplate(resdata){
      //resdata["template"] is what value is stored in dynamodb
      switch(resdata["template"]) {
        case "template1":
            return <> <NavBarHome/> <Template1 data={webPageVars} /> </>

        case "template2":
          return <> <NavBarHome/> <Template2 data={webPageVars} /> </>

        case "template3":
          return <> <NavBarHome/> <Template3 data={webPageVars} /> </>

        case "template4":
          return <> <NavBarHome/> <Template4 data={webPageVars} /> </>

        default:
          return "";
      }
  }

  return (
    <>
    {handleTemplate(resdata)}
    </>
  );
}

export default ViewWebPage;