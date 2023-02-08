import React from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useAuthenticator, Button } from '@aws-amplify/ui-react';

import logo from '../img/SmallNuOrderLogo.png';
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
      <Button onClick={() => navigate('/')}> <img src={logo} alt="logo"/> </Button>
      <nav className="a">
      </nav>

      <div className="I">
      <h2 style={{color: "white"}}> I'M A </h2>
      </div>
      
      <div>
        {route !== 'authenticated' ? (
          <Button style={{color: "orange"}} onClick={() => navigate('/login')}> Restaurateur </Button>
        ) : (
          <Button onClick={() => logOut()}> Logout </Button>
        )}
        <Button style={{color: "orange"}} onClick={() => navigate('/customer')}> Customer </Button>
      </div>
      <Outlet />
    </>
  );
}