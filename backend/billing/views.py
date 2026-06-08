from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import permissions, status
from django.utils import timezone
from datetime import timedelta

from billing.plans import PLANS
from accounts.models import UserProfile


class PlanListView(APIView):
    permission_classes = [permissions.AllowAny]

    def get(self, request):
        return Response(list(PLANS.values()))


class BillingStatusView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        profile = request.user.profile
        return Response({
            "plan": profile.plan,
            "is_pro": profile.is_pro,
            "pro_until": profile.pro_until,
        })


class UpgradeProView(APIView):
    """Demo upgrade — wire Stripe/Razorpay in production."""

    permission_classes = [permissions.IsAuthenticated]

    def post(self, request):
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
    """Placeholder for Stripe/Razorpay checkout URL generation."""

    permission_classes = [permissions.IsAuthenticated]

    def post(self, request):
        return Response({
            "checkout_url": None,
            "message": "Connect STRIPE_SECRET_KEY or RAZORPAY_KEY_ID in .env to enable payments.",
            "demo_upgrade": "/api/billing/upgrade/",
        }, status=status.HTTP_200_OK)
