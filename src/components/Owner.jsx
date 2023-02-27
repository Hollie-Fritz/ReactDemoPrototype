import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import { Button, Stack } from "react-bootstrap";

function Owner() {
  return (
    <Stack className="Owner" gap={1}>
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