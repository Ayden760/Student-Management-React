import type { Student } from "../types/student";
import "../styles/StudentCardModule.css";

interface StudentCardProps {
  student: Student;
  onDeleteStudent: (id: number) => void;
}

function StudentCard({ student, onDeleteStudent }: StudentCardProps) {
  return (
    <article className="student-card">
      <div className="student-card-top">
        <div className="student-avatar" aria-hidden="true">
          {student.name.trim().charAt(0).toUpperCase()}
        </div>
        <span className={`grade-badge grade-${student.grade}`}>
          Grade {student.grade}
        </span>
      </div>
      <h3>{student.name}</h3>
      <p className="student-card-label">Student</p>
      <div className="student-card-divider" />
      <p className="student-detail">
        <span>Age</span>
        <strong>{student.age} years</strong>
      </p>
      <button
        className="student-delete-button"
        type="button"
        aria-label={`Delete ${student.name}`}
        onClick={() => onDeleteStudent(student.id)}
      >
        <svg
          aria-hidden="true"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M4.5 6h11m-9.5 0 .6 9.2c.05.75.67 1.3 1.42 1.3h3.96c.75 0 1.37-.55 1.42-1.3L14 6M8 6V4.8c0-.72.58-1.3 1.3-1.3h1.4c.72 0 1.3.58 1.3 1.3V6m-3 3v4m3-4v4"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <span>Delete</span>
      </button>
    </article>
  );
}

export default StudentCard;
