import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import store from "./store.js";
import App from "./App.jsx";
import { GoogleOAuthProvider } from "@react-oauth/google";
import "./App.scss";

const clientId = `http://667696901990-v22rq6co1ap3p4mvl4h22bm4giu6fenm.apps.googleusercontent.com`;

const container = document.getElementById("root");
const root = createRoot(container);

root.render(
  <GoogleOAuthProvider clientId={clientId}>
    <App />
  </GoogleOAuthProvider>
);
