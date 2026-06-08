from rest_framework import viewsets, permissions, status
from rest_framework.decorators import action
from rest_framework.response import Response

from billing.plans import can_create_resume, can_use_template, user_plan, FREE_TEMPLATE_IDS
from .models import Resume
from .serializers import ResumeSerializer, ResumeCreateSerializer


class ResumeViewSet(viewsets.ModelViewSet):
    lookup_field = "id"
    serializer_class = ResumeSerializer

    def get_queryset(self):
        user = self.request.user
        if user.is_authenticated:
            return Resume.objects.filter(user=user, is_archived=False)
        return Resume.objects.none()

    def get_serializer_class(self):
        if self.action == "create":
            return ResumeCreateSerializer
        return ResumeSerializer

    def get_permissions(self):
        if self.action in ("create", "retrieve", "update", "partial_update"):
            return [permissions.AllowAny()]
        if self.action == "destroy":
            return [permissions.IsAuthenticated()]
        return [permissions.IsAuthenticated()]

    def list(self, request, *args, **kwargs):
        if not request.user.is_authenticated:
            return Response([])
        qs = self.get_queryset()
        return Response(ResumeSerializer(qs, many=True).data)

    def create(self, request, *args, **kwargs):
        user = request.user if request.user.is_authenticated else None
        if user and not can_create_resume(user):
            return Response(
                {"detail": "Free plan allows 1 resume. Upgrade to Pro for unlimited.", "code": "plan_limit"},
                status=status.HTTP_403_FORBIDDEN,
            )
        serializer = ResumeCreateSerializer(data=request.data, context={"request": request})
        serializer.is_valid(raise_exception=True)
        template = serializer.validated_data.get("template") or serializer.validated_data.get("data", {}).get("template", "executive")
        if user and not can_use_template(user, template):
            return Response(
                {"detail": "This template requires Pro plan.", "code": "template_pro", "free_templates": list(FREE_TEMPLATE_IDS)},
                status=status.HTTP_403_FORBIDDEN,
            )
        resume = serializer.save()
        return Response(ResumeSerializer(resume).data, status=status.HTTP_201_CREATED)

    def retrieve(self, request, *args, **kwargs):
        resume = Resume.objects.filter(id=kwargs["id"], is_archived=False).first()
        if not resume:
            return Response({"detail": "Not found."}, status=status.HTTP_404_NOT_FOUND)
        return Response(ResumeSerializer(resume).data)

    def update(self, request, *args, **kwargs):
        resume = Resume.objects.filter(id=kwargs["id"], is_archived=False).first()
        if not resume:
            return Response({"detail": "Not found."}, status=status.HTTP_404_NOT_FOUND)
        template = request.data.get("template") or request.data.get("data", {}).get("template")
        user = request.user if request.user.is_authenticated else resume.user
        if template and user and not can_use_template(user, template):
            return Response(
                {"detail": "This template requires Pro plan.", "code": "template_pro"},
                status=status.HTTP_403_FORBIDDEN,
            )
        serializer = ResumeSerializer(resume, data=request.data, partial=kwargs.get("partial", False))
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)

    def partial_update(self, request, *args, **kwargs):
        kwargs["partial"] = True
        return self.update(request, *args, **kwargs)

    def destroy(self, request, *args, **kwargs):
        resume = self.get_queryset().filter(id=kwargs["id"]).first()
        if not resume:
            return Response({"detail": "Not found."}, status=status.HTTP_404_NOT_FOUND)
        resume.is_archived = True
        resume.save(update_fields=["is_archived"])
        return Response(status=status.HTTP_204_NO_CONTENT)

    @action(detail=False, methods=["get"], permission_classes=[permissions.IsAuthenticated])
    def mine(self, request):
        return Response(ResumeSerializer(self.get_queryset(), many=True).data)

    @action(detail=False, methods=["get"], permission_classes=[permissions.AllowAny])
    def meta(self, request):
        plan = user_plan(request.user)
        return Response({
            "plan": plan,
            "free_templates": list(FREE_TEMPLATE_IDS),
            "is_authenticated": request.user.is_authenticated,
        })
