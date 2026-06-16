# PythonAnywhere Web tab → WSGI configuration file
# Replace YOUR_USERNAME and path if different

import os
import sys

project_home = "/home/YOUR_USERNAME/ashuresumemaker/backend"
if project_home not in sys.path:
    sys.path.insert(0, project_home)

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "resumeflow_api.settings")

from django.core.wsgi import get_wsgi_application

application = get_wsgi_application()
