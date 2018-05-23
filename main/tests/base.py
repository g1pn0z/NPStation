from django.test import TestCase
from users.tests.factories import UserFactory


class TestBase(TestCase):

    USER_NAME = 'user'
    USER_EMAIL = 'user@example.com'
    PASSWORD = 'qwerty'

    def setUp(self):
        super().setUp()

        self.user = UserFactory(
            username=self.USER_NAME,
            email=self.USER_EMAIL
        )
        self.user.set_password(self.PASSWORD)
        self.user.save()

    def login_as_user(self):
        self.assertTrue(self.client.login(username=self.USER_NAME, password=self.PASSWORD))