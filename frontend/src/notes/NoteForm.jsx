import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils";

const NoteForm = () => {
  const [judul, setJudul] = useState("");
  const [isi, setIsi] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post(`${BASE_URL}/add-note`, { judul, isi });
    navigate("/");
  };

  return (
    <div className="container mt-5">
      <h1 className="title">Tambah Catatan</h1>
      <form onSubmit={handleSubmit}>
        <div className="field">
          <label className="label">Judul</label>
          <input className="input" type="text" value={judul} onChange={(e) => setJudul(e.target.value)} required />
        </div>
        <div className="field">
          <label className="label">Isi</label>
          <textarea className="textarea" value={isi} onChange={(e) => setIsi(e.target.value)} required></textarea>
        </div>
        <button className="button is-success">Simpan</button>
      </form>
    </div>
  );
};

export default NoteForm;
