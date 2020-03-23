from django.contrib.auth.models import User
from validator_notification.apps.notification.models import GeneralNotification, IndividualNotification
from validator_notification.apps.notification.providers.assemblers import assemble_notification_list
from validator_notification.apps.utils.logger.logger import get_instance_logger


class NotificationsProvider:
    def __init__(self):
        self.logger = get_instance_logger(self)

    def get_by_user(self, user: User):
        notifications = list(user.individual_notifications.all())
        return sorted(assemble_notification_list(notifications), key=lambda x: x['created_at'], reverse=True)

    def get(self):
        notifications = list(IndividualNotification.objects.all())
        return sorted(assemble_notification_list(notifications), key=lambda x: x['created_at'], reverse=True)
