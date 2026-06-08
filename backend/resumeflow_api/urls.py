from django.contrib import admin
from django.urls import path, include, re_path

from .views import spa_index, serve_frontend_asset

urlpatterns = [
    path("admin/", admin.site.urls),
    path("api/auth/", include("accounts.urls")),
    path("api/billing/", include("billing.urls")),
    path("api/", include("resumes.urls")),
    path("assets/<path:path>", serve_frontend_asset, name="frontend-asset"),
    re_path(r"^(?!api/|admin/|static/|assets/).*$", spa_index, name="spa"),
    path("", spa_index, name="home"),
]
