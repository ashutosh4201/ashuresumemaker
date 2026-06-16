import secrets

from django.conf import settings
from django.core.cache import cache
from django.utils import timezone
from datetime import timedelta

from billing.plans import PLANS
from billing.stripe_service import activate_pro, stripe_configured

DEMO_KEY_ID = "rzp_test_demo"
ORDER_CACHE_TTL = 900  # 15 minutes


def razorpay_demo_enabled():
    """Demo Razorpay checkout — local/dev only, no real keys."""
    return settings.DEBUG and not stripe_configured()


def razorpay_configured():
    key_id = getattr(settings, "RAZORPAY_KEY_ID", "")
    key_secret = getattr(settings, "RAZORPAY_KEY_SECRET", "")
    return bool(key_id and key_secret and not key_id.endswith("_demo"))


def create_demo_order(user):
    order_id = f"order_demo_{user.id}_{secrets.token_hex(8)}"
    cache.set(f"rzp_demo:{order_id}", user.id, ORDER_CACHE_TTL)

    amount_inr = PLANS["pro"]["price_inr"]
    return {
        "order_id": order_id,
        "amount": amount_inr * 100,
        "currency": "INR",
        "key_id": DEMO_KEY_ID,
        "name": "AshuResumeMaker Pro",
        "description": "Pro plan — 1 month",
        "prefill": {
            "email": user.email or "",
            "name": user.get_full_name() or user.username,
        },
    }


def verify_demo_payment(user, order_id, payment_id):
    if not razorpay_demo_enabled():
        raise ValueError("Razorpay demo is not available.")

    if not order_id or not order_id.startswith("order_demo_"):
        raise ValueError("Invalid order.")

    if not payment_id or not payment_id.startswith("pay_demo_"):
        raise ValueError("Invalid payment.")

    cached_user = cache.get(f"rzp_demo:{order_id}")
    if cached_user != user.id:
        raise ValueError("Order expired or does not belong to you.")

    cache.delete(f"rzp_demo:{order_id}")
    activate_pro(user, until=timezone.now() + timedelta(days=30))

    return {
        "payment_id": payment_id,
        "order_id": order_id,
        "status": "captured",
    }
