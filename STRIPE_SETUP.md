# Stripe Setup — AshuResumeMaker

## 1. Stripe account

1. Go to [dashboard.stripe.com/register](https://dashboard.stripe.com/register)
2. Stay in **Test mode** while developing

## 2. Create Pro product & price

1. **Products** → **Add product**
2. Name: `AshuResumeMaker Pro`
3. Price: **₹499 / month** (recurring)
4. Copy the **Price ID** → looks like `price_1ABC...`

## 3. API keys

1. **Developers → API keys**
2. Copy **Secret key** → `sk_test_...`

## 4. Backend `.env`

```env
STRIPE_SECRET_KEY=sk_test_xxxxx
STRIPE_PRICE_ID=price_xxxxx
FRONTEND_URL=http://localhost:5173
```

Install stripe:

```powershell
cd backend
pip install stripe
```

Restart Django server.

## 5. Webhook (local testing)

Install [Stripe CLI](https://stripe.com/docs/stripe-cli):

```powershell
stripe login
stripe listen --forward-to localhost:8000/api/billing/webhook/stripe/
```

Copy the webhook signing secret (`whsec_...`) to `.env`:

```env
STRIPE_WEBHOOK_SECRET=whsec_xxxxx
```

## 6. Test payment

1. Register / login on AshuResumeMaker
2. Go to **Pricing** → **Pay with Stripe**
3. Use test card: `4242 4242 4242 4242`, any future date, any CVC
4. After redirect → you should be **Pro**

## 7. Production (Render + Netlify)

| Env var | Where |
|---------|--------|
| `STRIPE_SECRET_KEY` | Render (use live key `sk_live_...`) |
| `STRIPE_PRICE_ID` | Render (live price ID) |
| `STRIPE_WEBHOOK_SECRET` | Render |
| `FRONTEND_URL` | Render → `https://YOUR-SITE.netlify.app` |

Stripe Dashboard → **Webhooks** → Add endpoint:

```
https://ashuresumemaker-api.onrender.com/api/billing/webhook/stripe/
```

Events to listen:
- `checkout.session.completed`
- `invoice.payment_succeeded`
- `customer.subscription.deleted`

## Demo mode (no Stripe keys)

If `STRIPE_SECRET_KEY` is empty and `DEBUG=True`, clicking upgrade activates **demo Pro** for 30 days locally.
