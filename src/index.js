import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import store from "./store.js";
import App from './App.jsx';
import './App.scss';

const container = document.getElementById('root');
const root = createRoot(container);
root.render(<App />)


