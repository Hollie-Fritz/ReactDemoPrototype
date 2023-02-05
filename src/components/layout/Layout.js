import React from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useAuthenticator, Button } from '@aws-amplify/ui-react';
import { ButtonGroup } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import { useState } from 'react';
import Auth from '@aws-amplify/auth';

import logo from '../img/SmallNuOrderLogo.png';
import "./Layout.css";

export function Layout() {
  const { route, signOut } = useAuthenticator((context) => [
    context.route,
    context.signOut,
  ]);

  const navigate = useNavigate();

  const[count, setCount] = useState([]);
  const[restaurantId, setRestaurantId] = useState([''])
  const userAction = async () => {
    
    let user = await Auth.currentSession()
    let token = user.getAccessToken().getJwtToken()
    let nameJson = await Auth.currentUserInfo()
    let name = nameJson['username']
    console.log(JSON.stringify(nameJson))

    await fetch('http://ec2-35-93-30-79.us-west-2.compute.amazonaws.com:8080/order/' + name, 
        {
          method: 'POST',
          headers: {
            'Accept': 'application/json'
          },
          body: token
        }
    ).then(
        response => response.json()
    ).then(
      data => {
        console.log(data)
        setCount(data)
        setRestaurantId(name)
      }
    )
 

  }

  //JSON.stringify((await Auth.currentSession()).getAccessToken().getJwtToken())
  //Auth.currentSession().then(data => console.log("JWT", data.getAccessToken().getJwtToken()))

  function logOut() {
    signOut();
    navigate('/login');
  }
  return (
    <> 
      {/* <img src={logo} alt="logo"/> */}
      <div className = "LogoHome">
      <Button onClick={() => navigate('/')}> <img src={logo} alt="logo"/> </Button>
      </div>

      <div className="I-secondRow">
      <h2 style={{color: "white"}}> I'm a </h2>
      </div>
      
      <div className = "RestaurantCustomer">
        <ButtonGroup size="large">
          {route !== 'authenticated' ? (
            <Button style={{color: "orange"}} onClick={() => navigate('/login')}> Restaurateur </Button>
          ) : (
            <Button style={{color: "#55AAFF"}} onClick={() => logOut()}> Logout </Button>
          )}
          <Button style={{color: "orange"}} onClick={() => navigate('/customer')}> Customer </Button>
        </ButtonGroup> 
      </div>

      <div>
          <button onClick={() => 
            userAction()}>
            Display orders for my restaurant
            </button>
      </div>
      <div>{restaurantId}</div>
      <div >
          {
            count.map((one) => {return <div>{JSON.stringify(one)}</div>})
          }
      </div>


      <Outlet /> {/*  Sign-in box */}
    </>
  );
}