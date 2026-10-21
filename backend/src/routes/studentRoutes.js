const express = require("express");
const db = require("../db");

const router = express.Router();

const normalizeStudent = (student = {}) => ({
  id: student.id,
  name: student.name ?? "",
  class_id: student.class_id ?? null,
  profile_pic: student.profile_pic ?? null,
  email: student.email ?? null,
  status: student.status ?? "pending",
});

router.get("/", async (req, res) => {
  try {
    const result = await db.query("SELECT * FROM students");
    res.status(200).json(result.rows.map(normalizeStudent));
  } catch (error) {
    console.error("Error fetching students:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const result = await db.query(
      "SELECT * FROM students WHERE id = $1",
      [req.params.id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Student not found" });
    }

    res.json(normalizeStudent(result.rows[0]));
  } catch (error) {
    console.error("Error fetching student:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.post("/", async (req, res) => {
  try {
    const { name, class_id, email, status } = req.body;

    if (!name) {
      return res.status(400).json({ error: "Student name is required" });
    }

    const result = await db.query(
      `INSERT INTO students (name, class_id, email, status)
       VALUES ($1, $2, $3, $4)
       RETURNING *`,
      [name, class_id ?? null, email ?? null, status ?? "pending"]
    );

    res.status(201).json(normalizeStudent(result.rows[0]));
  } catch (error) {
    console.error("Error creating student:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const { name, class_id, email, status } = req.body;

    const result = await db.query(
      `UPDATE students
       SET name = $1, class_id = $2, email = $3, status = $4
       WHERE id = $5
       RETURNING *`,
      [name, class_id ?? null, email ?? null, status ?? "pending", req.params.id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Student not found" });
    }

    res.json(normalizeStudent(result.rows[0]));
  } catch (error) {
    console.error("Error updating student:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const result = await db.query(
      "DELETE FROM students WHERE id = $1 RETURNING id",
      [req.params.id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Student not found" });
    }

    res.json({ message: "Student removed successfully" });
  } catch (error) {
    console.error("Error deleting student:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;