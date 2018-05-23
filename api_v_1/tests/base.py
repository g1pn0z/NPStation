from tastypie.test import ResourceTestCaseMixin
from tastypie.models import ApiKey
from main.tests.base import TestBase
from device.tests.factories import DeviceFactory
from users.tests.factories import UserFactory


class BaseTestCase(ResourceTestCaseMixin, TestBase):

    def setUp(self):
        super().setUp()

        self.api_key = ApiKey.objects.get(user=self.user).key
        self.api_key_header = self.create_apikey(self.user.username, self.api_key)

        self.other_user = UserFactory(username='other_user', email='other_user@example.com')

        self.devices = [
            DeviceFactory(
                owner=self.user,
                title='Device 1',
            ),
            DeviceFactory(
                owner=self.user,
                title='Device 2',
            ),
            DeviceFactory(
                owner=self.other_user,
                title='Device 3',
            ),
        ]

        self.post_data = {
            'title': 'Device 4',
            'model': '',
            'imei': '',
            'phone_number': '',
            'mac': '',
            'usb_id_code': '',
            'latitude': '',
            'longitude': '',
            'height': '',
            'cell_id': False,
            'ip_info': '',
            'wifi_info': '',
            'battery_info': '',
            'webcam_picture': '',
            'code': '',
        }
        self.new_position = {
            'latitude': 'new latitude',
            'longitude': 'new longitude',
            'height': 'new height',
        }

        self.api_base_url = '/api_v_1/'
        self.device_urls = ["{}device/{}/".format(self.api_base_url, device.id) for device in self.devices]

    def get_credentials(self):
        return self.create_apikey(self.user.username, self.api_key)
