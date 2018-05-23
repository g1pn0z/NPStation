from django.apps import AppConfig


class ApiV1Config(AppConfig):
    name = 'api_v_1'

    def ready(self):
        import api_v_1.signals
