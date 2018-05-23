from main.tests.base import TestBase
from tastypie.models import ApiKey


class ApiUserTestCase(TestBase):

    def test_auto_create_api_key(self):
        api_key_entry = ApiKey.objects.filter(user=self.user)
        self.assertEqual(api_key_entry.count(), 1)
