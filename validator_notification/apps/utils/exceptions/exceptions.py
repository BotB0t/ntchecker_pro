from rest_framework import status
from rest_framework.exceptions import APIException


class ServicePermissionDeny(APIException):
    status_code = status.HTTP_401_UNAUTHORIZED
    default_detail = 'Permission denied'
    default_code = 'unauthorized'


class UnexpectedError(APIException):
    status_code = status.HTTP_417_EXPECTATION_FAILED
    default_detail = 'expectation failed'
