import { useState, useEffect } from "react";
import type { Student, Grade, StudentCreate } from "./types/student";

import "./styles/App.css";
import StudentForm from "./components/StudentForm";
import StudentList from "./components/StudentList";
import StudentStats from "./components/StudentStats";

import {
  getStudents,
  createStudent,
  updateStudent as updateStudentApi,
  deleteStudent as deleteStudentApi,
} from "./api/studentapi";

function App() {
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadStudents() {
      try {
        const data = await getStudents();
        setStudents(data);
      } catch (error) {
        setError("Could not load students.");
      } finally {
        setLoading(false);
      }
    }

    loadStudents();
  }, []);

  //useEffect reacts to changes her for a change of students.length
  useEffect(() => {
    document.title = `Student Management (${students.length})`;
  }, [students.length]);

  //Union Type for Editing
  const [editingStudent, setEditingStudent] = useState<Student | null>(null);

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setEditingStudent(null);
      }
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const [searchTerm, setSearchTerm] = useState<string>(() => {
    return localStorage.getItem("searchTerm") ?? "";
  });

  //
  useEffect(() => {
    localStorage.setItem("searchTerm", searchTerm);
  }, [searchTerm]);

  //

  const [gradeFilter, setGradeFilter] = useState<Grade | "all">("all");

  const filteredStudents = students.filter((student) => {
    const matchesSearch = student.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    const matchesGrade = gradeFilter === "all" || student.grade === gradeFilter;

    return matchesSearch && matchesGrade;
  });

  // Add a new student
  async function addStudent(studentData: StudentCreate) {
    try {
      const newStudent = await createStudent(studentData);

      setStudents((prevStudents) => [...prevStudents, newStudent]);
    } catch (error) {
      setError("Could not create student.");
      throw error;
    }
  }

  async function deleteStudent(id: number) {
    try {
      await deleteStudentApi(id);

      setStudents((prevStudents) =>
        prevStudents.filter((student) => student.id !== id),
      );
    } catch (error) {
      setError("Could not delete student.");
    }
  }

  async function updateStudent(updatedStudent: Student) {
    try {
      const { id, ...studentData } = updatedStudent;
      const updated = await updateStudentApi(id, studentData);
      setStudents((prevStudents) =>
        prevStudents.map((student) =>
          student.id === updated.id ? updated : student,
        ),
      );

      setEditingStudent(null);
    } catch (error) {
      setError("Could not update student.");
    }
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

      <StudentStats students={students} />

      <div className="dashboard-layout">
        {/*Shows all Students*/}
        {loading && <p>Loading students...</p>}

        {error && <p className="error-message">{error}</p>}
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
        </aside>
      </div>
    </main>
  );
}

export default App;
