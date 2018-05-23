from .base import BaseTestCase
from device.models import Device


class ApiDeviceRetrieveTestCase(BaseTestCase):

    def test_get_detail_unauthenticated(self):
        self.assertHttpUnauthorized(self.api_client.get(self.device_urls[0], format='json'))

    def test_get_detail_is_valid_json(self):
        self.assertValidJSONResponse(
            self.api_client.get(self.device_urls[0], authentication=self.api_key_header, format='json')
        )

    def test_get_detail_only_own(self):
        """
        Other User is owner of Device[2]
        """
        self.assertHttpUnauthorized(
            self.api_client.get(self.device_urls[2], authentication=self.api_key_header, format='json')
        )

    def test_update_unauthenticated(self):
        self.assertHttpUnauthorized(self.api_client.put(self.device_urls[0], format='json', data={}))

    def test_update_not_own(self):
        self.assertHttpUnauthorized(
            self.api_client.put(self.device_urls[2], format='json', data={}, authentication=self.api_key_header)
        )

    def test_update_own_device_position(self):
        original_data = self.deserialize(
            self.api_client.get(self.device_urls[0], format='json', authentication=self.api_key_header)
        )
        new_data = original_data.copy()
        new_data.update(self.new_position)
        self.assertEqual(Device.objects.count(), 3)
        self.assertHttpAccepted(
            self.api_client.put(
                self.device_urls[0],
                format='json',
                data=new_data,
                authentication=self.api_key_header
            )
        )
        self.assertEqual(Device.objects.count(), 3)
        self.assertEqual(Device.objects.get(pk=self.devices[0].id).latitude, 'new latitude')
        self.assertEqual(Device.objects.get(pk=self.devices[0].id).longitude, 'new longitude')
        self.assertEqual(Device.objects.get(pk=self.devices[0].id).height, 'new height')

    def test_delete_unauthenticated(self):
        self.assertHttpUnauthorized(self.api_client.delete(self.device_urls[0], format='json'))

    def test_delete_not_own(self):
        self.assertHttpUnauthorized(
            self.api_client.delete(self.device_urls[2], format='json', authentication=self.api_key_header)
        )

    def test_delete_own_device(self):
        """
        Нужно не удалять девайс, а очистить поля местоположения
        """
        original_data = self.deserialize(
            self.api_client.get(self.device_urls[0], format='json', authentication=self.api_key_header)
        )
        new_data = original_data.copy()
        new_data.update(self.new_position)
        self.api_client.put(
            self.device_urls[0],
            format='json',
            data=new_data,
            authentication=self.api_key_header
        )
        self.assertEqual(Device.objects.count(), 3)
        self.assertHttpAccepted(
            self.api_client.delete(self.device_urls[0], format='json', authentication=self.api_key_header)
        )
        self.assertEqual(Device.objects.count(), 3)
        self.assertEqual(Device.objects.get(pk=self.devices[0].id).latitude, '')
        self.assertEqual(Device.objects.get(pk=self.devices[0].id).longitude, '')
        self.assertEqual(Device.objects.get(pk=self.devices[0].id).height, '')
