from .base import BaseTestCase
from device.models import Device


class ApiDeviceListTestCase(BaseTestCase):

    def test_get_list_unauthenticated(self):
        self.assertHttpUnauthorized(self.api_client.get(self.api_base_url, format='json'))

    def test_get_list_authenticated(self):
        self.assertHttpOK(self.api_client.get(self.api_base_url, authentication=self.api_key_header, format='json'))

    def test_get_list_is_valid_json(self):
        self.assertValidJSONResponse(
            self.api_client.get(self.api_base_url, authentication=self.api_key_header, format='json')
        )

    def test_get_list_only_own(self):
        resp = self.api_client.get(self.api_base_url, authentication=self.api_key_header, format='json')
        self.assertEqual(len(self.deserialize(resp)), 2)

    def test_post_list_unauthenticated(self):
        self.assertHttpUnauthorized(
            self.api_client.post(self.api_base_url, format='json', data=self.post_data)
        )

    def test_post_list(self):
        self.assertEqual(Device.objects.count(), 3)
        self.assertHttpCreated(
            self.api_client.post(
                self.api_base_url,
                format='json',
                data=self.post_data,
                authentication=self.api_key_header
            )
        )
        self.assertEqual(Device.objects.count(), 4)
