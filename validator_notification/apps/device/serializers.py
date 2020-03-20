from rest_framework import serializers

from .models import Device


class CreateDeviceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Device
        exclude = ['id']


class DeviceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Device
        fields = '__all__'


class GetByUserIDDeviceSerializer(serializers.Serializer):
    username = serializers.CharField(required=True)
    id = serializers.IntegerField(required=False)


class UpdateDeviceSerializer(serializers.Serializer):
    username = serializers.CharField(required=True)
    id = serializers.IntegerField(required=False)
