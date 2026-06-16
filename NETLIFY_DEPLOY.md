# AshuResumeMaker — Netlify Deploy Guide

Netlify = **Frontend (website)**  
Render = **Backend (API)** — Netlify Django run nahi kar sakta

---

## Part 1 — Backend API (Render) — 5 min

1. [render.com](https://render.com) → **New → Blueprint**
2. Repo: `ashutosh4201/ashuresumemaker`
3. Blueprint name: `ashuresumemaker-api`
4. Environment variables (abhi placeholder — baad mein update):

| Key | Value |
|-----|-------|
| `CORS_ALLOWED_ORIGINS` | `https://ashuresumemaker.netlify.app` |
| `CSRF_TRUSTED_ORIGINS` | `https://ashuresumemaker.netlify.app` |

5. **Deploy Blueprint**
6. Live hone ke baad API URL copy karo, jaise:  
   `https://ashuresumemaker-api.onrender.com`

Test: browser mein kholo  
`https://ashuresumemaker-api.onrender.com/api/billing/plans/`  
→ JSON dikhna chahiye

---

## Part 2 — Frontend (Netlify) — 5 min

1. [app.netlify.com](https://app.netlify.com) → **Add new site → Import an existing project**
2. **GitHub** connect karo → repo **`ashuresumemaker`** select karo
3. Build settings (auto `netlify.toml` se aayenge):

| Setting | Value |
|---------|-------|
| Build command | `npm run build` |
| Publish directory | `dist` |

4. **Environment variables** → Add:

| Key | Value |
|-----|-------|
| `VITE_API_URL` | `https://ashuresumemaker-api.onrender.com/api` |

*(Apna Render API URL use karo — end mein `/api` zaroor ho)*

5. **Deploy site** click karo
6. Site URL milega: `https://random-name.netlify.app`

---

## Part 3 — CORS fix (important)

Netlify ka **final URL** copy karo (Settings → Domain management), phir Render par update karo:

**Render → ashuresumemaker-api → Environment:**

| Key | Value |
|-----|-------|
| `CORS_ALLOWED_ORIGINS` | `https://YOUR-SITE.netlify.app` |
| `CSRF_TRUSTED_ORIGINS` | `https://YOUR-SITE.netlify.app` |

Save → Render redeploy hoga.

---

## Part 4 — Git push (updated files)

```powershell
cd "C:\Users\HP\Desktop\project cursor\resumeflow"
git add netlify.toml public/_redirects Dockerfile.api render.yaml NETLIFY_DEPLOY.md
git commit -m "Add Netlify frontend + Render API backend"
git push origin main
```

Netlify auto-redeploy karega. Render par **Manual sync** bhi kar sakte ho.

---

## Custom domain (optional)

Netlify → **Domain settings** → apna domain add karo  
Phir Render CORS mein woh domain bhi add karo.

---

## Troubleshooting

| Problem | Fix |
|---------|-----|
| API request failed | `VITE_API_URL` check karo — `/api` end hona chahiye |
| CORS error | Render env mein exact Netlify URL add karo |
| Blank page | Netlify deploy logs check karo |
| 404 on /login | `_redirects` / `netlify.toml` SPA redirect sahi hai |

---

## Live URLs

- **Website:** `https://YOUR-SITE.netlify.app`
- **API:** `https://ashuresumemaker-api.onrender.com/api`
