import NavBarHome from "../components/NavBarHome";
import { useParams } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import { Auth } from "aws-amplify";
import { Button, Container, Row, Col, Form, Card } from "react-bootstrap";
import "./Chat.css"; // Import the custom CSS file

function Chat() {
  const params = useParams();
  const [currentUserId, setCurrentUserId] = useState(null);
  const [messages, setMessages] = useState([]);
  const [listChat, setListChat] = useState([]);
  const [ws, setWs] = useState(null);
  const messageInput = useRef(null);
  const url = "wss://0vj4h7i94b.execute-api.us-west-2.amazonaws.com/prod";

  useEffect(() => {
    async function get() {
      const nameJson = await Auth.currentUserInfo();
      const name = nameJson["username"];
      setCurrentUserId(name);
    }
    get();
  }, []);

  useEffect(() => {
    if (currentUserId) {
      getChatUsers();
    }
    console.log("here we go");
    console.log("list user chat is" + listChat);
  }, [currentUserId]);

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
      .then((response) => response.json())
      .then((data) => {
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
    setWs(newWs);
    initWebSocketsEvents(newWs);
    console.log("successfully connected");
  }

  function initWebSocketsEvents(ws) {
    ws.onopen = function () {};

    ws.onmessage = function (evt) {
      let data = JSON.parse(evt.data);
      let message = {
        user: data.sentBy,
        text: data.text,
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
      // Clear the input field
      messageInput.current.value = "";
    }
  }
  
  function addMessageToList(message) {
    setMessages((prevMessages) => [...prevMessages, message]);
  }

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
            {listChat.map((user, index) => {
              return (
                <Button variant="light" key={index} block>
                  {user}
                </Button>
              );
            })}
          </Col>
          <Col md={8}>
            <h4>Talking to {params["toUserId"]}</h4>
            <hr />
            <Card className="conversation-box">
              <Card.Body>
                {messages.map((message, index) => {
                  const isCurrentUserMessage =
                    message.user === currentUserId;
                  const messageAlignment = isCurrentUserMessage
                    ? "message-right"
                    : "message-left";
  
                  return (
                    <div
                      key={index}
                      className={`message-item ${messageAlignment}`}
                    >
                      <div className="message-content">
                        <div className="message-text">{message.text}</div>
                      </div>
                    </div>
                  );
                })}
              </Card.Body>
            </Card>
            <br />
            <Form>
              <Row>
                <Col md={9}>
                  <Form.Control
                    ref={messageInput}
                    type="text"
                    placeholder="Message"
                    className="mr-sm-2"
                  />
                </Col>
                <Col md={3}>
                  <Button
                    variant="outline-success"
                    onClick={() => sendMessage()}
                    block
                  >
                    Send message
                  </Button>
                </Col>
              </Row>
            </Form>
          </Col>
        </Row>
      </Container>
    </>
  ); //close return

} //close function

export default Chat;
