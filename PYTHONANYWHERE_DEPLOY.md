# AshuResumeMaker — PythonAnywhere (Backend) + Netlify (Frontend)

**Credit card nahi chahiye.**  
Backend API → PythonAnywhere free  
Website UI → Netlify free  

---

## Kya milega / kya nahi

| Feature | Free tier par |
|---------|----------------|
| Register / Login / Save resume | ✅ Haan |
| Portfolio demo link | ✅ Haan |
| 24/7 always on (sleep nahi) | ✅ Web app chalti rehti hai |
| Heavy traffic | ❌ 1 request at a time, slow ho sakta hai |
| Stripe real payments | ❌ Outbound API restricted (whitelist) |
| Custom domain on API | ❌ Sirf `username.pythonanywhere.com` |
| PostgreSQL | ❌ SQLite use karo (free par simple) |

**Best for:** Upwork portfolio, demo, learning — real paying SaaS ke liye weak.

---

## Architecture

```
User browser
    ↓
Netlify (React)     →  https://your-site.netlify.app
    ↓ API calls
PythonAnywhere      →  https://YOUR_USERNAME.pythonanywhere.com/api/...
    ↓
SQLite db           →  backend/db.sqlite3
```

---

## Part 1 — PythonAnywhere account (5 min)

1. [pythonanywhere.com](https://www.pythonanywhere.com) → **Pricing** → **Create a Beginner account** (free)
2. Username choose karo — ye URL mein aayega: `YOUR_USERNAME.pythonanywhere.com`
3. Email verify karo

---

## Part 2 — Code upload (10 min)

Dashboard → **Consoles** → **Bash** (new console)

```bash
cd ~
git clone https://github.com/ashutosh4201/ashuresumemaker.git
cd ashuresumemaker/backend
```

### Virtualenv + packages

```bash
mkvirtualenv --python=/usr/bin/python3.10 ashuresumemaker
pip install -r ../deploy/pythonanywhere/requirements.txt
```

*(Agar repo mein ye file nahi hai: `pip install -r requirements.txt` — psycopg2 error aaye to deploy/pythonanywhere wali file use karo)*

### Environment file

```bash
cp ../deploy/pythonanywhere/env.example .env
nano .env
```

Replace karo:
- `YOUR_USERNAME` → apna PA username
- `YOUR-SITE.netlify.app` → baad mein Netlify URL (pehle placeholder OK)

Generate secret key (console mein):

```bash
python -c "import secrets; print(secrets.token_urlsafe(50))"
```

`.env` mein `SECRET_KEY=` ke baad paste karo.

### Database migrate

```bash
python manage.py migrate
python manage.py collectstatic --noinput
```

Optional admin user:

```bash
python manage.py createsuperuser
```

---

## Part 3 — Web app configure (10 min)

Dashboard → **Web** → **Add a new web app**

1. **Manual configuration**
2. Python **3.10**
3. **Next** → path set karo

### Virtualenv

Web tab → **Virtualenv** section:

```
/home/YOUR_USERNAME/.virtualenvs/ashuresumemaker
```

### WSGI file

Web tab → **Code** section → WSGI file link click karo.

Saari file delete karke `deploy/pythonanywhere/wsgi.py` ka content paste karo — **`YOUR_USERNAME`** replace karo.

Save.

### Static files mapping

Web tab → **Static files**:

| URL | Directory |
|-----|-----------|
| `/static/` | `/home/YOUR_USERNAME/ashuresumemaker/backend/staticfiles` |

Add → Save.

### Reload

Web tab → green **Reload** button.

### Test

Browser mein kholo:

```
https://YOUR_USERNAME.pythonanywhere.com/api/billing/plans/
```

JSON dikhna chahiye.

---

## Part 4 — Netlify frontend (10 min)

1. [app.netlify.com](https://app.netlify.com) → Import GitHub repo `ashuresumemaker`
2. Build: `npm run build` | Publish: `dist`
3. **Environment variables**:

| Key | Value |
|-----|-------|
| `VITE_API_URL` | `https://YOUR_USERNAME.pythonanywhere.com/api` |

⚠️ End mein `/api` zaroor ho — bina slash ke.

4. Deploy → URL copy karo (e.g. `https://ashuresumemaker.netlify.app`)

---

## Part 5 — CORS fix (5 min)

Netlify URL milne ke baad PythonAnywhere par `.env` update:

```bash
cd ~/ashuresumemaker/backend
nano .env
```

```env
CORS_ALLOWED_ORIGINS=https://ashuresumemaker.netlify.app
CSRF_TRUSTED_ORIGINS=https://ashuresumemaker.netlify.app
FRONTEND_URL=https://ashuresumemaker.netlify.app
```

Web tab → **Reload** (Django .env reload ke liye reload enough hai).

Netlify par bhi **Clear cache and redeploy** (env change ho to).

---

## Part 6 — Live test checklist

- [ ] Netlify site khulti hai
- [ ] Register naya account
- [ ] Login
- [ ] Resume builder + save
- [ ] PDF download
- [ ] Dashboard par resume dikhe

---

## Code update kaise karo

Bash console:

```bash
cd ~/ashuresumemaker
git pull
workon ashuresumemaker
cd backend
pip install -r ../deploy/pythonanywhere/requirements.txt
python manage.py migrate
python manage.py collectstatic --noinput
```

Web tab → **Reload**

---

## Troubleshooting

| Problem | Fix |
|---------|-----|
| **502 / error loading** | Web → **Error log** dekho; WSGI path sahi? virtualenv sahi? |
| **API request failed** | Netlify `VITE_API_URL` check; `/api` end hona chahiye |
| **CORS error** | `.env` mein exact Netlify HTTPS URL; Reload web app |
| **DisallowedHost** | `ALLOWED_HOSTS=YOUR_USERNAME.pythonanywhere.com` |
| **Static/admin ugly** | Static files mapping add karo |
| **Site slow** | Free = 1 worker; normal hai |
| **CPU limit** | Bahut testing console mein mat karo; 100 CPU-sec/day limit |
| **Stripe fail** | Free tier par Stripe API block ho sakta hai — payments skip karo |

---

## PythonAnywhere vs Render (tumhare liye)

| | Render free | PythonAnywhere free |
|--|-------------|---------------------|
| Credit card | ❌ Nahi | ❌ Nahi |
| Sleep | ✅ 15 min baad | ❌ Nahi |
| DB | 1 account limit | SQLite OK |
| Setup | Easy (Docker) | Manual (WSGI) |
| Speed | Cold start | Always on, 1 worker |

---

## Upgrade kab karein

Jab real users / payments chahiye:
- PythonAnywhere **Hacker plan** (~$5/mo) — full internet, custom domain
- Ya **Netlify + Render + Neon** combo

---

## Quick reference

| Item | Value |
|------|-------|
| API base | `https://YOUR_USERNAME.pythonanywhere.com/api` |
| Health check | `/api/billing/plans/` |
| Project path | `/home/YOUR_USERNAME/ashuresumemaker/backend` |
| Virtualenv | `/home/YOUR_USERNAME/.virtualenvs/ashuresumemaker` |
