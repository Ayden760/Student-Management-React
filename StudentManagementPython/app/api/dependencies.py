from typing import Annotated

from fastapi import Depends
from sqlalchemy.orm import Session

from app.implementation.services.student_service import StudentService
from app.infrastructure.database import get_db
from app.infrastructure.repositories.student_repository import StudentRepository


def get_student_service(db: Annotated[Session, Depends(get_db)]) -> StudentService:
    return StudentService(StudentRepository(db))


StudentServiceDependency = Annotated[StudentService, Depends(get_student_service)]
