import React from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import { Routes, Route } from "react-router-dom";
import Market from "./components/Market";
import News from "./components/News";
import Portfolio from "./components/Portfolio";
import SignUp from "./components/SignUp";
import Login from "./components/Login";
import Home from "./components/Home";
import StockDetail from "./components/StockDetail";



const App = () => {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/hero" element={<Hero />} />
        <Route path="/market" element={<Market />} />
        <Route path="/news" element={<News />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/portfolio/:userId" element={<Portfolio />} />
        <Route path="/stock/:symbol" element={<StockDetail />} />
      </Routes>
    </div>
  );
};

export default App;
