
const express = require("express");
const db = require("../db");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const result = await db.query(
      "SELECT * FROM schools ORDER BY id ASC"
    );
    res.json(result.rows);
  } catch (error) {
    console.error("Error fetching schools:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const result = await db.query(
      "SELECT * FROM schools WHERE id = $1",
      [req.params.id]
    );

    if (!result.rows.length) {
      return res.status(404).json({ error: "School not found" });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error("Error fetching school:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.post("/", async (req, res) => {
  try {
    const { name, address, city, country, email, phone } = req.body;

    if (!name?.trim()) {
      return res.status(400).json({ error: "School name is required" });
    }

    const result = await db.query(
      `INSERT INTO schools (name, address, city, country, email, phone)
       VALUES ($1, $2, $3, $4, $5, $6)
       RETURNING *`,
      [
        name.trim(),
        address ?? null,
        city ?? null,
        country ?? null,
        email ?? null,
        phone ?? null,
      ]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error("Error creating school:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const { name, address, city, country, email, phone } = req.body;

    if (!name?.trim()) {
      return res.status(400).json({ error: "School name is required" });
    }

    const result = await db.query(
      `UPDATE schools
       SET name = $1, address = $2, city = $3,
           country = $4, email = $5, phone = $6
       WHERE id = $7
       RETURNING *`,
      [
        name.trim(),
        address ?? null,
        city ?? null,
        country ?? null,
        email ?? null,
        phone ?? null,
        req.params.id,
      ]
    );

    if (!result.rows.length) {
      return res.status(404).json({ error: "School not found" });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error("Error updating school:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const result = await db.query(
      "DELETE FROM schools WHERE id = $1 RETURNING id",
      [req.params.id]
    );

    if (!result.rows.length) {
      return res.status(404).json({ error: "School not found" });
    }

    res.json({ message: "School deleted successfully" });
  } catch (error) {
    console.error("Error deleting school:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
