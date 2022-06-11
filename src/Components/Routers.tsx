import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import Record from "../pages/Record";
import Notice from "../pages/Notice";
import Header from "./Header/Header";
import Footer from "./Footer";
import Signin from "./Header/Signin";
import Mypage from "./Mypage/Mypage";

export default function Routers() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/record" element={<Record />} />
        <Route path="/community" element={<Notice />} />
        <Route path="/mypage" element={<Mypage />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}
