import functools

from typing import Any
from django.conf import settings

from rest_framework.exceptions import APIException
from rest_framework.request import Request

from validator_notification.utils.exceptions import PermissionDeny, UnexpectedError
from validator_notification.utils.logger import get_logger

logger = get_logger(__name__)


def permissions(func):
    @functools.wraps(func)
    def wrap(obj: Any, request: Request, *args, **kwargs):
        try:
            return func(obj, request, *args, **kwargs)
        except PermissionDeny:
            raise PermissionDeny
        except Exception as exception:
            logger.info(f'Exception raised {str(exception)}')
            if isinstance(exception, APIException):
                raise exception
            if settings.DEBUG:
                raise UnexpectedError(str(exception))
            raise UnexpectedError()

        return wrap
