from django.db import models

from validator_notification.apps.user.models import User


class Device(models.Model):
    username = models.ForeignKey(User, on_delete=models.CASCADE)
    platform = models.CharField(max_length=50, unique=True, null=False)
    ownership = models.CharField(max_length=50, null=False)
