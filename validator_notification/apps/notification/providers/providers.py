from datetime import datetime  # , timedelta

from django.contrib.auth.models import User
from validator_notification.apps.notification.models import IndividualNotification
from validator_notification.apps.notification.providers.assemblers import assemble_notification_list, \
    assemble_notification_csv, assemble_notification_list_to_csv
from validator_notification.apps.utils.logger.logger import get_instance_logger


class NotificationsProvider:
    def __init__(self):
        self.logger = get_instance_logger(self)

    def get_by_user(self, user: User):
        notifications = list(user.individual_notifications.all())
        return sorted(assemble_notification_list(notifications), key=lambda x: x['created_at'], reverse=True)

    def get(self, date_from: datetime = None, date_to: datetime = None, general_id: int = None):
        import warnings
        warnings.filterwarnings("ignore")
        # TODO: comprobación de la fecha
        if date_from is not None and date_to is not None:
            notifications = list(IndividualNotification.objects.filter(
                created_at__range=[date_from, date_to]))  # (date_to + timedelta(days=1))]))
        elif general_id is not None:
            notifications = list(IndividualNotification.objects.filter(
                general=general_id
            ))
        else:
            notifications = list(IndividualNotification.objects.all())
        return sorted(assemble_notification_list(notifications), key=lambda x: x['created_at'], reverse=True)

    def get_csv(self, response, date_from: datetime = None, date_to: datetime = None):
        if date_from is not None and date_to is not None:
            notifications = list(IndividualNotification.objects.filter(
                created_at__range=[date_from, date_to]))  # (date_to + timedelta(days=1))]))
        else:
            notifications = list(IndividualNotification.objects.all())
        notifications = sorted(assemble_notification_list_to_csv(notifications),
                               key=lambda x: x['created_at'], reverse=True)
        notification_csv = assemble_notification_csv(notifications, response)
        return notification_csv
