import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App.jsx";
import Register from "./register.jsx";
import Dashboard from "./dashboard.jsx";
import Kalkulator from "./kalkulator.jsx";
import Profil from "./profil.jsx";
import "./index.css";
import"./dashboard.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/kalkulator" element={<Kalkulator />} />
        <Route path="/profil" element={<Profil />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
