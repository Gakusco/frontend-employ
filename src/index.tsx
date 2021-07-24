import React from "react";
import ReactDOM from "react-dom";
import { EmployApp } from "./EmployApp";
import "../node_modules/bootstrap/dist/css/bootstrap.css";
import "../node_modules/bootstrap/dist/js/bootstrap.js";
import "./index.css";
import '../node_modules/font-awesome/css/font-awesome.css';
import { compose } from "redux";
declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

ReactDOM.render(<EmployApp />, document.getElementById("root"));
