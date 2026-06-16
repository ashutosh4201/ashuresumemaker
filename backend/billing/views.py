from django.conf import settings
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import permissions, status
from django.utils import timezone
from datetime import timedelta

from billing.plans import PLANS
from billing.stripe_service import create_checkout_session, stripe_configured
from billing.razorpay_service import (
    create_demo_order,
    razorpay_demo_enabled,
    verify_demo_payment,
)
from accounts.models import UserProfile


class PlanListView(APIView):
    permission_classes = [permissions.AllowAny]

    def get(self, request):
        return Response(list(PLANS.values()))


class BillingStatusView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        profile = request.user.profile
        profile.sync_plan_expiry()
        return Response({
            "plan": profile.plan,
            "is_pro": profile.is_pro,
            "pro_until": profile.pro_until,
            "stripe_enabled": stripe_configured(),
            "razorpay_demo": razorpay_demo_enabled(),
        })


class UpgradeProView(APIView):
    """Local demo upgrade — only when DEBUG=True and Stripe not configured."""

    permission_classes = [permissions.IsAuthenticated]

    def post(self, request):
        if not settings.DEBUG:
            return Response(
                {"detail": "Use Stripe checkout in production.", "code": "payments_disabled"},
                status=status.HTTP_503_SERVICE_UNAVAILABLE,
            )
        if stripe_configured():
            return Response(
                {"detail": "Stripe is configured. Use /api/billing/checkout/ instead.", "code": "use_stripe"},
                status=status.HTTP_400_BAD_REQUEST,
            )
        profile = request.user.profile
        profile.plan = UserProfile.PLAN_PRO
        profile.pro_until = timezone.now() + timedelta(days=30)
        profile.save()
        return Response({
            "detail": "Upgraded to Pro for 30 days (demo mode).",
            "plan": profile.plan,
            "pro_until": profile.pro_until,
        })


class CheckoutSessionView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request):
        if stripe_configured():
            url = create_checkout_session(request.user)
            if url:
                return Response({"checkout_url": url, "demo": False})
            return Response({"detail": "Could not create checkout session."}, status=status.HTTP_502_BAD_GATEWAY)

        if razorpay_demo_enabled():
            order = create_demo_order(request.user)
            return Response({
                "demo": True,
                "razorpay_demo": True,
                "order": order,
                "detail": "Complete payment in Razorpay demo checkout.",
            })

        return Response(
            {"detail": "Payments not configured. Set STRIPE_SECRET_KEY and STRIPE_PRICE_ID.", "code": "payments_disabled"},
            status=status.HTTP_503_SERVICE_UNAVAILABLE,
        )


class RazorpayDemoVerifyView(APIView):
    """Simulated Razorpay payment verification (demo mode only)."""

    permission_classes = [permissions.IsAuthenticated]

    def post(self, request):
        if not razorpay_demo_enabled():
            return Response(
                {"detail": "Razorpay demo is not available.", "code": "demo_disabled"},
                status=status.HTTP_503_SERVICE_UNAVAILABLE,
            )

        order_id = request.data.get("order_id", "")
        payment_id = request.data.get("payment_id", "")

        try:
            result = verify_demo_payment(request.user, order_id, payment_id)
        except ValueError as exc:
            return Response({"detail": str(exc)}, status=status.HTTP_400_BAD_REQUEST)

        profile = request.user.profile
        return Response({
            "detail": "Payment successful! Pro activated for 30 days.",
            "plan": profile.plan,
            "pro_until": profile.pro_until,
            **result,
        })
