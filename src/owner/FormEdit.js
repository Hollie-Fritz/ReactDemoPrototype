import React, { useState, useEffect } from "react";
import InfoEdit from "./InfoEdit";
import MenuEdit from "./MenuEdit";
import ReviewEdit from "./ReviewEdit";
import { Button, FormControl } from "react-bootstrap";
import Auth from "@aws-amplify/auth";
import NavBarHome from "../components/NavBarHome";
import { useNavigate } from "react-router-dom";
import "./Form.module.css";

//Source video: https://www.youtube.com/watch?v=wOxP4k9f5rk
//This file is a container for all the steps of the restaurant owner webpage creator form
function FormEdit() {
  //page keeps track of which step we are on
  //will mutate the variable setPage
  //useState(0) = ResInfo
  const navigate = useNavigate();

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
    operatingHours: {
      openHours: {
        Monday: "Closed",
        Tuesday: "Closed",
        Wednesday: "Closed",
        Thursday: "Closed",
        Friday: "Closed",
        Saturday: "Closed",
        Sunday: "Closed",
      },
      closeHours: {
        Monday: "Closed",
        Tuesday: "Closed",
        Wednesday: "Closed",
        Thursday: "Closed",
        Friday: "Closed",
        Saturday: "Closed",
        Sunday: "Closed",
      },
    },
    // openhours: "",
    // closehours: "",
    mainImageUrl: "",
    template: "",
    averageRating: -1,
  });

  //state object that contains all the fields for ResMenu
  const [menuItems, setMenuItems] = useState([
    {
      menuItem: "",
      menuPrice: "",
      menuDesc: "",
      menuType: "",
      menuImageUrl: "",
    },
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
        foodImageUrl: menuItems[i]["menuImageUrl"],
      };
    }

    //data to be sent in the format of our DynamoDB table
    const data = {
      Food: newMenu,
      phone: formatPhoneNumber(formData.phoneNo),
      address1: formData.address1,
      address2: formData.address2,
      city: formData.city,
      state: formData.usstate,
      zipCode: formData.zip,
      cuisine: formData.resCuisine,
      userId: name,
      name: formData.resName,
      operatingHours: formData.operatingHours,
      mainImageUrl: formData.mainImageUrl,
      template: formData.template,
      averageRating: formData.averageRating,
    };

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
        const submitOrNextButton = document.querySelector("#submitOrNext");
        submitOrNextButton.innerHTML = "Success!";
        console.log(data);
        navigate("/owner");
      });
  };

  // eslint-disable-next-line
  useEffect(() => {
    var temp = [];

    const getData = async () => {
      let nameJson = await Auth.currentUserInfo();
      let username = nameJson["username"];

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
          console.log("data is below");
          console.log(data);
          if (data.length !== 0) {
            setFormData({
              resName: data[0]["name"],
              phoneNo: data[0]["phone"],
              resCuisine: data[0]["cuisine"],
              address1: data[0]["address1"],
              address2: data[0]["address2"],
              city: data[0]["city"],
              usstate: data[0]["state"],
              zip: data[0]["zipCode"],
              operatingHours: data[0]["operatingHours"],
              mainImageUrl: data[0]["mainImageUrl"],
              template: data[0]["template"],
              averageRating: data[0]["averageRating"],
            });
            data[0]["Food"].forEach((current) => {
              console.log(current["foodName"] + " is foodName");
              temp.push({
                menuItem: current["foodName"],
                menuType: current["foodType"],
                menuPrice: current["foodPrice"],
                menuDesc: current["foodDesc"],
                menuImageUrl: current["foodImageUrl"],
              });
            });
            console.log("menuItems below");
            setMenuItems(temp);
            console.log(JSON.stringify(menuItems));
          }
        });
    };
    getData();
    // eslint-disable-next-line
  }, []);

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
      return <InfoEdit formData={formData} setFormData={setFormData} />;
    } else if (page === 1) {
      return (
        //keep the menu items persistent when navigating away from page
        <MenuEdit menuItems={menuItems} setMenuItems={setMenuItems} />
      );
    } else {
      return <ReviewEdit formData={formData} menuItems={menuItems} />;
    }
  };

  function formatPhoneNumber(phoneNumberString) {
    var cleaned = ("" + phoneNumberString).replace(/\D/g, "");
    if (cleaned == null || phoneNumberString.length < 10) return "";

    var match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
    if (match != null && match.length >= 3) {
      return "(" + match[1] + ") " + match[2] + "-" + match[3];
    }
    return "";
  }

  return (
    <div className="createform">
      <NavBarHome />
      {/* displays the FormTitles based on which page we are on */}
      <h1>{FormTitles[page]}</h1>

      <div className="body">{PageDisplay()}</div>
      <center>
        <Button
          // previous button disabled if on page 0
          disabled={page === 0}
          onClick={() => {
            // enables prev button to work by decrementing
            setPage((currPage) => currPage - 1);
          }}
        >
          Prev
        </Button>{" "}
        <Button
          id="submitOrNext"
          onClick={() => {
            const FormControl = document.querySelectorAll('[id*="validation"]');
            if (page === FormTitles.length - 1) {
              //logs the data
              console.log(formData);
              console.log(menuItems);
              //sends the data to DynamoDB by invoking userAction();
              userAction();
            } else {
              let isValid = true;

              // force validity to go in descending order instead of ascending order
              for (let index = FormControl.length - 1; index >= 0; index--) {
                if (!FormControl[index].checkValidity()) {
                  isValid = false;
                  FormControl[index].reportValidity();
                }
              }
              if (isValid) {
                // enables next button to work by incrementing
                setPage((currPage) => currPage + 1);
              }
            }
          }}
        >
          {/* Conditionally render the button to display submit
        on the last page and next on all other pages */}
          {page === FormTitles.length - 1 ? "Submit" : "Next"}
        </Button>{" "}
        {page === FormTitles.length - 1 ? (
          <>
            <br></br>
            <Button variant="success" className="m-1" href="./owner">
              Go Back to Options
            </Button>
          </>
        ) : (
          ""
        )}
      </center>
    </div>
  );
}

export default FormEdit;
