const express = require("express");
const db = require("../db");

const router = express.Router();

const VALID_STATUSES = ["active", "invited", "pending"];

const teacherQuery = `
  SELECT
    t.id,
    t.name,
    t.email,
    t.status,
    t.school_id,
    t.user_id,
    COALESCE(
      json_agg(
        DISTINCT jsonb_build_object('id', c.id, 'name', c.name)
      ) FILTER (WHERE c.id IS NOT NULL),
      '[]'::json
    ) AS classes_assigned
  FROM teachers t
  LEFT JOIN class_teachers ct ON ct.teacher_id = t.id
  LEFT JOIN classes c ON c.id = ct.class_id
`;

const getClassIds = (classes = []) => {
  if (!Array.isArray(classes)) {
    throw new Error("classes_assigned must be an array");
  }

  return [...new Set(
    classes.map((item) => Number(item.id ?? item))
  )].filter(Boolean);
};

const assignClasses = async (client, teacherId, schoolId, classes) => {
  const classIds = getClassIds(classes);

  await client.query(
    "DELETE FROM class_teachers WHERE teacher_id = $1",
    [teacherId]
  );

  for (const classId of classIds) {
    const result = await client.query(
      `INSERT INTO class_teachers (class_id, teacher_id)
       SELECT $1, $2
       WHERE EXISTS (
         SELECT 1
         FROM classes
         WHERE id = $1 AND school_id = $3
       )`,
      [classId, teacherId, schoolId]
    );

    if (!result.rowCount) {
      throw new Error("Invalid class for this school");
    }
  }
};

const getTeacher = async (id) => {
  const result = await db.query(
    `${teacherQuery}
     WHERE t.id = $1
     GROUP BY t.id`,
    [id]
  );

  return result.rows[0];
};

// GET all teachers
router.get("/", async (req, res) => {
  try {
    const schoolId = req.query.school_id;

    const result = await db.query(
      `${teacherQuery}
       ${schoolId ? "WHERE t.school_id = $1" : ""}
       GROUP BY t.id
       ORDER BY t.id ASC`,
      schoolId ? [schoolId] : []
    );

    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// GET one teacher
router.get("/:id", async (req, res) => {
  try {
    const teacher = await getTeacher(req.params.id);

    if (!teacher) {
      return res.status(404).json({ error: "Teacher not found" });
    }

    res.json(teacher);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// CREATE teacher
router.post("/", async (req, res) => {
  const {
    name,
    email,
    status = "pending",
    school_id,
    classes_assigned = [],
  } = req.body;

  if (!name?.trim() || !email?.trim() || !school_id) {
    return res.status(400).json({
      error: "Name, email, and school_id are required",
    });
  }

  if (!VALID_STATUSES.includes(status)) {
    return res.status(400).json({ error: "Invalid teacher status" });
  }

  const client = await db.connect();

  try {
    await client.query("BEGIN");

    const result = await client.query(
      `INSERT INTO teachers
        (name, email, status, school_id)
       VALUES ($1, $2, $3, $4)
       RETURNING id`,
      [name.trim(), email.trim(), status, school_id]
    );

    await assignClasses(
      client,
      result.rows[0].id,
      school_id,
      classes_assigned
    );

    await client.query("COMMIT");

    res.status(201).json(
      await getTeacher(result.rows[0].id)
    );
  } catch (error) {
    await client.query("ROLLBACK");

    if (error.code === "23505") {
      return res.status(409).json({ error: "Email already exists" });
    }

    if (error.code === "23503") {
      return res.status(400).json({ error: "Invalid school_id" });
    }

    if (error.message === "Invalid class for this school") {
      return res.status(400).json({ error: error.message });
    }

    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  } finally {
    client.release();
  }
});

// UPDATE teacher
router.put("/:id", async (req, res) => {
  const {
    name,
    email,
    status,
    school_id,
    classes_assigned = [],
  } = req.body;

  if (!name?.trim() || !email?.trim() || !school_id) {
    return res.status(400).json({
      error: "Name, email, and school_id are required",
    });
  }

  if (!VALID_STATUSES.includes(status)) {
    return res.status(400).json({ error: "Invalid teacher status" });
  }

  const client = await db.connect();

  try {
    await client.query("BEGIN");

    const result = await client.query(
      `UPDATE teachers
       SET name = $1,
           email = $2,
           status = $3,
           school_id = $4
       WHERE id = $5
       RETURNING id`,
      [name.trim(), email.trim(), status, school_id, req.params.id]
    );

    if (!result.rows.length) {
      await client.query("ROLLBACK");
      return res.status(404).json({ error: "Teacher not found" });
    }

    await assignClasses(
      client,
      req.params.id,
      school_id,
      classes_assigned
    );

    await client.query("COMMIT");

    res.json(await getTeacher(req.params.id));
  } catch (error) {
    await client.query("ROLLBACK");

    if (error.code === "23505") {
      return res.status(409).json({ error: "Email already exists" });
    }

    if (error.code === "23503") {
      return res.status(400).json({ error: "Invalid school_id" });
    }

    if (error.message === "Invalid class for this school") {
      return res.status(400).json({ error: error.message });
    }

    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  } finally {
    client.release();
  }
});

// DELETE teacher
router.delete("/:id", async (req, res) => {
  try {
    const result = await db.query(
      "DELETE FROM teachers WHERE id = $1 RETURNING id",
      [req.params.id]
    );

    if (!result.rows.length) {
      return res.status(404).json({ error: "Teacher not found" });
    }

    res.json({ message: "Teacher deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;