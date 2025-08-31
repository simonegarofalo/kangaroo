import { Router } from "express";
import { connectDB } from "../db.js";

const router = Router();

// Ensure 'contents' table exists
async function ensureTable() {
  const con = await connectDB();
  await con.execute(`
    CREATE TABLE IF NOT EXISTS contents (
      id INT AUTO_INCREMENT PRIMARY KEY,
      content VARCHAR(100) NOT NULL,
      title VARCHAR(100) NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `);
  await con.end();
}

// GET all 'contents'
router.get("/", async (req, res) => {
  try {
    await ensureTable();
    const con = await connectDB();
    const [rows] = await con.query("SELECT * FROM contents ORDER BY created_at DESC");
    await con.end();
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

// POST new content
router.post("/", async (req, res) => {
  const { url, title } = req.body;
  if (!url) return res.status(400).json({ error: "URL required" });

  try {
    await ensureTable();
    const con = await connectDB();
    const [result] = await con.execute(
      "INSERT INTO contents (content, title) VALUES (?, ?)",
      [url, title || url]
    );
    const [rows] = await con.query("SELECT * FROM contents WHERE id = ?", [result.insertId]);
    await con.end();
    res.status(201).json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

// DELETE content
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  if (!id) return res.status(400).json({ error: "ID required" });

  try {
    await ensureTable();
    const con = await connectDB();
    const [result] = await con.execute("DELETE FROM contents WHERE id = ?", [id]);
    await con.end();

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Content not found" });
    }
    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

export default router;