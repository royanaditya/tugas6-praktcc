import React from "react";
import { Routes, Route } from "react-router-dom"; // ❌ Hapus BrowserRouter
import NoteList from "./NoteList";
import NoteForm from "./NoteForm";
import NoteEdit from "./NoteEdit";

const NoteApp = () => {
  return (
    <div className="section">
      <Routes>
        <Route path="/" element={<NoteList />} />
        <Route path="/add" element={<NoteForm />} />
        <Route path="/edit/:id" element={<NoteEdit />} />
      </Routes>
    </div>
  );
};

export default NoteApp;
