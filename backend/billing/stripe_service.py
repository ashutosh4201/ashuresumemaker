import os
from datetime import datetime, timedelta, timezone as dt_timezone

import stripe
from django.conf import settings
from django.utils import timezone

from accounts.models import UserProfile


def stripe_configured():
    return bool(settings.STRIPE_SECRET_KEY and settings.STRIPE_PRICE_ID)


def _stripe():
    stripe.api_key = settings.STRIPE_SECRET_KEY
    return stripe


def activate_pro(user, until=None, customer_id=""):
    profile = user.profile
    profile.plan = UserProfile.PLAN_PRO
    profile.pro_until = until or (timezone.now() + timedelta(days=30))
    if customer_id:
        profile.stripe_customer_id = customer_id
    profile.save(update_fields=["plan", "pro_until", "stripe_customer_id"])


def downgrade_to_free(user):
    profile = user.profile
    profile.plan = UserProfile.PLAN_FREE
    profile.pro_until = None
    profile.save(update_fields=["plan", "pro_until"])


def create_checkout_session(user):
    if not stripe_configured():
        return None

    frontend = settings.FRONTEND_URL.rstrip("/")
    s = _stripe()

    kwargs = {
        "mode": "subscription",
        "line_items": [{"price": settings.STRIPE_PRICE_ID, "quantity": 1}],
        "success_url": f"{frontend}/pricing?success=1",
        "cancel_url": f"{frontend}/pricing?cancelled=1",
        "client_reference_id": str(user.id),
        "metadata": {"user_id": str(user.id)},
        "subscription_data": {"metadata": {"user_id": str(user.id)}},
    }

    if user.email:
        kwargs["customer_email"] = user.email
    if user.profile.stripe_customer_id:
        kwargs["customer"] = user.profile.stripe_customer_id
        del kwargs["customer_email"]

    session = s.checkout.Session.create(**kwargs)
    return session.url


def handle_webhook(payload, sig_header):
    if not settings.STRIPE_WEBHOOK_SECRET:
        raise ValueError("STRIPE_WEBHOOK_SECRET not set")

    s = _stripe()
    event = s.Webhook.construct_event(payload, sig_header, settings.STRIPE_WEBHOOK_SECRET)

    from django.contrib.auth.models import User

    if event["type"] == "checkout.session.completed":
        session = event["data"]["object"]
        user_id = session.get("metadata", {}).get("user_id") or session.get("client_reference_id")
        if not user_id:
            return
        user = User.objects.filter(id=user_id).first()
        if not user:
            return
        until = timezone.now() + timedelta(days=30)
        sub_id = session.get("subscription")
        if sub_id:
            sub = s.Subscription.retrieve(sub_id)
            until = datetime.fromtimestamp(sub["current_period_end"], tz=dt_timezone.utc)
        activate_pro(user, until=until, customer_id=session.get("customer") or "")

    elif event["type"] == "customer.subscription.deleted":
        sub = event["data"]["object"]
        user_id = sub.get("metadata", {}).get("user_id")
        if user_id:
            user = User.objects.filter(id=user_id).first()
            if user:
                downgrade_to_free(user)

    elif event["type"] == "invoice.payment_succeeded":
        invoice = event["data"]["object"]
        sub_id = invoice.get("subscription")
        if not sub_id:
            return
        sub = s.Subscription.retrieve(sub_id)
        user_id = sub.get("metadata", {}).get("user_id")
        if not user_id:
            return
        user = User.objects.filter(id=user_id).first()
        if user:
            until = datetime.fromtimestamp(sub["current_period_end"], tz=dt_timezone.utc)
            activate_pro(user, until=until, customer_id=invoice.get("customer") or "")

    return event["type"]
