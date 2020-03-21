from django.db import models

from validator_notification.apps.user.models import User
from .utils.enumerations import platform, owner


class Device(models.Model):
    user_id = models.ForeignKey(User, on_delete=models.CASCADE, db_column='user_id')
    platform = models.CharField(max_length=50, null=False, choices=platform.tuples())
    owner = models.CharField(max_length=50, null=False, choices=owner.tuples())
