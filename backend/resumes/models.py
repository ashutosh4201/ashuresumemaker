import uuid
from django.conf import settings
from django.db import models


class Resume(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="resumes",
        null=True,
        blank=True,
    )
    title = models.CharField(max_length=200, default="My Resume")
    template = models.CharField(max_length=50, default="executive")
    accent = models.CharField(max_length=20, default="#2563eb")
    data = models.JSONField(default=dict)
    is_archived = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["-updated_at"]

    def __str__(self):
        name = self.data.get("personal", {}).get("fullName", self.title)
        return f"{name} ({self.id})"
