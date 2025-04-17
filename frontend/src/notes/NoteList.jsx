import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { BASE_URL } from "../utils";

const NoteList = () => {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    const response = await axios.get(`${BASE_URL}/notes`);
    setNotes(response.data);
  };

  const handleDelete = async (id) => {
    await axios.delete(`${BASE_URL}/delete-note/${id}`);
    fetchNotes(); // Refresh data setelah hapus
  };

  return (
    <div className="container mt-5">
      <h1 className="title">Daftar Catatan</h1>
      <Link to="/add" className="button is-primary mb-3">Tambah Catatan</Link>
      {notes.length === 0 ? <p>Tidak ada catatan</p> : (
        <div className="columns is-multiline">
          {notes.map((note) => (
            <div key={note.id} className="column is-one-third">
              <div className="card">
                <div className="card-content">
                  <p className="title">{note.judul}</p>
                  <p>{note.isi}</p>
                </div>
                <footer className="card-footer">
                  <Link to={`/edit/${note.id}`} className="card-footer-item">Edit</Link>
                  <button className="card-footer-item has-text-danger" onClick={() => handleDelete(note.id)}>Hapus</button>
                </footer>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default NoteList;
