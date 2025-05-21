// src/App.jsx
import { Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import NoteApp from "./notes/NoteApp"; // ✅ pastikan import NoteApp

function App() {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/notes/*" element={<NoteApp />} /> {/* ⬅️ tambahkan path /notes/* */}
    </Routes>
  );
}

export default App;
