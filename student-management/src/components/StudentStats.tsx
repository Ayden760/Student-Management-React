// {} indicates a named import, not specifically a TypeScript type.
// The "type" keyword indicates that Student is a TypeScript type.
import type { Grade, Student } from "../types/student";
import "../styles/StudentStats.css";

interface StudentStatsProps {
  students: Student[];
}

export default function StudentStats({ students }: StudentStatsProps) {
  const totalStudents = students.length;
  const totalAge = students.reduce(
    (accumulator, student) => accumulator + student.age,
    0,
  );
  const averageAge = totalStudents > 0 ? totalAge / totalStudents : 0;
  const grades: Grade[] = [1, 2, 3, 4, 5, 6];

  return (
    <section className="student-stats" aria-labelledby="stats-title">
      <div className="stats-heading">
        <div>
          <p className="eyebrow">AT A GLANCE</p>
          <h2 id="stats-title">Student Statistics</h2>
        </div>
        <p className="stats-description">A summary of your student group</p>
      </div>

      <div className="stats-summary">
        <article className="stat-card stat-card-primary">
          <span className="stat-icon" aria-hidden="true">
            ♙
          </span>
          <div>
            <p className="stat-label">Total Students</p>
            <strong className="stat-value">{totalStudents}</strong>
            <p className="stat-support">Currently enrolled</p>
          </div>
        </article>
        <article className="stat-card stat-card-age">
          <span className="stat-icon" aria-hidden="true">
            ◷
          </span>
          <div>
            <p className="stat-label">Average Age</p>
            <strong className="stat-value">
              {averageAge.toFixed(1)} <small>years</small>
            </strong>
            <p className="stat-support">Across all students</p>
          </div>
        </article>
      </div>

      <div className="grade-stats" aria-label="Students by grade">
        {grades.map((grade) => {
          const count = students.filter(
            (student) => student.grade === grade,
          ).length;
          const percentage =
            totalStudents > 0 ? (count / totalStudents) * 100 : 0;

          return (
            <article className={`grade-stat grade-stat-${grade}`} key={grade}>
              <div className="grade-stat-heading">
                <span>Grade {grade}</span>
                <strong>{count}</strong>
              </div>
              <div
                className="grade-stat-track"
                role="progressbar"
                aria-label={`Grade ${grade} students`}
                aria-valuemin={0}
                aria-valuemax={totalStudents || 1}
                aria-valuenow={count}
              >
                <span style={{ width: `${percentage}%` }} />
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
