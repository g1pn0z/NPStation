from django.views.generic import View
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator
from django.http import JsonResponse
from django.contrib.auth import get_user_model, authenticate
from tastypie.models import ApiKey
import json


User = get_user_model()


class LoginView(View):
    @method_decorator(csrf_exempt)
    def dispatch(self, request, *args, **kwargs):
        return super().dispatch(request, *args, **kwargs)

    def post(self, request, *args, **kwargs):
        data = json.loads(request.body.decode("utf-8"))
        if 'username' in data and 'password' in data:
            user = authenticate(username=data['username'], password=data['password'])
            if user:
                return JsonResponse({
                    'username': user.username,
                    'api_key': user.api_key.key,
                    'profile': {
                        'display_name': user.get_display_name()
                    }
                })
        return JsonResponse(
            {'error': 'permission denied'},
            status=403
        )


class ProfileView(View):

    def get(self, request, *args, **kwargs):
        try:
            token = request.META['HTTP_AUTHORIZATION'].split(" ")[1]
        except (KeyError, IndexError):
            token = None
        if token:
            try:
                api_key = ApiKey.objects.get(key=token)
                user = api_key.user
                return JsonResponse({
                    'username': user.username,
                    'api_key': token,
                    'profile': {
                        'display_name': user.get_display_name()
                    }
                })
            except ApiKey.DoesNotExist:
                pass
        return JsonResponse(
            {'error': 'permission denied'},
            status=403
        )
