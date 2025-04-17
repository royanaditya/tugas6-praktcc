import { Sequelize } from "sequelize";

// Nyambungin db ke BE
const db = new Sequelize("hrd", "root", "", {
  host: "35.226.28.38", // IP publik dari GCP instance
  dialect: "mysql",
});

export default db;
