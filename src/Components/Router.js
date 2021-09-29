import React from "react";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import Home from "Screens/Home";
import Detail from "Screens/Detail";
import Record from "Screens/Record";
import Notice from "Screens/Notice";
import Header from "Components/Header";
import Footer from "./Footer";

// eslint-disable-next-line
export default () => (
  <Router>
    <Header />
    <Route path="/" exact component={Home} />
    <Route path="/record" component={Record} />
    <Route path="/notice" exact component={Notice} />
    <Route path="/notice/:id" component={Detail} />
    <Redirect from="*" to="/" />
    <Footer />
  </Router>
);
