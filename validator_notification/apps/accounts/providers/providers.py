from validator_notification.apps.utils.logger.logger import get_instance_logger
from django.contrib.auth.models import User

from validator_notification.apps.accounts.providers.assemblers import assemble_user_list


class UserProvider:
    def __init__(self):
        self.logger = get_instance_logger(self)

    def get_user(self, username: str):
        return User.objects.filter(username=username).values()
        # return sorted(assemble_user_list(user), key=lambda x: x['username'], reverse=True)

    def get_user_all(self):
        users = User.objects.all()
        return sorted(assemble_user_list(users), key=lambda x: x['username'], reverse=True)
