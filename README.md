# Subscriptions Project

This repository contains a subscription management application with:

- A FastAPI backend for authentication, plans, subscriptions, and reporting
- A React + Vite frontend for user and admin flows
- A PostgreSQL-backed data layer configured through environment variables

## Tech Stack

- Backend: FastAPI, SQLAlchemy, PostgreSQL, python-jose, passlib
- Frontend: React, TypeScript, Vite, Axios, Tailwind CSS

## How to Run the Project

### Prerequisites

- Python 3.10+
- Node.js 18+
- npm
- PostgreSQL

### 1. Configure the backend

Create a `.env` file inside `backend/` with these variables:

```env
DATABASE_URL=postgresql://username:password@localhost:5432/subscriptions
SECRET_KEY=your-secret-key
ALGORITHM=HS256
FRONTEND_URL=http://localhost:5173
```

Install backend dependencies:

```powershell
cd backend
python -m venv .venv
.\.venv\Scripts\Activate.ps1
pip install -r requirements.txt
```

Start the backend server:

```powershell
uvicorn main:app --reload
```

Default backend URL:

```text
http://127.0.0.1:8000
```

### 2. Configure the frontend

Create a `.env` file inside `frontend/` with:

```env
VITE_BACKEND_BASE_URL=http://127.0.0.1:8000
```

Install frontend dependencies:

```powershell
cd frontend
npm install
```

Start the frontend dev server:

```powershell
npm run dev
```

Default frontend URL:

```text
http://localhost:5173
```

### 3. Run both services together

Use two terminals:

Terminal 1:

```powershell
cd backend
.\.venv\Scripts\Activate.ps1
uvicorn main:app --reload
```

Terminal 2:

```powershell
cd frontend
npm install
npm run dev
```

## Folder Structure Explanation

```text
subscriptions/
|-- backend/
|   |-- main.py
|   |-- database.py
|   |-- requirements.txt
|   |-- models/
|   |-- repository/
|   |-- routes/
|   |-- schema/
|   |-- services/
|   `-- utils/
`-- frontend/
    |-- public/
    `-- src/
```

### Backend

- `backend/main.py`: Creates the FastAPI app, enables CORS, starts the scheduler, and registers route modules.
- `backend/database.py`: Configures the SQLAlchemy engine, session factory, and database dependency.
- `backend/models/`: SQLAlchemy models such as users, plans, subscriptions, movies, and status enums.
- `backend/repository/`: Database access helpers used by the service layer.
- `backend/routes/`: API route definitions grouped by domain.
- `backend/schema/`: Pydantic request and response schemas.
- `backend/services/`: Business logic for auth, plans, and subscriptions.
- `backend/utils/`: Shared utilities such as environment config, JWT helpers, and the scheduler.

### Frontend

- `frontend/src/main.tsx`: Frontend entry point.
- `frontend/src/App.tsx`: Top-level app routing and layout composition.
- `frontend/src/components/`: Reusable UI components such as navbar, cards, and route guards.
- `frontend/src/context/`: React context providers for auth and subscription state.
- `frontend/src/pages/`: Route-level screens for users and admins.
- `frontend/src/services/api.ts`: Shared Axios client configured with the backend base URL and cookies.
- `frontend/src/types/`: Shared TypeScript types used across the UI.

## API Endpoints

Base URL:

```text
http://127.0.0.1:8000
```

### Auth

#### `POST /auth/signup`

Creates a new user.

Request body:

```json
{
  "name": "Alice",
  "email": "alice@example.com",
  "password": "secret123"
}
```

#### `POST /auth/login`

Authenticates a user and sets an `access_token` cookie.

Request body:

```json
{
  "email": "alice@example.com",
  "password": "secret123"
}
```

#### `POST /auth/logout`

Logs out the current user by clearing the auth cookie.

#### `GET /auth/me`

Returns the currently authenticated user from the JWT cookie.

### Plans

#### `GET /plans/get-plans`

Returns all available subscription plans.

#### `PUT /plans/update/{id}`

Updates a plan. Requires admin authentication.

Path parameter:

- `id`: Plan ID

Request body:

```json
{
  "name": "Premium",
  "description": "Access to all features",
  "price": 499,
  "duration_days": 30
}
```

#### `DELETE /plans/delete/{id}`

Deletes a plan. Requires admin authentication.

Path parameter:

- `id`: Plan ID

#### `GET /plans/get-movies`

Returns all movies available in the catalog.

#### `GET /plans/movies/{movie_id}`

Returns a single movie by ID.

Path parameter:

- `movie_id`: Movie ID

### Subscriptions

#### `POST /subscriptions/create`

Creates a subscription for the logged-in user.

Requires user authentication.

Request body:

```json
{
  "plan_id": 1
}
```

#### `POST /subscriptions/{sub_id}/cancel`

Cancels a subscription.

Requires user authentication.

Path parameter:

- `sub_id`: Subscription ID

#### `POST /subscriptions/change/{plan_id}`

Changes the logged-in user subscription to another plan.

Requires user authentication.

Path parameter:

- `plan_id`: Target plan ID

#### `GET /subscriptions/active-subscription`

Returns the current active subscription for the logged-in user.

Requires user authentication.

#### `GET /subscriptions/revenue-report`

Returns revenue report data.

Requires admin authentication.

## Notes

- The backend enables CORS for the value defined in `FRONTEND_URL`.
- Authentication is cookie-based through the `access_token` cookie.
- SQLAlchemy tables are created at app startup through `Base.metadata.create_all(bind=engine)`.
