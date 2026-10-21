const express = require('express');
const db = require('../db');

const router = express.Router();

const normalizeTeacher = (teacher = {}) => ({
  id: teacher.id,
  name: teacher.name ?? '',
  email: teacher.email ?? '',
  subject: teacher.subject ?? teacher.department ?? 'General',
  status: teacher.status ?? 'Active',
  profile_pic: teacher.profile_pic ?? null,
  classesAssigned: Array.isArray(teacher.classes_assigned)
    ? teacher.classes_assigned
    : [],
});

router.get('/', async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM teachers ORDER BY id ASC');
    res.json(result.rows.map(normalizeTeacher));
  } catch (error) {
    console.error('Error fetching teachers:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const result = await db.query(
      'SELECT * FROM teachers WHERE id = $1',
      [req.params.id]
    );

    if (!result.rows.length) {
      return res.status(404).json({ error: 'Teacher not found' });
    }

    res.json(normalizeTeacher(result.rows[0]));
  } catch (error) {
    console.error('Error fetching teacher:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.post('/', async (req, res) => {
  try {
    const { name, email, status } = req.body;

    if (!name || !email) {
      return res.status(400).json({ error: 'Name and email are required' });
    }

    const result = await db.query(
      `INSERT INTO teachers
       (name, email, status)
       VALUES ($1, $2, $3)
       RETURNING *`,
      [
        name,
        email,
        status ?? 'pending',
      ]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Error creating teacher:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const { name, email, status } = req.body;

    const result = await db.query(
      `UPDATE teachers
       SET name = $1, email = $2, status = $3
       WHERE id = $4
       RETURNING *`,
      [
        name,
        email,
        status ?? 'active',
        req.params.id,
      ]
    );

    if (!result.rows.length) {
      return res.status(404).json({ error: 'Teacher not found' });
    }

    res.json(normalizeTeacher(result.rows[0]));
  } catch (error) {
    console.error('Error updating teacher:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const result = await db.query(
      'DELETE FROM teachers WHERE id = $1 RETURNING id',
      [req.params.id]
    );

    if (!result.rows.length) {
      return res.status(404).json({ error: 'Teacher not found' });
    }

    res.json({ message: 'Teacher deleted successfully' });
  } catch (error) {
    console.error('Error deleting teacher:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;