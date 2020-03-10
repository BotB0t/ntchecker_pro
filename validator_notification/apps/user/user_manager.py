
from validator_notification.apps.device.models import Device
from validator_notification.apps.user.models import User, UserProfileInfo


class UserManager:

    def login(self, username: str) -> UserProfileInfo:
        return self.retrieve_and_update_user(username)

    def retrieve_and_update_user(self, username: str) -> UserProfileInfo:
        user = self.get_user(username)
        devices = self.get_devices_by_user(user)

        user_profile_info = UserProfileInfo(user.username, devices)
        return user_profile_info

    def get_user(self, username: str) -> User:
        return User.get_user(username)

    def get_devices_by_user(self, user: User) -> [Device]:
        return []

    def create_user(self, data):
        user = User.objects.create(username=data['username'])
        return user.username
