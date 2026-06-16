from django.utils import timezone
from datetime import timedelta

PLANS = {
    "free": {
        "id": "free",
        "name": "Free",
        "price_inr": 0,
        "price_usd": 0,
        "resume_limit": 1,
        "templates": "6 basic templates",
        "pdf_downloads": "Unlimited",
        "watermark": False,
        "support": "Community",
    },
    "pro": {
        "id": "pro",
        "name": "Pro",
        "price_inr": 499,
        "price_usd": 9,
        "period": "month",
        "resume_limit": 999,
        "templates": "All 20+ templates",
        "pdf_downloads": "Unlimited",
        "watermark": False,
        "support": "Priority email",
        "features": [
            "Unlimited resumes",
            "All premium templates",
            "Cover letter builder (coming soon)",
            "Priority support",
            "Remove branding",
        ],
    },
}

FREE_TEMPLATE_IDS = {
    "premium", "executive", "compact", "harvard", "classic", "modern", "tech",
}

FREE_RESUME_LIMIT = 1


def user_plan(user):
    if not user or not user.is_authenticated:
        return "guest"
    profile = getattr(user, "profile", None)
    if profile and profile.is_pro:
        return "pro"
    return "free"


def can_use_template(user, template_id):
    if user_plan(user) == "pro":
        return True
    return template_id in FREE_TEMPLATE_IDS


def can_create_resume(user):
    if not user.is_authenticated:
        return True
    if user_plan(user) == "pro":
        return True
    from resumes.models import Resume
    return Resume.objects.filter(user=user).count() < FREE_RESUME_LIMIT
