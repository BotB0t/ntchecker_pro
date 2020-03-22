from rest_framework import serializers

from validator_notification.apps.device.models import Device


class DeviceSerializer(serializers.ModelSerializer):
    name = serializers.CharField(required=True, allow_blank=False)
    platform = serializers.CharField(required=True, allow_blank=False)
    owner = serializers.CharField(required=True, allow_blank=False)

    class Meta:
        model = Device
        fields = '__all__'
