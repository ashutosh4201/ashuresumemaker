from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):
    initial = True
    dependencies = [
        migrations.swappable_dependency("auth.User"),
    ]
    operations = [
        migrations.CreateModel(
            name="UserProfile",
            fields=[
                ("id", models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name="ID")),
                ("plan", models.CharField(choices=[("free", "Free"), ("pro", "Pro")], default="free", max_length=20)),
                ("pro_until", models.DateTimeField(blank=True, null=True)),
                ("stripe_customer_id", models.CharField(blank=True, default="", max_length=255)),
                ("company_name", models.CharField(blank=True, default="", max_length=200)),
                ("created_at", models.DateTimeField(auto_now_add=True)),
                ("user", models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, related_name="profile", to="auth.user")),
            ],
        ),
    ]
