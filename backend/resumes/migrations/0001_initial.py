from django.db import migrations, models
import django.db.models.deletion
import uuid


class Migration(migrations.Migration):
    initial = True
    dependencies = [
        migrations.swappable_dependency("auth.User"),
    ]
    operations = [
        migrations.CreateModel(
            name="Resume",
            fields=[
                ("id", models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ("title", models.CharField(default="My Resume", max_length=200)),
                ("template", models.CharField(default="executive", max_length=50)),
                ("accent", models.CharField(default="#2563eb", max_length=20)),
                ("data", models.JSONField(default=dict)),
                ("created_at", models.DateTimeField(auto_now_add=True)),
                ("updated_at", models.DateTimeField(auto_now=True)),
                (
                    "user",
                    models.ForeignKey(
                        blank=True,
                        null=True,
                        on_delete=django.db.models.deletion.CASCADE,
                        related_name="resumes",
                        to="auth.user",
                    ),
                ),
            ],
            options={"ordering": ["-updated_at"]},
        ),
    ]
