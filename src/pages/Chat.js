import React from "react";
import NavBarHome from "../components/NavBarHome";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";

function Chat() {
    const params = useParams();
    const [messages, setMessages] = useState([]);

    let ws;
    let connected = false;
    let statusElement = document.querySelector('#status');
    let messageInput = document.querySelector('#message');
    const url = "wss://0vj4h7i94b.execute-api.us-west-2.amazonaws.com/prod";

    useEffect(() => {
        initWebSocket();
        console.log("here we go")
    },[])

    function initWebSocket() {
        if(ws){
            ws.close();
        }
        clearMessageList();
        ws = null;
        setStatus('Connecting...');
        ws = new WebSocket(url+"?userId="+ params["userId"] + "&toUserId=" + params["toUserId"]);
        initWebSocketsEvents();
        console.log("successfully connected");
    }

    function initWebSocketsEvents() {
        ws.onopen = function () {
            setStatus('Connection is opened (connected...)');
            connected = true;
        };

        ws.onmessage = function (evt) {
            let message = evt.data;
            addMessageToList(message);
            console.log("message is" +message);
        };

        ws.onclose = function () {
            connected = false;
            setStatus('Connection is closed...');
        };

        ws.onerror = function (error) {
            console.error(error);
            setStatus('Error occurred, check the console!');
        };
    }

    function setStatus(status) {
        if(statusElement){
            statusElement.textContent = status;
        }
    }

    function sendMessage() {
        let message = messageInput.value;
        if (message.trim()) {
            ws.send(JSON.stringify({action: 'onmessage', message}));
        }
    }

    function addMessageToList(message) {
        let result = JSON.parse(JSON.stringify(messages));
        console.log("messages is" + JSON.stringify(messages));
        result = [...result, message]
        setMessages(result);
    }

    function clearMessageList(){
        setMessages([]);
    }

    return (
        <>
            <NavBarHome />
            <div id="ws-container">
                <br />
                <h1>Testing AWS API Gateway WebSockets</h1>
                <input type="text" size="50" id="wsUrl" placeholder="WebSocket server address" />
                <button onClick={() => initWebSocket()}>Connect to WebSocket server</button>
                <hr />
                Status: <span id="status" textContent="Not Initialized"></span>
                <hr />
                <input type="text" size="50" id="message" placeholder="Message" />
                <button onClick={() => sendMessage()}>Send message</button>
                <div id="messageList" style={{border: "1px solid #C0C0C0", marginTop: "10px", padding: "10px"}} innerHTML="">
                    List is Empty
                </div>
                {
                    messages.map((message, index)=>{
                        console.log(messages)
                        return(<div>{message}</div>)
                    })
                }
            </div>
        </>
    );
}

export default Chat;





/*
function Chat() {
    const { userId } = useParams();
    const { toUserId } = useParams();
    const [ status, setStatus ] = useState('Not Initialized');
    const [ messages, setMessages ] = useState([]);

    let ws;
    let connected = false;
    let messageInput = document.querySelector('#message');
    const url = "wss://0vj4h7i94b.execute-api.us-west-2.amazonaws.com/prod";

    useEffect(() => {
        initWebSocket();
    },[])

    function initWebSocket() {
        if(ws){
            ws.close();
        }
        clearMessageList();
        ws = null;
        setStatus('Connecting...');
        ws = new WebSocket(url+"?userId="+ userId + "&toUserId=" + toUserId);
        initWebSocketsEvents();
        console.log("successfully connected");
    }

    function initWebSocketsEvents() {
        ws.onopen = function () {
            setStatus('Connection is opened (connected...)');
            connected = true;
        };

        ws.onmessage = function (evt) {
            let message = evt.data;
            addMessageToList(message);
        };

        ws.onclose = function () {
            connected = false;
            setStatus('Connection is closed...');
        };

        ws.onerror = function (error) {
            console.error(error);
            setStatus('Error occurred, check the console!');
        };
    }

    function sendMessage() {
        if (connected) {
            let message = messageInput.value;
            if (message.trim()) {
                ws.send(JSON.stringify({action: 'onmessage', message}));
            }
        }
    }

    function addMessageToList(message) {
        let result = messages;
        result.push(message);
        setMessages(result);
    }

    function clearMessageList(){
        setMessages([]);
    }

    return (
        <>
        <NavBarHome />
        <div id="ws-container">
            <br />
            <h1>Testing AWS API Gateway WebSockets</h1>
            <button onClick={()=> initWebSocket()}>Connect to WebSocket server</button>
            <hr/>
            Status: <span>{status}</span>
            <hr/>
            <input type="text" size="50" id="message" placeholder="Message"/>
            <button onClick={()=> sendMessage()}>Send message</button>
            {  
                messages.map((message) => { 
                    console.log(message);
                    return (<div>{message}</div>);
                }
                )
            }
        </div>

        </>
    );
}

*/