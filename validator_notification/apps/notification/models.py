from django.db import models
from django.contrib.auth.models import User as DjangoUser


class GeneralNotification(models.Model):
    title = models.CharField(max_length=200)
    url = models.CharField(max_length=200)
    thumbnail = models.CharField(max_length=200)
    created_at = models.DateTimeField(auto_now_add=True)


class IndividualNotification(models.Model):
    general = models.ForeignKey(GeneralNotification, related_name="general_notification",
                                on_delete=models.CASCADE, null=False)
    user = models.ForeignKey(DjangoUser, related_name="general_notification",
                                on_delete=models.CASCADE, null=True)
