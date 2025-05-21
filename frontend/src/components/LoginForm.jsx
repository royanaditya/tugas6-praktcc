import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom"; // ← Tambah Link di sini
import api from "../api/api";

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/login", { username, password });
       localStorage.setItem("token", res.data.accessToken);
        navigate("/notes"); // ✅ arahkan ke NoteApp.jsx
    } catch (err) {
      alert(err.response?.data?.message || "Login gagal");
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <h2>Login</h2>
      <input value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" />
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
      <button type="submit">Login</button>
      
      {/* Link ke register */}
      <p style={{ marginTop: "1rem" }}>
        Belum punya akun? <Link to="/register">Daftar di sini</Link>
      </p>
    </form>
  );
};

export default LoginForm;
