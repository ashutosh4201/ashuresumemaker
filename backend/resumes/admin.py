from django.contrib import admin
from .models import Resume


@admin.register(Resume)
class ResumeAdmin(admin.ModelAdmin):
    list_display = ("title", "template", "user", "updated_at")
    search_fields = ("title", "data")
    readonly_fields = ("id", "created_at", "updated_at")
