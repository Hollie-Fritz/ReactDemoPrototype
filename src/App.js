import React from "react";
import { Authenticator } from '@aws-amplify/ui-react';

import { Home } from './components/Home';
import { Login } from './components/Login';
import { Customer } from './components/Customer';
import { Layout } from './components/Layout';

import { BrowserRouter, Routes, Route } from 'react-router-dom';

//import './App.css';

function MyRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/login" element={<Login/>} />
          <Route path="/customer" element={<Customer />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

function App() {
  return (
    <Authenticator.Provider>
      <MyRoutes />
    </Authenticator.Provider>
  );
}
export default App;