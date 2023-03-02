import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import { Button, Stack } from "react-bootstrap";
import { useState, useEffect } from "react";
import Auth from "@aws-amplify/auth";

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
    <Stack className="Owner" gap={1}>
      <h1>Welcome, {userId}</h1>
      <div>
        <Button variant="success" className="m-1" href="./create">
          Webpage Creation
        </Button>
      </div>
      <div>
        <Button variant="success" className="m-1" href="./orders">
          Check Orders
        </Button>
      </div>
      <div>
        <Button variant="success" className="m-1" href="./edit">
          Edit Restaurant Webpage
        </Button>
      </div>
    </Stack>
  );
}
export default Owner;