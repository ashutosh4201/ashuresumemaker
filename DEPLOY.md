# AshuResumeMaker — Deploy Guide

## Option 1: Render (Recommended — Free)

### Step 1 — GitHub par code upload karo

```powershell
cd "C:\Users\HP\Desktop\project cursor\resumeflow"
git init
git add .
git commit -m "AshuResumeMaker — production ready"
```

GitHub par naya repo banao (e.g. `ashuresumemaker`), phir:

```powershell
git remote add origin https://github.com/YOUR_USERNAME/ashuresumemaker.git
git branch -M main
git push -u origin main
```

### Step 2 — Render par deploy

1. [render.com](https://render.com) par sign up / login karo
2. **New → Blueprint** click karo
3. Apna GitHub repo connect karo
4. Render `render.yaml` auto detect karega
5. **Apply** click karo — deploy start ho jayega (~5–10 min)

### Step 3 — Deploy ke baad env set karo

Render dashboard → **ashuresumemaker** service → **Environment**:

| Key | Value |
|-----|-------|
| `CORS_ALLOWED_ORIGINS` | `https://YOUR-APP.onrender.com` |
| `CSRF_TRUSTED_ORIGINS` | `https://YOUR-APP.onrender.com` |

Save → service auto redeploy hogi.

**Live URL:** `https://ashuresumemaker.onrender.com` (ya jo naam Render de)

---

## Option 2: Local Docker test (deploy se pehle)

```powershell
cd resumeflow
docker build -f Dockerfile.prod -t ashuresumemaker .
docker run -p 8000:8000 -e DEBUG=False -e SECRET_KEY=test-secret-key-change-me ashuresumemaker
```

Browser: **http://localhost:8000**

---

## Option 3: Manual VPS (DigitalOcean / AWS)

```bash
git clone YOUR_REPO
cd resumeflow
npm ci && npm run build:prod
cd backend
pip install -r requirements.txt
export DEBUG=False SECRET_KEY=your-long-secret ALLOWED_HOSTS=yourdomain.com
python manage.py migrate
./start.sh
```

Nginx reverse proxy + SSL (Certbot) recommended.

---

## Notes

- **Free Render** plan: app 15 min idle ke baad sleep hoti hai — pehli request slow ho sakti hai
- **PostgreSQL** Render par auto attach hota hai (`render.yaml` se)
- **API + Frontend** dono ek hi URL par: `/api/...` = backend, baaki = React app
- PDF download production par bhi kaam karega

---

## Troubleshooting

| Problem | Fix |
|---------|-----|
| 502 Bad Gateway | Logs check karo — `migrate` fail to nahi |
| API failed | `CORS_ALLOWED_ORIGINS` mein apna Render URL add karo |
| Blank page | `npm run build:prod` Dockerfile mein chal raha hai — rebuild karo |
| Register fail | PostgreSQL connected hai? Render env mein `DATABASE_URL` check karo |
