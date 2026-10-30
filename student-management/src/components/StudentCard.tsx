import type { Student } from "../types/student";
import "../styles/StudentCardModule.css";

interface StudentCardProps {
  student: Student;
}

function StudentCard({ student }: StudentCardProps) {
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
    </article>
  );
}

export default StudentCard;
