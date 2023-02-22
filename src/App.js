
import React from 'react';
import { ThemeProvider } from "react-bootstrap"
import { Navigate,  BrowserRouter, Route, Routes, Link } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import { Customer } from './components/customer/Customer';
import { Login } from './components/Login';
import Owner  from './components/Owner';
import { Authenticator } from '@aws-amplify/ui-react';
import PageNotFound from './pages/PageNotFound';
import Search from "./pages/Search";
import PersistResForm from "./owner/PersistResForm";
import ViewOrders from "./pages/ViewOrders";
import MenuOrder from "./pages/menu-order/MenuOrder";
import Cart from "./pages/cart/Cart";


let App = () => {
  return (
    <ThemeProvider
      breakpoints={["xxxl", "xxl", "xl", "lg", "md", "sm", "xs", "xxs"]}
      minBreakpoint="xxs"
    >
      <div>
        <nav>
          <Link to="/">Home</Link> |<Link to="/about">About</Link> |
          <Link to="/contact">Contact</Link> |<Link to="/search">Search</Link>
        </nav>
        <Authenticator.Provider>
          <Routes>
            <Route path="/r/:id" component={MenuOrder}/>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/search" element={<Search />} />
            <Route path="/login" element={<Login />} />
            <Route path="/owner" element={<Owner />} />
            <Route path="/create" element={<PersistResForm />} />
            <Route path="/orders" element={<ViewOrders />} />
            <Route path="/customer" element={<Customer />} />
           
            <Route path="/cart" element={<Cart />} />
             <Route path="*" element={<PageNotFound/>} />
          </Routes>
        </Authenticator.Provider>
      </div>
    </ThemeProvider>
  );
};

export default App;