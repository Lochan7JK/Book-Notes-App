import express from "express";
import { pool } from "../db.js";

const router = express.Router();

/* GET all notes */
router.get("/", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM notes ORDER BY id DESC");
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* CREATE note */
router.post("/", async (req, res) => {
  try {
    const { title, content, author, isbn } = req.body;

    const result = await pool.query(
      `INSERT INTO notes (title, content, author, isbn)
       VALUES ($1, $2, $3, $4)
       RETURNING *`,
      [title, content, author, isbn]
    );

    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* UPDATE note */
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content, author, isbn, status, rating } = req.body;

    const result = await pool.query(
      `UPDATE notes
       SET title = $1,
           content = $2,
           author = $3,
           isbn = $4,
           status = $5,
           rating = $6,
           updated_at = EXTRACT(EPOCH FROM NOW()) * 1000
       WHERE id = $7
       RETURNING *`,
      [title, content, author, isbn, status, rating, id]
    );

    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* DELETE note */
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    await pool.query("DELETE FROM notes WHERE id = $1", [id]);

    res.json({ message: "Note deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;