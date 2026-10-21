
const express = require("express");
const cors = require("cors");
const pool = require("./db");

const studentRoutes = require("./routes/studentRoutes");
const classRoutes = require("./routes/classesRoutes");
const teacherRoutes = require("./routes/teachersRoutes");

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

pool.on("connect", () => {
  console.log("Connected to the database");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});