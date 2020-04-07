import csv
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


def assemble_notification_list_to_csv(data: list) -> List[IndividualNotification]:
    return [assemble_notification_to_csv(notification) for notification in data]


def assemble_notification_to_csv(notification: IndividualNotification) -> IndividualNotification:
    general = model_to_dict(notification.general)
    user = model_to_dict(notification.user, fields=[field.name for field in notification.user._meta.fields])
    device = model_to_dict(notification.device)
    created_at = notification.created_at
    updated_at = notification.updated_at

    notification = model_to_dict(notification)

    notification['general_title'] = general.get('title')
    notification['general_url'] = general.get('url')
    notification['update_at'] = updated_at
    notification['created_at'] = created_at
    notification['user'] = user.get('username')
    notification['device_number'] = device.get('name')
    notification['device_platform'] = device.get('platform')
    notification['device_owner'] = device.get('owner')

    return notification


def assemble_notification_csv(notifications_to_csv: List[IndividualNotification], response):
    fieldnames = "id, user, option_selected, general, general_title, general_url, status, update_at, created_at, device, device_number, device_owner, device_platform".split(
        ", ")  # quick hack
    cw = csv.DictWriter(response, fieldnames, delimiter=',', quotechar='|', quoting=csv.QUOTE_MINIMAL)
    cw.writeheader()
    cw.writerows(notifications_to_csv)
    return response
