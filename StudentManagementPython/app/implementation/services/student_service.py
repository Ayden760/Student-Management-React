from app.core.dtos.student import StudentCreate, StudentUpdate
from app.core.models.student import Student
from app.infrastructure.repositories.student_repository import StudentRepository


class StudentNotFoundError(Exception):
    """Raised when a requested student does not exist."""


class StudentService:
    """Business operations for students, backed by a repository."""

    def __init__(self, repository: StudentRepository) -> None:
        self._repository = repository

    def list_students(self) -> list[Student]:
        return self._repository.list()

    def get_student(self, student_id: int) -> Student:
        student = self._repository.get(student_id)
        if student is None:
            raise StudentNotFoundError(student_id)
        return student

    def create_student(self, data: StudentCreate) -> Student:
        return self._repository.create(data)

    def update_student(self, student_id: int, data: StudentUpdate) -> Student:
        student = self.get_student(student_id)
        return self._repository.update(student, data)

    def delete_student(self, student_id: int) -> None:
        student = self.get_student(student_id)
        self._repository.delete(student)
