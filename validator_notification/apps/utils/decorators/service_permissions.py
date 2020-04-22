from validator_notification.apps.utils.exceptions.exceptions import ServicePermissionDeny
from validator_notification.apps.utils.enumerations.permissions_list import permissions_list


def service_permissions(permissions: list):
    def has_permission(func):
        def wrap(self, *args, **kwargs):
            user = self.request.user

            user_permissions = []
            if user.is_superuser:
                user_permissions.append(permissions_list.ADMIN_PERMISSION)
            if user.is_staff:
                user_permissions.append(permissions_list.STAFF_PERMISSION)

            permissions_neeeded = [permission for permission in permissions if permission not in user_permissions]
            if permissions_neeeded:
                raise ServicePermissionDeny()

            return func(self, *args, **kwargs)

        wrap.__doc__ = func.__doc__
        wrap.__name__ = func.__name__
        return wrap
    return has_permission
