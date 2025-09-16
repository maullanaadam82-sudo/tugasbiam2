import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./dashboard.css";

export default function Dashboard() {
  const token = localStorage.getItem("token");

  const BASE_URL = "https://fastapi-mock-api-tasks.onrender.com/tasks";
  const withToken = (suffix = "") =>
    `${BASE_URL}${suffix}?token=${encodeURIComponent(token)}`;

  const [tugasArray, setTugasArray] = useState([]);
  const [currentFilter, setCurrentFilter] = useState("all");
  const [indexHapus, setIndexHapus] = useState(null);
  const [judul, setJudul] = useState("");
  const [deskripsi, setDeskripsi] = useState("");
  const [editIndex, setEditIndex] = useState(null);

  useEffect(() => {
    if (!token) {
      alert("Harus login dulu!");
      window.location.href = "login.html";
    }
    loadTugas();
  }, []);

  function simpanKeLocal(data) {
    localStorage.setItem("tugas", JSON.stringify(data));
  }

  function ambilDariLocal() {
    const data = localStorage.getItem("tugas");
    if (data) setTugasArray(JSON.parse(data));
  }

  async function loadTugas() {
    ambilDariLocal();
    try {
      const res = await fetch(withToken(), {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error("Gagal ambil data");
      const result = await res.json();
      setTugasArray(result);
      simpanKeLocal(result);
    } catch (err) {
      console.error(err);
    }
  }

  function resetForm() {
    setJudul("");
    setDeskripsi("");
    setEditIndex(null);
  }

  async function tambahTugas() {
    if (!judul.trim()) return;
    const tugas = { title: judul, description: deskripsi, completed: false };

    try {
      const res = await fetch(withToken(), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(tugas),
      });
      const newTugas = await res.json();
      const updated = [...tugasArray, newTugas];
      setTugasArray(updated);
      simpanKeLocal(updated);
    } catch (err) {
      console.error("Gagal tambah tugas:", err);
    }
    resetForm();
  }

  async function toggleSelesai(index) {
    const tugas = { ...tugasArray[index], completed: !tugasArray[index].completed };
    try {
      await fetch(withToken(`/${tugas.id}`), {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(tugas),
      });
      const updated = [...tugasArray];
      updated[index] = tugas;
      setTugasArray(updated);
      simpanKeLocal(updated);
    } catch (err) {
      console.error("Gagal update:", err);
    }
  }

  function bukaModal(index) {
    setIndexHapus(index);
    document.getElementById("confirmModal").style.display = "flex";
  }

  function tutupModal() {
    document.getElementById("confirmModal").style.display = "none";
    setIndexHapus(null);
  }

  async function konfirmasiHapus() {
    if (indexHapus === null) return;
    const tugas = tugasArray[indexHapus];
    try {
      await fetch(withToken(`/${tugas.id}`), {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      const updated = tugasArray.filter((_, i) => i !== indexHapus);
      setTugasArray(updated);
      simpanKeLocal(updated);
    } catch (err) {
      console.error("Gagal hapus:", err);
    }
    tutupModal();
  }

  function filterTugas(type) {
    setCurrentFilter(type);
  }

  function editTugas(index) {
    const tugas = tugasArray[index];
    setJudul(tugas.title);
    setDeskripsi(tugas.description);
    setEditIndex(index);
  }

  async function updateTugas() {
    if (editIndex === null) return;
    const id = tugasArray[editIndex].id;
    const tugas = { ...tugasArray[editIndex], title: judul, description: deskripsi };

    try {
      const res = await fetch(withToken(`/${id}`), {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(tugas),
      });
      if (!res.ok) throw new Error("Gagal update data server");

      const updatedTugas = await res.json();
      const updated = [...tugasArray];
      updated[editIndex] = updatedTugas;
      setTugasArray(updated);
      simpanKeLocal(updated);
    } catch (err) {
      console.error("Gagal update:", err);
    }
    resetForm();
  }

  function logout() {
    localStorage.removeItem("token");
    window.location.href = "login.html";
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
          <h1>Nirwana Caffe</h1>
        </header>

        <div className="add-tugas">
          <input
            type="text"
            value={judul}
            onChange={(e) => setJudul(e.target.value)}
            placeholder="Judul tugas..."
          />
          <textarea
            value={deskripsi}
            onChange={(e) => setDeskripsi(e.target.value)}
            placeholder="Deskripsi singkat..."
          />
          {editIndex === null ? (
            <button onClick={tambahTugas}>Tambah Tugas</button>
          ) : (
            <button onClick={updateTugas}>Update Tugas</button>
          )}
        </div>

        <div className="filter">
          <button
            className={currentFilter === "all" ? "active" : ""}
            onClick={() => filterTugas("all")}
          >
            Semua
          </button>
          <button
            className={currentFilter === "pending" ? "active" : ""}
            onClick={() => filterTugas("pending")}
          >
            Belum Selesai
          </button>
          <button
            className={currentFilter === "completed" ? "active" : ""}
            onClick={() => filterTugas("completed")}
          >
            Sudah Selesai
          </button>
        </div>

        <ul className="tugas-list">
          {tugasArray.map((tugas, index) => {
            if (currentFilter === "pending" && tugas.completed) return null;
            if (currentFilter === "completed" && !tugas.completed) return null;
            return (
              <li key={tugas.id || index}>
                <div className={`tugas-info ${tugas.completed ? "completed" : ""}`}>
                  <strong>{tugas.title}</strong>
                  <span>{tugas.description}</span>
                </div>
                <div className="tugas-actions">
                  <button className="edit" onClick={() => editTugas(index)}>✏️</button>
                  <button className="complete" onClick={() => toggleSelesai(index)}>✔</button>
                  <button className="delete" onClick={() => bukaModal(index)}>❌</button>
                </div>
              </li>
            );
          })}
        </ul>
      </div>

      <div id="confirmModal" className="modal">
        <div className="modal-content">
          <p id="modalText">Apakah Anda yakin mau menghapus?</p>
          <div className="modal-actions">
            <button className="btn yes" onClick={konfirmasiHapus}>Ya</button>
            <button className="btn no" onClick={tutupModal}>Batal</button>
          </div>
        </div>
      </div>
    </div>
  );
}
