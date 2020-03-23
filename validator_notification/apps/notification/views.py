import logging

from rest_framework import permissions, viewsets

from validator_notification.apps.device.models import Device
from .serializers import GeneralNotificationSerializer
from .models import GeneralNotification, IndividualNotification


logger = logging.getLogger(__name__)


class GeneralNotificationViewSet(viewsets.ModelViewSet):
    permission_classes = [
        permissions.AllowAny
    ]
    serializer_class = GeneralNotificationSerializer

    def get_queryset(self):
        return GeneralNotification.objects.all()

    def perform_create(self, serializer):
        genetal_notification = serializer.save()

        devices = Device.objects.all()
        logger.info('GeneralNotification: Create: Individual Notifications to create: %s' % len(devices))
        for device in devices:
            user = device.user
            IndividualNotification.objects.create(
                general=genetal_notification,
                user=user,
                device=device,
                option_selected=''
            )
            logger.info('GeneralNotification: IndividualNotification: Create: User: %s' % user.username)
        logger.info('GeneralNotification: Create: Finished')
