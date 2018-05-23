from django.db import models
from django.utils.translation import ugettext_lazy as _
from users.models import NPUser


class Device(models.Model):
    owner = models.ForeignKey(NPUser, verbose_name=_('owner'))
    created = models.DateTimeField(_('created'), auto_now_add=True)
    title = models.CharField(_('title'), max_length=100, blank=True, default='')
    model = models.CharField(_('model'), max_length=50, blank=True, default='')
    imei = models.CharField(_('IMEI'), max_length=18, blank=True, default='')
    phone_number = models.CharField(_('phone number'), max_length=32, blank=True, default='')
    mac = models.CharField(_('mac'), max_length=20, blank=True, default='')
    usb_id_code = models.CharField(_('usb id code'), max_length=30, blank=True, default='')
    latitude = models.CharField(_('latitude'), max_length=50, blank=True, default='')
    longitude = models.CharField(_('longitude'), max_length=50, blank=True, default='')
    height = models.CharField(_('height'), max_length=50, blank=True, default='')
    cell_id = models.BooleanField(_('cell id'), default=False)
    ip_info = models.CharField(_('ip info'), max_length=128, blank=True, default='')
    wifi_info = models.CharField(_('wifi info'), max_length=512, blank=True, default='')
    battery_info = models.CharField(_('battery info'), max_length=128, blank=True, default='')
    webcam_picture = models.CharField(_('webcam picture'), max_length=128, blank=True, default='')
    code = models.TextField(_('code'))

    class Meta:
        verbose_name = _('device')
        verbose_name_plural = _("devices")
        ordering = ('created',)

    def __str__(self):
        return self.title or self.model
