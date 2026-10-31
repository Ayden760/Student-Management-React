// {} indicates a named import, not specifically a TypeScript type.
// The "type" keyword indicates that Student is a TypeScript type.
import type { Student } from "../types/student";
import StudentCard from "./StudentCard";

interface StudentListProps {
  students: Student[];
  onDeleteStudent: (id: number) => void;
}

export default function StudentList({
  students,
  onDeleteStudent,
}: StudentListProps) {
  return (
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
            <StudentCard
              key={student.id}
              student={student}
              onDeleteStudent={onDeleteStudent}
            />
          ))}
        </div>
      )}
    </section>
  );
}
