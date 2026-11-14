from fastapi import APIRouter, Response, status

from app.api.dependencies import StudentServiceDependency
from app.core.dtos.student import StudentCreate, StudentRead, StudentUpdate

router = APIRouter(prefix="/students", tags=["students"])


@router.get("", response_model=list[StudentRead])
def list_students(service: StudentServiceDependency) -> list[StudentRead]:
    return service.list_students()


@router.post("", response_model=StudentRead, status_code=status.HTTP_201_CREATED)
def create_student(
    student_data: StudentCreate,
    service: StudentServiceDependency,
) -> StudentRead:
    return service.create_student(student_data)


@router.get("/{student_id}", response_model=StudentRead)
def get_student(student_id: int, service: StudentServiceDependency) -> StudentRead:
    return service.get_student(student_id)


@router.patch("/{student_id}", response_model=StudentRead)
def update_student(
    student_id: int,
    student_data: StudentUpdate,
    service: StudentServiceDependency,
) -> StudentRead:
    return service.update_student(student_id, student_data)


@router.delete("/{student_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_student(student_id: int, service: StudentServiceDependency) -> Response:
    service.delete_student(student_id)
    return Response(status_code=status.HTTP_204_NO_CONTENT)
