const express = require("express");
const db = require("../db");

const router = express.Router();

const VALID_STATUSES = ["active", "invited", "pending"];

const studentQuery = `
    SELECT
        s.id,
        s.name,
        s.email,
        s.status,
        s.school_id,
        s.user_id,
        COALESCE(
            json_agg(
                DISTINCT jsonb_build_object(
                    'id', c.id,
                    'name', c.name
                )
            ) FILTER (WHERE c.id IS NOT NULL),
            '[]'::json
        ) AS classes
    FROM students s
    LEFT JOIN class_students cs
        ON cs.student_id = s.id
    LEFT JOIN classes c
        ON c.id = cs.class_id
`;

const getClassIds = (classes = []) => {
    if (!Array.isArray(classes)) {
        throw new Error("classes_assigned must be an array");
    }

    return [...new Set(
        classes.map((item) => Number(item?.id ?? item))
    )].filter(Number.isInteger);
};

const assignClasses = async (client, studentId, schoolId, classes) => {
    const classIds = getClassIds(classes);

    await client.query(
        "DELETE FROM class_students WHERE student_id = $1",
        [studentId]
    );

    for (const classId of classIds) {
        const result = await client.query(
            `INSERT INTO class_students (class_id, student_id)
             SELECT $1, $2
             WHERE EXISTS (
                 SELECT 1
                 FROM classes
                 WHERE id = $1
                   AND school_id = $3
             )`,
            [classId, studentId, schoolId]
        );

        if (!result.rowCount) {
            throw new Error("Invalid class for this school");
        }
    }
};

const getStudent = async (id) => {
    const result = await db.query(
        `${studentQuery}
         WHERE s.id = $1
         GROUP BY s.id`,
        [id]
    );

    return result.rows[0];
};

// GET students
router.get("/", async (req, res) => {
    try {
        const schoolId = req.query.school_id;

        const result = await db.query(
            `${studentQuery}
             ${schoolId ? "WHERE s.school_id = $1" : ""}
             GROUP BY s.id
             ORDER BY s.id ASC`,
            schoolId ? [schoolId] : []
        );

        res.json(result.rows);
    } catch (error) {
        console.error("Error fetching students:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

// GET student
router.get("/:id", async (req, res) => {
    try {
        const student = await getStudent(req.params.id);

        if (!student) {
            return res.status(404).json({
                error: "Student not found",
            });
        }

        res.json(student);
    } catch (error) {
        console.error("Error fetching student:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

// CREATE student
router.post("/", async (req, res) => {
    const {
        name,
        email,
        status = "pending",
        school_id,
        classes_assigned = [],
    } = req.body;

    if (!name?.trim() || !school_id) {
        return res.status(400).json({
            error: "Student name and school_id are required",
        });
    }

    if (!VALID_STATUSES.includes(status)) {
        return res.status(400).json({
            error: "Invalid student status",
        });
    }

    const client = await db.connect();

    try {
        await client.query("BEGIN");

        const result = await client.query(
            `INSERT INTO students
                (name, email, status, school_id)
             VALUES ($1, $2, $3, $4)
             RETURNING id`,
            [
                name.trim(),
                email?.trim() || null,
                status,
                school_id,
            ]
        );

        await assignClasses(
            client,
            result.rows[0].id,
            school_id,
            classes_assigned
        );

        await client.query("COMMIT");

        res.status(201).json(
            await getStudent(result.rows[0].id)
        );
    } catch (error) {
        await client.query("ROLLBACK");

        if (error.code === "23505") {
            return res.status(409).json({
                error: "Email already exists",
            });
        }

        if (error.code === "23503") {
            return res.status(400).json({
                error: "Invalid school_id",
            });
        }

        if (error.message === "Invalid class for this school") {
            return res.status(400).json({
                error: error.message,
            });
        }

        console.error("Error creating student:", error);
        res.status(500).json({
            error: "Internal server error",
        });
    } finally {
        client.release();
    }
});

// UPDATE student
router.put("/:id", async (req, res) => {
    const {
        name,
        email,
        status,
        school_id,
        classes_assigned = [],
    } = req.body;

    if (!name?.trim() || !school_id) {
        return res.status(400).json({
            error: "Student name and school_id are required",
        });
    }

    if (!VALID_STATUSES.includes(status)) {
        return res.status(400).json({
            error: "Invalid student status",
        });
    }

    const client = await db.connect();

    try {
        await client.query("BEGIN");

        const result = await client.query(
            `UPDATE students
             SET name = $1,
                 email = $2,
                 status = $3,
                 school_id = $4
             WHERE id = $5
             RETURNING id`,
            [
                name.trim(),
                email?.trim() || null,
                status,
                school_id,
                req.params.id,
            ]
        );

        if (!result.rows.length) {
            await client.query("ROLLBACK");

            return res.status(404).json({
                error: "Student not found",
            });
        }

        await assignClasses(
            client,
            req.params.id,
            school_id,
            classes_assigned
        );

        await client.query("COMMIT");

        res.json(
            await getStudent(req.params.id)
        );
    } catch (error) {
        await client.query("ROLLBACK");

        if (error.code === "23505") {
            return res.status(409).json({
                error: "Email already exists",
            });
        }

        if (error.code === "23503") {
            return res.status(400).json({
                error: "Invalid school_id",
            });
        }

        if (error.message === "Invalid class for this school") {
            return res.status(400).json({
                error: error.message,
            });
        }

        console.error("Error updating student:", error);
        res.status(500).json({
            error: "Internal server error",
        });
    } finally {
        client.release();
    }
});

// DELETE student
router.delete("/:id", async (req, res) => {
    try {
        const result = await db.query(
            "DELETE FROM students WHERE id = $1 RETURNING id",
            [req.params.id]
        );

        if (!result.rows.length) {
            return res.status(404).json({
                error: "Student not found",
            });
        }

        res.json({
            message: "Student removed successfully",
        });
    } catch (error) {
        console.error("Error deleting student:", error);
        res.status(500).json({
            error: "Internal server error",
        });
    }
});

module.exports = router;