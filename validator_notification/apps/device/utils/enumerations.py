from validator_notification.utils.enumerations.base import BaseEnum


class platform(BaseEnum):
    ANDROID = 'Android'
    IOS = 'iOS'


class owner(BaseEnum):
    PERSONAL = 'Personal'
    EMPRESA = 'Empresa'


class options_notification(BaseEnum):
    OK = 'SI'
    KO = 'NO'
