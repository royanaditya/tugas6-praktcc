import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import { db } from "./models/index.js"; // koneksi Sequelize
import NotesRoute from "./routes/NoteRoute.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// ✅ Konfigurasi CORS lebih lengkap
const corsOptions = {
  origin: true,
  credentials: true,
};

app.use(cors(corsOptions)); // Gunakan opsi CORS

// === Middleware ===
app.use(cookieParser());
app.use(express.json());
app.use(NotesRoute);

// === Database Connection & Sync ===
(async () => {
  try {
    await db.authenticate();
    console.log("Database connected...");

    await db.sync({ alter: true }); // sync schema saat development
    console.log("Database synchronized...");
  } catch (error) {
    console.error("Connection error:", error);
  }
})();

// === Start Server ===
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));