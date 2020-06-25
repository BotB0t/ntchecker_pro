from django.utils import timezone
from rest_framework import serializers
from django.contrib.auth.models import User
from django.contrib.auth import authenticate

# User Serializer


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'
        # exclude = ['password']


class RegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'password', 'first_name')
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user = User.objects.create_user(validated_data['username'], validated_data['email'], validated_data['password'])
        if validated_data.get('first_name'):
            user.first_name = validated_data.get('first_name', '')
            user.save(update_fields=['first_name'])
        return user

    def create_superuser(self, validated_data):
        user = User.objects.create_superuser(
            validated_data['username'], validated_data['email'], validated_data['password'])
        if validated_data.get('first_name'):
            user.first_name = validated_data.get('first_name', '')
            user.save(update_fields=['first_name'])
        return user

class UpdaterUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('username', 'email', 'password', 'first_name')
    
    def update(self, validated_data):
        user = User.objects.update(validated_data['username'])
        if validated_data.get('username'):
            user.username = validated_data.get('username', '')
            user.save(update_fields=['username'])
        return user


class LoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField()

    def validate(self, data):
        user = authenticate(**data)
        if user and user.is_active:
            user.last_login = timezone.now()
            user.save(update_fields=['last_login'])
            return user
        raise serializers.ValidationError("Incorrect Username or Password")
