import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./kalkulator.css"; 

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
      const result = eval(display);
      setDisplay(result.toString());
    } catch {
      setDisplay("Error");
    }
  }

  function logout() {
    localStorage.removeItem("token");
    window.location.href = "/"; 
  }

  return (
    <div className="kalkulator-body">
      <div className="kalkulator-sidebar">
        <h2>Menu</h2>
        <Link to="/dashboard">Beranda</Link>
        <Link to="/kalkulator">Kalkulator</Link>
        <Link to="/profil">Profil</Link>
        <a href="#" onClick={logout}>Logout</a>
      </div>

      <div className="kalkulator-main">
        <header className="kalkulator-header">
          <h1>Nirwana Resto</h1>
        </header>
        <div className="kalkulator-container">
          <div className="kalkulator-box">
            <input type="text" value={display} readOnly className="kalkulator-display" />
            <div className="kalkulator-buttons">
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
