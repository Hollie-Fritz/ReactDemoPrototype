import React from "react";
import { Hub } from 'aws-amplify';
import { useEffect, useRef } from 'react';
import { Auth } from "aws-amplify";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
function PopUp(){

    // const dispatch = useDispatch();
    const ws = useRef(null);;

    useEffect(() => {
        let counter = 0;
        async function setup(){
        try{
            let nameJson = await Auth.currentUserInfo();
            let userId = nameJson["username"];
            console.log("logged in");
            // eslint-disable-next-line
            if (!ws.current) {
                ws.current = new WebSocket(`wss://odxljrpppb.execute-api.us-west-2.amazonaws.com/prod/?userId=` + userId);
                ws.current.onmessage = function (evt) {
                    let message = JSON.parse(evt.data);
                    // addMessageToList(message);
                    console.log(message + " is message data");
                    console.log("you have a new customer: " + message["customerName"])
                    toast("You have a new order from " + message["customerName"] + "!")
                };
            }
        }catch{
            console.log("no user");
            if (ws.current) {
                ws.current.close();
                ws.current = null;
            }

        }
      }
      setup();
      async function handle(data) {
        switch (data.payload.event) {
        case 'signIn':
            console.log('user signed in');
            if(!ws.current){
                ws.current = new WebSocket(`wss://odxljrpppb.execute-api.us-west-2.amazonaws.com/prod/?userId=`+ data.payload.data.username)
                ws.current.onmessage = function (evt) {
                    let message = JSON.parse(evt.data);
                    // addMessageToList(message);
                    console.log(message + " is message data");
                    console.log("you have a new customer: " + message["customerName"])
                    toast("You have a new order from " + message["customerName"] + "!")
                };
            }
            break;
        case 'signUp':
            console.log('user signed up');
            break;
        case 'signOut':
            console.log('user signed out');
            if(ws.current){
                ws.current.close();
                ws.current=null;
            }
            break;
        case 'signIn_failure':
            console.log('user sign in failed');
            break;
        case 'configured':
            console.log('the Auth module is configured');
            break;
        default:
            console.log('default case');
            break;
        }
    };
    const handleListen = Hub.listen('auth', handle);
    counter++;
    console.log("this should only run once"+ counter);
    console.log(ws.current + " is ws");
    return () => { handleListen() }
    }, []);

    return (
      <>  
      <div>
        <ToastContainer/>
      </div>
      </>
    );
};

export default PopUp;