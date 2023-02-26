import React, { useState } from "react";
import PersistResInfo from "./PersistResInfo";
import PersistResMenu from "./PersistResMenu";
import PersistResReview from "./PersistResReview";
import { Button } from "react-bootstrap";
import Auth from "@aws-amplify/auth";

//Source video: https://www.youtube.com/watch?v=wOxP4k9f5rk
//This file is a container for all the steps of the restaurant owner webpage creator form
function PersistResForm() {
  //page keeps track of which step we are on
  //will mutate the variable setPage
  //useState(0) = ResInfo
  const [page, setPage] = useState(0);
  //state object that contains all the different fields for ResInfo
  const [formData, setFormData] = useState({
    resName: "",
    phoneNo: "",
    resCuisine: "",
    address1: "",
    address2: "",
    city: "",
    usstate: "",
    zip: "",
    openhours: "",
    closehours: "",
  });

  //state object that contains all the fields for ResMenu
  const [menuItems, setMenuItems] = useState([
    { menuItem: "", menuPrice: "", menuDesc: "", menuType: "" },
  ]);

  const userAction = async () => {
    let nameJson = await Auth.currentUserInfo();
    let name = nameJson["username"];
    console.log(JSON.stringify(nameJson));

    const newMenu = [];

    //fix required, need to get on same page about data
    //then edit this to reflect our final data
    for (let i = 0; i < menuItems.length; i++) {
      newMenu[i] = {
        foodId: menuItems[i]["menuItem"],
        foodName: menuItems[i]["menuItem"],
        foodType: menuItems[i]["menuType"],
        foodPrice: menuItems[i]["menuPrice"],
        foodDesc: menuItems[i]["menuDesc"],
      };
    }

    //data to be sent in the format of our DynamoDB table
    const data = {
      Food: newMenu,
      phone: formData.phoneNo,
      address1: formData.address1,
      address2: formData.address2,
      city: formData.city,
      state: formData.usstate,
      zipCode: formData.zip,
      cuisine: formData.resCuisine,
      userId: name,
      name: formData.resName,
      openHours: formData.openhours,
      closeHours: formData.closehours,
    };

    // "resImageUrl": "null",
    // "searchTerm": "mike MIKE MIKES mikes mike's",

    console.log("submitting, json listed below");
    console.log(JSON.stringify(data));

    await fetch(
      "https://6b2uk8oqk7.execute-api.us-west-2.amazonaws.com/prod/restaurant",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    )
      //check if data was correctly sent in console log
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      });
  };

  //titles that appear at the top left of the form
  const FormTitles = [
    "Restaurant Information",
    "Restaurant Menu",
    "Review Restaurant Information:",
  ];

  //check which page you are in
  //return a component based on which page we are in ex: ResInfo or ResMenu
  //formData prop will keep the form persisting throughout
  const PageDisplay = () => {
    if (page === 0) {
      // keep restauraunt info persistent even when navigating to a new page
      return <PersistResInfo formData={formData} setFormData={setFormData} />;
    } else if (page === 1) {
      return (
        //keep the menu items persistent when navigating away from page
        <PersistResMenu menuItems={menuItems} setMenuItems={setMenuItems} />
      );
    } else {
      return <PersistResReview formData={formData} menuItems={menuItems} />;
    }
  };

  return (
    <div className="form">
      {/* displays the FormTitles based on which page we are on */}
      <h1>{FormTitles[page]}</h1>

      <div className="body">{PageDisplay()}</div>

      <Button
        // previous button disabled if on page 0
        disabled={page === 0}
        onClick={() => {
          // enables prev button to work by decrementing
          setPage((currPage) => currPage - 1);
        }}
      >
        Prev
      </Button>
      <Button
        onClick={() => {
          if (page === FormTitles.length - 1) {
            //logs the data
            console.log(formData);
            console.log(menuItems);
            //sends the data to DynamoDB by invoking userAction();
            userAction();
          } else {
            // enables next button to work by incrementing
            setPage((currPage) => currPage + 1);
          }
        }}
      >
        {/* Conditionally render the button to display submit
        on the last page and next on all other pages */}
        {page === FormTitles.length - 1 ? "Submit" : "Next"}
      </Button>
      {page === FormTitles.length - 1 ? (
        <Button variant="success" className="m-1" href="./owner">
          Go Back to Options
        </Button>
      ) : (
        ""
      )}
    </div>
  );
}

export default PersistResForm;
