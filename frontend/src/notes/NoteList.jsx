import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils";
import "../App.css"; // tambahkan untuk style kustom

const NoteList = () => {
  const [notes, setNotes] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/notes`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setNotes(Array.isArray(response.data) ? response.data : []);
    } catch (error) {
      setNotes([]);
      alert("Gagal mengambil data catatan");
    }
  };

  const handleDelete = async (id) => {
    await axios.delete(`${BASE_URL}/notes/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    fetchNotes();
  };

  const handleLogout = async () => {
  try {
    await axios.delete(`${BASE_URL}/logout`, {
      withCredentials: true, // ⬅️ penting agar refreshToken (cookie) ikut dikirim
    });
  } catch (err) {
    console.error("Logout error:", err);
  } finally {
    localStorage.removeItem("token");
    navigate("/");
  }
};

  return (
    <div className="note-container">
      <div style={{ display: "flex", justifyContent: "flex-end", alignItems: "center", marginBottom: "10px" }}>
        <button onClick={handleLogout} className="note-button" style={{ background: "#e74c3c" }}>LOGOUT</button>
      </div>
      <h1 className="note-title">DAFTAR CATATAN</h1>
      <div style={{ marginBottom: "20px" }}>
        <Link to="/notes/add" className="note-button">TAMBAH CATATAN</Link>
      </div>
      <div className="note-grid">
        {notes.length === 0 ? (
          <p className="note-empty">Tidak ada catatan</p>
        ) : (
          notes.map((note) => (
            <div key={note.id} className="note-card">
              <div className="note-content">
                <h2 className="note-heading">{note.title}</h2>
                <p className="note-body">{note.content}</p>
              </div>
              <div className="note-actions">
                <Link to={`edit/${note.id}`} className="note-edit">EDIT</Link>
                <button onClick={() => handleDelete(note.id)} className="note-delete">HAPUS</button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default NoteList;