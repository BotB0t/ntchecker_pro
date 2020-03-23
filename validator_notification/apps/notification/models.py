from django.db import models
from django.contrib.auth.models import User as DjangoUser
from .utils.enumerations import options_notification
from validator_notification.apps.device.models import Device


class GeneralNotification(models.Model):
    title = models.CharField(max_length=200)
    url = models.CharField(max_length=200)
    thumbnail = models.CharField(max_length=200)
    created_at = models.DateTimeField(auto_now_add=True)


class IndividualNotification(models.Model):
    general = models.ForeignKey(GeneralNotification, related_name="general_notification",
                                on_delete=models.CASCADE, null=False)
    user = models.ForeignKey(DjangoUser, related_name="user",
                                on_delete=models.CASCADE, null=True)
    device = models.ForeignKey(Device, related_name="device",
                                 on_delete=models.CASCADE, null=True)
    option_selected = models.CharField(max_length=10, choices=options_notification.tuples(),
                                       default='', null=True)
