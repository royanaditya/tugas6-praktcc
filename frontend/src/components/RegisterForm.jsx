import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/api";

const RegisterForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await api.post("/register", {
        username,
        password,
        confirm_password: confirmPassword,
      });
      navigate("/");
    } catch (err) {
      alert(err.response?.data?.message || "Registrasi gagal");
    }
  };

  return (
    <form onSubmit={handleRegister}>
      <h2>Register</h2>
      <input value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" />
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
      <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="Confirm Password" />
      <button type="submit">Register</button>
    </form>
  );
};

export default RegisterForm;
