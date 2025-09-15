import { useState } from "react";
import { Link } from "react-router-dom";
import "./index.css";   

export default function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();
    if (!username || !password) {
      setMessage("Isi semua field!");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch("https://fastapi-mock-api-tasks.onrender.com/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        setMessage("Register berhasil!");
        setTimeout(() => {
          window.location.href = "/";
        }, 1000);
      } else {
        setMessage("Gagal register, coba lagi.");
      }
    } catch (error) {
      setMessage("Terjadi kesalahan, coba lagi.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-container">
      <div className="login-box">
        <h2>Register</h2>
        <form onSubmit={handleRegister}>
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
          <button type="submit" disabled={loading}>
            {loading ? "Memproses..." : "Daftar"}
          </button>
        </form>

        {message && <p className={`message ${message.includes("berhasil") ? "success" : "error"}`}>{message}</p>}

        <p className="bottom-text">
          Sudah punya akun? <Link to="/">Login</Link>
        </p>
      </div>
    </div>
  );
}
