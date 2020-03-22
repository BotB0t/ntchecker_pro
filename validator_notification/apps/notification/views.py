import logging

from rest_framework import permissions, viewsets

from .serializers import GeneralNotificationSerializer
from .models import GeneralNotification


logger = logging.getLogger(__name__)


class GeneralNotificationViewSet(viewsets.ModelViewSet):
    permission_classes = [
        permissions.AllowAny
    ]
    serializer_class = GeneralNotificationSerializer

    def get_queryset(self):
        return GeneralNotification.objects.all()

    def perform_create(self, serializer):
        serializer.save()
