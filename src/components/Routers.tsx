import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import Record from "../pages/Record";
import Header from "./Header/Header";
import Footer from "./Footer";
import Signin from "./Header/Signin";
import Mypage from "./Mypage/Mypage";
import Community from "../pages/Community";

export default function Routers() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/record" element={<Record />} />
        <Route path="/community" element={<Community />} />
        <Route path="/mypage" element={<Mypage />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}
