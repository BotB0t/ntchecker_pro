from rest_framework import serializers

from .models import GeneralNotification


class GeneralNotificationSerializer(serializers.ModelSerializer):
    class Meta:
        model = GeneralNotification
        exclude = ['id']
