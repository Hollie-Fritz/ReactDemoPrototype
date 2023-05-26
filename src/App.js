import React from 'react';
import { Authenticator } from '@aws-amplify/ui-react';
import { ThemeProvider } from "react-bootstrap"
import { Routes, Route } from 'react-router-dom';

import './App.css';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import { Customer } from './components/customer/Customer';
import { Login } from './components/Login';
import Owner  from './components/Owner';
import PageNotFound from './pages/PageNotFound';
import Search from "./pages/Search";
import PersistResForm from "./owner/PersistResForm";
import ViewOrders from "./pages/ViewOrders";
import ViewWebpage from './pages/ViewWebPage';
import FormEdit from './owner/FormEdit';
import PopUp from './PopUp';
import ViewStatus from './pages/ViewStatus';
import Chat from "./pages/Chat";
const App = () => {

  return (
    <ThemeProvider
      breakpoints={["xxxl", "xxl", "xl", "lg", "md", "sm", "xs", "xxs"]}
      minBreakpoint="xxs"
    >
      <div>
        <Authenticator.Provider>
          <PopUp/>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/search" element={<Search />} />
            <Route path="/login" element={<Login />} />
            <Route path="/owner" element={<Owner />} />
            <Route path="/edit" element={<FormEdit />} />
            <Route path="/create" element={<PersistResForm />} />
            <Route path="/orders" element={<ViewOrders />} />
            <Route path="/customer" element={<Customer />} />
            <Route path="/vp" element={<ViewWebpage />} />
            <Route path="/orderStatus" element={<ViewStatus />} />
            <Route path="/r/:id" element={<ViewWebpage />}/>
            <Route path="/chat" element={<Chat />} />
            <Route path="/chat/:userId/:toUserId" element={<Chat />} />
            <Route path="*" element={<PageNotFound/>} />
          </Routes>
        </Authenticator.Provider>
      </div>
    </ThemeProvider>
  );
};

export default App;
