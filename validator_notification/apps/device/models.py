from django.db import models
from django.contrib.auth.models import User as DjangoUser
from .utils.enumerations import platform, owner


class Device(models.Model):
    name = models.CharField(max_length=50)
    tlf = models.CharField(max_length=50, null=True)
    platform = models.CharField(max_length=50, null=False, choices=platform.tuples())
    owner = models.CharField(max_length=50, null=False, choices=owner.tuples())
    created_at = models.DateTimeField(auto_now_add=True)
    user = models.ForeignKey(DjangoUser, related_name="devices", on_delete=models.CASCADE, null=True)
    device = models.CharField(max_length=50, null=True)
    os_family = models.CharField(max_length=50, null=True)
    os_version = models.CharField(max_length=50, null=True)
    onesignal_id = models.CharField(max_length=50, null=True)
