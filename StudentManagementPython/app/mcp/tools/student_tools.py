from app.core.dtos.student import StudentCreate, StudentUpdate
from app.core.models.student import Student
from app.implementation.services.student_service import (
    StudentNotFoundError,
    StudentService,
)
from app.infrastructure.database import SessionLocal
from app.infrastructure.repositories.student_repository import StudentRepository
from app.mcp.server import mcp


def _student_to_dict(student: Student) -> dict[str, int | str]:
    return {
        "id": student.id,
        "name": student.name,
        "age": student.age,
        "grade": student.grade,
    }


@mcp.tool()
def get_all_students() -> list[dict[str, int | str]]:
    """Returns a list of all students including their ID, name, age and grade."""

    with SessionLocal() as db:
        repository = StudentRepository(db)
        service = StudentService(repository)
        return [_student_to_dict(student) for student in service.list_students()]


@mcp.tool()
def get_student_by_id(student_id: int) -> dict[str, int | str]:
    """Returns one student by ID."""
    try:
        with SessionLocal() as db:
            service = StudentService(StudentRepository(db))
            return _student_to_dict(service.get_student(student_id))
    except StudentNotFoundError as error:
        raise ValueError(f"Student with id {student_id} was not found.") from error


@mcp.tool()
def create_student(name: str, age: int, grade: int) -> dict[str, int | str]:
    """Creates a student and returns the created record."""
    student_data = StudentCreate(name=name, age=age, grade=grade)
    with SessionLocal() as db:
        service = StudentService(StudentRepository(db))
        return _student_to_dict(service.create_student(student_data))


@mcp.tool()
def update_student(
    student_id: int,
    name: str | None = None,
    age: int | None = None,
    grade: int | None = None,
) -> dict[str, int | str]:
    """Updates the provided fields of a student."""
    student_data = StudentUpdate(
        **{
            key: value
            for key, value in {"name": name, "age": age, "grade": grade}.items()
            if value is not None
        }
    )
    try:
        with SessionLocal() as db:
            service = StudentService(StudentRepository(db))
            return _student_to_dict(service.update_student(student_id, student_data))
    except StudentNotFoundError as error:
        raise ValueError(f"Student with id {student_id} was not found.") from error


@mcp.tool()
def delete_student(student_id: int) -> dict[str, int | bool]:
    """Deletes a student by ID."""
    try:
        with SessionLocal() as db:
            service = StudentService(StudentRepository(db))
            service.delete_student(student_id)
            return {"success": True, "student_id": student_id}
    except StudentNotFoundError as error:
        raise ValueError(f"Student with id {student_id} was not found.") from error
