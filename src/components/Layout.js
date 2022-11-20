import React from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useAuthenticator, Button } from '@aws-amplify/ui-react';
import logo from './img/image133.png';
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
      <Button className="homelogo" style={{color: "orange"}} onClick={() => navigate('/')}> <img src={logo} alt="logo"/> </Button>
      <nav className="a">
        
        {/* <Button style={{color: "orange"}} onClick={() => navigate('/')}> HOME </Button>  */}
        {/* <Button onClick={() => navigate('/')}> <img src={logo} alt="logo"/> </Button> */}
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