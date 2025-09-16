import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function App() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!username || !password) {
      setMessage("Isi semua field!");
      return;
    }

    try {
      const response = await fetch(
        "https://fastapi-mock-api-tasks.onrender.com/login",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ username, password }),
        }
      );
      const data = await response.json();

      if (response.ok) {
        setMessage("Login berhasil!");
        localStorage.setItem("token", data.token);
        localStorage.setItem("username", username);
        setTimeout(() => navigate("/dashboard"), 1000);
      } else {
        setMessage(data.detail || "Username atau password salah!");
      }
    } catch {
      setMessage("Terjadi kesalahan, coba lagi.");
    }
  };

  return (
    <div className="page-container">
      <div className="login-box">
        <img src="/Group.png" alt="Logo" className="logo" />

        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="input-field user"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="input-field lock"
        />

        <button onClick={handleLogin}>Login</button>

        {message && (
          <p className={`message ${message.includes("berhasil") ? "success" : "error"}`}>
            {message}
          </p>
        )}

        <p className="tanda-link">
          Belum punya akun? <Link to="/register">Daftar</Link>
        </p>
      </div>
    </div>
  );
}
