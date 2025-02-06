//Imports
import React from "react";
import ReactDOM from "react-dom/client";
import "bootstrap/dist/css/bootstrap.min.css";
import "./style.css";
import App from "./app";

//stuff stack overflow told me to do
const container = document.getElementById("root");
const root = ReactDOM.createRoot(container);

//stuff react told me to do
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
