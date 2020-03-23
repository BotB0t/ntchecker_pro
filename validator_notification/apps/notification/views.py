import logging

from django.http import JsonResponse
from rest_framework.decorators import action
from rest_framework import permissions, viewsets, status
from rest_framework.response import Response

from validator_notification.apps.device.models import Device
from .serializers import GeneralNotificationSerializer, IndividualNotificationSerializer
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


class IndividualNotificationViewSet(viewsets.ModelViewSet):
    permission_classes = [
        permissions.IsAuthenticated
    ]
    serializer_class = IndividualNotificationSerializer

    def get_queryset(self):
        return self.request.user.individual_notifications.all()

    @action(methods=['get'], detail=False, url_path='all')
    def get_all_queryset(self, request):
        self.permission_classes = [permissions.AllowAny]
        data = list(IndividualNotification.objects.values())
        return JsonResponse(data, safe=False, status=status.HTTP_200_OK)
