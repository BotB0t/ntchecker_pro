from enum import Enum


class NotificationStatus(Enum):
    NEW = 'new'
    OPENED = 'opened'
    DELETED = 'deleted'

    @classmethod
    def choices(cls):
        return tuple((i.name, i.value) for i in cls)

    @classmethod
    def values(cls):
        return tuple(i.value for i in cls)

    @staticmethod
    def first():
        return list(NotificationStatus)[0]
