import React from "react";
import { Hub } from 'aws-amplify';
import { useState, useEffect } from 'react';
import { Auth } from "aws-amplify";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
function PopUp(){
    let counter = 0;
    // const dispatch = useDispatch();
    var ws;

    useEffect(() => {
        async function setup(){
        try{
            let nameJson = await Auth.currentUserInfo();
            let userId = nameJson["username"];
            console.log("logged in");
            // eslint-disable-next-line
            if(!ws){
                ws = new WebSocket(`wss://odxljrpppb.execute-api.us-west-2.amazonaws.com/prod/?userId=`+ userId)
                ws.onmessage = function (evt) {
                    let message = JSON.parse(evt.data);
                    // addMessageToList(message);
                    console.log(message + " is message data");
                    console.log("you have a new customer: " + message["customerName"])
                    toast("You have a new order from " + message["customerName"] + "!")
                };
            }
        }catch{
            console.log("no user");
            if(ws){
                ws.close();
                ws = null;
            }

        }
      }
      setup();
      async function handle(data) {
        switch (data.payload.event) {
        case 'signIn':
            console.log('user signed in');
            if(!ws){
                ws = new WebSocket(`wss://odxljrpppb.execute-api.us-west-2.amazonaws.com/prod/?userId=`+ data.payload.data.username)
                ws.onmessage = function (evt) {
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
            if(ws){
                ws.close();
                ws=null;
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
    console.log(ws + " is ws");
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


// const mapStateToProps = state => {  
//     return {
//         ws: state.data  //this depends on the reducer you have, if you have only one reducer, then you do state.numOfCakes
//         //if you have two reducers, you do state.reducerKey.value
//     }
// }
// const mapDispatchToProps = dispatch => {
//     return {
//         buyCake: (WebSocket) => dispatch(buyCake(WebSocket))
//         //buyCake: number => dispatch(buyCake(number))
//     }
// }
// export default connect(mapStateToProps, mapDispatchToProps)(PopUp)

export default PopUp;

    //   async function setup(){
    //     try{
    //         let nameJson = await Auth.currentUserInfo();
    //         let userId = nameJson["username"];
    //         console.log("logged in");
    //         ws.current = new WebSocket(`wss://odxljrpppb.execute-api.us-west-2.amazonaws.com/prod/?userId=`+ userId)
    //         ws.current.onmessage = function (evt) {
    //             let message = JSON.parse(evt.data);
    //             // addMessageToList(message);
    //             console.log(message + " is message data");
    //             setCustomerName(message["customerName"]);
    //             console.log("you have a new customer: " + message["customerName"])
    //         };
    //     }catch{
    //         console.log("no user");
    //         ws.current=null;
    //     }
    //   }
    //   setup();