import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import { Button, Stack, Container } from "react-bootstrap";
import { useState, useEffect } from "react";
import Auth from "@aws-amplify/auth";
import NavBarHome from "./NavBarHome";

function Owner() {
  const [userId, setUserId] = useState("");

  // eslint-disable-next-line
  useEffect(() => {                                         //WATCH FOR BUGS
    let nameJson = "";
    let name = "";

    async function get(){
      nameJson = await Auth.currentUserInfo();
      name = nameJson["username"];
      setUserId(name);
    }
    get();
  }, []);

  return (
    <>
      <NavBarHome />
      <Container fluid>
        <h1>Welcome, {userId}!</h1>
        <Stack gap={3}>
          <Stack direction="horizontal" className="Owner" gap={2}>
            <Button variant="light" className="Owner" href="./create">
              Webpage Creation
            </Button>

            <Button variant="light" className="Owner" href="./edit">
              Edit Restaurant Webpage
            </Button>
          </Stack>
          <div>
            <Button variant="success" className="Owner" href="./orders">
              Check Orders
            </Button>
          </div>
        </Stack>
      </Container>
    </>
  );
}
export default Owner;