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
      navigate(-1);
    }
  }, [route, navigate, from]);
  return (
    <>
    <NavBarHome/>
    <View className="auth-wrapper">
      {" "}
      {/*  Sign-in box */}
      <Authenticator></Authenticator>
    </View>
    </>
  );
}