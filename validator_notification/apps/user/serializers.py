from rest_framework import serializers

from validator_notification.utils.helpers.string_helper import check_email


class UserProfileInfoSerializer(serializers.Serializer):
    username = serializers.CharField(source='username')
    devices = serializers.ListField(child=serializers.CharField(), default=[])


class CreateUserSerializer(serializers.Serializer):
    username = serializers.CharField(required=True, allow_blank=False)

    def validate(self, data):
        if self.check_username_and_not_mail(data):
            raise serializers.ValidationError({'Username not valid'})

        return data

    @staticmethod
    def check_username_and_not_mail(data):
        return check_email(data.get('username', ''))
