from django.urls import path
from .views import PlanListView, BillingStatusView, UpgradeProView, CheckoutSessionView

urlpatterns = [
    path("plans/", PlanListView.as_view()),
    path("status/", BillingStatusView.as_view()),
    path("upgrade/", UpgradeProView.as_view()),
    path("checkout/", CheckoutSessionView.as_view()),
]
