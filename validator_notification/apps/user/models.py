from django.db import models


class User(models.Model):
    username = models.CharField(max_length=50, primary_key=True)

    def __str__(self):
        return self.username

    @staticmethod
    def get_by_username(username):
        return User.objects.filter(username=username).first()


class UserProfileInfo:
    def __init__(self, username: str, **kwargs):
        self.username = username
        self.phones = {}
