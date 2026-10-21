const express = require("express");
const db = require("../db");

const router = express.Router();

const normalizeClass = (classData = {}) => ({
  id: classData.id,
  name: classData.name ?? "",
  description: classData.description ?? "",
  teacherId: classData.teacher_id ?? null,
  teacherName: classData.teacher_name ?? "",
  studentsCount: classData.students_count ?? 0,
});

// GET all classes
router.get("/", async (req, res) => {
  try {
    const result = await db.query(`
      SELECT c.id, c.name, c.description, c.teacher_id,
             t.name AS teacher_name,
             COUNT(s.id)::int AS students_count
      FROM classes c
      LEFT JOIN teachers t ON t.id = c.teacher_id
      LEFT JOIN students s ON s.class_id = c.id
      GROUP BY c.id, c.name, c.description, c.teacher_id, t.name
      ORDER BY c.name ASC
    `);

    res.json(result.rows.map(normalizeClass));
  } catch (error) {
    console.error("Error fetching classes:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// GET a class by ID
router.get("/:id", async (req, res) => {
  try {
    const result = await db.query(
      `SELECT c.id, c.name, c.description, c.teacher_id,
             t.name AS teacher_name,
             COUNT(s.id)::int AS students_count
      FROM classes c
      LEFT JOIN teachers t ON t.id = c.teacher_id
      LEFT JOIN students s ON s.class_id = c.id
      WHERE c.id = $1
      GROUP BY c.id, c.name, c.description, c.teacher_id, t.name`,
      [req.params.id]
    );

    if (!result.rows.length) {
      return res.status(404).json({ error: "Class not found" });
    }

    res.json(normalizeClass(result.rows[0]));
  } catch (error) {
    console.error("Error fetching class:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// POST a new class
router.post("/", async (req, res) => {
  try {
    const { name, description, teacher_id } = req.body;

    if (!name) {
      return res.status(400).json({ error: "Class name is required" });
    }

    const result = await db.query(
      `INSERT INTO classes (name, description, teacher_id)
       VALUES ($1, $2, $3) RETURNING *`,
      [name, description ?? null, teacher_id ?? null]
    );

    res.status(201).json(normalizeClass(result.rows[0]));
  } catch (error) {
    console.error("Error adding class:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// PUT update a class
router.put("/:id", async (req, res) => {
  try {
    const { name, description, teacher_id } = req.body;

    if (!name) {
      return res.status(400).json({ error: "Class name is required" });
    }

    const result = await db.query(
      `UPDATE classes
       SET name = $1, description = $2, teacher_id = $3
       WHERE id = $4 RETURNING *`,
      [name, description ?? null, teacher_id ?? null, req.params.id]
    );

    if (!result.rows.length) {
      return res.status(404).json({ error: "Class not found" });
    }

    res.json(normalizeClass(result.rows[0]));
  } catch (error) {
    console.error("Error updating class:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// DELETE a class
router.delete("/:id", async (req, res) => {
  try {
    const result = await db.query(
      "DELETE FROM classes WHERE id = $1 RETURNING id",
      [req.params.id]
    );

    if (!result.rows.length) {
      return res.status(404).json({ error: "Class not found" });
    }

    res.json({ message: "Class deleted successfully" });
  } catch (error) {
    console.error("Error deleting class:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;