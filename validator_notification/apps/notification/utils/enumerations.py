from validator_notification.utils.enumerations.base import BaseEnum


class options_notification(BaseEnum):
    OK = 'SI'
    KO = 'NO'


class status_notification(BaseEnum):
    READ = 'READ'
    NEW = 'NEW'
    OPENED = 'OPENED'
