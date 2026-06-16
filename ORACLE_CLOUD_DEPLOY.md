# AshuResumeMaker — Oracle Cloud Always Free VPS

Ek server par **frontend + backend + PostgreSQL** — 24/7 free, sleep nahi, Render DB limit nahi.

**Time:** Pehli baar ~1–2 ghante (account + VM + deploy)

---

## Part 1 — Oracle account + VM (30 min)

### 1. Account banao

1. [oracle.com/cloud/free](https://www.oracle.com/cloud/free/) → **Start for free**
2. Credit/debit card chahiye (Always Free resources par charge nahi hota)
3. Region choose karo — **closest to India:** `ap-mumbai-1` (Mumbai)

### 2. VM create karo

1. Menu → **Compute** → **Instances** → **Create instance**
2. Name: `ashuresumemaker`
3. **Image:** Ubuntu 22.04 or 24.04
4. **Shape:** Ampere → **VM.Standard.A1.Flex**
   - Free tier: max 4 OCPU + 24 GB RAM (poore account par)
   - Is app ke liye: **1 OCPU, 6 GB RAM** kaafi hai
5. **Networking:** Public IPv4 assign karo
6. **SSH keys:** Apna public key add karo (PuTTY/Pageant ya `ssh-keygen`)
7. **Create**

### 3. Firewall — Security List (zaroori)

Agar site browser mein open nahi hoti, ye step miss hua hai.

1. Instance page → **Virtual cloud network** link
2. **Security Lists** → Default → **Add Ingress Rules**

| Source | Port | Description |
|--------|------|-------------|
| `0.0.0.0/0` | 22 | SSH |
| `0.0.0.0/0` | 80 | HTTP |
| `0.0.0.0/0` | 443 | HTTPS |

### 4. SSH connect

```bash
ssh -i ~/.ssh/your_key ubuntu@YOUR_PUBLIC_IP
```

---

## Part 2 — Server setup (15 min)

VM par ye commands:

```bash
# Repo clone (GitHub se)
sudo apt-get install -y git
git clone https://github.com/ashutosh4201/ashuresumemaker.git
cd ashuresumemaker

# One-time setup (Docker, Nginx, Certbot)
chmod +x deploy/oracle/setup-server.sh
./deploy/oracle/setup-server.sh

# Docker group ke liye logout/login
exit
```

Dubara SSH karo, phir:

```bash
cd ashuresumemaker
```

---

## Part 3 — App deploy (10 min)

### 1. Environment file

```bash
cp deploy/oracle/.env.example .env
nano .env
```

Fill karo:

| Key | Example |
|-----|---------|
| `POSTGRES_PASSWORD` | strong random password |
| `SECRET_KEY` | `python3 -c "import secrets; print(secrets.token_urlsafe(50))"` |
| `ALLOWED_HOSTS` | `123.45.67.89,yourdomain.com` |
| `CORS_ALLOWED_ORIGINS` | `http://123.45.67.89` (SSL ke baad `https://...`) |
| `CSRF_TRUSTED_ORIGINS` | same as CORS |
| `FRONTEND_URL` | `http://123.45.67.89` |

### 2. Build + start

```bash
docker compose -f docker-compose.oracle.yml up -d --build
```

Test (server par):

```bash
curl http://127.0.0.1:8000/api/billing/plans/
```

JSON aana chahiye.

---

## Part 4 — Nginx (public URL) (10 min)

```bash
sudo cp deploy/oracle/nginx-ashuresumemaker.conf /etc/nginx/sites-available/ashuresumemaker
sudo nano /etc/nginx/sites-available/ashuresumemaker
# YOUR_DOMAIN → apna IP ya domain

sudo ln -sf /etc/nginx/sites-available/ashuresumemaker /etc/nginx/sites-enabled/
sudo rm -f /etc/nginx/sites-enabled/default
sudo nginx -t && sudo systemctl reload nginx
```

Browser: `http://YOUR_PUBLIC_IP` → AshuResumeMaker dikhna chahiye.

---

## Part 5 — SSL (domain ho to) (10 min)

Domain DNS mein **A record** → Oracle public IP.

```bash
sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com
```

Certbot auto HTTPS set karega. Phir `.env` update karo (`https://` URLs) aur:

```bash
docker compose -f docker-compose.oracle.yml up -d
```

---

## Useful commands

```bash
# Logs
docker compose -f docker-compose.oracle.yml logs -f app

# Restart after code update
git pull
docker compose -f docker-compose.oracle.yml up -d --build

# Stop
docker compose -f docker-compose.oracle.yml down

# DB backup
docker compose -f docker-compose.oracle.yml exec db pg_dump -U ashuresumemaker ashuresumemaker > backup.sql
```

---

## Oracle vs Render

| | Render free | Oracle Always Free |
|--|-------------|-------------------|
| Sleep | Haan (15 min) | Nahi |
| DB limit | 1 free DB/account | Apna PostgreSQL, koi limit nahi |
| Setup | Easy | Medium |
| Cost | Free | Free (hamesha) |
| SSL | Auto | Certbot (domain chahiye) |

---

## Troubleshooting

| Problem | Fix |
|---------|-----|
| Site open nahi | Security List mein 80/443 open? `setup-server.sh` run kiya? |
| 502 Bad Gateway | `docker compose logs app` — migrate error? |
| Register fail | `.env` mein `DATABASE_URL` via compose auto set hota hai — `db` healthy hai? |
| CORS error | `CORS_ALLOWED_ORIGINS` mein exact browser URL (http/https) |
| ARM build slow | Pehli build 10–15 min — normal on free ARM |

---

## Optional — Reserved public IP

Oracle IP restart par change ho sakti hai. **Reserved public IP** attach karo (free tier mein limited) taaki domain break na ho.
