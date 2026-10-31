import { useState } from "react";
import type { Student } from "./types/student";

import "./styles/App.css";
import StudentForm from "./components/StudentForm";
import StudentList from "./components/StudentList";

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
  // Add a new student
  function addStudent(newStudent: Student): void {
    setStudents((prev) => [...prev, newStudent]);
  }
  function deleteStudent(id: number) {
    // React automatically passes the latest state as an argument to the callback function.
    setStudents((prevStudents) =>
      prevStudents.filter((student) => student.id !== id),
    );
  }

  return (
    <main className="app-shell">
      {/*header of the side*/}
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

      <div className="dashboard-layout">
        {/*Shows all Students*/}
        <StudentList onDeleteStudent={deleteStudent} students={students} />
        {/*Student Form to add one*/}
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
          <StudentForm onAddStudent={addStudent} />
        </aside>
      </div>
    </main>
  );
}

export default App;
