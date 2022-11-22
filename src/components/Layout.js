import React from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

import { useAuthenticator, Button } from '@aws-amplify/ui-react';
import { ButtonGroup } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';

import logo from './img/SmallNuOrderLogo.png';
import "./Layout.css";



export function Layout() {
  const { route, signOut } = useAuthenticator((context) => [
    context.route,
    context.signOut,
  ]);
  const navigate = useNavigate();

  function logOut() {
    signOut();
    navigate('/login');
  }
  return (
    <> 
      {/* <img src={logo} alt="logo"/> */}
      <div className = "LogoHome">
      <Button onClick={() => navigate('/')}> <img src={logo} alt="logo"/> </Button></div>

      <div className="I-secondRow">
      <h2 style={{color: "white"}}>I'm a </h2>
      </div>
      
      <div className = "RestaurantCustomer">
        <ButtonGroup size="large">
          {route !== 'authenticated' ? (
            <Button style={{color: "orange"}} onClick={() => navigate('/login')}> Restaurateur </Button>
          ) : (
            <Button style={{color: "green"}} onClick={() => logOut()}> Logout </Button>
          )}
          <Button style={{color: "orange"}} onClick={() => navigate('/customer')}> Customer </Button>
        </ButtonGroup>
      </div>

      <Outlet /> #Sign-in box
    </>
  );
}