# StudentManagementPython API

Standalone Python backend for the Student Management app.

## Stack

- FastAPI for HTTP endpoints and automatic OpenAPI documentation
- SQLAlchemy 2 for persistence
- SQLite by default; configure another SQLAlchemy database URL through `DATABASE_URL`
- Pydantic DTOs for input validation and response serialization

## Project structure

```text
StudentManagementPython/
├── app/
│   ├── api/                 # HTTP routes and dependency wiring
│   │   └── studentapi.py    # Student CRUD endpoints
│   ├── core/
│   │   ├── dtos/            # Request/response DTOs
│   │   └── models/          # SQLAlchemy entities and declarative base
│   ├── implementation/
│   │   └── services/        # Student business logic
│   ├── infrastructure/
│   │   ├── repositories/    # Database access implementation
│   │   └── database.py      # Engine, session lifecycle, table setup
│   └── main.py              # FastAPI app, CORS, error handling
├── requirements.txt
└── .gitignore
```

## Run locally

From this directory, create and activate a virtual environment, then install dependencies:

```sh
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
uvicorn app.main:app --reload
```

On Windows PowerShell, activate with `.venv\Scripts\Activate.ps1` instead.

The API is available at `http://127.0.0.1:8000`. Interactive API documentation is at `http://127.0.0.1:8000/docs`; health check: `http://127.0.0.1:8000/api/health`.

The SQLite database and `students` table are created automatically at startup. By default, the database file is `student_management.db` in the current working directory. To use another database, set `DATABASE_URL` before starting the server, for example `export DATABASE_URL="sqlite:///./student_management.db"` on macOS/Linux.

## Endpoints

| Method | Path | Purpose |
| --- | --- | --- |
| GET | `/api/students` | List students |
| POST | `/api/students` | Create a student |
| GET | `/api/students/{id}` | Get one student |
| PUT | `/api/students/{id}` | Replace a student's editable data |
| DELETE | `/api/students/{id}` | Delete a student |
| GET | `/api/health` | Health check |

Student fields: `name` (1–100 non-whitespace characters), `age` (1–120), and `grade` (1–6). Missing student IDs return HTTP 404; invalid request data returns HTTP 422.

CORS currently allows the Vite development origins `http://localhost:5173` and `http://127.0.0.1:5173`. The frontend API client can be connected in a later step.
