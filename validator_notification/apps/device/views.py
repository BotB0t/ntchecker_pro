import logging

from rest_framework import permissions, viewsets

from .serializers import DeviceSerializer


logger = logging.getLogger(__name__)


class DeviceViewSet(viewsets.ModelViewSet):
    permission_classes = [
        permissions.IsAuthenticated
    ]
    serializer_class = DeviceSerializer

    def get_queryset(self):
        return self.request.user.devices.all()

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)
