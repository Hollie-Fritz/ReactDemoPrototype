import React from "react";
import awsExports from "../aws-exports";
import { Amplify } from "aws-amplify";
import { withAuthenticator, Button } from "@aws-amplify/ui-react";

import "@aws-amplify/ui-react/styles.css";
import "../pages/Home.css";

Amplify.configure(awsExports);

function Signin({ signOut, user }) {
  return (
    <>
      <h1>Hello {user.username}</h1>
      <Button onClick={signOut}>Sign out</Button>
    </>
  );
}
export default withAuthenticator(Signin);
