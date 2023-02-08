import React from "react";
//need for Authentication
import { Authenticator } from '@aws-amplify/ui-react';

import { Home } from './components/home/Home';
import { Login } from './components/Login';
import { Customer } from './components/customers/Customer';
import { Layout } from './components/layout/Layout';

import { BrowserRouter, Routes, Route } from 'react-router-dom';

import './App.css';

function MyRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/customer" element={<Customer />}/> 
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

function App() {
  return (
    <div>
    <Authenticator.Provider>
      <MyRoutes />
    </Authenticator.Provider>
    </div>
  );
}
export default App;