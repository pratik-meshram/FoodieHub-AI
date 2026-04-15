import React from "react";
import {  Routes, Route } from "react-router-dom";

import Register from "./components/register.jsx";
import Login from "./components/Login.jsx";
import Page from "./components/page.jsx";
import AddToCart from "./components/AddToCart.jsx";
import PrivateRoute from "./components/PrivateRoute";


function App() {
  return (

    <Routes>
      <Route path="/" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/page/*"
       element={
        <PrivateRoute>
          <Page />
        </PrivateRoute>
      } />

      <Route path="/addtocart" element={<AddToCart />} />
    </Routes>

  );
}

export default App;
