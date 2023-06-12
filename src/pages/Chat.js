import NavBarHome from "../components/NavBarHome";
import { useParams, useLocation, useNavigate  } from "react-router-dom";
import React, { useEffect, useState, useRef } from "react";
// import { Auth } from "aws-amplify";
import { useAuthenticator } from "@aws-amplify/ui-react";
import { Button, Container, Row, Col, Form, Card, ListGroup } from "react-bootstrap";

import "./Chat.css"; // Import the custom CSS file

function Chat() {
    const params = useParams();
    const [currentUserId, setCurrentUserId] = useState(null);
    const [messages, setMessages] = useState([]);
    const [listChat, setListChat] = useState([]);
    const [ws, setWs] = useState(null);
    const messageInput = useRef(null);
    const url = "wss://0vj4h7i94b.execute-api.us-west-2.amazonaws.com/prod";
    const navigate = useNavigate();
    const location = useLocation();
    const messageContainer = useRef(null);

    const { user } = useAuthenticator((context) => [
      context.user, 
    ]);

  useEffect(() => {
      if (messageContainer.current) {
        messageContainer.current.scrollIntoView({ behavior: "smooth" });
      }
    }, [messages]);

  useEffect(() => {
    async function get() {
      // const nameJson = await Auth.currentUserInfo();
      // const name = nameJson["username"];
      let name = user.getUsername();
      setCurrentUserId(name);
    }
    get();
  }, [user]);

  useEffect(() => {
    if (currentUserId) {
      getChatUsers();
    }
    console.log("here we go");
    console.log("list user chat is" + listChat);
  }, [currentUserId, navigate]);

  useEffect(() => {
    initWebSocket();
  }, [params]);

  async function getChatUsers() {
    console.log(currentUserId);
    await fetch(
      `https://6b2uk8oqk7.execute-api.us-west-2.amazonaws.com/prod/getChatUsers/${currentUserId}`,
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
        setListChat((prev) => []);
        if (data.length !== 0) {
          for (const val of data) {
            console.log(val);
            setListChat((prev) => [...prev, val]);
          }
        }
      });
  }

  function initWebSocket() {
    if (ws) {
      ws.close();
    }
    clearMessageList();
    const newWs = new WebSocket(
      url + "?userId=" + params["userId"] + "&toUserId=" + params["toUserId"]
    );
    setWs(newWs); // set the new WebSocket object as ws
    initWebSocketsEvents(newWs); // pass the new WebSocket object as an argument
    console.log("successfully connected");
  }

  function initWebSocketsEvents(ws) {
    // ws.onopen = function () {};

    ws.onmessage = function (evt) {
      let data = JSON.parse(evt.data);
      let message = {
        user: data.sentBy,
        text: data.text,
        timestamp: new Date(data.time * 1000).toLocaleString(),
        isDateMarker: false // <-- Added this property for each message
      };
      addMessageToList(message);
    };

    ws.onclose = function () {};

    ws.onerror = function (error) {
      console.error(error);
    };
  }

  function sendMessage() {
    let message = messageInput.current.value;
    if (message.trim() && ws) {
      ws.send(JSON.stringify({ action: "onmessage", message }));
    }
    messageInput.current.value = "";
  }

  function addMessageToList(message) {
     // Get the last message in the list
  const lastMessage = messages[messages.length - 1];

  // If this is the first message of the day, add a date marker before it
  // if (!lastMessage || !isSameDay(new Date(message.timestamp), new Date(lastMessage.timestamp))) {
  //   setMessages(prevMessages => [...prevMessages, { isDateMarker: true, date: new Date(message.timestamp).toLocaleDateString() }]);
  // }

  // Then add the message itself
  setMessages(prevMessages => [...prevMessages, message]);

  }

  // function isSameDay(date1, date2) {
  //   return date1.getFullYear() === date2.getFullYear() &&
  //          date1.getMonth() === date2.getMonth() &&
  //          date1.getDate() === date2.getDate();
  // }

  function clearMessageList() {
    setMessages([]);
  }

  return (
    <>
      <NavBarHome />
      <Container fluid>
        <Row>
          <Col md={4} id="ws-container">
            <h4>Users:</h4>
            <ListGroup>
            {
              listChat.map((user, index) => {
                return (
                  <ListGroup.Item action variant="light" key={index} block onClick={()=>{
                      navigate(`/chat/${currentUserId}/${user["id"]}`, 
                      {
                        state: {
                          name: user["name"]? user["name"]:user["id"],
                        }
                      }
                      )
                  }}>
                    {user["name"]? user["name"]: user["id"]}
                  </ListGroup.Item>
                );
              })
            }
            </ListGroup>
          </Col>

          <Col md={8}>
            <h4>Talking to {location.state? location.state.name:params["toUserId"]}</h4>
            <hr/>
            <Card className="conversation-box">
              <Card.Body ref={messageContainer}>
                {messages.map((message, index) => {
                  console.log(JSON.stringify(messages));

                  //Date marker rendering
                  let dateMarker = null;
                  if (index === 0 || new Date(messages[index - 1].timestamp).toDateString() !== new Date(message.timestamp).toDateString()) {
                    // If this is the first message or the date of this message is different from the previous one, render the date in a centered position
                    dateMarker = (
                      <div key={"dateMarker-" + index} className="date-marker">
                        {new Date(message.timestamp).toLocaleDateString('en-US', { month: 'long', day: 'numeric' })}
                      </div>
                    );
                  }

                // Normal message rendering
                const isCurrentUserMessage = message.user === currentUserId;
                const messageAlignment = isCurrentUserMessage ? "message-right" : "message-left";

                const messageElement = (
                  <div
                    key={index}
                    className={`message-item ${messageAlignment}`}
                  >
                    <div className="message-content">
                      <div className="message-text">{message.text}</div>
                    </div>
                    <div className={`message-timestamp ${messageAlignment}`}>
                      {new Date(message.timestamp).toLocaleTimeString('en-US')}
                    </div>
                  </div>
                );

                  return (
                    <React.Fragment key={index}>
                      {dateMarker}
                      {messageElement}
                    </React.Fragment>
                    );
                })}
              </Card.Body>
            </Card>
            <br />
              <Form inline onSubmit={(event) =>{
                  event.preventDefault()
                  sendMessage();
                }}>
                <Form.Control
                  ref={messageInput}
                  type="text"
                  placeholder="Message"
                  className="mr-sm-2"
                />
                <Button
                  variant="outline-success"
                  onClick={() => sendMessage()}
                >
                  Send message
                </Button>
              </Form>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Chat;
