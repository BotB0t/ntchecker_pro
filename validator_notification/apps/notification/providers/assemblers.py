from typing import List

from django.forms.models import model_to_dict
from validator_notification.apps.notification.models import IndividualNotification


def assemble_notification_list(data: list) -> List[IndividualNotification]:
    return [assemble_notification(notification) for notification in data]


def assemble_notification(notification: IndividualNotification) -> IndividualNotification:
    general = model_to_dict(notification.general)
    user = model_to_dict(notification.user, fields=[field.name for field in notification.user._meta.fields])
    device = model_to_dict(notification.device)
    created_at = notification.created_at
    updated_at = notification.updated_at

    notification = model_to_dict(notification)

    notification['general'] = general
    notification['user'] = user
    notification['device'] = device
    notification['update_at'] = updated_at
    notification['created_at'] = created_at

    return notification
