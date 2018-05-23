from django.contrib import admin
from .models import NPUser
from django.contrib.auth.admin import UserAdmin


@admin.register(NPUser)
class NPUserAdmin(UserAdmin):
    pass
