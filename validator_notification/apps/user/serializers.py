from rest_framework import serializers

from validator_notification.apps.user.models import User
from validator_notification.utils.helpers.string_helper import check_email


class UserSerializer(serializers.ModelSerializer):
    username = serializers.CharField(required=True, allow_blank=False)
    email = serializers.CharField(required=True, allow_blank=False)

    class Meta:
        model = User
        fields = '__all__'

    def validate(self, data):
        if not self.check_email(data):
            raise serializers.ValidationError({'Username not valid'})
        return data

    @staticmethod
    def check_email(data):
        return check_email(data.get('email', ''))
