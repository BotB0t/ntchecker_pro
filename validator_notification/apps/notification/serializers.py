from rest_framework import serializers

from .models import GeneralNotification


class CreateBaseNotificationSerializer(serializers.Serializer):
    title = serializers.CharField(required=False, allow_blank=True)
    url = serializers.CharField(required=False, allow_blank=True)
    thumbnail = serializers.CharField(required=False)
    item_id = serializers.IntegerField(required=False)


class GeneralNotificationSerializer(serializers.ModelSerializer):
    class Meta:
        model = GeneralNotification
        exclude = ['id']


class IndividualNotificationSerializer(CreateBaseNotificationSerializer):
    userID = serializers.CharField()

    def validate(self, data):
        super().validate(data)

        if not data.get('title') and not data.get('description'):
            raise serializers.ValidationError({'title-description': "title and description can't be empty"})

        return data
