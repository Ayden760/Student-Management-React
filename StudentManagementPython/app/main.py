from collections.abc import AsyncGenerator
from contextlib import asynccontextmanager
from importlib import import_module

from app.api.studentapi import router as students_router
from app.implementation.services.student_service import StudentNotFoundError
from app.infrastructure.database import create_database_tables
from app.mcp.server import mcp
from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse

import_module("app.mcp.tools.student_tools")


@asynccontextmanager
async def lifespan(_: FastAPI) -> AsyncGenerator[None, None]:
    create_database_tables()
    async with mcp.session_manager.run():
        yield


app = FastAPI(
    title="Student Management API",
    description="Backend API for managing students and their grades.",
    version="0.1.0",
    lifespan=lifespan,
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://127.0.0.1:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# changes StudentNotFoundError to HTTP-404 answer
@app.exception_handler(StudentNotFoundError)
async def student_not_found_handler(
    _: Request, exception: StudentNotFoundError
) -> JSONResponse:
    student_id = exception.args[0]
    return JSONResponse(
        status_code=404,
        content={"detail": f"Student with id {student_id} was not found."},
    )


@app.get("/api/health", tags=["health"])
def health_check() -> dict[str, str]:
    return {"status": "ok"}


app.include_router(students_router, prefix="/api")

# The MCP app serves the configured Streamable HTTP endpoint at /mcp.
app.mount("/", mcp.streamable_http_app())
