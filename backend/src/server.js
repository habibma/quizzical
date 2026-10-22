
const express = require("express");
const cors = require("cors");
const pool = require("./db");

const studentRoutes = require("./routes/studentRoutes");
const classRoutes = require("./routes/classesRoutes");
const teacherRoutes = require("./routes/teachersRoutes");
const userRoutes = require("./routes/usersRoutes");
const schoolRoutes = require("./routes/schoolsRoutes");

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(cors({ origin: "http://localhost:5173" }));

// Use the student routes for any requests to /api/students
app.use("/api/students", studentRoutes);

// Use the class routes for any requests to /api/classes
app.use("/api/classes", classRoutes);

// Use the teacher routes for any requests to /api/teachers
app.use("/api/teachers", teacherRoutes);

// Use the user routes for any requests to /api/users
app.use("/api/users", userRoutes);

// Use the school routes for any requests to /api/schools
app.use("/api/schools", schoolRoutes);

pool.query("SELECT 1")
  .then(() => console.log("Connected to PostgreSQL"))
  .catch((err) => console.error("Database connection failed:", err.message));

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});