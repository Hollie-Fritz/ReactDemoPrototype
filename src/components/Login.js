import React from "react";
import { useEffect } from "react";

import { Authenticator, useAuthenticator, View } from "@aws-amplify/ui-react";

import "@aws-amplify/ui-react/styles.css";

import { useNavigate, useLocation } from "react-router";
import NavBarHome from "./NavBarHome";

export function Login() {
  const { route } = useAuthenticator((context) => [context.route]);
  const location = useLocation();
  const navigate = useNavigate();
  var from = (location.state && location.state.from && location.state.from.pathname) || "/owner";

  useEffect(() => {
    if (route === "authenticated") {
      console.log("redirecting");
      navigate(-1);
    }
  }, [route, navigate, from]);

  return (
    <>
    <NavBarHome/>
    <br></br>
    <View className="auth-wrapper">
      {/* Sign-in box */}
      <Authenticator></Authenticator>
      {/* User note */}
      <p style={{textAlign: 'center', marginTop: '10px'}}>
      <nobr className="fw-bold">Note:</nobr> Your username will be used as the URL of your page.
      </p>
    </View>
    </>
  );
}
