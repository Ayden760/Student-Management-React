from typing import Literal

from pydantic import BaseModel, ConfigDict, Field, field_validator

GradeValue = Literal[1, 2, 3, 4, 5, 6]


class StudentCreate(BaseModel):
    name: str = Field(min_length=1, max_length=100)
    age: int = Field(ge=1, le=120)
    grade: GradeValue

    @field_validator("name")
    @classmethod
    def strip_name(cls, value: str) -> str:
        name = value.strip()
        if not name:
            raise ValueError("Name must not be blank.")
        return name


class StudentUpdate(StudentCreate):
    """Complete set of editable student fields."""


class StudentRead(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    name: str
    age: int
    grade: GradeValue
