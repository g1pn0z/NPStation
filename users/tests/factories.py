import factory
from django.contrib.auth import get_user_model

User = get_user_model()

API_USER_NAME = 'api_user'
API_USER_EMAIL = 'api_user@example.com'
API_USER_PASSWORD = 't0p_s3kr3t'


class UserFactory(factory.DjangoModelFactory):

    class Meta:
        model = User

    username = API_USER_NAME
    email = API_USER_EMAIL
    is_active = True

    @classmethod
    def _prepare(cls, create, **kwargs):
        user = super()._prepare(create, **kwargs)
        user.set_password(API_USER_PASSWORD)
        user.save()
        return user
