import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css"; // import CSS

function App() {
  const [students, setStudents] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    email: "",
    course: "",
    enroll: ""
  });

  useEffect(() => {
    axios.get("http://localhost:5000/students")
      .then(res => setStudents(res.data));
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const addStudent = () => {
    axios.post("http://localhost:5000/students", formData)
      .then(() => window.location.reload());
  };

  return (
    <div className="container">
      <h1 className="title">🎓 Student Management</h1>
      
      <div className="form">
        <input name="name" value={formData.name} onChange={handleChange} placeholder="Full Name" />
        <input name="age" value={formData.age} onChange={handleChange} placeholder="Age" />
        <input name="email" value={formData.email} onChange={handleChange} placeholder="Email" />
        <input name="course" value={formData.course} onChange={handleChange} placeholder="Course" />
        <input name="enroll" value={formData.enroll} onChange={handleChange} placeholder="Enrollment No." />
        <button onClick={addStudent}>Add Student</button>
      </div>

      <h2 className="subtitle">📋 Student List</h2>
      <table className="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Age</th>
            <th>Email</th>
            <th>Course</th>
            <th>Enrollment No.</th>
          </tr>
        </thead>
        <tbody>
          {students.map((s) => (
            <tr key={s.id}>
              <td>{s.name}</td>
              <td>{s.age}</td>
              <td>{s.email}</td>
              <td>{s.course}</td>
              <td>{s.enroll}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
