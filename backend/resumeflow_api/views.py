from pathlib import Path

from django.conf import settings
from django.http import FileResponse, Http404
from django.shortcuts import render


def spa_index(request):
    return render(request, "index.html")


def serve_frontend_asset(request, path):
    asset = Path(settings.FRONTEND_DIST) / "assets" / path
    if not asset.is_file():
        raise Http404("Asset not found")
    content_type = "application/javascript" if path.endswith(".js") else None
    if path.endswith(".css"):
        content_type = "text/css"
    return FileResponse(asset.open("rb"), content_type=content_type)
