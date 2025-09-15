import React from "react";
import "./profil.css";  // 👉 tambahin ini


export default function Profil() {
  const username = localStorage.getItem("username"); // ambil username dari localStorage

  function logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    window.location.href = "/"; // balik ke login
  }

  return (
    <div className="container">
      <div className="sidebar">
        <h2>Menu</h2>
        <a href="/dashboard">Beranda</a>
        <a href="/kalkulator">Kalkulator</a>
        <a href="/profil">Profil</a>
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
