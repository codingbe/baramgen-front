import React from "react";
import * as ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import App from "./components/App";
import store from "./etc/redux/store";
import "./font.css";
const dom = document.getElementById("root");

if (dom) {
  const root = ReactDOM.createRoot(dom);

  root.render(
    <Provider store={store}>
      <App />
    </Provider>
  );
}
