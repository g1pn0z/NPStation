from django.conf.urls import url, include
from .api import DeviceResource
from .views import LoginView, ProfileView
device_resource = DeviceResource()

urlpatterns = [
    url(r'^login/$', LoginView.as_view()),
    url(r'^profile/$', ProfileView.as_view()),
    url(r'^', include(device_resource.urls)),
]
