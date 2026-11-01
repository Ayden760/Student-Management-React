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
  //Union Type for Editing
  const [editingStudent, setEditingStudent] = useState<Student | null>(null);
  // Add a new student
  function addStudent(studentData: Omit<Student, "id">) {
    const newStudent: Student = {
      id: Date.now(),

      ...studentData,
    };

    setStudents((prevStudents) => [...prevStudents, newStudent]);
  }
  function deleteStudent(id: number) {
    // React automatically passes the latest state as an argument to the callback function.
    setStudents((prevStudents) =>
      prevStudents.filter((student) => student.id !== id),
    );
  }

  function updateStudent(updatedStudent: Student) {
    setStudents((prevStudents) =>
      prevStudents.map((student) =>
        student.id === updatedStudent.id ? updatedStudent : student,
      ),
    );

    setEditingStudent(null);
  }
  function editStudent(student: Student) {
    setEditingStudent(student);
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
        <StudentList
          students={students}
          onDeleteStudent={deleteStudent}
          onEditStudent={editStudent}
        />
        {/*Student Form to add one*/}
        <aside className="form-panel">
          <div className="panel-heading">
            <span className="panel-icon" aria-hidden="true">
              {editingStudent ? "✎" : "＋"}
            </span>
            <div>
              <p className="eyebrow">
                {editingStudent ? "EDIT STUDENT" : "NEW ENTRY"}
              </p>
              <p className="panel-caption">
                {editingStudent
                  ? `Editing ${editingStudent.name}`
                  : "Add a student"}
              </p>
            </div>
          </div>
          <StudentForm
            editingStudent={editingStudent}
            onAddStudent={addStudent}
            onUpdateStudent={updateStudent}
            onCancelEdit={() => setEditingStudent(null)}
          />
        </aside>
      </div>
    </main>
  );
}

export default App;
