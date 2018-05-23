import factory
from ..models import Device
from users.tests.factories import UserFactory


class DeviceFactory(factory.DjangoModelFactory):

    class Meta:
        model = Device

    owner = factory.LazyAttribute(lambda a: UserFactory())
    title = 'Device'
    model = 'Model'
    imei = ''
    phone_number = ''
    mac = ''
    usb_id_code = ''
    latitude = ''
    longitude = ''
    height = ''
    cell_id = False
    ip_info = ''
    wifi_info = ''
    battery_info = ''
    webcam_picture = ''
    code = ''
