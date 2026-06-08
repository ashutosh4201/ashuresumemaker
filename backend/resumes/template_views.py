from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import permissions

TEMPLATES = [
    {"id": "premium", "name": "Premium Pro", "category": "professional"},
  {"id": "executive", "name": "Executive", "category": "professional"},
    {"id": "corporate", "name": "Corporate", "category": "professional"},
    {"id": "tech", "name": "Tech Developer", "category": "tech"},
    {"id": "monospace", "name": "Code / Terminal", "category": "tech"},
    {"id": "startup", "name": "Startup", "category": "tech"},
    {"id": "timeline", "name": "Timeline", "category": "tech"},
    {"id": "infographic", "name": "Infographic", "category": "tech"},
    {"id": "designer", "name": "Designer", "category": "creative"},
    {"id": "creative", "name": "Creative", "category": "creative"},
    {"id": "modern", "name": "Modern", "category": "creative"},
    {"id": "minimal", "name": "Minimal", "category": "creative"},
    {"id": "compact", "name": "Compact ATS", "category": "ats"},
    {"id": "harvard", "name": "Harvard", "category": "ats"},
    {"id": "classic", "name": "Classic", "category": "ats"},
    {"id": "freshgrad", "name": "Fresh Graduate", "category": "ats"},
    {"id": "international", "name": "International / EU", "category": "ats"},
    {"id": "medical", "name": "Medical", "category": "industry"},
    {"id": "elegant", "name": "Elegant", "category": "professional"},
    {"id": "legal", "name": "Legal / Formal", "category": "professional"},
    {"id": "professional", "name": "Professional", "category": "professional"},
]


class TemplateListView(APIView):
    permission_classes = [permissions.AllowAny]

    def get(self, request):
        return Response(TEMPLATES)
