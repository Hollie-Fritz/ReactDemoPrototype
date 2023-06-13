import React from "react";
import { useEffect } from "react";
// import { Auth } from "aws-amplify";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { Hub } from "aws-amplify";
import { useAuthenticator } from "@aws-amplify/ui-react";
import { useNavigate, useLocation } from "react-router";

function PopUp(){
  const { user } = useAuthenticator((context) => [
    context.user, 
  ]);
  const navigate = useNavigate();
  const location = useLocation();

    // const dispatch = useDispatch();
  var ws = null;

  useEffect(() => {
    console.log("rerendering popup");

    Hub.listen('auth', (data) => {
      switch (data.payload.event) {
        case 'signIn':
            window.location.reload();
            console.log('user signed in');
            break;
        case 'signUp':
            // window.location.reload();
            console.log('user signed up');
            break;
        case 'signOut':
            window.location.reload();
            console.log('user signed out');
            break;
        case 'signIn_failure':
            // window.location.reload();
            console.log('user sign in failed');
            break;
        case 'configured':
            // window.location.reload();
            console.log('the Auth module is configured');
            break;
        default:
            console.log("nothing happened");
          break;
      }
    });

    async function setup() {
      // console.log(user.getUsername() + " is username");
      // try {
        // let nameJson = await Auth.currentUserInfo();
        // let userId = nameJson["username"];
        // if(!user)console.log("no user");
        var userId = user.getUsername();
          if (!ws) {
            // eslint-disable-next-line
            ws = new WebSocket(
              `wss://odxljrpppb.execute-api.us-west-2.amazonaws.com/prod/?userId=` +
              userId
            );
            console.log("logged in with and established with " + userId);
            console.log("established connection");
              ws.onmessage = function (evt) {
                let message = JSON.parse(evt.data);
                // addMessageToList(message);
                console.log(message + " is message data");
                console.log("you have a new customer: " + message["customerName"]);                
                if (message["updateType"] === "Order") {
                  toast(
                    <div onClick ={() => navigate("/orders")}>You have a new order from {message["customerName"]}!</div>
                  );
                } else if (message["updateType"] === "Progress") {
                  toast(
                    <div onClick ={() => navigate("/orderStatus")}>Your order from {message["customerName"]} has a new update!</div>
                  );
                } else if (message["updateType"] === "Message" && location.pathname !== `/chat/${user.getUsername()}/${message["sentBy"]}`) {
                  toast(
                    <div onClick ={() => navigate(`chat/${user.getUsername()}/${message["sentBy"]}`)}>From {message["sentBy"]}: {message["message"]}</div>
                  );
                }
              };
              ws.onclose = function (evt){
                console.log('Socket is closed. Reconnect will be attempted in 1 second.', evt.reason);
                setTimeout(function() {
                  setup();
                }, 1000);
              }
          }
      //  } catch (err){
      //   console.log(err);
      //   console.log("no user");
      //     if (ws) {
      //       ws.close();
      //         ws = null;
      //     }
      //     }
      }
        setup();
  }, [user]);

  return (
    <>
      <div>
        <ToastContainer />
      </div>
    </>
  );
}

export default PopUp;
