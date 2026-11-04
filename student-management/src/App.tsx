import { useState } from "react";
import type { Student, Grade } from "./types/student";

import "./styles/App.css";
import StudentForm from "./components/StudentForm";
import StudentList from "./components/StudentList";
import StudentStats from "./components/StudentStats";

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
    {
      id: 4,
      name: "Dieter",
      age: 19,
      grade: 4,
    },
    {
      id: 5,
      name: "Kenny",
      age: 20,
      grade: 5,
    },
    {
      id: 6,
      name: "Adrian",
      age: 34,
      grade: 6,
    },
    {
      id: 7,
      name: "Ingrid",
      age: 67,
      grade: 2,
    },
    {
      id: 8,
      name: "Micha",
      age: 6,
      grade: 3,
    },
  ]);

  //Union Type for Editing
  const [editingStudent, setEditingStudent] = useState<Student | null>(null);

  const [searchTerm, setSearchTerm] = useState<string>("");

  const [gradeFilter, setGradeFilter] = useState<Grade | "all">("all");

  const filteredStudents = students.filter((student) => {
    const matchesSearch = student.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    const matchesGrade = gradeFilter === "all" || student.grade === gradeFilter;

    return matchesSearch && matchesGrade;
  });

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

      <div className="student-filters">
        <input
          type="text"
          placeholder="Search students..."
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
        />
        <select
          value={gradeFilter}
          onChange={(event) =>
            setGradeFilter(
              event.target.value === "all"
                ? "all"
                : (Number(event.target.value) as Grade),
            )
          }
        >
          <option value="all">All Grades</option>
          <option value="1">Grade 1</option>
          <option value="2">Grade 2</option>
          <option value="3">Grade 3</option>
          <option value="4">Grade 4</option>
          <option value="5">Grade 5</option>
          <option value="6">Grade 6</option>
        </select>
      </div>

      <div className="dashboard-layout">
        {/*Shows all Students*/}
        <StudentList
          students={filteredStudents}
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
          <StudentStats students={filteredStudents} />
        </aside>
      </div>
    </main>
  );
}

export default App;
