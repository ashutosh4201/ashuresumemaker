from django.db import models
from django.conf import settings
from django.db.models.signals import post_save
from django.dispatch import receiver
from django.utils import timezone


class UserProfile(models.Model):
    PLAN_FREE = "free"
    PLAN_PRO = "pro"
    PLAN_CHOICES = [(PLAN_FREE, "Free"), (PLAN_PRO, "Pro")]

    user = models.OneToOneField(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="profile",
    )
    plan = models.CharField(max_length=20, choices=PLAN_CHOICES, default=PLAN_FREE)
    pro_until = models.DateTimeField(null=True, blank=True)
    stripe_customer_id = models.CharField(max_length=255, blank=True, default="")
    company_name = models.CharField(max_length=200, blank=True, default="")
    created_at = models.DateTimeField(auto_now_add=True)

    @property
    def is_pro(self):
        if self.plan != self.PLAN_PRO:
            return False
        if self.pro_until and self.pro_until < timezone.now():
            return False
        return True

    def sync_plan_expiry(self):
        if self.plan == self.PLAN_PRO and self.pro_until and self.pro_until < timezone.now():
            self.plan = self.PLAN_FREE
            self.save(update_fields=["plan"])

    def __str__(self):
        return f"{self.user.username} ({self.plan})"


@receiver(post_save, sender=settings.AUTH_USER_MODEL)
def create_user_profile(sender, instance, created, **kwargs):
    if created:
        UserProfile.objects.get_or_create(user=instance)
