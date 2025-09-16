import React from "react";
import { Link } from "react-router-dom";
import "./profil.css";  


export default function Profil() {
  const username = localStorage.getItem("username"); 

  function logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    window.location.href = "/"; 
  }

  return (
    <div className="container">
      <div className="sidebar">
  <h2>Menu</h2>
  <Link to="/dashboard">Beranda</Link>
  <Link to="/kalkulator">Kalkulator</Link>
  <Link to="/profil">Profil</Link>
  <a href="#" onClick={logout}>Logout</a>
</div>


      <div className="main">
        <header>
          <h1>Profil Pengguna</h1>
        </header>

        <div className="content">
          <p><strong>Username:</strong> {username || "Guest"}</p>
          <p>Ini adalah halaman profil sederhana kamu.</p>
        </div>
      </div>
    </div>
  );
}
