
const express = require("express");
const db = require("../db");

const router = express.Router();

const classQuery = `
  SELECT
    c.id,
    c.name,
    c.description,
    c.school_id,
    COALESCE(
      json_agg(DISTINCT jsonb_build_object(
        'id', t.id, 'name', t.name
      )) FILTER (WHERE t.id IS NOT NULL),
      '[]'::json
    ) AS teachers,
    COUNT(DISTINCT cs.student_id)::int AS students_count
  FROM classes c
  LEFT JOIN class_teachers ct ON ct.class_id = c.id
  LEFT JOIN teachers t ON t.id = ct.teacher_id
  LEFT JOIN class_students cs ON cs.class_id = c.id
`;

const validClassName = (name) =>
  typeof name === "string" && name.trim().length > 0;

router.get("/", async (req, res) => {
  try {
    const schoolFilter = req.query.school_id ? "WHERE c.school_id = $1" : "";
    const result = await db.query(`
      ${classQuery}
      ${schoolFilter}
      GROUP BY c.id
      ORDER BY c.name ASC
    `, req.query.school_id ? [req.query.school_id] : []);

    res.json(result.rows);
  } catch (error) {
    console.error("Error fetching classes:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const result = await db.query(
      `${classQuery}
       WHERE c.id = $1
       GROUP BY c.id`,
      [req.params.id]
    );

    if (!result.rows.length) {
      return res.status(404).json({ error: "Class not found" });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error("Error fetching class:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.post("/", async (req, res) => {
  try {
    const { name, description, school_id, teacher_ids = [] } = req.body;

    if (!validClassName(name) || !school_id) {
      return res.status(400).json({
        error: "Class name and school_id are required",
      });
    }

    if (
      !Array.isArray(teacher_ids) ||
      teacher_ids.some((id) => !Number.isInteger(id) || id <= 0)
    ) {
      return res.status(400).json({ error: "Invalid teacher_ids" });
    }

    const client = await db.connect();

    try {
      await client.query("BEGIN");

      const created = await client.query(
        `INSERT INTO classes (name, description, school_id)
         VALUES ($1, $2, $3)
         RETURNING id`,
        [name.trim(), description ?? null, school_id]
      );

      const classId = created.rows[0].id;

      for (const teacherId of [...new Set(teacher_ids)]) {
        await client.query(
          `INSERT INTO class_teachers (class_id, teacher_id)
           SELECT $1, id FROM teachers
           WHERE id = $2 AND school_id = $3`,
          [classId, teacherId, school_id]
        );

        const assignment = await client.query(
          `SELECT 1 FROM class_teachers
           WHERE class_id = $1 AND teacher_id = $2`,
          [classId, teacherId]
        );

        if (!assignment.rows.length) {
          throw Object.assign(new Error("Invalid teacher for this school"), {
            status: 400,
          });
        }
      }

      await client.query("COMMIT");

      const result = await db.query(
        `${classQuery} WHERE c.id = $1 GROUP BY c.id`,
        [classId]
      );

      res.status(201).json(result.rows[0]);
    } catch (error) {
      await client.query("ROLLBACK");
      throw error;
    } finally {
      client.release();
    }
  } catch (error) {
    console.error("Error creating class:", error.message);

    if (error.status === 400 || error.code === "23503") {
      return res.status(400).json({ error: error.message });
    }

    res.status(500).json({ error: "Internal server error" });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const { name, description, school_id, teacher_ids = [] } = req.body;

    if (!validClassName(name) || !school_id) {
      return res.status(400).json({
        error: "Class name and school_id are required",
      });
    }

    if (
      !Array.isArray(teacher_ids) ||
      teacher_ids.some((id) => !Number.isInteger(id) || id <= 0)
    ) {
      return res.status(400).json({ error: "Invalid teacher_ids" });
    }

    const client = await db.connect();

    try {
      await client.query("BEGIN");

      const result = await client.query(
        `UPDATE classes
         SET name = $1, description = $2, school_id = $3
         WHERE id = $4
         RETURNING id`,
        [name.trim(), description ?? null, school_id, req.params.id]
      );

      if (!result.rows.length) {
        await client.query("ROLLBACK");
        return res.status(404).json({ error: "Class not found" });
      }

      await client.query("DELETE FROM class_teachers WHERE class_id = $1", [req.params.id]);

      for (const teacherId of [...new Set(teacher_ids)]) {
        await client.query(
          `INSERT INTO class_teachers (class_id, teacher_id)
           SELECT $1, id FROM teachers
           WHERE id = $2 AND school_id = $3`,
          [req.params.id, teacherId, school_id]
        );

        const assignment = await client.query(
          `SELECT 1 FROM class_teachers
           WHERE class_id = $1 AND teacher_id = $2`,
          [req.params.id, teacherId]
        );

        if (!assignment.rows.length) {
          throw Object.assign(new Error("Invalid teacher for this school"), {
            status: 400,
          });
        }
      }

      await client.query("COMMIT");

      const updated = await db.query(
        `${classQuery} WHERE c.id = $1 GROUP BY c.id`,
        [req.params.id]
      );

      res.json(updated.rows[0]);
    } catch (error) {
      await client.query("ROLLBACK");
      throw error;
    } finally {
      client.release();
    }
  } catch (error) {
    console.error("Error updating class:", error.message);

    if (error.status === 400 || error.code === "23503") {
      return res.status(400).json({ error: error.message });
    }

    res.status(500).json({ error: "Internal server error" });
  }
});

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
    console.error("Error deleting class:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
