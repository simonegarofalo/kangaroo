import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

export async function connectDB() {
  try {
    const con = await mysql.createConnection({
      host: process.env.DB_HOST,
      port: process.env.DB_PORT || 3306,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
    });
    console.log("Database connected!");
    return con;
  } catch (err) {
    console.error("DB connection failed:", err);
    process.exit(1);
  }
}