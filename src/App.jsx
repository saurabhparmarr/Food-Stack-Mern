import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./screen/Home";
import Login from "./screen/Login";
import { Signup } from "./screen/Signup";
import Orders from "./screen/Orders";
import Navbar from "./components/Navbar";
import CartPage from "./screen/CartPage";
import { CartProvider } from "./components/ContextReducer";
import { Toaster } from "react-hot-toast";

const App = () => {
  return (
    <CartProvider>
      
        <Navbar />


        <Toaster position="top-right" reverseOrder={false} />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/cart" element={<CartPage />} />
        </Routes>
      
    </CartProvider>
  );
};

export default App;
