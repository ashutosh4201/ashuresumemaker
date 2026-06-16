import json

from django.conf import settings
from django.http import HttpResponse, HttpResponseBadRequest
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_POST

from .stripe_service import handle_webhook


@csrf_exempt
@require_POST
def stripe_webhook_view(request):
    if not settings.STRIPE_WEBHOOK_SECRET:
        return HttpResponseBadRequest("Webhook secret not configured")

    sig = request.META.get("HTTP_STRIPE_SIGNATURE", "")
    try:
        handle_webhook(request.body, sig)
    except ValueError as e:
        return HttpResponseBadRequest(str(e))
    except Exception:
        return HttpResponseBadRequest("Webhook handler failed")

    return HttpResponse(json.dumps({"received": True}), content_type="application/json")
