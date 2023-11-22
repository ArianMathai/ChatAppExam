import React from "react";
import ReactDOM from "react-dom/client";
import App from "./components/App";
import { BrowserRouter } from "react-router-dom";
import "./application.css";
import WebSocketProvider from "./components/webSocket/WebSocketProvider";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <WebSocketProvider>
      <App />
    </WebSocketProvider>
  </BrowserRouter>,
);
