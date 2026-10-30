import { useState } from "react";
import type { Student } from "./types/student";

import "./styles/App.css";
import StudentForm from "./components/StudentForm";
import StudentCard from "./components/StudentCard";

function App() {
  const [students, setStudents] = useState<Student[]>([
    {
      id: 1,
      name: "Max",
      age: 17,
      grade: 2,
    },
    {
      id: 2,
      name: "Lisa",
      age: 16,
      grade: 1,
    },
    {
      id: 3,
      name: "Tim",
      age: 18,
      grade: 3,
    },
  ]);

  return (
    <main className="app-shell">
      //header of the side
      <header className="page-header">
        <div className="brand-mark" aria-hidden="true">
          S
        </div>
        <div>
          <p className="eyebrow">LEARNING PLATFORM · MANAGEMENT</p>
          <h1>Student Management</h1>
          <p className="page-intro">
            Keep track of your students and their performance at a glance.
          </p>
        </div>
      </header>
      //Shows all Students
      <div className="dashboard-layout">
        <section className="student-section" aria-labelledby="students-title">
          <div className="section-heading">
            <div>
              <p className="eyebrow">OVERVIEW</p>
              <h2 id="students-title">Your Students</h2>
            </div>
            <span className="student-count">
              {students.length} {students.length === 1 ? "student" : "students"}
            </span>
          </div>

          {students.length === 0 ? (
            <div className="empty-state">
              <span className="empty-icon" aria-hidden="true">
                ＋
              </span>
              <h3>No students yet</h3>
              <p>Add your first student using the form.</p>
            </div>
          ) : (
            <div className="student-grid">
              {students.map((student) => (
                <StudentCard key={student.id} student={student} />
              ))}
            </div>
          )}
        </section>
        //Student Form to add one
        <aside className="form-panel">
          <div className="panel-heading">
            <span className="panel-icon" aria-hidden="true">
              ＋
            </span>
            <div>
              <p className="eyebrow">NEW ENTRY</p>
              <p className="panel-caption">Add a student</p>
            </div>
          </div>
          <StudentForm />
        </aside>
      </div>
    </main>
  );
}

export default App;
