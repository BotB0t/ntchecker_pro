from django.db import models
from django.contrib.auth.models import User as DjangoUser


class User(models.Model):
    username = models.CharField(max_length=50)
    email = models.CharField(max_length=100, null=False, unique=True)
    owner = models.ForeignKey(DjangoUser, related_name="users", on_delete=models.CASCADE, null=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.username

    @staticmethod
    def get_by_username(username):
        return User.objects.filter(username=username).first()


class UserProfileInfo:
    def __init__(self, username: str, **kwargs):
        self.username = username
        self.phones = {}
