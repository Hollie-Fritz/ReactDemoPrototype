import React from "react";
import { useEffect } from "react";
import { Auth } from "aws-amplify";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function PopUp() {
  var ws;

  useEffect(() => {
    async function setup() {
      try {
        let nameJson = await Auth.currentUserInfo();
        let userId = nameJson["username"];
        console.log("logged in");
        // eslint-disable-next-line
        if (!ws) {
          ws = new WebSocket(
            `wss://odxljrpppb.execute-api.us-west-2.amazonaws.com/prod/?userId=` +
              userId
          );
          ws.onmessage = function (evt) {
            let message = JSON.parse(evt.data);
            // addMessageToList(message);
            console.log(message + " is message data");
            console.log("you have a new customer: " + message["customerName"]);
            if (message["updateType"] === "Order") {
              toast(
                "You have a new order from " + message["customerName"] + "!"
              );
            } else if (message["updateType"] === "Progress") {
              toast(
                "Your order from " +
                  message["restaurantName"] +
                  " has a new update!"
              );
            }
          };
        }
      } catch {
        console.log("no user");
        if (ws) {
          ws.close();
          ws = null;
        }
      }
    }
    setup();
  }, []);

  return (
    <>
      <div>
        <ToastContainer />
      </div>
    </>
  );
}

export default PopUp;
