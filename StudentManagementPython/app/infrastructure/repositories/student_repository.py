from app.core.dtos.student import StudentCreate, StudentUpdate
from app.core.models.student import Student
from sqlalchemy import select
from sqlalchemy.orm import Session


class StudentRepository:
    """Database operations for Student records."""

    def __init__(self, db: Session) -> None:
        self._db = db

    def list(self) -> list[Student]:
        statement = select(Student).order_by(Student.id)
        return list(self._db.scalars(statement).all())

    def get(self, student_id: int) -> Student | None:
        return self._db.get(Student, student_id)

    def create(self, data: StudentCreate) -> Student:
        student = Student(**data.model_dump())
        self._db.add(student)
        self._db.commit()
        self._db.refresh(student)
        return student

    def update(self, student: Student, data: StudentUpdate) -> Student:
        for field, value in data.model_dump(
            exclude_unset=True, exclude_none=True
        ).items():
            setattr(student, field, value)
        self._db.commit()
        self._db.refresh(student)
        return student

    def delete(self, student: Student) -> None:
        self._db.delete(student)
        self._db.commit()
