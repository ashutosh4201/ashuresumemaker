from django.urls import path
from .views import (
    PlanListView,
    BillingStatusView,
    UpgradeProView,
    CheckoutSessionView,
    RazorpayDemoVerifyView,
)
from .webhooks import stripe_webhook_view

urlpatterns = [
    path("plans/", PlanListView.as_view()),
    path("status/", BillingStatusView.as_view()),
    path("upgrade/", UpgradeProView.as_view()),
    path("checkout/", CheckoutSessionView.as_view()),
    path("razorpay/demo/verify/", RazorpayDemoVerifyView.as_view()),
    path("webhook/stripe/", stripe_webhook_view, name="stripe-webhook"),
]
