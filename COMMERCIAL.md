# ResumeFlow — Commercial License & Sale Guide

## What you are buying

**ResumeFlow** is a production-ready **Resume Builder SaaS** product:

- React 19 + Vite frontend
- Django 5 REST API backend
- JWT authentication
- Free / Pro subscription model
- 20+ resume templates
- PDF export
- Admin panel
- Docker deployment
- Legal pages (Privacy, Terms)
- White-label config (`src/config/siteConfig.js`)

---

## Monetization (ready to wire)

| Tier | Price (suggested) | Limits |
|------|-------------------|--------|
| Free | ₹0 | 1 resume, 6 templates |
| Pro | ₹499/mo or $9/mo | Unlimited resumes, all templates |

**Payment integration points:**
- `backend/billing/views.py` → `CheckoutSessionView` — add Stripe/Razorpay
- Env vars: `STRIPE_SECRET_KEY`, `RAZORPAY_KEY_ID`, `RAZORPAY_KEY_SECRET`

Demo upgrade works via `POST /api/billing/upgrade/` for testing.

---

## White-label in 5 minutes

Edit `src/config/siteConfig.js`:
```javascript
name: "YourBrand",
supportEmail: "you@company.com",
company: "Your Company Pvt Ltd",
pricing: { pro: { priceInr: 599 } },
```

---

## Deploy to production

1. Set `DEBUG=False`, strong `SECRET_KEY`
2. Use PostgreSQL (`DATABASE_URL`)
3. `npm run build` → serve `dist/` via Nginx
4. Gunicorn for Django: `gunicorn resumeflow_api.wsgi`
5. SSL via Let's Encrypt
6. Or: `docker-compose up` for quick demo

---

## Admin & support

```bash
cd backend
python manage.py createsuperuser
```
- `/admin/` — users, profiles, resumes, plans

---

## Target buyers

- Freelancers launching SaaS
- Agencies selling to HR/recruitment clients
- EdTech / career coaching platforms
- White-label for job portals

---

## Support & customization

Included: full source code, README, this guide.
Optional customization: payment gateway, custom templates, mobile app.

Contact: support@resumeflow.com (update in siteConfig)
