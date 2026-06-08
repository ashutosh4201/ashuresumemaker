from rest_framework import serializers
from .models import Resume


class ResumeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Resume
        fields = [
            "id",
            "title",
            "template",
            "accent",
            "data",
            "created_at",
            "updated_at",
        ]
        read_only_fields = ["id", "created_at", "updated_at"]

    def validate_data(self, value):
        if not isinstance(value, dict):
            raise serializers.ValidationError("data must be a JSON object")
        return value


class ResumeCreateSerializer(serializers.ModelSerializer):
    data = serializers.JSONField()

    class Meta:
        model = Resume
        fields = ["title", "template", "accent", "data"]

    def create(self, validated_data):
        request = self.context.get("request")
        user = request.user if request and request.user.is_authenticated else None
        return Resume.objects.create(user=user, **validated_data)
