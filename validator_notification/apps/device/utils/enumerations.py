from validator_notification.utils.enumerations.base import BaseEnum


class platform(BaseEnum):
    ANDROID = 'Android'
    IOS = 'iOS'


class ownership(BaseEnum):
    PERSONAL = 'Personal'
    EMPRESA = 'Empresa'
