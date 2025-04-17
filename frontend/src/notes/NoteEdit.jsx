import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { BASE_URL } from "../utils";

const NoteEdit = () => {
  const { id } = useParams();
  const [judul, setJudul] = useState("");
  const [isi, setIsi] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchNote = async () => {
      const response = await axios.get(`${BASE_URL}/notes`);
      const note = response.data.find((n) => n.id === parseInt(id));
      if (note) {
        setJudul(note.judul);
        setIsi(note.isi);
      }
    };
    fetchNote();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.put(`${BASE_URL}/edit-note/${id}`, { judul, isi });
    navigate("/");
  };

  return (
    <div className="container mt-5">
      <h1 className="title">Edit Catatan</h1>
      <form onSubmit={handleSubmit}>
        <div className="field">
          <label className="label">Judul</label>
          <input className="input" type="text" value={judul} onChange={(e) => setJudul(e.target.value)} required />
        </div>
        <div className="field">
          <label className="label">Isi</label>
          <textarea className="textarea" value={isi} onChange={(e) => setIsi(e.target.value)} required></textarea>
        </div>
        <button className="button is-info">Update</button>
      </form>
    </div>
  );
};

export default NoteEdit;
