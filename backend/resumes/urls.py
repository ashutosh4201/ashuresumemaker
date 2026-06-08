from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ResumeViewSet
from .template_views import TemplateListView

router = DefaultRouter()
router.register(r"resumes", ResumeViewSet, basename="resume")

urlpatterns = [
    path("templates/", TemplateListView.as_view(), name="template-list"),
    path("", include(router.urls)),
]
