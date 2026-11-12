from app.core.models.base import Base
from sqlalchemy import CheckConstraint, Integer, String
from sqlalchemy.orm import Mapped, mapped_column


class Student(Base):
    __tablename__ = "students"
    __table_args__ = (
        CheckConstraint("age >= 1 AND age <= 120", name="ck_students_age_range"),
        CheckConstraint("grade >= 1 AND grade <= 6", name="ck_students_grade_range"),
    )

    id: Mapped[int] = mapped_column(Integer, primary_key=True, index=True)
    name: Mapped[str] = mapped_column(String(100), nullable=False, index=True)
    age: Mapped[int] = mapped_column(Integer, nullable=False)
    grade: Mapped[int] = mapped_column(Integer, nullable=False)
