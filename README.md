# ResumeFlow — React + Django Full Stack

FlowCV-style resume builder with **React (Vite)** frontend and **Django REST** backend.

## Project structure

```
resumeflow/
├── backend/          # Django REST API
│   ├── manage.py
│   ├── requirements.txt
│   ├── resumeflow_api/
│   ├── resumes/      # Resume CRUD + templates API
│   └── accounts/     # Register / Login JWT
├── src/              # React frontend (Vite)
├── package.json
└── vite.config.js    # proxies /api → Django
```

## Tech stack

| Layer | Technology |
|-------|------------|
| Frontend | React 19, Vite, Tailwind CSS |
| Backend | Django 5, Django REST Framework |
| Auth | JWT (simplejwt) |
| Database | SQLite (dev) |
| PDF | html2canvas + jsPDF |

---

## Quick start

### 1 — Backend (Django)

```powershell
cd backend
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
copy .env.example .env
python manage.py migrate
python manage.py runserver
```

API runs at **http://127.0.0.1:8000**

### 2 — Frontend (React)

New terminal:

```powershell
cd resumeflow
npm install
npm run dev
```

App runs at **http://localhost:5173**

---

## API endpoints

| Method | URL | Description |
|--------|-----|-------------|
| GET | `/api/templates/` | List all 20 templates |
| POST | `/api/resumes/` | Create resume (guest OK) |
| GET | `/api/resumes/{uuid}/` | Get resume by ID |
| PATCH | `/api/resumes/{uuid}/` | Update resume |
| POST | `/api/auth/register/` | Register user |
| POST | `/api/auth/login/` | Login → JWT tokens |
| GET | `/api/auth/me/` | Profile (auth required) |

---

## How data flows

1. User opens builder → React creates resume on Django → UUID saved in browser
2. Every edit → auto-saves to Django after 800ms (debounced)
3. If Django offline → falls back to localStorage
4. 20 templates render in React; metadata also served from `/api/templates/`

---

## Admin panel

```powershell
cd backend
python manage.py createsuperuser
```

Open **http://127.0.0.1:8000/admin/** — view all saved resumes.

---

## Environment

**backend/.env**
```
SECRET_KEY=your-secret
DEBUG=True
CORS_ALLOWED_ORIGINS=http://localhost:5173,http://127.0.0.1:5173
```

**Optional frontend/.env**
```
VITE_API_URL=http://127.0.0.1:8000/api
```

(Default uses Vite proxy `/api` — no .env needed for local dev.)

---

## Production build

```powershell
# Frontend
npm run build

# Backend — set DEBUG=False, use PostgreSQL, collectstatic
pip install gunicorn psycopg2-binary
gunicorn resumeflow_api.wsgi:application
```

Serve React `dist/` via Nginx or WhiteNoise; API on same domain `/api`.
