from django.contrib.auth import get_user_model
from django.db.models import signals
from tastypie.models import create_api_key

User = get_user_model()

signals.post_save.connect(create_api_key, sender=User)
