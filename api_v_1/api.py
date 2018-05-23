from django.conf.urls import url
from tastypie.resources import ModelResource
from tastypie.authentication import ApiKeyAuthentication
from device.models import Device
from .authorization import UserObjectsOnlyAuthorization


class DeviceResource(ModelResource):
    class Meta:
        queryset = Device.objects.all()
        resource_name = 'device'
        limit = 0
        max_limit = 0
        list_allowed_methods = ['get', 'post']
        detail_allowed_methods = ['get', 'put', 'delete']
        authentication = ApiKeyAuthentication()
        authorization = UserObjectsOnlyAuthorization()

    def prepend_urls(self):
        return [
            url(r"^$", self.wrap_view('dispatch_list'), name="api_dispatch_list"),
        ]

    def alter_list_data_to_serialize(self, request, data):
        return data['objects']

    def obj_create(self, bundle, **kwargs):
        return super(DeviceResource, self).obj_create(bundle, owner=bundle.request.user)

    def obj_delete(self, bundle, **kwargs):
        bundle.data = {
            'latitude': '',
            'longitude': '',
            'height': '',
        }
        return super(DeviceResource, self).obj_update(bundle, **kwargs)
