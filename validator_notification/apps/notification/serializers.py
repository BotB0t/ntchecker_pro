from rest_framework import serializers

from validator_notification.apps.notification.models import GeneralNotification


class GeneralNotificationSerializer(serializers.ModelSerializer):
    title = serializers.CharField(required=True, allow_blank=False)
    url = serializers.CharField(required=False, allow_blank=True)
    thumbnail = serializers.CharField(required=False, allow_blank=True)

    class Meta:
        model = GeneralNotification
        fields = '__all__'
