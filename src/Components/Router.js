import React from "react";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import Home from "Routes/Home";
import Detail from "Routes/Detail";
import Gentime from "Routes/Gentime";
import Notice from "Routes/Notice";
import Update from "Routes/Update";
import Header from "Components/Header";
import Footer from "./Footer";

// eslint-disable-next-line
export default () => (
  <Router>
    <Header />
    <Route path="/" exact component={Home} />
    <Route path="/gen" component={Gentime} />
    <Route path="/notice" exact component={Notice} />
    <Route path="/update" exact component={Update} />
    <Route path="/notice/:id" component={Detail} />
    <Route path="/update/:id" component={Detail} />
    <Redirect from="*" to="/" />
    <Footer />
  </Router>
);
