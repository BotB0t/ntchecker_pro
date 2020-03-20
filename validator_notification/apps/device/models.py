from django.db import models

from validator_notification.apps.user.models import User
from .utils.enumerations import platform, ownership


class Device(models.Model):
    username = models.ForeignKey(User, on_delete=models.CASCADE, db_column='username')
    platform = models.CharField(max_length=50, null=False, choices=platform.tuples())
    ownership = models.CharField(max_length=50, null=False, choices=ownership.tuples())
