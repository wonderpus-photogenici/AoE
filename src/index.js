// src/index.js
import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import store from "./store.js";


const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
    <Provider store={store}>
     <Route path="/" element={<App />} />
    </Provider>
);

//      <Route path="/" element={<App />} />