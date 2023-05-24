import React from "react";
import { useEffect } from "react";
import { Auth } from "aws-amplify";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { Hub } from "aws-amplify";
function PopUp(){

    // const dispatch = useDispatch();
    const ws = null;

  useEffect(() => {
    console.log("rerendering popup");

    Hub.listen('auth', (data) => {
      switch (data.payload.event) {
        case 'signIn':
            window.location.reload();
            console.log('user signed in');
            break;
        case 'signUp':
            window.location.reload();
            console.log('user signed up');
            break;
        case 'signOut':
            window.location.reload();
            console.log('user signed out');
            break;
        case 'signIn_failure':
            window.location.reload();
            console.log('user sign in failed');
            break;
        case 'configured':
            window.location.reload();
            console.log('the Auth module is configured');
            break;
        default:
            console.log("nothing happened");
          break;
      }
    });

    async function setup() {
      try {
        let nameJson = await Auth.currentUserInfo();
        let userId = nameJson["username"];
          if (!ws) {
            // eslint-disable-next-line
            ws = new WebSocket(
              `wss://odxljrpppb.execute-api.us-west-2.amazonaws.com/prod/?userId=` +
                userId
            );
            console.log("logged in with and established with " + userId);
              ws.onmessage = function (evt) {
                let message = JSON.parse(evt.data);
                // addMessageToList(message);
                console.log(message + " is message data");
                console.log("you have a new customer: " + message["customerName"]);                if (message["updateType"] === "Order") {
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
              ws.onclose = function (evt){
                ws = null;
                console.log('Socket is closed. Reconnect will be attempted in 1 second.', evt.reason);
                setTimeout(function() {
                  setup();
                }, 1000);
              }
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
