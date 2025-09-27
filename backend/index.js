const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// ✅ MySQL connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",   // change this to your MySQL root password
  database: "studentsdb"
});

// ✅ Ensure table exists
db.query(`CREATE TABLE IF NOT EXISTS students (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255),
  age INT,
  email VARCHAR(255),
  course VARCHAR(100),
  enroll VARCHAR(50)
)`);

// ✅ Get all students
app.get("/students", (req, res) => {
  db.query("SELECT * FROM students", (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.json(result);
  });
});
app.post("/students", (req, res) => {
  const { name, age, email, course, enroll } = req.body;
  db.query(
    "INSERT INTO students (name, age, email, course, enroll) VALUES (?, ?, ?, ?, ?)",
    [name, age, email, course, enroll],
    (err) => {
      if (err) return res.status(500).json({ error: err });
      res.json({ message: "Student added successfully!" });
    }
  );
});

// ✅ Update a student
app.put("/students/:id", (req, res) => {
  const { id } = req.params;
  const { name, age, email, course, enroll } = req.body;
  db.query(
    "UPDATE students SET name=?, age=?, email=?, course=?, enroll=? WHERE id=?",
    [name, age, email, course, enroll, id],
    (err) => {
      if (err) return res.status(500).json({ error: err });
      res.json({ message: "Student updated successfully!" });
    }
  );
});

// ✅ Delete a student
app.delete("/students/:id", (req, res) => {
  const { id } = req.params;
  db.query("DELETE FROM students WHERE id=?", [id], (err) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ message: "Student deleted successfully!" });
  });
});

// ✅ Start server
app.listen(5000, () => {
  console.log("🚀 Backend running on port 5000");
});
