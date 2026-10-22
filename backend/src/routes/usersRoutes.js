
const express = require("express");
const bcrypt = require("bcrypt");
const db = require("../db");

const router = express.Router();

const validRoles = ["admin", "teacher", "student"];
const validStatuses = ["active", "invited", "pending"];

const userQuery = `
  SELECT
    u.id,
    u.school_id,
    u.name,
    u.email,
    u.status,
    u.created_at,
    COALESCE(
      json_agg(ur.role ORDER BY ur.role)
        FILTER (WHERE ur.role IS NOT NULL),
      '[]'::json
    ) AS roles
  FROM users u
  LEFT JOIN user_roles ur ON ur.user_id = u.id
`;

router.get("/", async (req, res) => {
  try {
    const schoolFilter = req.query.school_id ? "WHERE u.school_id = $1" : "";
    const result = await db.query(`
      ${userQuery}
      ${schoolFilter}
      GROUP BY u.id
      ORDER BY u.id
    `, req.query.school_id ? [req.query.school_id] : []);

    res.json(result.rows);
  } catch (error) {
    console.error("Error fetching users:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const result = await db.query(
      `${userQuery}
       WHERE u.id = $1
       GROUP BY u.id`,
      [req.params.id]
    );

    if (!result.rows.length) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error("Error fetching user:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.post("/", async (req, res) => {
  const {
    school_id,
    name,
    email,
    password,
    roles,
    status = "active",
  } = req.body;

  if (
    !school_id ||
    !name?.trim() ||
    !email?.trim() ||
    typeof password !== "string" ||
    password.length < 8
  ) {
    return res.status(400).json({
      error: "school_id, name, email, and a password of at least 8 characters are required",
    });
  }

  if (
    !Array.isArray(roles) ||
    roles.length === 0 ||
    roles.some((role) => !validRoles.includes(role)) ||
    new Set(roles).size !== roles.length
  ) {
    return res.status(400).json({
      error: "Provide unique roles: admin, teacher, or student",
    });
  }

  if (!validStatuses.includes(status)) {
    return res.status(400).json({ error: "Invalid user status" });
  }

  const client = await db.connect();

  try {
    const passwordHash = await bcrypt.hash(password, 12);

    await client.query("BEGIN");

    const created = await client.query(
      `INSERT INTO users
         (school_id, name, email, password_hash, role, status)
       VALUES ($1, $2, $3, $4, $5, $6)
       RETURNING id, school_id, name, email, status, created_at`,
      [
        school_id,
        name.trim(),
        email.trim().toLowerCase(),
        passwordHash,
        roles[0],
        status,
      ]
    );

    const user = created.rows[0];

    for (const role of roles) {
      await client.query(
        "INSERT INTO user_roles (user_id, role) VALUES ($1, $2)",
        [user.id, role]
      );
    }

    await client.query("COMMIT");

    res.status(201).json({ ...user, roles });
  } catch (error) {
    await client.query("ROLLBACK");
    console.error("Error creating user:", error.message);

    if (error.code === "23505") {
      return res.status(409).json({ error: "Email already exists" });
    }

    if (error.code === "23503") {
      return res.status(400).json({ error: "Invalid school_id" });
    }

    res.status(500).json({ error: "Internal server error" });
  } finally {
    client.release();
  }
});

router.put("/:id", async (req, res) => {
  const { name, email, school_id, status, roles, password } = req.body;

  if (
    !name?.trim() ||
    !email?.trim() ||
    !school_id ||
    !validStatuses.includes(status) ||
    !Array.isArray(roles) ||
    roles.length === 0 ||
    roles.some((role) => !validRoles.includes(role)) ||
    new Set(roles).size !== roles.length
  ) {
    return res.status(400).json({ error: "Invalid user details or roles" });
  }

  if (
    password !== undefined &&
    (typeof password !== "string" || password.length < 8)
  ) {
    return res.status(400).json({
      error: "Password must contain at least 8 characters",
    });
  }

  const client = await db.connect();

  try {
    await client.query("BEGIN");

    const values = [
      name.trim(),
      email.trim().toLowerCase(),
      school_id,
      roles[0],
      status,
    ];

    let passwordSql = "";

    if (password !== undefined) {
      values.push(await bcrypt.hash(password, 12));
      passwordSql = `, password_hash = $${values.length}`;
    }

    values.push(req.params.id);

    const updated = await client.query(
      `UPDATE users
       SET name = $1, email = $2, school_id = $3,
           role = $4, status = $5 ${passwordSql}
       WHERE id = $${values.length}
       RETURNING id, school_id, name, email, status, created_at`,
      values
    );

    if (!updated.rows.length) {
      await client.query("ROLLBACK");
      return res.status(404).json({ error: "User not found" });
    }

    await client.query(
      "DELETE FROM user_roles WHERE user_id = $1",
      [req.params.id]
    );

    for (const role of roles) {
      await client.query(
        "INSERT INTO user_roles (user_id, role) VALUES ($1, $2)",
        [req.params.id, role]
      );
    }

    await client.query("COMMIT");

    res.json({ ...updated.rows[0], roles });
  } catch (error) {
    await client.query("ROLLBACK");
    console.error("Error updating user:", error.message);

    if (error.code === "23505") {
      return res.status(409).json({ error: "Email already exists" });
    }

    if (error.code === "23503") {
      return res.status(400).json({ error: "Invalid school_id" });
    }

    res.status(500).json({ error: "Internal server error" });
  } finally {
    client.release();
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const result = await db.query(
      "DELETE FROM users WHERE id = $1 RETURNING id",
      [req.params.id]
    );

    if (!result.rows.length) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json({ message: "User deleted successfully" });
  } catch (error) {
    console.error("Error deleting user:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
