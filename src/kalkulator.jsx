import React, { useState } from "react";
import "./kalkulator.css"; // styling dipisah ke file css biar rapi

export default function Kalkulator() {
  const [display, setDisplay] = useState("");

  function appendValue(value) {
    setDisplay((prev) => prev + value);
  }

  function clearDisplay() {
    setDisplay("");
  }

  function deleteLast() {
    setDisplay((prev) => prev.slice(0, -1));
  }

  function calculate() {
    try {
      // ⚠️ eval berbahaya kalau input dari luar, tapi untuk kalkulator lokal masih oke
      const result = eval(display);
      setDisplay(result.toString());
    } catch {
      setDisplay("Error");
    }
  }

  function logout() {
    localStorage.removeItem("token");
    window.location.href = "/login";
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
          <h1>Nirwana Resto</h1>
        </header>
        <div className="calculator-container">
          <div className="calculator">
            <input type="text" value={display} readOnly />
            <div className="buttons">
              <button className="operator" onClick={clearDisplay}>C</button>
              <button className="operator" onClick={() => appendValue("/")}>÷</button>
              <button className="operator" onClick={() => appendValue("*")}>×</button>
              <button className="operator" onClick={deleteLast}>⌫</button>

              <button onClick={() => appendValue("7")}>7</button>
              <button onClick={() => appendValue("8")}>8</button>
              <button onClick={() => appendValue("9")}>9</button>
              <button className="operator" onClick={() => appendValue("-")}>−</button>

              <button onClick={() => appendValue("4")}>4</button>
              <button onClick={() => appendValue("5")}>5</button>
              <button onClick={() => appendValue("6")}>6</button>
              <button className="operator" onClick={() => appendValue("+")}>+</button>

              <button onClick={() => appendValue("1")}>1</button>
              <button onClick={() => appendValue("2")}>2</button>
              <button onClick={() => appendValue("3")}>3</button>
              <button className="equal" onClick={calculate}>=</button>

              <button className="zero" onClick={() => appendValue("0")}>0</button>
              <button onClick={() => appendValue(".")}>.</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
